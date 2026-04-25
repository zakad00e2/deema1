import { Instagram, Linkedin } from "lucide-react";
import { useLanguage } from "./i18n/LanguageContext";
import { getBrandLogoWhiteSrc } from "./brandLogo";

export default function SharedFooter() {
  const { t, isRTL, locale } = useLanguage();
  const brandLogoSrc = getBrandLogoWhiteSrc(locale);

  const addressLines = t("footer.address").split("\n");

  return (
    <footer id="contact" className="border-t border-white/8 bg-brand-dark pt-24 pb-8">
      <div className="mx-auto grid max-w-360 gap-12 px-6 md:px-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.45fr)]">
        <div className="max-w-sm">
          <a href="/" aria-label="Go to home page" className="inline-block">
            <img
              src={brandLogoSrc}
              alt="Athr Logo"
              className="mb-1 h-20 w-auto object-contain opacity-95 md:h-24"
              loading="lazy"
              decoding="async"
              width={1080}
              height={1080}
            />
          </a>
          <p className={`mb-8 font-light leading-relaxed text-white/62 ${isRTL ? "text-[0.95rem]" : "text-sm"}`}>
            {t("footer.tagline")}
          </p>
          <div className="flex gap-6">
            <a href="/" className="text-white/45 transition-colors hover:text-brand-secondary" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="/" className="text-white/45 transition-colors hover:text-brand-secondary" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className={`grid gap-10 sm:grid-cols-2 ${isRTL ? "sm:pr-8 lg:pr-10" : "sm:pl-8 lg:pl-10"}`}>
          <div className="flex flex-col gap-4">
            <p className={`font-bold uppercase tracking-widest text-brand-secondary ${isRTL ? "text-[0.68rem]" : "text-[0.6rem]"}`}>{t("footer.explore")}</p>
            <a href="/" className={`uppercase tracking-widest text-white/62 transition-colors hover:text-brand-secondary ${isRTL ? "text-[0.85rem]" : "text-xs"}`}>
              {t("nav.home")}
            </a>
            <a href="/work" className={`uppercase tracking-widest text-white/62 transition-colors hover:text-brand-secondary ${isRTL ? "text-[0.85rem]" : "text-xs"}`}>
              {t("nav.portfolio")}
            </a>
            <a href="/workshops" className={`uppercase tracking-widest text-white/62 transition-colors hover:text-brand-secondary ${isRTL ? "text-[0.85rem]" : "text-xs"}`}>
              {t("nav.workshops")}
            </a>
            <a href="/contact" className={`uppercase tracking-widest text-white/62 transition-colors hover:text-brand-secondary ${isRTL ? "text-[0.85rem]" : "text-xs"}`}>
              {t("nav.contact")}
            </a>
          </div>

          <div className="flex flex-col gap-6">
            <p className={`font-bold uppercase tracking-widest text-brand-secondary ${isRTL ? "text-[0.68rem]" : "text-[0.6rem]"}`}>{t("footer.contactLabel")}</p>
            <div className={`flex w-full flex-col gap-2 ${isRTL ? "items-end" : "items-start"}`}>
              <a
                href="mailto:Leaveanathr@gmail.com"
                className={`ltr-content block w-full tracking-widest text-white/62 transition-colors hover:text-brand-secondary ${
                  isRTL ? "text-[0.85rem]" : "text-xs"
                } ${
                  isRTL ? "ltr-content-rtl-start text-right" : "text-left"
                }`}
              >
                Leaveanathr@gmail.com
              </a>
              <a
                href="tel:+97143411367"
                className={`ltr-content block w-full tracking-widest text-white/62 transition-colors hover:text-brand-secondary ${
                  isRTL ? "text-[0.85rem]" : "text-xs"
                } ${
                  isRTL ? "ltr-content-rtl-start text-right" : "text-left"
                }`}
              >
                +971 (0) 4 341 1367
              </a>
            </div>
            <p className={`leading-relaxed tracking-widest text-white/62 ${isRTL ? "text-[0.85rem]" : "text-xs"}`}>
              {addressLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < addressLines.length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-24 w-full border-t border-white/5" />
      <div className="mx-auto mt-8 max-w-360 px-6 md:px-12">
        <div className="flex justify-center text-center text-[0.62rem] uppercase tracking-[0.35em] text-white/28 md:text-[0.72rem]">
          <p className={isRTL ? "text-[0.78rem] md:text-[0.88rem]" : undefined}>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
