import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SharedFooter from "./SharedFooter";
import { WorksNavbar } from "./WorksPage";
import { categoryLabel, getProjectBySlug, projects } from "./workData";

gsap.registerPlugin(ScrollTrigger);

export default function WorkCaseStudyPage({ slug }: { slug: string }) {
  const project = getProjectBySlug(slug);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!project) return;

    // Framer-style Hero Text Animation (Dramatic slide up with expo ease)
    gsap.fromTo(
      ".hero-element",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.8, stagger: 0.1, ease: "expo.out", delay: 0.1 }
    );

    // Framer-style Image Parallax Reveal
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

    // Sections staggered animation on scroll (Stronger entry)
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
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          },
        }
      );
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
        <section className="px-6 pt-10 md:px-12">
          <div className="mx-auto max-w-400">
            <a
              href="/work"
              className="hero-element inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-brand-secondary inline-block"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all work
            </a>

            <div className="mt-8 grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.55fr)] md:items-end">
              <div>
                <p className="hero-element text-sm uppercase tracking-[0.3em] text-brand-secondary">
                  {categoryLabel[project.category]} / {project.year}
                </p>
                <h1 className="hero-element mt-5 max-w-5xl font-serif text-5xl leading-[0.95] tracking-[-0.04em] text-brand-dark md:text-7xl lg:text-[5.5rem]">
                  {project.title}
                </h1>
              </div>
              <p className="hero-element max-w-md text-sm font-light leading-7 text-brand-primary/80 md:ml-auto">
                {project.heroIntro}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-12 px-6 md:px-12">
          <div className="hero-image mx-auto max-w-400 overflow-hidden bg-brand-surface-low editorial-shadow">
            <div className="aspect-video overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>

        <section className="scroll-section px-6 py-18 md:px-12 md:py-24 relative overflow-hidden">
          {/* Subtle background element */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-surface-low/30 -z-10 rounded-l-[100px] blur-3xl opacity-50 hidden md:block" />
          
          <div className="mx-auto max-w-400">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 lg:gap-24">
              {/* Main Content Area */}
              <div className="relative">
                <div className="inline-flex items-center gap-4 mb-8">
                  <span className="h-px w-8 bg-brand-secondary/50"></span>
                  <p className="text-sm uppercase tracking-[0.3em] font-medium text-brand-secondary">Campaign Overview</p>
                </div>
                
                <h2 className="font-serif text-4xl leading-[1.15] tracking-tight text-brand-dark md:text-5xl lg:text-[3.5rem] mb-10 max-w-3xl">
                  {project.heroTitle}
                </h2>
                
                <div className="prose prose-lg max-w-3xl">
                  <p className="text-lg md:text-xl font-light leading-relaxed text-brand-primary/80 whitespace-pre-line">
                    {project.campaignOverview}
                  </p>
                </div>
              </div>

              {/* Sidebar Info */}
              <aside className="relative">
                {/* Decorative border line */}
                <div className="absolute -left-12 top-0 w-px h-full bg-linear-to-b from-brand-secondary/30 via-brand-surface-high to-transparent hidden lg:block" />
                
                <div className="bg-brand-surface-low/50 rounded-2xl p-8 border border-brand-surface-high/50 backdrop-blur-sm shadow-sm flex flex-col gap-10">
                  <div className="group">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-brand-secondary mb-2 font-medium">Client</p>
                    <p className="font-serif text-2xl text-brand-dark transition-colors group-hover:text-brand-secondary">{project.client}</p>
                  </div>
                  
                  <div className="group">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-brand-secondary mb-2 font-medium">Location</p>
                    <p className="font-serif text-2xl text-brand-dark transition-colors group-hover:text-brand-secondary">{project.location}</p>
                  </div>
                  
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-brand-secondary mb-5 font-medium">Services</p>
                    <ul className="flex flex-col gap-4">
                      {project.services.map((service) => (
                        <li 
                          key={service} 
                          className="flex items-start gap-3 group/item"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-secondary/40 transition-colors group-hover/item:bg-brand-secondary" />
                          <span className="text-base font-light leading-snug text-brand-primary/90 transition-colors group-hover/item:text-brand-dark">
                            {service}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="scroll-section px-6 py-20 md:px-12 md:py-32">
          <div className="mx-auto max-w-400">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 xl:gap-32">
              {/* Marketing Sections */}
              <div className="flex flex-col gap-24">
                {/* Pre-Event */}
                <div className="space-y-10 group">
                  <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
                    <span className="h-px w-8 sm:w-10 shrink-0 bg-brand-secondary/40 transition-all duration-500 group-hover:w-16 sm:group-hover:w-20 group-hover:bg-brand-secondary"></span>
                    <h3 className="font-serif text-[22px] min-[375px]:text-2xl sm:text-3xl md:text-4xl text-brand-dark tracking-tight whitespace-nowrap">Pre-Event Marketing</h3>
                  </div>
                  <div className="space-y-2">
                    {project.preEventMarketing.map((item, idx) => (
                      <div key={idx} className="flex gap-4 p-3 rounded-xl transition-all duration-300 hover:bg-brand-surface-low border border-transparent hover:border-brand-surface-high">
                        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-secondary/10 text-[10px] font-bold text-brand-secondary">
                          0{idx + 1}
                        </div>
                        <p className="text-base font-light leading-relaxed text-brand-primary/80">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Post-Event */}
                <div className="space-y-10 group">
                  <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
                    <span className="h-px w-8 sm:w-10 shrink-0 bg-brand-secondary/40 transition-all duration-500 group-hover:w-16 sm:group-hover:w-20 group-hover:bg-brand-secondary"></span>
                    <h3 className="font-serif text-[22px] min-[375px]:text-2xl sm:text-3xl md:text-4xl text-brand-dark tracking-tight whitespace-nowrap">Post-Event Marketing</h3>
                  </div>
                  <div className="space-y-2">
                    {project.postEventMarketing.map((item, idx) => (
                      <div key={idx} className="flex gap-4 p-3 rounded-xl transition-all duration-300 hover:bg-brand-surface-low border border-transparent hover:border-brand-surface-high">
                        <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-secondary/10 text-[10px] font-bold text-brand-secondary">
                          0{idx + 1}
                        </div>
                        <p className="text-base font-light leading-relaxed text-brand-primary/80">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Event Experience & Impact */}
              <div className="flex flex-col gap-24">
                {/* Event Experience */}
                <div className="space-y-10 group bg-brand-surface-low/50 p-8 md:p-12 rounded-3xl border border-brand-surface-high/60 shadow-[inset_0_0_40px_rgba(0,0,0,0.015)] relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary/5 rounded-bl-[100px] rounded-tr-3xl" />
                  
                  <div className="flex items-center gap-3 sm:gap-4 relative overflow-hidden">
                    <span className="h-px w-8 sm:w-10 shrink-0 bg-brand-secondary/40 transition-all duration-500 group-hover:w-16 sm:group-hover:w-20 group-hover:bg-brand-secondary"></span>
                    <h3 className="font-serif text-[22px] min-[375px]:text-2xl sm:text-3xl md:text-4xl text-brand-dark tracking-tight whitespace-nowrap">Launch Event Experience</h3>
                  </div>
                  
                  <div className="space-y-5 relative">
                    {project.launchEventExperience.map((item, idx) => (
                      <div key={idx} className="flex gap-4">
                        <svg className="h-5 w-5 shrink-0 text-brand-secondary/70 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <p className="text-base font-light leading-relaxed text-brand-dark/80">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Campaign Impact */}
                <div className="space-y-10 group mt-10">
                  <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
                    <span className="h-px w-8 sm:w-10 shrink-0 bg-brand-secondary/40 transition-all duration-500 group-hover:w-16 sm:group-hover:w-20 group-hover:bg-brand-secondary"></span>
                    <h3 className="font-serif text-[22px] min-[375px]:text-2xl sm:text-3xl md:text-4xl text-brand-dark tracking-tight whitespace-nowrap">Campaign Impact</h3>
                  </div>
                  <div className="flex flex-col gap-6">
                    {project.campaignImpact.map((item, idx) => (
                      <div key={idx} className="group/impact relative flex items-center gap-5 border-b border-brand-surface-high pb-6 last:border-0 hover:border-brand-secondary/30 transition-colors">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-surface-low border border-brand-surface-high group-hover/impact:border-brand-secondary/30 group-hover/impact:bg-brand-secondary/5 transition-all">
                          <span className="font-serif text-lg text-brand-secondary/80">0{idx + 1}</span>
                        </div>
                        <p className="text-lg md:text-xl font-light leading-snug text-brand-dark">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="scroll-section px-6 pb-20 md:px-12 md:pb-24">
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
