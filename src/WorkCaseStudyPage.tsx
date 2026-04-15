import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SharedFooter from "./SharedFooter";
import { WorksNavbar } from "./WorksPage";
import { getProjectBySlug, getManagedProjects } from "./workData";
import { useLanguage } from "./i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

function ImageCarousel({ images, label }: { images: string[]; label: string }) {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<number | null>(null);
  const { isRTL } = useLanguage();
  const PrevArrow = isRTL ? ArrowRight : ArrowLeft;
  const NextArrow = isRTL ? ArrowLeft : ArrowRight;
  const total = images.length;

  if (!total) return null;

  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.targetTouches[0].clientX;
    if (trackRef.current) {
      trackRef.current.style.transition = 'none';
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartRef.current === null || !trackRef.current) return;
    const currentTouch = e.targetTouches[0].clientX;
    const diff = currentTouch - touchStartRef.current;
    trackRef.current.style.transform = `translateX(calc(-${current * 100}% + ${diff}px))`;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current === null || !trackRef.current) return;
    const currentTouch = e.changedTouches[0].clientX;
    const diff = currentTouch - touchStartRef.current;
    
    trackRef.current.style.transition = 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
    trackRef.current.style.transform = '';

    if (diff < -minSwipeDistance) {
      setCurrent((p) => Math.min(p + 1, total - 1));
    } else if (diff > minSwipeDistance) {
      setCurrent((p) => Math.max(p - 1, 0));
    }

    touchStartRef.current = null;
  };

  return (
    <div
      className="relative group/carousel touch-pan-y select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      <div className="overflow-visible">
        <div
          ref={trackRef}
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((src, i) => (
            <div key={i} className={`w-full shrink-0 ${isRTL ? "pl-4 sm:pl-6" : "pr-4 sm:pr-6"}`}>
              <div className="aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <img
                  src={src}
                  alt={`${label} ${i + 1}`}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {total > 1 && (
        <>
          <button
            onClick={() => setCurrent((p) => Math.max(p - 1, 0))}
            className={`absolute ${isRTL ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-110 ${
              current === 0 ? "opacity-0 pointer-events-none" : "opacity-0 md:group-hover/carousel:opacity-100"
            }`}
            aria-label="Previous image"
          >
            <PrevArrow className="h-5 w-5 text-brand-dark" strokeWidth={1.5} />
          </button>
          <button
            onClick={() => setCurrent((p) => Math.min(p + 1, total - 1))}
            className={`absolute ${isRTL ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-110 ${
              current === total - 1 ? "opacity-0 pointer-events-none" : "opacity-0 md:group-hover/carousel:opacity-100"
            }`}
            aria-label="Next image"
          >
            <NextArrow className="h-5 w-5 text-brand-dark" strokeWidth={1.5} />
          </button>
        </>
      )}

      <div className="mt-5 flex items-center justify-center px-1">
        <div className="flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === current
                  ? "w-8 bg-brand-secondary"
                  : "w-1.5 bg-brand-surface-high hover:bg-brand-secondary/40"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function WorkCaseStudyPage({ slug }: { slug: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, isRTL, locale } = useLanguage();
  const project = getProjectBySlug(slug);
  const NavArrow = isRTL ? ArrowRight : ArrowLeft;
  const NextArrow = isRTL ? ArrowLeft : ArrowRight;

  const tp = (field: string) => t(`projects.${slug}.${field}`);
  const tpWithFallback = (field: string, fallback: string) => {
    const val = t(`projects.${slug}.${field}`);
    return val === `projects.${slug}.${field}` ? fallback : val;
  };
  const tpArray = (field: string): string[] => {
    const val = t(`projects.${slug}.${field}`);
    if (val === `projects.${slug}.${field}`) return [];
    return val.split(", ");
  };
  const projectClient = tpWithFallback("client", project?.client ?? "");
  const projectLocation = tpWithFallback("location", project?.location ?? "");

  useGSAP(() => {
    if (!project) return;

    gsap.fromTo(
      ".hero-element",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.8, stagger: 0.1, ease: "expo.out", delay: 0.1 }
    );

    gsap.fromTo(
      ".hero-image",
      { y: 80, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 2, ease: "expo.out", delay: 0.2 }
    );
    gsap.fromTo(
      ".hero-image img",
      { scale: 1.3 },
      { scale: 1, duration: 2.2, ease: "expo.out", delay: 0.2 }
    );

    const sections = gsap.utils.toArray(".scroll-section");
    sections.forEach((section: any) => {
      gsap.fromTo(
        section,
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.8,
          ease: "expo.out",
          scrollTrigger: { trigger: section, start: "top 85%" },
        }
      );
    });

    [
      {
        section: ".pre-event-section",
        heading: ".pre-event-heading > *",
        items: ".pre-event-item",
        carousel: ".pre-event-carousel",
      },
      {
        section: ".post-event-section",
        heading: ".post-event-heading > *",
        items: ".post-event-item",
        carousel: ".post-event-carousel",
      },
    ].forEach(({ section, heading, items, carousel }) => {
      gsap.fromTo(
        heading,
        { y: 44, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: { trigger: section, start: "top 76%" },
        }
      );

      gsap.utils.toArray<HTMLElement>(items).forEach((item) => {
        const bullet = item.querySelector(".marketing-item-bullet");
        const copy = item.querySelector(".marketing-item-copy");

        gsap.set(item, { opacity: 0.35 });
        if (bullet) gsap.set(bullet, { scale: 0.35, opacity: 0.3 });
        if (copy) gsap.set(copy, { y: 28, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: item, start: "top 86%", end: "top 60%", scrub: 0.65 },
        });

        tl.to(item, { opacity: 1, ease: "none" }, 0)
          .to(bullet, { scale: 1, opacity: 1, ease: "power2.out" }, 0)
          .to(copy, { y: 0, opacity: 1, ease: "power2.out" }, 0.02);
      });

      gsap.fromTo(
        carousel,
        { x: isRTL ? -80 : 80, y: 32, opacity: 0, scale: 0.96 },
        {
          x: 0, y: 0, opacity: 1, scale: 1, duration: 1.4, ease: "expo.out",
          scrollTrigger: { trigger: carousel, start: "top 82%" },
        }
      );
    });

    const launchSteps = gsap.utils.toArray<HTMLElement>(".launch-step");
    launchSteps.forEach((step) => {
      const content = step.querySelector(".launch-step-copy");
      const number = step.querySelector(".launch-step-number");
      const dot = step.querySelector(".launch-step-dot");
      const dotFill = step.querySelector(".launch-step-dot-fill");
      const lineFill = step.querySelector(".launch-step-line-fill");

      gsap.set(step, { opacity: 0.3 });
      if (content) gsap.set(content, { y: 36, opacity: 0 });
      if (number) gsap.set(number, { y: 18, opacity: 0.35 });
      if (dot) gsap.set(dot, { scale: 0.72 });
      if (dotFill) gsap.set(dotFill, { scale: 0, transformOrigin: "center center" });
      if (lineFill) gsap.set(lineFill, { scaleY: 0, transformOrigin: "top center" });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: step, start: "top 78%", end: "top 46%", scrub: 0.7 },
      });

      tl.to(step, { opacity: 1, ease: "none" }, 0)
        .to(content, { y: 0, opacity: 1, ease: "power2.out" }, 0)
        .to(number, { y: 0, opacity: 1, ease: "power2.out" }, 0.02)
        .to(dot, { scale: 1, ease: "back.out(1.8)" }, 0.04)
        .to(dotFill, { scale: 1, ease: "power2.out" }, 0.08);

      if (lineFill) {
        tl.to(lineFill, { scaleY: 1, ease: "none" }, 0.12);
      }
    });

    gsap.fromTo(
      ".campaign-impact-heading > *",
      { y: 48, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1.2, stagger: 0.12, ease: "expo.out",
        scrollTrigger: { trigger: ".campaign-impact-section", start: "top 72%" },
      }
    );

    const impactCards = gsap.utils.toArray<HTMLElement>(".impact-card");
    impactCards.forEach((card) => {
      const line = card.querySelector(".impact-card-line");
      const number = card.querySelector(".impact-card-index");
      const copy = card.querySelector(".impact-card-copy");

      gsap.set(card, { opacity: 0, x: isRTL ? 40 : -40 });
      if (number) gsap.set(number, { opacity: 0, x: isRTL ? 20 : -20 });
      if (line) gsap.set(line, { scaleY: 0, transformOrigin: "top center" });
      if (copy) gsap.set(copy, { opacity: 0, x: isRTL ? -30 : 30 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: card, start: "top 85%", end: "top 60%", scrub: 0.6 },
      });

      tl.to(card, { opacity: 1, x: 0, ease: "power2.out" }, 0)
        .to(number, { opacity: 1, x: 0, ease: "power2.out" }, 0.03)
        .to(line, { scaleY: 1, ease: "power2.out" }, 0.05)
        .to(copy, { opacity: 1, x: 0, ease: "power2.out" }, 0.08);
    });
  }, { scope: containerRef, dependencies: [project] });

  if (!project) {
    return (
      <div className="min-h-screen bg-brand-bg text-brand-dark">
        <WorksNavbar active="work" />
        <main className="mx-auto max-w-275 px-6 pb-24 pt-40 md:px-12">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-secondary">{t("caseStudyPage.notFoundLabel")}</p>
          <h1 className="mt-6 font-serif text-5xl md:text-7xl">{t("caseStudyPage.notFoundTitle")}</h1>
          <a
            href="/work"
            className="mt-10 inline-flex items-center gap-3 text-sm uppercase tracking-[0.22em] text-brand-secondary"
          >
            <NavArrow className="h-4 w-4" />
            {t("caseStudyPage.backToWorkShort")}
          </a>
        </main>
        <SharedFooter />
      </div>
    );
  }

  const nextProject = getProjectBySlug(project.nextProjectSlug) ?? getManagedProjects()[0];

  const projectTitle = tp("title");
  const projectHeroTitle = tp("heroTitle");
  const categoryLabelText = t(`works.categoryLabels.${project.category}`);

  const preEventMarketing = locale === "ar" ? (tpArray("preEventMarketing").length > 1 ? tpArray("preEventMarketing") : project.preEventMarketing) : project.preEventMarketing;
  const postEventMarketing = locale === "ar" ? (tpArray("postEventMarketing").length > 1 ? tpArray("postEventMarketing") : project.postEventMarketing) : project.postEventMarketing;
  const launchEventExperience = locale === "ar" ? (tpArray("launchEventExperience").length > 1 ? tpArray("launchEventExperience") : project.launchEventExperience) : project.launchEventExperience;
  const campaignImpact = locale === "ar" ? (tpArray("campaignImpact").length > 1 ? tpArray("campaignImpact") : project.campaignImpact) : project.campaignImpact;
  const services = locale === "ar" ? (tpArray("services").length > 1 ? tpArray("services") : project.services) : project.services;

  const visibleServices = services.slice(0, 3);

  const nextProjectTitle = t(`projects.${nextProject.slug}.title`);
  const nextProjectDesc = t(`projects.${nextProject.slug}.description`);

  return (
    <div ref={containerRef} className="min-h-screen bg-brand-bg text-brand-dark antialiased">
      <WorksNavbar active="work" />

      <main className="pb-24 pt-28 md:pt-32">
        {/* Hero */}
        <section className="px-6 pt-10 md:px-12">
          <div className="mx-auto max-w-400">
            <a
              href="/work"
              className="hero-element inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-brand-secondary"
            >
              <NavArrow className="h-4 w-4" />
              {t("caseStudyPage.backToWork")}
            </a>

            <div className="mt-8 flex flex-col gap-5">
              <p className="hero-element text-sm uppercase tracking-[0.3em] text-brand-secondary">
                {categoryLabelText} / {project.year}
              </p>
              <h1 className="hero-element max-w-5xl font-serif text-4xl leading-[0.95] tracking-[-0.04em] text-brand-dark md:text-5xl lg:text-6xl">
                {projectTitle}
              </h1>
              {projectHeroTitle && projectHeroTitle !== `projects.${slug}.heroTitle` && (
                <p className="hero-element max-w-2xl text-base md:text-lg text-brand-primary/80 font-light mt-2">
                  {projectHeroTitle}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="mt-12 px-6 md:px-12">
          <div className="hero-image mx-auto max-w-400 overflow-hidden bg-brand-surface-low editorial-shadow relative aspect-[4/3] sm:aspect-[16/11] md:aspect-[16/8] lg:aspect-[16/7]">
            <img
              src={project.desktopImage || project.image}
              alt={projectTitle}
              className={`h-full w-full object-cover ${project.desktopImage ? "hidden md:block" : ""}`}
              referrerPolicy="no-referrer"
            />
            {project.desktopImage && (
              <img
                src={project.image}
                alt={projectTitle}
                className="h-full w-full object-cover md:hidden absolute inset-0"
                referrerPolicy="no-referrer"
              />
            )}
            <div className="absolute inset-x-0 bottom-0 hidden h-2/3 bg-gradient-to-t from-brand-dark/82 via-brand-dark/30 to-transparent lg:block" />
            <div className="absolute inset-x-0 bottom-0 z-10 hidden p-4 sm:p-6 md:p-8 lg:block">
              <div className="flex flex-wrap items-start gap-x-6 gap-y-4 rounded-2xl border border-white/12 bg-black/12 p-4 text-white backdrop-blur-md sm:gap-x-8 md:p-6 lg:flex-nowrap lg:items-center">
                <div>
                  <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-white/60">{t("caseStudyPage.clientLabel")}</p>
                  <p className="font-serif text-base text-white sm:text-lg">{projectClient}</p>
                </div>
                <div className="hidden h-10 w-px bg-white/15 sm:block" />
                <div>
                  <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-white/60">{t("caseStudyPage.locationLabel")}</p>
                  <p className="font-serif text-base text-white sm:text-lg">{projectLocation}</p>
                </div>
                <div className="hidden h-10 w-px bg-white/15 lg:block" />
                <div className="max-w-2xl lg:flex lg:flex-1 lg:flex-col lg:items-start lg:gap-3 lg:max-w-none">
                  <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-white/60 lg:mb-0">{t("caseStudyPage.servicesLabel")}</p>
                  <div className="flex w-full flex-wrap items-center gap-x-5 gap-y-2 lg:flex-nowrap">
                    {visibleServices.map((service, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="h-px w-3 bg-white/24" />
                        <span className={`${locale === "ar" ? "text-[11px] tracking-[0.1em] xl:text-xs" : "text-[10px] tracking-[0.14em] xl:text-[11px]"} uppercase text-white/90`}>
                          {service}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile meta */}
        <section className="scroll-section px-6 py-14 md:px-12 md:py-20 lg:hidden">
          <div className="mx-auto max-w-400">
            <div className="flex flex-wrap items-center gap-x-10 gap-y-4 border-b border-brand-surface-high pb-10">
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-brand-secondary/60">{t("caseStudyPage.clientLabel")}</p>
                <p className="font-serif text-lg text-brand-dark">{projectClient}</p>
              </div>
              <div className="hidden h-8 w-px bg-brand-surface-high sm:block" />
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-brand-secondary/60">{t("caseStudyPage.locationLabel")}</p>
                <p className="font-serif text-lg text-brand-dark">{projectLocation}</p>
              </div>
              <div className="hidden h-8 w-px bg-brand-surface-high sm:block" />
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-brand-secondary/60">{t("caseStudyPage.servicesLabel")}</p>
                <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
                  {services.map((service, i) => (
                    <span key={i} className={`whitespace-nowrap bg-brand-surface-high/30 text-brand-dark/80 uppercase ${locale === "ar" ? "px-2.5 py-1 text-[10px] tracking-[0.11em] md:text-[11px]" : "px-2 py-0.5 text-[9px] tracking-[0.15em] md:text-[10px]"}`}>
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pre-Event Marketing */}
        <section className="scroll-section pre-event-section px-6 pb-16 lg:pt-20 md:px-12 md:pb-24">
          <div className="mx-auto max-w-400">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 items-start">
              <div>
                <div className="pre-event-heading mb-8 flex items-center gap-4">
                  <span className="h-px w-10 bg-brand-secondary/40" />
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-brand-dark tracking-tight">
                    {t("caseStudyPage.preEventMarketing")}
                  </h3>
                </div>
                <div className="flex flex-col gap-3">
                  {preEventMarketing.map((item, idx) => (
                    <div key={idx} className="pre-event-item flex items-start gap-3">
                      <span className={`marketing-item-bullet mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-secondary/50`} />
                      <p className="marketing-item-copy text-sm md:text-base font-light leading-relaxed text-brand-primary/80">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pre-event-carousel max-w-full overflow-hidden">
                <ImageCarousel images={project.preEventImages} label={t("caseStudyPage.preEventMarketing")} />
              </div>
            </div>
          </div>
        </section>

        {/* Post-Event Marketing */}
        <section className="scroll-section post-event-section px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-400">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 items-start">
              <div>
                <div className="post-event-heading mb-8 flex items-center gap-4">
                  <span className="h-px w-10 bg-brand-secondary/40" />
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-brand-dark tracking-tight">
                    {t("caseStudyPage.postEventMarketing")}
                  </h3>
                </div>
                <div className="flex flex-col gap-3">
                  {postEventMarketing.map((item, idx) => (
                    <div key={idx} className="post-event-item flex items-start gap-3">
                      <span className="marketing-item-bullet mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-secondary/50" />
                      <p className="marketing-item-copy text-sm md:text-base font-light leading-relaxed text-brand-primary/80">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="post-event-carousel max-w-full overflow-hidden">
                <ImageCarousel images={project.postEventImages} label={t("caseStudyPage.postEventMarketing")} />
              </div>
            </div>
          </div>
        </section>

        {/* Launch Event Experience */}
        <section className="scroll-section launch-experience-section px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-400">
            <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_1fr] gap-12 lg:gap-24 items-start">
              <div className="lg:sticky lg:top-40">
                <p className="text-[11px] uppercase tracking-[0.3em] text-brand-secondary mb-5">{t("caseStudyPage.theExperience")}</p>
                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-dark tracking-tight leading-[1.1]">
                  {t("caseStudyPage.launchEventExperience").split("\n").map((line, i) => (
                    <span key={i}>{line}{i === 0 && <br />}</span>
                  ))}
                </h3>
                <div className="mt-8 h-px w-16 bg-brand-secondary/50" />
                <p className="mt-6 text-sm font-light leading-relaxed text-brand-primary/60 max-w-xs">
                  {t("caseStudyPage.experienceDesc")}
                </p>
              </div>

              <div className="flex flex-col">
                {launchEventExperience.map((item, idx) => {
                  const isLast = idx === launchEventExperience.length - 1;
                  return (
                    <div key={idx} className="launch-step group flex gap-6 md:gap-8">
                      <div className="flex flex-col items-center shrink-0">
                        <span className="launch-step-dot relative mt-1 h-3 w-3 shrink-0 rounded-full border-2 border-brand-secondary/40 bg-brand-bg transition-transform duration-500">
                          <span className="launch-step-dot-fill absolute inset-[2px] rounded-full bg-brand-secondary" />
                        </span>
                        {!isLast && (
                          <div className="mt-1 relative w-px flex-1 overflow-hidden bg-brand-secondary/20">
                            <div className="launch-step-line-fill absolute inset-x-0 top-0 h-full bg-brand-secondary/45" />
                          </div>
                        )}
                      </div>
                      <div className={`launch-step-copy ${isLast ? "pb-0" : "pb-10"}`}>
                        <span className="launch-step-number block text-[11px] uppercase tracking-[0.2em] text-brand-secondary/50 mb-2 font-medium">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <p className="text-base md:text-lg font-light leading-relaxed text-brand-primary/85">
                          {item}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Campaign Impact */}
        <section className="scroll-section campaign-impact-section relative overflow-hidden bg-brand-bg px-6 py-24 md:px-12 md:py-32">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-brand-secondary/[0.06] blur-[140px]" />
            <div className={`absolute -top-20 ${isRTL ? "-left-20" : "-right-20"} w-[400px] h-[400px] rounded-full bg-brand-secondary/[0.04] blur-[100px]`} />
          </div>

          <div className="mx-auto max-w-400 relative">
            <div className="campaign-impact-heading mb-20 text-center">
              <p className="text-[11px] uppercase tracking-[0.3em] text-brand-secondary mb-5">{t("caseStudyPage.resultsLabel")}</p>
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-brand-dark tracking-tight leading-[1.1]">
                {t("caseStudyPage.campaignImpact")}
              </h3>
              <div className="mt-8 mx-auto h-px w-28 bg-gradient-to-r from-transparent via-brand-secondary/50 to-transparent" />
            </div>

            <div className="flex flex-col">
              {campaignImpact.map((item, idx) => {
                const isLast = idx === campaignImpact.length - 1;
                return (
                  <div
                    key={idx}
                    className={`impact-card group flex items-center gap-5 md:gap-10 py-7 md:py-9 ${
                      !isLast ? "border-b border-brand-dark/[0.07]" : ""
                    }`}
                  >
                    <div className="impact-card-index shrink-0 w-14 md:w-24">
                      <span className="font-serif text-3xl md:text-5xl lg:text-6xl text-brand-secondary/30 group-hover:text-brand-secondary/70 transition-colors duration-700 tabular-nums leading-none">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="impact-card-line shrink-0 h-10 md:h-14 w-px bg-gradient-to-b from-brand-secondary/10 via-brand-secondary/40 to-brand-secondary/10 group-hover:via-brand-secondary/70 transition-all duration-700" />
                    <div className="impact-card-copy flex-1 min-w-0">
                      <p className="text-base md:text-xl lg:text-2xl font-light leading-relaxed text-brand-primary/55 group-hover:text-brand-dark transition-colors duration-700">
                        {item}
                      </p>
                    </div>
                    <div className={`hidden md:flex shrink-0 items-center opacity-0 group-hover:opacity-100 transition-all duration-700 ${isRTL ? "-translate-x-3 group-hover:translate-x-0" : "translate-x-3 group-hover:translate-x-0"}`}>
                      <span className="h-2 w-2 rounded-full bg-brand-secondary/50" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="scroll-section px-6 pb-20 md:px-12 md:pb-24 mt-20">
          <div className="mx-auto max-w-400">
            <div className="mb-12 flex items-end justify-between gap-8">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-brand-secondary">{t("caseStudyPage.gallery")}</p>
                <h2 className="mt-4 font-serif text-4xl tracking-[-0.03em] md:text-5xl">{t("caseStudyPage.visualNotes")}</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
              <div className="md:col-span-7 overflow-hidden bg-brand-surface-low">
                <div className="aspect-4/3 overflow-hidden">
                  <img src={project.gallery[0]} alt={`${projectTitle} gallery 1`} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
              <div className="md:col-span-5 overflow-hidden bg-brand-surface-low">
                <div className="aspect-3/4 overflow-hidden">
                  <img src={project.gallery[1]} alt={`${projectTitle} gallery 2`} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
              <div className="md:col-span-12 overflow-hidden bg-brand-surface-low">
                <div className="aspect-16/8 overflow-hidden">
                  <img src={project.gallery[2]} alt={`${projectTitle} gallery 3`} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Next Study */}
        <section className="scroll-section bg-brand-surface-low px-6 py-20 md:px-12 md:py-24">
          <div className="mx-auto max-w-400">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-secondary">{t("caseStudyPage.nextStudy")}</p>
            <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-serif text-4xl tracking-[-0.04em] md:text-6xl">{nextProjectTitle}</h2>
                <p className="mt-4 max-w-2xl text-base font-light leading-8 text-brand-primary/85">
                  {nextProjectDesc}
                </p>
              </div>
              <a
                href={`/work/${nextProject.slug}`}
                className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.22em] text-brand-secondary"
              >
                {t("caseStudyPage.openNextStudy")}
                <NextArrow className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <SharedFooter />
    </div>
  );
}
