import { useEffect, useState } from "react";
import {
  apiCacheTtl,
  buildStrapiUrl,
  fetchFirstJson,
  readApiCache,
  resolveStrapiMediaUrl,
} from "./client";
import type { Locale } from "../i18n/LanguageContext";
import type { Project, ProjectCategory } from "../workData";

const WORKS_PATH = "/api/works";
const WORKS_CACHE_PREFIX = "works";

type StrapiImage = {
  url?: string | null;
};

type StrapiImageSource = StrapiImage[] | StrapiImage | null | undefined;

type StrapiPoint = {
  id?: number;
  text?: string | null;
  title?: string | null;
};

type StrapiPointGroup = {
  id?: number;
  title?: string | null;
  points?: StrapiPoint[] | StrapiPoint | null;
  images?: StrapiImageSource;
};

type StrapiPointSource =
  | StrapiPoint[]
  | StrapiPoint
  | StrapiPointGroup
  | null
  | undefined;

type StrapiWork = {
  id: number;
  documentId: string;
  title?: string | null;
  slug?: string | null;
  shortDescription?: string | null;
  clientName?: string | null;
  clientType?: string | null;
  location?: string | null;
  displayOrder?: number | null;
  locale?: string | null;
  publishedAt?: string | null;
  mainImage?: StrapiImage | null;
  gallery?: StrapiImageSource;
  galleryImages?: StrapiImageSource;
  preEventImages?: StrapiImageSource;
  preEventMarketingImages?: StrapiImageSource;
  postEventImages?: StrapiImageSource;
  postEventMarketingImages?: StrapiImageSource;
  preEventMarketingPoints?: StrapiPointSource;
  postEventMarketingPoints?: StrapiPointSource;
  launchEventExperiencePoints?: StrapiPointSource;
  campaignImpactPoints?: StrapiPointSource;
  services?: StrapiPointSource;
  localizations?: StrapiWork[] | null;
};

type StrapiResponse = {
  data?: StrapiWork[] | null;
};

function appendFields(params: URLSearchParams, fields: string[]): void {
  fields.forEach((field, index) => {
    params.append(`fields[${index}]`, field);
  });
}

function resolveMediaUrl(raw: string | null | undefined): string {
  return resolveStrapiMediaUrl(raw);
}

function worksCacheKey(locale: Locale): string {
  return `${WORKS_CACHE_PREFIX}:${locale}`;
}

function buildOptimizedWorksParams(locale: Locale): URLSearchParams {
  const params = new URLSearchParams({ locale });
  appendFields(params, [
    "title",
    "slug",
    "shortDescription",
    "clientName",
    "clientType",
    "location",
    "displayOrder",
    "publishedAt",
    "locale",
    "documentId",
  ]);
  params.set("pagination[pageSize]", "50");
  params.append("sort[0]", "displayOrder:asc");

  [
    "mainImage",
    "gallery",
    "galleryImages",
    "preEventImages",
    "preEventMarketingImages",
    "postEventImages",
    "postEventMarketingImages",
  ].forEach((field) => {
    params.append(`populate[${field}][fields][0]`, "url");
  });

  [
    "preEventMarketingPoints",
    "postEventMarketingPoints",
    "launchEventExperiencePoints",
    "campaignImpactPoints",
    "services",
  ].forEach((field) => {
    params.append(`populate[${field}][populate]`, "*");
  });

  return params;
}

function buildLegacyWorksParams(locale: Locale): URLSearchParams {
  const params = new URLSearchParams({ populate: "*", locale });
  params.set("pagination[pageSize]", "50");
  params.append("sort[0]", "displayOrder:asc");
  return params;
}

function buildWorksCandidates(locale: Locale) {
  const optimized = buildOptimizedWorksParams(locale);
  const legacy = buildLegacyWorksParams(locale);
  const cacheKey = worksCacheKey(locale);

  return [
    {
      label: "optimized proxy",
      url: buildStrapiUrl(WORKS_PATH, optimized, "proxy"),
      cacheKey,
    },
    {
      label: "optimized direct",
      url: buildStrapiUrl(WORKS_PATH, optimized, "direct"),
      cacheKey,
    },
    {
      label: "legacy proxy",
      url: buildStrapiUrl(WORKS_PATH, legacy, "proxy"),
      cacheKey,
    },
    {
      label: "legacy direct",
      url: buildStrapiUrl(WORKS_PATH, legacy, "direct"),
      cacheKey,
    },
  ];
}

function mapCategory(clientType: string | null | undefined): ProjectCategory {
  const key = (clientType ?? "").trim().toLowerCase();
  if (key === "reimagined") return "reimagined";
  if (key === "conceptual") return "conceptual";
  return "executed";
}

function yearFromTimestamp(timestamp: string | null | undefined): string {
  if (!timestamp) return "";
  const year = new Date(timestamp).getFullYear();
  return Number.isFinite(year) ? String(year) : "";
}

function pointsToStrings(points: StrapiPoint[] | StrapiPoint | null | undefined): string[] {
  if (!points) return [];
  const list = Array.isArray(points) ? points : [points];
  return list
    .map((point) => ((point?.text ?? point?.title) ?? "").trim())
    .filter((text) => text.length > 0);
}

function sectionToContent(source: StrapiPointSource): { title: string; points: string[] } {
  if (!source) return { title: "", points: [] };
  if (!Array.isArray(source) && "points" in source) {
    return {
      title: (source.title ?? "").trim(),
      points: pointsToStrings(source.points),
    };
  }
  return {
    title: "",
    points: pointsToStrings(source),
  };
}

