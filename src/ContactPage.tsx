import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { Send } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { WorksNavbar } from "./WorksPage";
import SharedFooter from "./SharedFooter";
import { useLanguage } from "./i18n/LanguageContext";

const fieldBase =
  "w-full bg-transparent border-0 border-b border-brand-surface-high py-4 px-0 text-lg font-serif text-brand-primary placeholder:text-brand-primary/30 focus:border-brand-secondary focus:outline-none transition-colors duration-300";

type ContactFormState = {
  name: string;
  email: string;
  interest: string;
  message: string;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getEmailJsConfig() {
  return {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim(),
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim(),
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim(),
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getSiteName() {
  if (typeof window === "undefined") return "Website";

  const hostname = window.location.hostname.replace(/^www\./, "");
  return hostname || "Website";
}

function buildEmailTemplateParams(
  data: ContactFormState,
  locale: string
) {
  const submittedAt = new Date();
  const submittedAtLabel = new Intl.DateTimeFormat(
    locale === "ar" ? "ar-EG" : "en-US",
    {
      dateStyle: "full",
      timeStyle: "short",
    }
  ).format(submittedAt);

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const pagePath = typeof window !== "undefined" ? window.location.pathname : "";
  const siteName = getSiteName();

  return {
    title: `New contact request from ${data.name}`,
    name: data.name,
    from_name: data.name,
    reply_to: data.email,
    from_email: data.email,
    email: data.email,
    interest: data.interest,
    message: data.message,
    message_html: escapeHtml(data.message).replace(/\n/g, "<br />"),
    time: submittedAtLabel,
    locale,
    submitted_at: submittedAtLabel,
    submitted_at_iso: submittedAt.toISOString(),
    page_url: pageUrl,
    page_path: pagePath,
    site_name: siteName,
    email_subject: `New contact request from ${data.name}`,
  };
}

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { t, tArray, isRTL, locale } = useLanguage();
  const translatedInterestOptions = tArray("contact.interestOptions");
  const contactInterestOptions =
    locale === "ar" && !translatedInterestOptions.includes("خدمة Planner")
      ? [...translatedInterestOptions.slice(0, 2), "خدمة Planner", ...translatedInterestOptions.slice(2)]
      : translatedInterestOptions;
  const defaultInterest = contactInterestOptions[0] ?? "";
  const [formData, setFormData] = useState<ContactFormState>({
    name: "",
    email: "",
    interest: defaultInterest,
    message: "",
  });
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const copy =
    locale === "ar"
      ? {
          sending: "جاري الإرسال...",
          success: "تم إرسال رسالتك بنجاح. سنعود إليك قريباً.",
          invalid: "يرجى تعبئة جميع الحقول وإدخال بريد إلكتروني صحيح.",
          error: "تعذر إرسال الرسالة حالياً. حاولي مرة أخرى بعد قليل.",
        }
      : {
          sending: "Sending...",
          success: "Your message has been sent successfully. We'll get back to you soon.",
          invalid: "Please complete all fields and enter a valid email address.",
          error: "Unable to send your message right now. Please try again shortly.",
        };

  const contactHeroTitleClass =
    locale === "ar"
      ? "font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tighter text-brand-dark mb-8"
      : "contact-hero-line font-serif text-5xl leading-[1.05] tracking-[-0.04em] text-brand-primary md:text-7xl lg:text-[5.5rem]";
  const contactHeroLineWrapClass =
    locale === "ar" ? "overflow-hidden py-2 -my-2" : "overflow-hidden";
  const contactHeroHighlightClass =
    locale === "ar"
      ? "text-brand-dark"
      : "font-light italic text-brand-secondary";
  const fieldLabelBaseClass =
    locale === "ar"
      ? "mb-2 block text-[0.9rem] font-semibold tracking-[0.08em] transition-colors duration-300"
      : "mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.28em] transition-colors duration-300";

  useEffect(() => {
    setFormData((current) => ({
      ...current,
      interest: contactInterestOptions.includes(current.interest)
        ? current.interest
        : defaultInterest,
    }));
  }, [locale, defaultInterest]);

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

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));

    if (submitState !== "idle") {
      setSubmitState("idle");
      setFeedbackMessage("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      interest: formData.interest.trim(),
      message: formData.message.trim(),
    };

    if (
      !trimmed.name ||
      !trimmed.email ||
      !trimmed.interest ||
      !trimmed.message ||
      !EMAIL_PATTERN.test(trimmed.email)
    ) {
      setSubmitState("error");
      setFeedbackMessage(copy.invalid);
      return;
    }

    setSubmitState("submitting");
    setFeedbackMessage(copy.sending);

    try {
      const { serviceId, templateId, publicKey } = getEmailJsConfig();

      if (!serviceId || !templateId || !publicKey) {
        throw new Error(
          locale === "ar"
            ? "خدمة الإرسال غير مهيأة بعد. أضف VITE_EMAILJS_SERVICE_ID و VITE_EMAILJS_TEMPLATE_ID و VITE_EMAILJS_PUBLIC_KEY."
            : "EmailJS is not configured yet. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY."
        );
      }

      await emailjs.send(
        serviceId,
        templateId,
        buildEmailTemplateParams(trimmed, locale),
        { publicKey }
      );

      setSubmitState("success");
      setFeedbackMessage(copy.success);
      setFormData({
        name: "",
        email: "",
        interest: defaultInterest,
        message: "",
      });
    } catch (error) {
      console.error("[contact] EmailJS send failed:", error);
      setSubmitState("error");
      setFeedbackMessage(
        error instanceof Error && error.message ? error.message : copy.error
      );
    }
  }

  const feedbackClass =
    submitState === "success"
      ? "text-emerald-700"
      : submitState === "error"
        ? "text-red-700"
        : "text-brand-primary/55";

  return (
    <div className="min-h-screen bg-brand-bg font-sans text-brand-dark antialiased">
      <WorksNavbar active="contact" />

      <section
        ref={heroRef}
        className="relative flex min-h-[85dvh] flex-col justify-end overflow-hidden pb-16 pt-32 md:pb-24"
      >
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-12">
          <div className="max-w-4xl">
            {locale === "ar" ? (
              <h1 className={contactHeroTitleClass}>
                <span className="contact-hero-line block">{t("contact.heroLine1")}</span>
                <span className="contact-hero-line block">
                  {t("contact.heroLine2")}{" "}
                  <span className={contactHeroHighlightClass}>
                    {t("contact.heroLine2Highlight")}
                  </span>
                </span>
              </h1>
            ) : (
              <>
                <div className={contactHeroLineWrapClass}>
                  <h1 className={contactHeroTitleClass}>{t("contact.heroLine1")}</h1>
                </div>
                <div className={contactHeroLineWrapClass}>
                  <h1 className={contactHeroTitleClass}>
                    {t("contact.heroLine2")}{" "}
                    <span className={contactHeroHighlightClass}>
                      {t("contact.heroLine2Highlight")}
                    </span>
                  </h1>
                </div>
              </>
            )}
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

                <form className="space-y-10" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
                    <div className="relative">
                      <label
                        htmlFor="contact-name"
                        className={`${fieldLabelBaseClass} ${focusedField === "name" ? "text-brand-secondary" : locale === "ar" ? "text-brand-dark" : "text-brand-primary/50"}`}
                      >
                        {t("contact.nameLabel")}
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        placeholder={t("contact.namePlaceholder")}
                        className={fieldBase}
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                    <div className="relative">
                      <label
                        htmlFor="contact-email"
                        className={`${fieldLabelBaseClass} ${focusedField === "email" ? "text-brand-secondary" : locale === "ar" ? "text-brand-dark" : "text-brand-primary/50"}`}
                      >
                        {t("contact.emailLabel")}
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        placeholder={t("contact.emailPlaceholder")}
                        className={`${fieldBase} ltr-content`}
                        dir="ltr"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-interest"
                      className={`${fieldLabelBaseClass} ${focusedField === "interest" ? "text-brand-secondary" : locale === "ar" ? "text-brand-dark" : "text-brand-primary/50"}`}
                    >
                      {t("contact.interestLabel")}
                    </label>
                    <select
                      id="contact-interest"
                      name="interest"
                      className={fieldBase}
                      value={formData.interest}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("interest")}
                      onBlur={() => setFocusedField(null)}
                    >
                      {contactInterestOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className={`${fieldLabelBaseClass} ${focusedField === "message" ? "text-brand-secondary" : locale === "ar" ? "text-brand-dark" : "text-brand-primary/50"}`}
                    >
                      {t("contact.messageLabel")}
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      placeholder={t("contact.messagePlaceholder")}
                      className={`${fieldBase} resize-none`}
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>

                  <div className="flex flex-col gap-4 pt-2 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-8">
                      <button
                        type="submit"
                        disabled={submitState === "submitting"}
                        className="group relative inline-flex items-center gap-3 overflow-hidden bg-brand-secondary px-10 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.98]"
                      >
                        <span className="relative z-10">
                          {submitState === "submitting" ? copy.sending : t("contact.sendButton")}
                        </span>
                        <span className={`relative z-10 ${isRTL ? "[transform:scaleX(-1)]" : ""}`}>
                          <Send className={`h-3.5 w-3.5 transition-transform duration-300 ${isRTL ? "group-hover:translate-x-0.5 group-hover:-translate-y-0.5" : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"}`} />
                        </span>
                      </button>
                      <span className="hidden text-xs text-brand-primary/40 md:block">
                        {t("contact.replyNote")}
                      </span>
                    </div>

                    <p
                      aria-live="polite"
                      className={`text-sm leading-relaxed ${feedbackClass} ${isRTL ? "md:text-right" : "md:text-left"}`}
                    >
                      {feedbackMessage}
                    </p>
                  </div>
                </form>
              </div>
            </div>

            <div ref={infoRef} className="lg:col-span-5 lg:h-full">
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
