import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import SharedFooter from "./SharedFooter";
import { WorksNavbar } from "./WorksPage";
import { categoryLabel, getProjectBySlug, projects } from "./workData";

gsap.registerPlugin(ScrollTrigger);

function ImageCarousel({ images, label }: { images: string[]; label: string }) {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<number | null>(null);
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
    
    // We get the final position from changedTouches 
    const currentTouch = e.changedTouches[0].clientX;
    const diff = currentTouch - touchStartRef.current;
    
    trackRef.current.style.transition = 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
    trackRef.current.style.transform = ''; // Clear inline transform so state takes over

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
            <div key={i} className="w-full shrink-0 pr-4 sm:pr-6">
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
            className={`absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-110 ${
              current === 0 ? "opacity-0 pointer-events-none" : "opacity-0 md:group-hover/carousel:opacity-100"
            }`}
            aria-label="Previous image"
          >
            <ArrowLeft className="h-5 w-5 text-brand-dark" strokeWidth={1.5} />
          </button>
          <button
            onClick={() => setCurrent((p) => Math.min(p + 1, total - 1))}
            className={`absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-110 ${
              current === total - 1 ? "opacity-0 pointer-events-none" : "opacity-0 md:group-hover/carousel:opacity-100"
            }`}
            aria-label="Next image"
          >
            <ArrowRight className="h-5 w-5 text-brand-dark" strokeWidth={1.5} />
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
  const project = getProjectBySlug(slug);
  const containerRef = useRef<HTMLDivElement>(null);

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
          scrollTrigger: {
            trigger: section,
            start: "top 76%",
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(items).forEach((item) => {
        const bullet = item.querySelector(".marketing-item-bullet");
        const copy = item.querySelector(".marketing-item-copy");

        gsap.set(item, { opacity: 0.35 });
        if (bullet) gsap.set(bullet, { scale: 0.35, opacity: 0.3 });
        if (copy) gsap.set(copy, { y: 28, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 86%",
            end: "top 60%",
            scrub: 0.65,
          },
        });

        tl.to(item, { opacity: 1, ease: "none" }, 0)
          .to(bullet, { scale: 1, opacity: 1, ease: "power2.out" }, 0)
          .to(copy, { y: 0, opacity: 1, ease: "power2.out" }, 0.02);
      });

      gsap.fromTo(
        carousel,
        { x: 80, y: 32, opacity: 0, scale: 0.96 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: {
            trigger: carousel,
            start: "top 82%",
          },
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
        scrollTrigger: {
          trigger: step,
          start: "top 78%",
          end: "top 46%",
          scrub: 0.7,
        },
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
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".campaign-impact-section",
          start: "top 72%",
        },
      }
    );

    const impactCards = gsap.utils.toArray<HTMLElement>(".impact-card");
    impactCards.forEach((card) => {
      const line = card.querySelector(".impact-card-line");
      const number = card.querySelector(".impact-card-index");
      const copy = card.querySelector(".impact-card-copy");

      gsap.set(card, { opacity: 0.35 });
      if (line) gsap.set(line, { width: 40 });
      if (number) gsap.set(number, { y: 24, opacity: 0.02 });
      if (copy) gsap.set(copy, { y: 46, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 82%",
          end: "top 52%",
          scrub: 0.75,
        },
      });

      tl.to(card, { opacity: 1, backgroundColor: "rgba(255,255,255,0.04)", ease: "none" }, 0)
        .to(line, { width: 64, ease: "none" }, 0.05)
        .to(number, { y: 0, opacity: 0.08, ease: "power2.out" }, 0.08)
        .to(copy, { y: 0, opacity: 1, ease: "power2.out" }, 0.02);
    });
  }, { scope: containerRef, dependencies: [project] });

  if (!project) {
    return (
      <div className="min-h-screen bg-brand-bg text-brand-dark">
        <WorksNavbar active="work" />
        <main className="mx-auto max-w-275 px-6 pb-24 pt-40 md:px-12">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-secondary">Not Found</p>
          <h1 className="mt-6 font-serif text-5xl md:text-7xl">This case study does not exist.</h1>
          <a
            href="/work"
            className="mt-10 inline-flex items-center gap-3 text-sm uppercase tracking-[0.22em] text-brand-secondary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to work
          </a>
        </main>
        <SharedFooter />
      </div>
    );
  }

  const nextProject = getProjectBySlug(project.nextProjectSlug) ?? projects[0];

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
              <ArrowLeft className="h-4 w-4" />
              Back to all work
            </a>

            <div className="mt-8 flex flex-col gap-5">
              <p className="hero-element text-sm uppercase tracking-[0.3em] text-brand-secondary">
                {categoryLabel[project.category]} / {project.year}
              </p>
              <h1 className="hero-element max-w-5xl font-serif text-4xl leading-[0.95] tracking-[-0.04em] text-brand-dark md:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              {project.heroTitle && (
                <p className="hero-element max-w-2xl text-base md:text-lg text-brand-primary/80 font-light mt-2">
                  {project.heroTitle}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="mt-12 px-6 md:px-12">
          <div className="hero-image mx-auto max-w-400 overflow-hidden bg-brand-surface-low editorial-shadow relative aspect-square sm:aspect-[4/3] md:aspect-video">
            <img
              src={project.desktopImage || project.image}
              alt={project.title}
              className={`h-full w-full object-cover ${project.desktopImage ? "hidden md:block" : ""}`}
              referrerPolicy="no-referrer"
            />
            {project.desktopImage && (
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover md:hidden absolute inset-0"
                referrerPolicy="no-referrer"
              />
            )}
          </div>
        </section>

        {/* Compact Metadata Strip */}
        <section className="scroll-section px-6 py-14 md:px-12 md:py-20">
          <div className="mx-auto max-w-400">
            <div className="flex flex-wrap items-center gap-x-10 gap-y-4 border-b border-brand-surface-high pb-10">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-brand-secondary/60 mb-1">Client</p>
                <p className="font-serif text-lg text-brand-dark">{project.client}</p>
              </div>
              <div className="h-8 w-px bg-brand-surface-high hidden sm:block" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-brand-secondary/60 mb-1">Location</p>
                <p className="font-serif text-lg text-brand-dark">{project.location}</p>
              </div>
              <div className="h-8 w-px bg-brand-surface-high hidden sm:block" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-brand-secondary/60 mb-1">Services</p>
                <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
                  {project.services.map((service, i) => (
                    <span
                      key={i}
                      className="bg-brand-surface-high/30 px-2 py-0.5 text-[9px] md:text-[10px] uppercase tracking-[0.15em] text-brand-dark/80 whitespace-nowrap"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pre-Event Marketing — Carousel on Right */}
        <section className="scroll-section pre-event-section px-6 pb-16 md:px-12 md:pb-24">
          <div className="mx-auto max-w-400">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 items-start">
              <div>
                <div className="pre-event-heading mb-8 flex items-center gap-4">
                  <span className="h-px w-10 bg-brand-secondary/40" />
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-brand-dark tracking-tight">
                    Pre-Event Marketing
                  </h3>
                </div>
                <div className="flex flex-col gap-3">
                  {project.preEventMarketing.map((item, idx) => (
                    <div key={idx} className="pre-event-item flex items-start gap-3">
                      <span className="marketing-item-bullet mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-secondary/50" />
                      <p className="marketing-item-copy text-sm md:text-base font-light leading-relaxed text-brand-primary/80">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pre-event-carousel max-w-full overflow-hidden">
                <ImageCarousel images={project.preEventImages} label="Pre-Event Marketing" />
              </div>
            </div>
          </div>
        </section>

        {/* Post-Event Marketing — Carousel on right */}
        <section className="scroll-section post-event-section px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto max-w-400">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 items-start">
              <div>
                <div className="post-event-heading mb-8 flex items-center gap-4">
                  <span className="h-px w-10 bg-brand-secondary/40" />
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-brand-dark tracking-tight">
                    Post-Event Marketing
                  </h3>
                </div>
                <div className="flex flex-col gap-3">
                  {project.postEventMarketing.map((item, idx) => (
                    <div key={idx} className="post-event-item flex items-start gap-3">
                      <span className="marketing-item-bullet mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-secondary/50" />
                      <p className="marketing-item-copy text-sm md:text-base font-light leading-relaxed text-brand-primary/80">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="post-event-carousel max-w-full overflow-hidden">
                <ImageCarousel images={project.postEventImages} label="Post-Event Marketing" />
              </div>
            </div>
          </div>
        </section>

        {/* Launch Event Experience — Editorial Split Layout */}
        <section className="scroll-section launch-experience-section px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-400">
            <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_1fr] gap-12 lg:gap-24 items-start">
              <div className="lg:sticky lg:top-40">
                <p className="text-[11px] uppercase tracking-[0.3em] text-brand-secondary mb-5">The Experience</p>
                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-dark tracking-tight leading-[1.1]">
                  Launch Event<br />Experience
                </h3>
                <div className="mt-8 h-px w-16 bg-brand-secondary/50" />
                <p className="mt-6 text-sm font-light leading-relaxed text-brand-primary/60 max-w-xs">
                  Every detail was designed to immerse guests in the story behind the collection.
                </p>
              </div>

              <div className="flex flex-col">
                {project.launchEventExperience.map((item, idx) => {
                  const isLast = idx === project.launchEventExperience.length - 1;
                  return (
                    <div key={idx} className="launch-step group flex gap-6 md:gap-8">
                      {/* Dot + Line column */}
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
                      {/* Content */}
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

        {/* Campaign Impact — Full-Bleed Dark Grid */}
        <section className="scroll-section campaign-impact-section bg-brand-dark px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto max-w-400">
            <div className="campaign-impact-heading mb-20 max-w-xl">
              <p className="text-[11px] uppercase tracking-[0.3em] text-brand-secondary mb-5">Results</p>
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[1.1]">
                Campaign Impact
              </h3>
              <div className="mt-8 h-px w-16 bg-brand-secondary/50" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/6 border border-white/6 overflow-hidden">
              {project.campaignImpact.map((item, idx) => (
                <div
                  key={idx}
                  className="impact-card group relative bg-brand-dark p-10 md:p-14 hover:bg-white/3 transition-colors duration-700"
                >
                  <span className="impact-card-index absolute top-6 right-8 font-serif text-7xl md:text-8xl text-white/4 leading-none select-none group-hover:text-white/8 transition-colors duration-700">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="impact-card-copy relative">
                    <div className="impact-card-line h-px w-10 bg-brand-secondary/50 mb-8 group-hover:w-16 transition-all duration-700" />
                    <p className="text-lg md:text-xl font-light leading-relaxed text-white/75 group-hover:text-white/90 transition-colors duration-700">
                      {item}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="scroll-section px-6 pb-20 md:px-12 md:pb-24 mt-20">
          <div className="mx-auto max-w-400">
            <div className="mb-12 flex items-end justify-between gap-8">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-brand-secondary">Gallery</p>
                <h2 className="mt-4 font-serif text-4xl tracking-[-0.03em] md:text-5xl">Visual Notes</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
              <div className="md:col-span-7 overflow-hidden bg-brand-surface-low">
                <div className="aspect-4/3 overflow-hidden">
                  <img src={project.gallery[0]} alt={`${project.title} gallery 1`} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
              <div className="md:col-span-5 overflow-hidden bg-brand-surface-low">
                <div className="aspect-3/4 overflow-hidden">
                  <img src={project.gallery[1]} alt={`${project.title} gallery 2`} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
              <div className="md:col-span-12 overflow-hidden bg-brand-surface-low">
                <div className="aspect-16/8 overflow-hidden">
                  <img src={project.gallery[2]} alt={`${project.title} gallery 3`} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Next Study */}
        <section className="scroll-section bg-brand-surface-low px-6 py-20 md:px-12 md:py-24">
          <div className="mx-auto max-w-400">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-secondary">Next Study</p>
            <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-serif text-4xl tracking-[-0.04em] md:text-6xl">{nextProject.title}</h2>
                <p className="mt-4 max-w-2xl text-base font-light leading-8 text-brand-primary/85">
                  {nextProject.description}
                </p>
              </div>
              <a
                href={`/work/${nextProject.slug}`}
                className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.22em] text-brand-secondary"
              >
                Open next study
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <SharedFooter />
    </div>
  );
}
