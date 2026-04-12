import { useState, useRef } from "react";
import { Send } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { WorksNavbar } from "./WorksPage";
import SharedFooter from "./SharedFooter";
import { useLanguage } from "./i18n/LanguageContext";

const fieldBase =
  "w-full bg-transparent border-0 border-b border-brand-surface-high py-4 px-0 text-lg font-serif text-brand-primary placeholder:text-brand-primary/30 focus:border-brand-secondary focus:outline-none transition-colors duration-300";

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { t, isRTL, locale } = useLanguage();

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".contact-hero-line",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.12 }
      )
        .fromTo(
          ".contact-hero-sub",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          ".contact-scroll-cue",
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.3"
        );
    },
    { scope: heroRef }
  );

  useGSAP(
    () => {
      gsap.fromTo(
        ".contact-info-block",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: infoRef }
  );

  useGSAP(
    () => {
      gsap.fromTo(
        ".contact-form-inner",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: formRef }
  );

  const interestOptions = locale === "ar"
    ? ["مشروع تصميم مخصص", "ورشة عمل فنية", "صحافة وتعاون", "رسالة عامة"]
    : ["Bespoke Design Project", "Artistic Workshop", "Press & Collaboration", "General Message"];

  return (
    <div className="min-h-screen bg-brand-bg font-sans text-brand-dark antialiased">
      <WorksNavbar active="contact" />

      <section
        ref={heroRef}
        className="relative flex min-h-[85dvh] flex-col justify-end overflow-hidden pb-16 pt-32 md:pb-24"
      >
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-12">
          <div className="max-w-4xl">
            <div className="overflow-hidden">
              <h1 className="contact-hero-line font-serif text-5xl leading-[1.05] tracking-[-0.04em] text-brand-primary md:text-7xl lg:text-[5.5rem]">
                {t("contact.heroLine1")}
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1 className="contact-hero-line font-serif text-5xl leading-[1.05] tracking-[-0.04em] text-brand-primary md:text-7xl lg:text-[5.5rem]">
                {t("contact.heroLine2")}{" "}
                <span className="font-light italic text-brand-secondary">
                  {t("contact.heroLine2Highlight")}
                </span>
              </h1>
            </div>
            <p className="contact-hero-sub mt-8 max-w-xl text-lg leading-relaxed text-brand-primary/70 md:text-xl">
              {t("contact.heroSub")}
            </p>
          </div>

          <div className="contact-scroll-cue mt-16 flex items-center gap-3 text-brand-primary/40">
            <div className="h-12 w-px bg-brand-primary/20" />
            <span className="text-[0.6rem] uppercase tracking-[0.3em]">
              {t("contact.scrollCue")}
            </span>
          </div>
        </div>
      </section>

      <main className="pb-32">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-12 lg:items-stretch lg:gap-0">
            <div
              ref={formRef}
              id="contact-form"
              className="scroll-mt-32 lg:col-span-7"
            >
              <div className="contact-form-inner bg-brand-surface-low p-8 md:p-14 xl:p-20">
                <div className="mb-12">
                  <span className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-secondary">
                    {t("contact.formLabel")}
                  </span>
                  <h2 className="mt-4 font-serif text-3xl leading-tight text-brand-primary md:text-4xl">
                    {t("contact.formTitle")}
                  </h2>
                </div>

                <form
                  className="space-y-10"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
                    <div className="relative">
                      <label
                        htmlFor="contact-name"
                        className={`mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.28em] transition-colors duration-300 ${focusedField === "name" ? "text-brand-secondary" : "text-brand-primary/50"}`}
                      >
                        {t("contact.nameLabel")}
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder={t("contact.namePlaceholder")}
                        className={fieldBase}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                    <div className="relative">
                      <label
                        htmlFor="contact-email"
                        className={`mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.28em] transition-colors duration-300 ${focusedField === "email" ? "text-brand-secondary" : "text-brand-primary/50"}`}
                      >
                        {t("contact.emailLabel")}
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder={t("contact.emailPlaceholder")}
                        className={`${fieldBase} ltr-content`}
                        dir="ltr"
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-interest"
                      className={`mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.28em] transition-colors duration-300 ${focusedField === "interest" ? "text-brand-secondary" : "text-brand-primary/50"}`}
                    >
                      {t("contact.interestLabel")}
                    </label>
                    <select
                      id="contact-interest"
                      className={fieldBase}
                      defaultValue={interestOptions[0]}
                      onFocus={() => setFocusedField("interest")}
                      onBlur={() => setFocusedField(null)}
                    >
                      {interestOptions.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className={`mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.28em] transition-colors duration-300 ${focusedField === "message" ? "text-brand-secondary" : "text-brand-primary/50"}`}
                    >
                      {t("contact.messageLabel")}
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      placeholder={t("contact.messagePlaceholder")}
                      className={`${fieldBase} resize-none`}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>

                  <div className="flex items-center gap-8 pt-2">
                    <button
                      type="submit"
                      className="group relative inline-flex items-center gap-3 overflow-hidden bg-brand-secondary px-10 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-brand-dark active:scale-[0.98]"
                    >
                      <span className="relative z-10">{t("contact.sendButton")}</span>
                      <Send className={`relative z-10 h-3.5 w-3.5 transition-transform duration-300 ${isRTL ? "rotate-180 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"}`} />
                    </button>
                    <span className="hidden text-xs text-brand-primary/40 md:block">
                      {t("contact.replyNote")}
                    </span>
                  </div>
                </form>
              </div>
            </div>

            <div
              ref={infoRef}
              className="lg:col-span-5 lg:h-full"
            >
              <div className="contact-info-block h-[24rem] md:h-[34rem] lg:h-full">
                <img
                  src="/unnamed%20(3).png"
                  alt="Minimalist interior studio"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <SharedFooter />
    </div>
  );
}
