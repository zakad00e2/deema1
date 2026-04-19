export type ProjectCategory = "executed" | "reimagined" | "conceptual";
export type FilterValue = "all" | ProjectCategory;

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  location: string;
  client: string;
  description: string;
  image: string;
  desktopImage?: string;
  aspectClass: string;
  spanClass: string;
  badgeClassName?: string;
  notes?: string[];
  grayscale?: boolean;
  heroTitle: string;
  heroIntro: string;
  campaignOverview: string;
  preEventMarketing: string[];
  launchEventExperience: string[];
  postEventMarketing: string[];
  campaignImpact: string[];
  preEventImages: string[];
  postEventImages: string[];
  services: string[];
  metrics: Array<{ label: string; value: string }>;
  gallery: string[];
  nextProjectSlug: string;
};

export type JournalEntry = {
  title: string;
  date: string;
  description: string;
  image: string;
};

export const filters: Array<{ label: string; value: FilterValue }> = [
  { label: "All Projects", value: "all" },
  { label: "Executed", value: "executed" },
  { label: "Reimagined", value: "reimagined" },
  { label: "Conceptual", value: "conceptual" },
];

export const categoryLabel: Record<ProjectCategory, string> = {
  executed: "Executed",
  reimagined: "Reimagined",
  conceptual: "Conceptual",
};
