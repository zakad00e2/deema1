import { Instagram, Linkedin } from "lucide-react";
import { useLanguage } from "./i18n/LanguageContext";

export default function SharedFooter() {
  const { t, isRTL } = useLanguage();

  const addressLines = t("footer.address").split("\n");

  return (
    <footer id="contact" className="border-t border-white/8 bg-brand-dark py-24">
      <div className="mx-auto grid max-w-360 gap-12 px-6 md:px-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.45fr)]">
        <div className="max-w-sm">
          <a href="/" aria-label="Go to home page" className="inline-block">
            <img src="/logo.png" alt="Athr Logo" className="mb-6 h-12 md:h-16" />
          </a>
          <p className="mb-8 text-sm font-light leading-relaxed text-white/62">
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
            <p className="text-[0.6rem] font-bold uppercase tracking-widest text-brand-secondary">{t("footer.explore")}</p>
            <a href="/" className="text-xs uppercase tracking-widest text-white/62 transition-colors hover:text-brand-secondary">
              {t("nav.home")}
            </a>
            <a href="/work" className="text-xs uppercase tracking-widest text-white/62 transition-colors hover:text-brand-secondary">
              {t("nav.portfolio")}
            </a>
            <a href="/workshops" className="text-xs uppercase tracking-widest text-white/62 transition-colors hover:text-brand-secondary">
              {t("nav.workshops")}
            </a>
            <a href="/contact" className="text-xs uppercase tracking-widest text-white/62 transition-colors hover:text-brand-secondary">
              {t("nav.contact")}
            </a>
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-[0.6rem] font-bold uppercase tracking-widest text-brand-secondary">{t("footer.contactLabel")}</p>
            <div className="flex flex-col gap-2">
              <a href="mailto:hello@athr.studio" className="ltr-content text-xs tracking-widest text-white/62 transition-colors hover:text-brand-secondary">
                hello@athr.studio
              </a>
              <a href="tel:+97143411367" className="ltr-content text-xs tracking-widest text-white/62 transition-colors hover:text-brand-secondary">
                +971 (0) 4 341 1367
              </a>
            </div>
            <p className="text-xs leading-relaxed tracking-widest text-white/62">
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

      <div className="mx-auto mt-24 flex max-w-360 justify-between px-6 text-[0.5rem] uppercase tracking-[0.4em] text-white/28 md:px-12">
        <p>{t("footer.copyright")}</p>
        <p>{t("footer.designedWith")}</p>
      </div>
    </footer>
  );
}
