import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SharedFooter from "./SharedFooter";
import { categoryLabel, filters, projects, type FilterValue, type Project } from "./workData";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function WorksNavbar({ active = "work" }: { active?: "home" | "work" }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.png" alt="Athr Logo" className="h-12 md:h-14" />
        </div>
        <div className="hidden md:flex items-center space-x-12 font-serif text-base tracking-tight">
          <a
            href="/"
            className={active === "home" ? "text-brand-dark border-b border-brand-secondary pb-1" : "text-brand-primary hover:text-brand-secondary transition-colors"}
          >
            Home
          </a>
          <a
            href="/work"
            className={active === "work" ? "text-brand-dark border-b border-brand-secondary pb-1" : "text-brand-primary hover:text-brand-secondary transition-colors"}
          >
            Portfolio
          </a>
          <a href="/#workshops" className="text-brand-primary hover:text-brand-secondary transition-colors">
            Workshops
          </a>
          <a href="/#contact" className="text-brand-primary hover:text-brand-secondary transition-colors">
            Contact
          </a>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="/#contact"
            className="hidden md:block relative group bg-brand-secondary text-white px-8 py-2.5 text-sm tracking-widest font-medium hover:bg-brand-dark transition-all rounded-b-xs overflow-hidden"
          >
            <span className="relative z-10">Let's Talk</span>
            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-60 transition-all duration-700 pointer-events-none flex justify-center items-center">
              <img
                src="/athr.png"
                alt="Hover Effect"
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
        className={`fixed top-0 left-0 w-full h-[100dvh] bg-brand-bg z-[100] flex flex-col px-6 py-6 pb-8 transition-transform duration-500 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center mb-16">
          <img src="/logo.png" alt="Athr Logo" className="h-12" />
          <X
            className="text-brand-secondary w-8 h-8 cursor-pointer hover:rotate-90 transition-transform"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        </div>
        <div className="flex flex-col space-y-8 font-serif text-2xl text-center flex-grow justify-center pb-20">
          <a href="/" className={active === "home" ? "text-brand-dark" : "text-brand-primary hover:text-brand-secondary transition-colors"} onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </a>
          <a href="/work" className={active === "work" ? "text-brand-dark" : "text-brand-primary hover:text-brand-secondary transition-colors"} onClick={() => setIsMobileMenuOpen(false)}>
            Portfolio
          </a>
          <a href="/#workshops" className="text-brand-primary hover:text-brand-secondary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            Workshops
          </a>
          <a href="/#contact" className="text-brand-primary hover:text-brand-secondary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
            Contact
          </a>
        </div>
        <div className="mt-auto border-t border-brand-surface-high pt-8 pb-6">
          <a
            href="/#contact"
            className="block w-full relative group bg-brand-secondary text-white py-4 text-sm tracking-[0.2em] uppercase font-medium hover:bg-brand-dark transition-all rounded-sm overflow-hidden text-center"
          >
            <span className="relative z-10">Let's Talk</span>
            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-60 transition-all duration-700 pointer-events-none flex justify-center items-center">
              <img
                src="/athr.png"
                alt="Hover Effect"
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
  return (
    <article className="group h-full flex flex-col cursor-pointer">
      <a href={`/work/${project.slug}`} className="block relative">
        <div className="relative mb-8 overflow-hidden bg-brand-surface-low">
          <div className="aspect-[4/3] overflow-hidden">
            <img
              className={`h-full w-full object-cover transition-all duration-[1.5s] ease-in-out group-hover:scale-105 ${
                project.grayscale ? "grayscale group-hover:grayscale-0" : ""
              }`}
              alt={project.title}
              src={project.image}
              referrerPolicy="no-referrer"
            />
          </div>
          <div
            className={`absolute left-6 top-6 bg-white px-4 py-1 text-[10px] uppercase tracking-[0.2em] text-brand-secondary ${
              project.badgeClassName ?? "text-brand-secondary"
            }`}
          >
            {categoryLabel[project.category]}
          </div>
        </div>
      </a>

      <div className="flex flex-col gap-4">
        <div>
          <h3 className="mb-3 font-serif text-3xl text-brand-dark md:text-4xl">{project.title}</h3>
          <p className="max-w-xl text-sm font-light leading-relaxed text-brand-primary/90">{project.description}</p>
        </div>

        {project.notes?.[0] && (
          <div className="flex items-center gap-3 pt-1 text-[10px] uppercase tracking-[0.24em] text-brand-secondary">
            <span className="h-px w-8 bg-brand-secondary/35" />
            <span>{project.notes[0]}</span>
          </div>
        )}

        <a
          href={`/work/${project.slug}`}
          className="inline-flex items-center gap-2 pt-1 text-xs font-medium uppercase tracking-widest text-brand-secondary"
        >
          View Study
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </article>
  );
}

export default function WorksPage() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  useGSAP(() => {
    // Framer-style Header animations
    gsap.fromTo(
      ".works-header-element",
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.8, stagger: 0.15, ease: "expo.out" }
    );

    // Filters animation
    gsap.fromTo(
      ".works-filter",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, stagger: 0.08, ease: "expo.out", delay: 0.4 }
    );
  }, { scope: containerRef });

  useGSAP(() => {
    // Framer-style Projects animation on scroll/filter change
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

  return (
    <div ref={containerRef} className="min-h-screen bg-brand-bg font-sans text-brand-dark antialiased">
      <WorksNavbar active="work" />

      <main className="pb-24 pt-32">
        <header className="mb-16 px-6 md:px-12">
          <div className="mx-auto max-w-[1920px]">
            <p className="works-header-element mb-6 text-sm uppercase tracking-[0.3em] text-brand-secondary">Our Portfolio</p>
            <h1 className="works-header-element max-w-4xl font-serif text-6xl leading-tight tracking-[-0.02em] text-brand-dark md:text-8xl">
              Selected <br />
              <span className="font-light italic text-brand-primary">Works.</span>
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
                  className={`works-filter -mb-[1.65rem] border-b-2 pb-6 text-[9.5px] min-[375px]:text-[10.5px] sm:text-xs md:text-xs uppercase tracking-wider md:tracking-widest transition-all whitespace-nowrap ${
                    isActive
                      ? "border-brand-secondary text-brand-dark"
                      : "border-transparent text-brand-primary hover:text-brand-dark"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </section>

        <section className="px-6 md:px-12">
          <div className="mx-auto max-w-[1920px]">
            <div className="projects-grid grid grid-cols-1 gap-x-12 gap-y-24 md:grid-cols-12">
              {visibleProjects.map((project) => (
                <div key={project.title} className="project-card md:col-span-6">
                  <ProjectCard project={project} />
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
