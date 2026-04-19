export type CategoryKey = "executed" | "reimagined" | "conceptual";
export type CategoryLocale = "en" | "ar";

const CATEGORY_LABELS: Record<CategoryLocale, Record<CategoryKey, string>> = {
  en: {
    executed: "Executed",
    reimagined: "Reimagined",
    conceptual: "Conceptual",
  },
  ar: {
    executed: "منفّذة",
    reimagined: "مُعاد تصوّرها",
    conceptual: "مفاهيمية",
  },
};

export function getCategoryLabel(
  category: CategoryKey,
  locale: string | null | undefined,
): string {
  const lang: CategoryLocale = locale === "ar" ? "ar" : "en";
  return CATEGORY_LABELS[lang][category];
}

export function getCurrentSiteLocale(): CategoryLocale {
  try {
    const stored = window.localStorage.getItem("athr-locale");
    if (stored === "ar" || stored === "en") return stored;
  } catch {}

  const htmlLang = document.documentElement.lang;
  return htmlLang === "ar" ? "ar" : "en";
}
