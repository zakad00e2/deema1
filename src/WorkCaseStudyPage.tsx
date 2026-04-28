import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SharedFooter from "./SharedFooter";
import { WorksNavbar } from "./WorksPage";
import { useProjects } from "./api/works";
import { useLanguage } from "./i18n/LanguageContext";
import { getCategoryLabel } from "./categoryLabels";
import { SkeletonBlock, SkeletonLines } from "./ui/Skeleton";

gsap.registerPlugin(ScrollTrigger);

function ImageCarousel({ images, label }: { images: string[]; label: string }) {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<number | null>(null);
  const { isRTL } = useLanguage();
  const PrevArrow = isRTL ? ArrowRight : ArrowLeft;
  const NextArrow = isRTL ? ArrowLeft : ArrowRight;
  const total = images.length;
  const previousImageLabel = isRTL ? "الصورة السابقة" : "Previous image";
  const nextImageLabel = isRTL ? "الصورة التالية" : "Next image";

  if (!total) return null;

  const minSwipeDistance = 50;
  const renderedImages = isRTL ? [...images].reverse() : images;
  const trackIndex = isRTL ? total - 1 - current : current;
  const goToPrevious = () => setCurrent((p) => Math.max(p - 1, 0));
  const goToNext = () => setCurrent((p) => Math.min(p + 1, total - 1));
  const getTranslateX = (dragOffset = 0) => `translateX(calc(-${trackIndex * 100}% + ${dragOffset}px))`;

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
    trackRef.current.style.transform = getTranslateX(diff);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current === null || !trackRef.current) return;
    const currentTouch = e.changedTouches[0].clientX;
    const diff = currentTouch - touchStartRef.current;
    
    trackRef.current.style.transition = 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
    trackRef.current.style.transform = '';

    if (diff < -minSwipeDistance) {
      if (isRTL) {
        goToPrevious();
      } else {
        goToNext();
      }
    } else if (diff > minSwipeDistance) {
      if (isRTL) {
        goToNext();
      } else {
        goToPrevious();
      }
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
      <div className="overflow-visible" dir="ltr">
        <div
          ref={trackRef}
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: getTranslateX() }}
        >
          {renderedImages.map((src, i) => (
            <div key={i} className={`w-full shrink-0 ${isRTL ? "pl-4 sm:pl-6" : "pr-4 sm:pr-6"}`}>
              <div className="aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <img
                  src={src}
                  alt={`${label} ${isRTL ? total - i : i + 1}`}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                  loading={i === trackIndex ? "eager" : "lazy"}
                  decoding="async"
                  width={1200}
                  height={750}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {total > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className={`absolute ${isRTL ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-110 ${
              current === 0 ? "opacity-0 pointer-events-none" : "opacity-0 md:group-hover/carousel:opacity-100"
            }`}
            aria-label={previousImageLabel}
          >
            <PrevArrow className="h-5 w-5 text-brand-dark" strokeWidth={1.5} />
          </button>
          <button
            onClick={goToNext}
            className={`absolute ${isRTL ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-110 ${
              current === total - 1 ? "opacity-0 pointer-events-none" : "opacity-0 md:group-hover/carousel:opacity-100"
            }`}
            aria-label={nextImageLabel}
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

function CarouselSkeleton() {
  return (
    <div className="max-w-full overflow-hidden">
      <div className="aspect-[4/3] overflow-hidden rounded-xl bg-brand-surface-low shadow-[0_4px_20px_rgba(0,0,0,0.06)] md:aspect-[16/10]">
        <SkeletonBlock className="h-full w-full" />
      </div>
      <div className="mt-5 flex items-center justify-center gap-1.5 px-1">
        {[0, 1, 2, 3].map((item) => (
          <SkeletonBlock
            key={item}
            className={`${item === 1 ? "w-8" : "w-1.5"} h-1.5 rounded-full`}
          />
        ))}
      </div>
    </div>
  );
}

function MarketingSectionSkeleton({
  className,
}: {
  className: string;
}) {
  const items = [
    ["w-full", "w-10/12"],
    ["w-11/12"],
    ["w-full", "w-8/12"],
    ["w-9/12"],
  ];

  return (
    <section className={className}>
      <div className="mx-auto max-w-400">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <div className="mb-8 flex items-center gap-4">
              <SkeletonBlock className="h-[2px] w-10 rounded-full" />
              <SkeletonBlock className="h-8 w-52 rounded-sm md:h-10" />
            </div>
            <div className="flex flex-col gap-5">
              {items.map((widths, index) => (
                <div key={index} className="flex items-start gap-3">
                  <SkeletonBlock className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" />
                  <SkeletonLines widths={widths} lineClassName="h-4 rounded-full" className="flex-1" />
                </div>
              ))}
            </div>
          </div>
          <CarouselSkeleton />
        </div>
      </div>
    </section>
  );
}

function CaseStudyLoadingSkeleton({
  isRTL,
  loadingLabel,
}: {
  isRTL: boolean;
  loadingLabel: string;
}) {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-dark antialiased">
      <WorksNavbar active="work" />

      <main className="pb-24 pt-28 md:pt-32" role="status" aria-live="polite" aria-label={loadingLabel}>
        <section className="px-6 pt-10 md:px-12">
          <div className="mx-auto max-w-400">
            <SkeletonBlock className="h-4 w-40 rounded-full" />

            <div className="mt-8 flex flex-col gap-5">
              <SkeletonBlock className="h-4 w-28 rounded-full" />
              <SkeletonBlock className="h-14 w-full max-w-5xl rounded-sm md:h-16 lg:h-20" />
              <SkeletonBlock className="h-14 w-4/5 max-w-4xl rounded-sm md:h-16 lg:h-20" />
              <SkeletonLines
                widths={["w-full", "w-5/6"]}
                lineClassName="h-5 rounded-full"
                className="max-w-2xl"
              />
            </div>
          </div>
        </section>

        <section className="mt-12 px-6 md:px-12">
          <div className="relative mx-auto aspect-[4/3] max-w-400 overflow-hidden bg-brand-surface-low editorial-shadow sm:aspect-[16/11] md:aspect-[16/8] lg:aspect-[16/7]">
            <SkeletonBlock className="absolute inset-0" />
            <div className="absolute inset-x-0 bottom-0 z-10 hidden p-4 sm:p-6 md:p-8 lg:block">
              <div className="flex flex-wrap items-start gap-x-6 gap-y-4 rounded-2xl border border-white/12 bg-black/8 p-4 backdrop-blur-md sm:gap-x-8 md:p-6 lg:flex-nowrap lg:items-center">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="min-w-0 flex-1">
                    <SkeletonBlock className="mb-3 h-3 w-24 rounded-full" />
                    <SkeletonBlock className="h-6 w-32 rounded-sm sm:h-7" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-14 md:px-12 md:py-20 lg:hidden">
          <div className="mx-auto max-w-400">
            <div className="flex flex-wrap items-center gap-x-10 gap-y-6 border-b border-brand-surface-high pb-10">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="min-w-[8rem]">
                  <SkeletonBlock className="mb-3 h-3 w-24 rounded-full" />
                  <SkeletonBlock className="h-6 w-28 rounded-sm" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <MarketingSectionSkeleton className="px-6 pb-16 md:px-12 md:pb-24 lg:pt-20" />
        <MarketingSectionSkeleton className="px-6 py-16 md:px-12 md:py-24" />

        <section className="px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-400">
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.7fr_1fr] lg:gap-24">
              <div className="lg:sticky lg:top-40">
                <SkeletonBlock className="mb-5 h-3 w-28 rounded-full" />
                <div className="space-y-4">
                  <SkeletonBlock className="h-12 w-4/5 rounded-sm md:h-14" />
                  <SkeletonBlock className="h-12 w-3/5 rounded-sm md:h-14" />
                </div>
                <SkeletonBlock className="mt-8 h-[2px] w-16 rounded-full" />
                <SkeletonLines
                  widths={["w-full", "w-11/12", "w-4/5"]}
                  lineClassName="h-4 rounded-full"
                  className="mt-6 max-w-xs"
                />
              </div>

              <div className="flex flex-col">
                {Array.from({ length: 4 }).map((_, index) => {
                  const isLast = index === 3;
                  return (
                    <div key={index} className="flex gap-6 md:gap-8">
                      <div className="flex shrink-0 flex-col items-center">
                        <SkeletonBlock className="mt-1 h-3 w-3 rounded-full" />
                        {!isLast && <SkeletonBlock className="mt-1 h-24 w-px rounded-full" />}
                      </div>
                      <div className={isLast ? "pb-0" : "pb-10"}>
                        <SkeletonBlock className="mb-3 h-3 w-10 rounded-full" />
                        <SkeletonLines
                          widths={["w-full", "w-11/12"]}
                          lineClassName="h-5 rounded-full"
                          className="w-full min-w-[14rem]"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-brand-bg px-6 py-24 md:px-12 md:py-32">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-secondary/[0.04] blur-[140px]" />
            <div
              className={`absolute -top-20 h-[400px] w-[400px] rounded-full bg-brand-secondary/[0.03] blur-[100px] ${
                isRTL ? "-left-20" : "-right-20"
              }`}
            />
          </div>

          <div className="relative mx-auto max-w-400">
            <div className="mb-20 text-center">
              <SkeletonBlock className="mx-auto mb-5 h-3 w-24 rounded-full" />
              <div className="space-y-4">
                <SkeletonBlock className="mx-auto h-12 w-3/5 rounded-sm md:h-14" />
                <SkeletonBlock className="mx-auto h-12 w-2/5 rounded-sm md:h-14" />
              </div>
              <SkeletonBlock className="mx-auto mt-8 h-[2px] w-28 rounded-full" />
            </div>

            <div className="flex flex-col">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-5 py-7 md:gap-10 md:py-9 ${
                    index !== 3 ? "border-b border-brand-dark/[0.07]" : ""
                  }`}
                >
                  <SkeletonBlock className="h-10 w-14 rounded-sm md:h-14 md:w-24" />
                  <SkeletonBlock className="h-10 w-px rounded-full md:h-14" />
                  <SkeletonLines
                    widths={["w-full", "w-10/12"]}
                    lineClassName="h-5 rounded-full"
                    className="min-w-0 flex-1"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20 px-6 pb-20 md:px-12 md:pb-24">
          <div className="mx-auto max-w-400">
            <div className="mb-12">
              <SkeletonBlock className="h-4 w-24 rounded-full" />
              <SkeletonBlock className="mt-4 h-12 w-56 rounded-sm md:h-14" />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
              <div className="overflow-hidden bg-brand-surface-low md:col-span-7">
                <div className="aspect-4/3">
                  <SkeletonBlock className="h-full w-full" />
                </div>
              </div>
              <div className="overflow-hidden bg-brand-surface-low md:col-span-5">
                <div className="aspect-3/4">
                  <SkeletonBlock className="h-full w-full" />
                </div>
              </div>
              <div className="overflow-hidden bg-brand-surface-low md:col-span-12">
                <div className="aspect-16/8">
                  <SkeletonBlock className="h-full w-full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-brand-surface-low px-6 py-20 md:px-12 md:py-24">
          <div className="mx-auto max-w-400">
            <SkeletonBlock className="h-4 w-28 rounded-full" />
            <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="w-full md:max-w-2xl">
                <SkeletonBlock className="h-14 w-full rounded-sm md:h-16" />
                <SkeletonLines
                  widths={["w-full", "w-11/12"]}
                  lineClassName="h-5 rounded-full"
                  className="mt-4"
                />
              </div>
              <SkeletonBlock className="h-4 w-40 rounded-full" />
            </div>
          </div>
        </section>
      </main>

      <SharedFooter />
    </div>
  );
}

export default function WorkCaseStudyPage({ slug }: { slug: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, isRTL, locale } = useLanguage();
  const { projects, loading, error } = useProjects(locale);
  const project = projects.find((p) => p.slug === slug);
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

    const sections = gsap.utils.toArray(".scroll-section:not(.pre-event-section):not(.post-event-section)");
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

      const marketingItems = gsap.utils.toArray<HTMLElement>(items);
      const bullets: Element[] = [];
      const copies: Element[] = [];

      marketingItems.forEach((item) => {
        const bullet = item.querySelector(".marketing-item-bullet");
        const copy = item.querySelector(".marketing-item-copy");

        if (bullet) bullets.push(bullet);
        if (copy) copies.push(copy);
      });

      gsap.set(marketingItems, { opacity: 0.35 });
      gsap.set(bullets, { scale: 0.35, opacity: 0.3 });
      gsap.set(copies, { y: 16, opacity: 0 });

      const itemsTl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 88%", once: true },
      });

      itemsTl
        .to(marketingItems, { opacity: 1, duration: 0.7, stagger: 0.06, ease: "power2.out" }, 0)
        .to(bullets, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.06, ease: "power2.out" }, 0)
        .to(copies, { y: 0, opacity: 1, duration: 0.75, stagger: 0.06, ease: "power2.out" }, 0.02);

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

  const loadingLabel =
    t("caseStudyPage.loading") === "caseStudyPage.loading"
      ? "Loading project..."
      : t("caseStudyPage.loading");

  if (loading) {
    return <CaseStudyLoadingSkeleton isRTL={isRTL} loadingLabel={loadingLabel} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg text-brand-dark">
        <WorksNavbar active="work" />
        <main className="mx-auto max-w-275 px-6 pb-24 pt-40 md:px-12">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-secondary/70">
            {t("caseStudyPage.loading") === "caseStudyPage.loading" ? "Loading project…" : t("caseStudyPage.loading")}
          </p>
        </main>
        <SharedFooter />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-brand-bg text-brand-dark">
        <WorksNavbar active="work" />
        <main className="mx-auto max-w-275 px-6 pb-24 pt-40 md:px-12">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-secondary">
            {error
              ? t("caseStudyPage.errorLabel") === "caseStudyPage.errorLabel"
                ? "Unable to load project"
                : t("caseStudyPage.errorLabel")
              : t("caseStudyPage.notFoundLabel")}
          </p>
          <h1 className="mt-6 font-serif text-5xl md:text-7xl">
            {error
              ? t("caseStudyPage.errorTitle") === "caseStudyPage.errorTitle"
                ? "Something went wrong."
                : t("caseStudyPage.errorTitle")
              : t("caseStudyPage.notFoundTitle")}
          </h1>
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

  const nextProject = projects.find((p) => p.slug === project.nextProjectSlug) ?? projects[0] ?? project;

  const projectTitle = tpWithFallback("title", project.title);
  const projectHeroTitle = tpWithFallback("heroTitle", project.heroTitle);
  const categoryLabelText = getCategoryLabel(project.category, locale);

  const preEventMarketingTitle = project.preEventMarketingTitle || t("caseStudyPage.preEventMarketing");
  const preEventMarketing = project.preEventMarketing.length > 0 ? project.preEventMarketing : tpArray("preEventMarketing");
  const postEventMarketingTitle = project.postEventMarketingTitle || t("caseStudyPage.postEventMarketing");
  const postEventMarketing = project.postEventMarketing.length > 0 ? project.postEventMarketing : tpArray("postEventMarketing");
  const launchEventExperience = locale === "ar" ? (tpArray("launchEventExperience").length > 1 ? tpArray("launchEventExperience") : project.launchEventExperience) : project.launchEventExperience;
  const campaignImpact = locale === "ar" ? (tpArray("campaignImpact").length > 1 ? tpArray("campaignImpact") : project.campaignImpact) : project.campaignImpact;
  const services = project.services;

  const visibleServices = services.slice(0, 3);

  const nextProjectTitleRaw = t(`projects.${nextProject.slug}.title`);
  const nextProjectDescRaw = t(`projects.${nextProject.slug}.description`);
  const nextProjectTitle = nextProjectTitleRaw === `projects.${nextProject.slug}.title` ? nextProject.title : nextProjectTitleRaw;
  const nextProjectDesc = nextProjectDescRaw === `projects.${nextProject.slug}.description` ? nextProject.description : nextProjectDescRaw;

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
              <h1 className="work-case-title arabic-hero-title hero-element max-w-5xl font-serif text-4xl leading-[0.95] tracking-[-0.04em] text-brand-dark md:text-5xl lg:text-6xl">
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
              loading="eager"
              decoding="async"
              fetchPriority="high"
              width={1600}
              height={700}
              sizes="100vw"
            />
            {project.desktopImage && (
              <img
                src={project.image}
                alt={projectTitle}
                className="h-full w-full object-cover md:hidden absolute inset-0"
                referrerPolicy="no-referrer"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                width={900}
                height={675}
                sizes="100vw"
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
                        <span className={`${locale === "ar" ? "text-base tracking-normal sm:text-lg" : "text-[10px] tracking-[0.14em] xl:text-[11px]"} uppercase text-white/90`}>
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
                    <span key={i} className={`whitespace-nowrap bg-brand-surface-high/30 text-brand-dark/80 uppercase ${locale === "ar" ? "px-2.5 py-1 text-lg tracking-normal" : "px-2 py-0.5 text-[9px] tracking-[0.15em] md:text-[10px]"}`}>
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
                    {preEventMarketingTitle}
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
                <ImageCarousel images={project.preEventImages} label={preEventMarketingTitle} />
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
                    {postEventMarketingTitle}
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
                <ImageCarousel images={project.postEventImages} label={postEventMarketingTitle} />
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
                  <img src={project.gallery[0]} alt={`${projectTitle} gallery 1`} className="h-full w-full object-cover" referrerPolicy="no-referrer" loading="lazy" decoding="async" width={1200} height={900} sizes="(min-width: 768px) 58vw, 100vw" />
                </div>
              </div>
              <div className="md:col-span-5 overflow-hidden bg-brand-surface-low">
                <div className="aspect-3/4 overflow-hidden">
                  <img src={project.gallery[1]} alt={`${projectTitle} gallery 2`} className="h-full w-full object-cover" referrerPolicy="no-referrer" loading="lazy" decoding="async" width={900} height={1200} sizes="(min-width: 768px) 42vw, 100vw" />
                </div>
              </div>
              <div className="md:col-span-12 overflow-hidden bg-brand-surface-low">
                <div className="aspect-16/8 overflow-hidden">
                  <img src={project.gallery[2]} alt={`${projectTitle} gallery 3`} className="h-full w-full object-cover" referrerPolicy="no-referrer" loading="lazy" decoding="async" width={1600} height={800} sizes="100vw" />
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
