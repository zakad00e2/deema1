import { useEffect, useState } from "react";
import {
  apiCacheTtl,
  buildStrapiUrl,
  fetchFirstJson,
  readApiCache,
  resolveStrapiMediaUrl,
} from "./client";
import ar from "../i18n/ar";
import en from "../i18n/en";
import type { Locale } from "../i18n/LanguageContext";

const WORKSHOPS_PATH = "/api/workshops";
const WORKSHOPS_CACHE_PREFIX = "workshops";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1581335967005-7f1c1f7addf9?w=800&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1601815197826-64673887ceaf?w=800&auto=format&fit=crop&q=60",
];

export interface GroupWorkshopContent {
  level: string;
  title: string;
  description: string;
  learns: string[];
  format: string;
  dates: string;
  image: string;
}

type StrapiDocument = {
  data?: unknown;
};

type UnknownRecord = Record<string, unknown>;

function fallbackGroupWorkshops(locale: Locale): GroupWorkshopContent[] {
  const source =
    locale === "ar" ? ar.workshopsPage.groupWorkshops : en.workshopsPage.groupWorkshops;

  return source.map((item, index) => ({
    level: item.level,
    title: item.title,
    description: item.description,
    learns: [...item.learns],
    format: item.format,
    dates: item.dates,
    image: FALLBACK_IMAGES[index] ?? FALLBACK_IMAGES[0],
  }));
}

type StrapiWorkshop = {
  title?: string | null;
  shortDescription?: string | null;
  formatDetails?: string | null;
  datesDetails?: string | null;
  workshopType?: string | null;
  whatYouWillLearnPoints?: unknown;
  mainImage?: unknown;
};

function buildWorkshopUrl(locale: Locale): string {
  const params = new URLSearchParams({ populate: "*", locale });
  return `${WORKSHOPS_PATH}?${params.toString()}`;
}

function resolveMediaUrl(raw: string | null | undefined): string {
  return resolveStrapiMediaUrl(raw);
}

function appendFields(params: URLSearchParams, fields: string[]): void {
  fields.forEach((field, index) => {
    params.append(`fields[${index}]`, field);
  });
}

function workshopsCacheKey(locale: Locale): string {
  return `${WORKSHOPS_CACHE_PREFIX}:${locale}`;
}

function buildOptimizedWorkshopParams(locale: Locale): URLSearchParams {
  const params = new URLSearchParams({ locale });
  appendFields(params, [
    "title",
    "shortDescription",
    "formatDetails",
    "datesDetails",
    "workshopType",
    "displayOrder",
  ]);
  params.set("pagination[pageSize]", "20");
  params.append("sort[0]", "displayOrder:asc");
  params.append("populate[mainImage][fields][0]", "url");
  params.append("populate[whatYouWillLearnPoints][populate]", "*");
  return params;
}

function buildLegacyWorkshopParams(locale: Locale): URLSearchParams {
  const params = new URLSearchParams({ populate: "*", locale });
  params.set("pagination[pageSize]", "20");
  params.append("sort[0]", "displayOrder:asc");
  return params;
}

function buildWorkshopCandidates(locale: Locale) {
  const optimized = buildOptimizedWorkshopParams(locale);
  const legacy = buildLegacyWorkshopParams(locale);
  const cacheKey = workshopsCacheKey(locale);

  return [
    {
      label: "optimized proxy",
      url: buildStrapiUrl(WORKSHOPS_PATH, optimized, "proxy"),
      cacheKey,
    },
    {
      label: "optimized direct",
      url: buildStrapiUrl(WORKSHOPS_PATH, optimized, "direct"),
      cacheKey,
    },
    {
      label: "legacy proxy",
      url: buildStrapiUrl(WORKSHOPS_PATH, legacy, "proxy"),
      cacheKey,
    },
    {
      label: "legacy direct",
      url: buildStrapiUrl(WORKSHOPS_PATH, legacy, "direct"),
      cacheKey,
    },
  ];
}

function toRecord(value: unknown): UnknownRecord | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const record = value as UnknownRecord;
  if (record.attributes && typeof record.attributes === "object" && record.attributes !== null) {
    return record.attributes as UnknownRecord;
  }
  return record;
}

function toArray(value: unknown): unknown[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;

  const record = toRecord(value);
  if (record?.data) return toArray(record.data);

  return [value];
}

function getString(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return String(value);

  const record = toRecord(value);
  if (!record) return "";

  return (
    getString(record.text) ||
    getString(record.title) ||
    getString(record.label) ||
    getString(record.name) ||
    getString(record.value) ||
    getString(record.description)
  );
}

function getStringList(value: unknown): string[] {
  return toArray(value)
    .map((item) => getString(item))
    .filter((item) => item.length > 0);
}

