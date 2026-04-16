import type {
  BilingualString,
  BilingualStringArray,
  WorkshopItem,
} from "./admin/data/types";
import { workshopService } from "./admin/data/workshopService";

type Locale = "en" | "ar";

export interface PublicWorkshopContent {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  level: string;
  format: string;
  dates: string;
  learns: string[];
  ctaText: string;
  ctaLink: string;
}

function getLocalizedText(value: BilingualString, locale: Locale): string {
  return value[locale];
}

function getLocalizedList(
  value: BilingualStringArray,
  locale: Locale
): string[] {
  return value[locale];
}

function mapWorkshopItem(
  item: WorkshopItem,
  locale: Locale
): PublicWorkshopContent {
  return {
    id: item.id,
    slug: item.slug,
    title: getLocalizedText(item.title, locale),
    summary: getLocalizedText(item.shortSummary, locale),
    description: getLocalizedText(item.fullDescription, locale),
    image: item.coverImage,
    level: getLocalizedText(item.level, locale),
    format: getLocalizedText(item.format, locale),
    dates: getLocalizedText(item.dates, locale),
    learns: getLocalizedList(item.whatYoullLearn, locale),
    ctaText: getLocalizedText(item.ctaText, locale),
    ctaLink: item.ctaLink,
  };
}

export function getFeaturedWorkshopContent(
  locale: Locale
): PublicWorkshopContent | undefined {
  const featuredWorkshop =
    workshopService.getFeatured() ?? workshopService.getPublished()[0];

  return featuredWorkshop ? mapWorkshopItem(featuredWorkshop, locale) : undefined;
}

export function getGroupWorkshopsContent(
  locale: Locale
): PublicWorkshopContent[] {
  return workshopService
    .getGroupPublished()
    .map((item) => mapWorkshopItem(item, locale));
}
