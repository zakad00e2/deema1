import type { Locale } from "./i18n/LanguageContext";

export function getBrandLogoSrc(locale: Locale) {
  return locale === "ar" ? "/logo-ar.png" : "/logo.png";
}