function getFirstStringList(...values: unknown[]): string[] {
  for (const value of values) {
    const items = getStringList(value);
    if (items.length > 0) return items;
  }
  return [];
}

function getImageUrl(value: unknown): string {
  if (typeof value === "string") return resolveMediaUrl(value);
  if (Array.isArray(value)) return getImageUrl(value[0]);

  const record = toRecord(value);
  if (!record) return "";

  if (record.data) return getImageUrl(record.data);
  if (typeof record.url === "string") return resolveMediaUrl(record.url);

  const formats = toRecord(record.formats);
  if (formats) {
    return (
      getImageUrl(formats.large) ||
      getImageUrl(formats.medium) ||
      getImageUrl(formats.small) ||
      getImageUrl(formats.thumbnail)
    );
  }

  return "";
}

function mapWorkshopTypeToLevel(workshopType: string, locale: Locale): string {
  const normalized = workshopType.trim().toLowerCase();
  if (normalized.includes("advanced")) return locale === "ar" ? "المتقدمين" : "Advanced";
  if (normalized.includes("beginner")) return locale === "ar" ? "المبتدئين" : "Beginners";
  if (normalized.includes("open")) return locale === "ar" ? "ورشة مفتوحة" : "Open Workshop";
  return "";
}

function normalizeGroupWorkshop(
  value: unknown,
  index: number,
  locale: Locale,
): GroupWorkshopContent | null {
  const record = toRecord(value) as StrapiWorkshop | null;
  if (!record) return null;

  const workshopType = getString(record.workshopType);
  const normalizedWorkshopType = workshopType.trim().toLowerCase();
  if (normalizedWorkshopType.includes("private") || normalizedWorkshopType.includes("خاص")) {
    return null;
  }

  const title = getString(record.title);
  const description = getString(record.shortDescription);
  if (!title && !description) return null;

  return {
    level: mapWorkshopTypeToLevel(workshopType, locale),
    title,
    description,
    learns: getFirstStringList(record.whatYouWillLearnPoints),
    format: getString(record.formatDetails),
    dates: getString(record.datesDetails),
    image: getImageUrl(record.mainImage) || FALLBACK_IMAGES[index] || FALLBACK_IMAGES[0],
  };
}

function extractGroupWorkshops(
  payload: StrapiDocument,
  locale: Locale,
): GroupWorkshopContent[] {
  return toArray(payload.data)
    .map((item, index) => normalizeGroupWorkshop(item, index, locale))
    .filter((item): item is GroupWorkshopContent => item !== null);
}

export async function fetchGroupWorkshops(
  locale: Locale,
  signal?: AbortSignal,
): Promise<GroupWorkshopContent[]> {
  async function fetchLocale(targetLocale: Locale): Promise<GroupWorkshopContent[]> {
    if (signal?.aborted) {
      throw new DOMException("Workshop request aborted.", "AbortError");
    }

    const payload = await fetchFirstJson<StrapiDocument>(buildWorkshopCandidates(targetLocale), {
      ttlMs: apiCacheTtl.workshops,
    });

    if (signal?.aborted) {
      throw new DOMException("Workshop request aborted.", "AbortError");
    }

    return extractGroupWorkshops(payload, targetLocale);
  }

  const items = await fetchLocale(locale);
  if (items.length > 0) return items;
  if (locale === "en") return fetchLocale("ar");
  return items;
}

export function getCachedGroupWorkshops(locale: Locale): GroupWorkshopContent[] | null {
  const payload = readApiCache<StrapiDocument>(workshopsCacheKey(locale));
  if (!payload) return null;

  const items = extractGroupWorkshops(payload, locale);
  if (items.length > 0) return items;
  return null;
}

type UseGroupWorkshopsResult = {
  workshops: GroupWorkshopContent[];
  loading: boolean;
  error: string | null;
};

export function useGroupWorkshops(locale: Locale): UseGroupWorkshopsResult {
  const [workshops, setWorkshops] = useState<GroupWorkshopContent[]>(() =>
    getCachedGroupWorkshops(locale) ?? fallbackGroupWorkshops(locale),
  );
  const [loading, setLoading] = useState(() => !getCachedGroupWorkshops(locale));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cached = getCachedGroupWorkshops(locale);
    const fallback = fallbackGroupWorkshops(locale);

    if (cached) {
      setWorkshops(cached);
      setLoading(false);
      setError(null);
      return;
    }

    let active = true;
    setWorkshops(fallback);
    setLoading(true);
    setError(null);

    fetchGroupWorkshops(locale)
      .then((items) => {
        if (!active) return;
        if (items.length > 0) {
          setWorkshops(items);
        }
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        const message = err instanceof Error ? err.message : "Unable to load workshops.";
        console.error("[workshops] using fallback content:", message);
        if (!active) return;
        setError(message);
        setWorkshops(fallback);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [locale]);

  return { workshops, loading, error };
}