function sectionToImages(source: StrapiPointSource): string[] {
  if (!source || Array.isArray(source) || !("images" in source)) return [];
  return imagesToUrls(source.images);
}

function imagesToUrls(source: StrapiImageSource): string[] {
  if (!source) return [];
  const items = Array.isArray(source) ? source : [source];
  return items
    .map((image) => resolveMediaUrl(image?.url))
    .filter((url) => url.length > 0);
}

function padGallery(images: string[], fallback: string): string[] {
  const base = images.length > 0 ? images : fallback ? [fallback] : [];
  if (base.length === 0) return [];
  const result = [...base];
  while (result.length < 3) {
    result.push(result[result.length % base.length]);
  }
  return result;
}

function slugFor(work: StrapiWork): string {
  const raw = (work.slug ?? "").trim();
  if (raw) return raw;
  return work.documentId ?? String(work.id);
}

function mapStrapiWorkToProject(
  work: StrapiWork,
  index: number,
  ordered: StrapiWork[],
): Project {
  const mainImage = resolveMediaUrl(work.mainImage?.url);
  const gallery = imagesToUrls(work.gallery ?? work.galleryImages);
  const preEventSectionImages = sectionToImages(work.preEventMarketingPoints);
  const postEventSectionImages = sectionToImages(work.postEventMarketingPoints);
  const preEventImages =
    preEventSectionImages.length > 0
      ? preEventSectionImages
      : imagesToUrls(work.preEventImages ?? work.preEventMarketingImages);
  const postEventImages =
    postEventSectionImages.length > 0
      ? postEventSectionImages
      : imagesToUrls(work.postEventImages ?? work.postEventMarketingImages);

  const preEventMarketingSection = sectionToContent(work.preEventMarketingPoints);
  const postEventMarketingSection = sectionToContent(work.postEventMarketingPoints);
  const launchEventExperienceSection = sectionToContent(work.launchEventExperiencePoints);
  const campaignImpactSection = sectionToContent(work.campaignImpactPoints);
  const servicesSection = sectionToContent(work.services);

  const coverImage = mainImage || gallery[0] || preEventImages[0] || postEventImages[0] || "";
  const paddedGallery = padGallery(gallery, coverImage);
  const paddedPreEventImages = padGallery(preEventImages, "");
  const paddedPostEventImages = padGallery(postEventImages, "");
  const nextSlug = slugFor(ordered[(index + 1) % ordered.length] ?? work);

  return {
    slug: slugFor(work),
    title: work.title ?? "",
    category: mapCategory(work.clientType),
    year: yearFromTimestamp(work.publishedAt),
    location: work.location ?? "",
    client: work.clientName ?? "",
    description: work.shortDescription ?? "",
    image: coverImage,
    desktopImage: undefined,
    aspectClass: "aspect-[16/9]",
    spanClass: "md:col-span-6",
    notes: servicesSection.points,
    grayscale: false,
    heroTitle: work.shortDescription ?? "",
    heroIntro: work.shortDescription ?? "",
    campaignOverview: work.shortDescription ?? "",
    preEventMarketingTitle: preEventMarketingSection.title,
    preEventMarketing: preEventMarketingSection.points,
    launchEventExperience: launchEventExperienceSection.points,
    postEventMarketingTitle: postEventMarketingSection.title,
    postEventMarketing: postEventMarketingSection.points,
    campaignImpact: campaignImpactSection.points,
    preEventImages: paddedPreEventImages,
    postEventImages: paddedPostEventImages,
    services: servicesSection.points,
    metrics: [],
    gallery: paddedGallery,
    nextProjectSlug: nextSlug,
  };
}

export async function fetchProjects(
  locale: Locale,
  signal?: AbortSignal,
): Promise<Project[]> {
  if (signal?.aborted) {
    throw new DOMException("Portfolio request aborted.", "AbortError");
  }

  const payload = await fetchFirstJson<StrapiResponse>(buildWorksCandidates(locale), {
    ttlMs: apiCacheTtl.works,
  });

  if (signal?.aborted) {
    throw new DOMException("Portfolio request aborted.", "AbortError");
  }

  const items = payload.data ?? [];
  const ordered = [...items].sort(
    (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0),
  );
  return ordered.map((item, index, arr) => mapStrapiWorkToProject(item, index, arr));
}

export function getCachedProjects(locale: Locale): Project[] | null {
  const payload = readApiCache<StrapiResponse>(worksCacheKey(locale));
  if (!payload) return null;

  const items = payload.data ?? [];
  const ordered = [...items].sort(
    (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0),
  );
  return ordered.map((item, index, arr) => mapStrapiWorkToProject(item, index, arr));
}

type UseProjectsResult = {
  projects: Project[];
  loading: boolean;
  error: string | null;
};

export function useProjects(locale: Locale): UseProjectsResult {
  const [projects, setProjects] = useState<Project[]>(() => getCachedProjects(locale) ?? []);
  const [loading, setLoading] = useState(() => !getCachedProjects(locale));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cached = getCachedProjects(locale);
    if (cached) {
      setProjects(cached);
      setLoading(false);
      setError(null);
      return;
    }

    let active = true;
    setLoading(true);
    setError(null);
    fetchProjects(locale)
      .then((data) => {
        if (!active) return;
        setProjects(data);
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        const message = err instanceof Error ? err.message : "Unable to load portfolio.";
        if (!active) return;
        setError(message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [locale]);

  return { projects, loading, error };
}
