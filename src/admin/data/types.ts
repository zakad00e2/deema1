// Bilingual string helper
export interface BilingualString {
  en: string;
  ar: string;
}

export interface BilingualStringArray {
  en: string[];
  ar: string[];
}

// ─── Portfolio ────────────────────────────────────────────────────────────────

export type ProjectCategory = "executed" | "reimagined" | "conceptual";
export type PublishStatus = "published" | "draft";

export interface PortfolioMetric {
  label: BilingualString;
  value: string;
}

export interface PortfolioItem {
  id: string;
  slug: string;
  title: BilingualString;
  shortDescription: BilingualString;
  heroTitle: BilingualString;
  heroIntro: BilingualString;
  campaignOverview: BilingualString;
  preEventMarketing: BilingualStringArray;
  launchEventExperience: BilingualStringArray;
  postEventMarketing: BilingualStringArray;
  campaignImpact: BilingualStringArray;
  coverImage: string;           // base64 or URL
  desktopImage: string;         // base64 or URL (optional)
  preEventImages: string[];     // base64 or URLs
  postEventImages: string[];    // base64 or URLs
  gallery: string[];            // base64 or URLs
  category: ProjectCategory;
  client: BilingualString;
  year: string;
  location: BilingualString;
  services: BilingualStringArray;
  metrics: PortfolioMetric[];
  technologies: string[];       // optional tech/tools tags
  externalLink: string;
  featured: boolean;
  status: PublishStatus;
  sortOrder: number;
  nextProjectSlug: string;
  // Display overrides (aspect ratios inherited from original workData)
  aspectClass: string;
  spanClass: string;
  badgeClassName: string;
  grayscale: boolean;
  notes: BilingualStringArray;
  createdAt: string;
  updatedAt: string;
}

// ─── Workshops ────────────────────────────────────────────────────────────────

export type WorkshopType =
  | "private"
  | "group"
  | "beginner"
  | "advanced"
  | "custom";

export interface WorkshopItem {
  id: string;
  slug: string;
  title: BilingualString;
  shortSummary: BilingualString;
  fullDescription: BilingualString;
  coverImage: string;           // base64 or URL
  workshopType: WorkshopType;
  duration: BilingualString;
  format: BilingualString;
  whatYoullLearn: BilingualStringArray;
  dates: BilingualString;
  ctaText: BilingualString;
  ctaLink: string;
  level: BilingualString;       // beginner / advanced label
  featured: boolean;
  status: PublishStatus;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface AdminSession {
  authenticated: boolean;
  expiresAt: number;
}
