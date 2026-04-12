import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import en from "./en";
import ar from "./ar";

export type Locale = "en" | "ar";
type TranslationMap = Record<string, string | string[]>;

function flatten(obj: Record<string, unknown>, prefix = ""): TranslationMap {
  const result: TranslationMap = {};
  for (const key of Object.keys(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];
    if (Array.isArray(value)) {
      result[path] = value as string[];
    } else if (typeof value === "object" && value !== null) {
      Object.assign(result, flatten(value as Record<string, unknown>, path));
    } else {
      result[path] = String(value);
    }
  }
  return result;
}

const flatEN = flatten(en as unknown as Record<string, unknown>);
const flatAR = flatten(ar as unknown as Record<string, unknown>);
const flatTranslations: Record<Locale, TranslationMap> = { en: flatEN, ar: flatAR };

interface LanguageContextValue {
  locale: Locale;
  dir: "ltr" | "rtl";
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  tArray: (key: string) => string[];
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "athr-locale";

function getInitialLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "ar" || stored === "en") return stored;
  } catch {}
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("lang", locale);
    html.setAttribute("dir", locale === "ar" ? "rtl" : "ltr");
  }, [locale]);

  const value = useMemo<LanguageContextValue>(() => {
    const dir = locale === "ar" ? "rtl" : "ltr";
    const flat = flatTranslations[locale];

    const t = (key: string): string => {
      const val = flat[key];
      if (typeof val === "string") return val;
      if (Array.isArray(val)) return val.join(", ");
      return key;
    };

    const tArray = (key: string): string[] => {
      const val = flat[key];
      if (Array.isArray(val)) return val;
      if (typeof val === "string") return [val];
      return [];
    };

    return { locale, dir, setLocale, t, tArray, isRTL: locale === "ar" };
  }, [locale, setLocale]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
