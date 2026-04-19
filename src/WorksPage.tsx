import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowLeft, Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SharedFooter from "./SharedFooter";
import { filters, type FilterValue, type Project } from "./workData";
import { useProjects } from "./api/works";
import { useLanguage } from "./i18n/LanguageContext";
import { LanguageSwitcher } from "./App";
import { getBrandLogoSrc } from "./brandLogo";
import { getCategoryLabel } from "./categoryLabels";
import { SkeletonBlock, SkeletonLines } from "./ui/Skeleton";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function WorksNavbar({
  active = "work",
}: {
  active?: "home" | "work" | "workshops" | "contact";
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, isRTL, locale } = useLanguage();
  const brandLogoSrc = getBrandLogoSrc(locale);
  const desktopNavLinkClass = "text-brand-primary hover:text-brand-secondary transition-colors";
  const desktopActiveNavLinkClass = "text-brand-dark border-b border-brand-secondary pb-1 transition-colors";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-brand-bg/80 backdrop-blur-md border-brand-surface-high/30"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" aria-label="Go to home page">
            <img src={brandLogoSrc} alt="Athr Logo" className="h-12 md:h-14" />
          </a>
        </div>
        <div className={`hidden md:flex items-center ${isRTL ? "gap-12" : "space-x-12"} font-serif text-base tracking-tight`}>
          <a
            href="/"
            className={active === "home" ? desktopActiveNavLinkClass : desktopNavLinkClass}
          >
            {t("nav.home")}
          </a>
          <a
            href="/work"
            className={active === "work" ? desktopActiveNavLinkClass : desktopNavLinkClass}
          >
            {t("nav.portfolio")}
          </a>
          <a
            href="/workshops"
            className={active === "workshops" ? desktopActiveNavLinkClass : desktopNavLinkClass}
          >
            {t("nav.workshops")}
          </a>
          <a
            href="/contact"
            className={
              active === "contact"
                ? desktopActiveNavLinkClass
                : desktopNavLinkClass
            }
          >
            {t("nav.contact")}
          </a>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <LanguageSwitcher className="hidden md:flex" tone="brand" />
          <a
            href="/contact#contact-form"
            className="hidden md:block relative group bg-brand-secondary text-white px-8 py-2.5 text-sm tracking-widest font-medium hover:bg-brand-dark transition-all rounded-b-xs overflow-hidden"
          >
            <span className="relative z-10">{t("nav.letsTalk")}</span>
            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-60 transition-all duration-700 pointer-events-none flex justify-center items-center">
              <img
                src="/athr.png"
                alt=""
                className="w-[200%] h-[200%] max-w-none object-contain scale-150 group-hover:scale-125 transition-transform duration-700"
              />
            </div>
          </a>
          <Menu
            className="md:hidden text-brand-secondary w-7 h-7 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(true)}
          />
        </div>
      </div>

      <div
        className={`fixed top-0 ${isRTL ? "right-0" : "left-0"} w-full h-[100vh] bg-brand-bg z-[100] flex flex-col px-6 py-6 pb-8 transition-transform duration-500 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center mb-16">
          <a href="/" aria-label="Go to home page" onClick={() => setIsMobileMenuOpen(false)}>
            <img src={brandLogoSrc} alt="Athr Logo" className="h-12" />
          </a>
          <X
            className="text-brand-secondary w-8 h-8 cursor-pointer hover:rotate-90 transition-transform"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        </div>
        <div className="flex flex-col space-y-8 font-serif text-2xl text-center flex-grow justify-center pb-20">
          <a href="/" className={active === "home" ? "text-brand-dark" : "text-brand-primary hover:text-brand-secondary transition-colors"} onClick={() => setIsMobileMenuOpen(false)}>
            {t("nav.home")}
          </a>
          <a href="/work" className={active === "work" ? "text-brand-dark" : "text-brand-primary hover:text-brand-secondary transition-colors"} onClick={() => setIsMobileMenuOpen(false)}>
            {t("nav.portfolio")}
          </a>
          <a href="/workshops" className={active === "workshops" ? "text-brand-dark" : "text-brand-primary hover:text-brand-secondary transition-colors"} onClick={() => setIsMobileMenuOpen(false)}>
            {t("nav.workshops")}
          </a>
          <a
            href="/contact"
            className={active === "contact" ? "text-brand-dark" : "text-brand-primary hover:text-brand-secondary transition-colors"}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {t("nav.contact")}
          </a>
          <LanguageSwitcher className="justify-center text-lg" />
        </div>
        <div className="mt-auto border-t border-brand-surface-high pt-8 pb-6">
          <a
            href="/contact#contact-form"
            className="block w-full relative group bg-brand-secondary text-white py-4 text-sm tracking-[0.2em] uppercase font-medium hover:bg-brand-dark transition-all rounded-sm overflow-hidden text-center"
          >
            <span className="relative z-10">{t("nav.letsTalk")}</span>
            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-60 transition-all duration-700 pointer-events-none flex justify-center items-center">
              <img
                src="/athr.png"
                alt=""
                className="w-[200%] h-[200%] max-w-none object-contain scale-150 group-hover:scale-125 transition-transform duration-700"
              />
            </div>
          </a>
        </div>
      </div>
    </nav>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const { t, isRTL, locale } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const categoryLabelText = getCategoryLabel(project.category, locale);
  const i18nTitle = t(`projects.${project.slug}.title`);
  const i18nDesc = t(`projects.${project.slug}.description`);
  const projectTitle = i18nTitle.startsWith("projects.") ? project.title : i18nTitle;
  const projectDesc = i18nDesc.startsWith("projects.") ? project.description : i18nDesc;

  return (
    <article className="group h-full flex flex-col cursor-pointer">
      <a href={`/work/${project.slug}`} className="block relative">
        <div className="relative mb-8 overflow-hidden bg-brand-surface-low">
          <div className="aspect-[4/3] overflow-hidden">
            <img
              className={`h-full w-full object-cover transition-all duration-[1.5s] ease-in-out group-hover:scale-105 ${
                project.grayscale ? "grayscale group-hover:grayscale-0" : ""
              }`}
              alt={projectTitle}
              src={project.image}
              referrerPolicy="no-referrer"
            />
          </div>
          <div
            className={`absolute ${isRTL ? "right-6" : "left-6"} top-6 bg-white px-4 py-1 text-[10px] uppercase tracking-[0.2em] text-brand-secondary ${
              project.badgeClassName ?? "text-brand-secondary"
            }`}
          >
            {categoryLabelText}
          </div>
        </div>
      </a>

      <div className="flex flex-col gap-4">
        <div>
          <h3 className="mb-3 font-serif text-3xl text-brand-dark md:text-4xl">{projectTitle}</h3>
          <p className="max-w-xl text-sm font-light leading-relaxed text-brand-primary/90">{projectDesc}</p>
        </div>

        <a
          href={`/work/${project.slug}`}
          className="inline-flex items-center gap-2 pt-1 text-xs font-medium uppercase tracking-widest text-brand-secondary"
        >
          {t("works.viewStudy")}
          <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </article>
  );
}

function ProjectCardSkeleton({ isRTL }: { isRTL: boolean }) {
  return (
    <article className="flex h-full flex-col">
      <div className="relative mb-8 overflow-hidden bg-brand-surface-low">
        <div className="aspect-[4/3]">
          <SkeletonBlock className="h-full w-full" />
        </div>
        <SkeletonBlock
          className={`absolute top-6 h-6 w-24 rounded-full ${
            isRTL ? "right-6" : "left-6"
          }`}
        />
      </div>

      <div className="flex flex-col gap-5">
        <div className="space-y-4">
          <SkeletonBlock className="h-10 w-4/5 rounded-sm md:h-12" />
          <SkeletonLines
            widths={["w-full", "w-11/12", "w-7/12"]}
            lineClassName="h-4 rounded-full"
          />
        </div>
        <SkeletonBlock className="h-4 w-32 rounded-full" />
      </div>
    </article>
  );
}

function WorksPageSkeleton({
  isRTL,
  loadingLabel,
}: {
  isRTL: boolean;
  loadingLabel: string;
}) {
  return (
    <div className="min-h-screen bg-brand-bg font-sans text-brand-dark antialiased">
      <WorksNavbar active="work" />

      <main className="pb-24 pt-32" role="status" aria-live="polite" aria-label={loadingLabel}>
        <header className="mb-16 px-6 md:px-12">
          <div className="mx-auto max-w-[1920px]">
            <SkeletonBlock className="mb-6 h-4 w-24 rounded-full" />
            <div className="max-w-4xl space-y-4">
              <SkeletonBlock className="h-16 w-full rounded-sm md:h-20" />
              <SkeletonBlock className="h-16 w-4/5 rounded-sm md:h-20" />
            </div>
          </div>
        </header>

        <section className="mb-16 px-4 md:px-12">
          <div className="mx-auto flex max-w-[1920px] justify-between gap-3 border-b border-brand-surface-high pb-6 md:justify-start md:gap-8">
            {["w-14", "w-24", "w-28", "w-24"].map((width, index) => (
              <SkeletonBlock
                key={`${width}-${index}`}
                className={`-mb-[1.65rem] h-5 rounded-full ${width}`}
              />
            ))}
          </div>
        </section>

        <section className="px-6 md:px-12">
          <div className="mx-auto max-w-[1920px]">
            <div className="grid grid-cols-1 gap-x-12 gap-y-24 md:grid-cols-12">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="md:col-span-6">
                  <ProjectCardSkeleton isRTL={isRTL} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SharedFooter />
    </div>
  );
}


export default function WorksPage() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, isRTL, locale } = useLanguage();
  const { projects: allProjects, loading, error } = useProjects(locale);
  const visibleProjects =
    activeFilter === "all"
      ? allProjects
      : allProjects.filter((project) => project.category === activeFilter);


  const filterLabels: Record<FilterValue, string> = {
    all: t("works.filters.all"),
    executed: t("works.filters.executed"),
    reimagined: t("works.filters.reimagined"),
    conceptual: t("works.filters.conceptual"),
  };

  useGSAP(() => {
    gsap.fromTo(
      ".works-header-element",
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.8, stagger: 0.15, ease: "expo.out" }
    );

    gsap.fromTo(
      ".works-filter",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, stagger: 0.08, ease: "expo.out", delay: 0.4 }
    );
  }, { scope: containerRef });

  useGSAP(() => {
    const cards = gsap.utils.toArray(".project-card");
    cards.forEach((card: any) => {
      gsap.fromTo(
        card,
        { y: 100, opacity: 0, scale: 0.95 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 1.6, 
          ease: "expo.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          }
        }
      );
    });
  }, { scope: containerRef, dependencies: [visibleProjects] });

  const loadingLabel =
    t("works.loading") === "works.loading" ? "Loading projects..." : t("works.loading");

  if (loading) {
    return <WorksPageSkeleton isRTL={isRTL} loadingLabel={loadingLabel} />;
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-brand-bg font-sans text-brand-dark antialiased">
      <WorksNavbar active="work" />

      <main className="pb-24 pt-32">
        <header className="mb-16 px-6 md:px-12">
          <div className="mx-auto max-w-[1920px]">
            <p className="works-header-element mb-6 text-sm uppercase tracking-[0.3em] text-brand-secondary">{t("works.label")}</p>
            <h1 className="works-header-element max-w-4xl font-serif text-6xl leading-tight tracking-[-0.02em] text-brand-dark md:text-8xl">
              {t("works.titleLine1")} <br />
              <span className={locale === "ar" ? "text-brand-dark" : "font-light italic text-brand-primary"}>{t("works.titleLine2")}</span>
            </h1>
          </div>
        </header>

        <section className="mb-16 px-4 md:px-12">
          <div className="mx-auto flex max-w-[1920px] justify-between md:justify-start gap-1 md:gap-8 border-b border-brand-surface-high pb-6">
            {filters.map((filter) => {
              const isActive = filter.value === activeFilter;
              return (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setActiveFilter(filter.value)}
                  className={`works-filter -mb-[1.65rem] border-b-2 pb-6 ${isRTL ? "text-[11px] min-[375px]:text-xs sm:text-sm md:text-sm" : "text-[9.5px] min-[375px]:text-[10.5px] sm:text-xs md:text-xs"} uppercase tracking-wider md:tracking-widest transition-all whitespace-nowrap ${
                    isActive
                      ? "border-brand-secondary text-brand-dark"
                      : "border-transparent text-brand-primary hover:text-brand-dark"
                  }`}
                >
                  {filterLabels[filter.value]}
                </button>
              );
            })}
          </div>
        </section>

        <section className="px-6 md:px-12">
          <div className="mx-auto max-w-[1920px]">
            {loading ? (
              <div className="py-24 text-center text-sm uppercase tracking-[0.3em] text-brand-secondary/70">
                {t("works.loading") === "works.loading" ? "Loading projects…" : t("works.loading")}
              </div>
            ) : error ? (
              <div className="py-24 text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-brand-secondary">
                  {t("works.error") === "works.error"
                    ? "We couldn't load the portfolio. Please try again."
                    : t("works.error")}
                </p>
                <p className="mt-4 text-xs text-brand-primary/60 font-mono">{error}</p>
              </div>
            ) : visibleProjects.length === 0 ? (
              <div className="py-24 text-center text-sm uppercase tracking-[0.3em] text-brand-primary/70">
                {t("works.empty") === "works.empty" ? "No projects to show yet." : t("works.empty")}
              </div>
            ) : (
              <div className="projects-grid grid grid-cols-1 gap-x-12 gap-y-24 md:grid-cols-12">
                {visibleProjects.map((project) => (
                  <div key={project.slug} className="project-card md:col-span-6">
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <SharedFooter />
    </div>
  );
}
