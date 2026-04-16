import type { Locale } from "./i18n/LanguageContext";

export function getBrandLogoSrc(locale: Locale) {
  return locale === "ar" ? "/logo-ar.png" : "/logo.png";
}

export function getBrandLogoWhiteSrc(locale: Locale) {
  return locale === "ar"
    ? "/logo tran arb white (1).png"
    : "/logo transparent white (1).png";
}

export function getBrandLogoGreySrc(locale: Locale) {
  return locale === "ar"
    ? "/logo tran arb grey (1).png"
    : "/logo transparent grey.png";
}
