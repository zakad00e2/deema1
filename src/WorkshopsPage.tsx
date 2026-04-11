import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Check } from "lucide-react";
import { WorksNavbar } from "./WorksPage";
import SharedFooter from "./SharedFooter";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const groupWorkshops = [
  {
    level: "Beginners",
    title: "The Edit Foundations",
    description:
      "A beginner-friendly workshop covering editing basics and engaging content creation using simple mobile tools for your team.",
    learns: [
      "Editing fundamentals made easy",
      "Simple, effective transitions",
      "Structuring videos for maximum impact",
      "Practical techniques you can use immediately on your phone",
    ],
    format: "Group workshop",
    dates: "Dates announced by Deema",
    image: "https://picsum.photos/seed/editfoundations/800/600",
  },
  {
    level: "Advanced",
    title: "Green Screen Mastery",
    description:
      "An advanced workshop for creating high-impact, creative content using green screen — designed to be practical and easy for teams, all on mobile-friendly apps.",
    learns: [
      "Mastering green screen tools",
      "Creative storytelling with green screen",
      "Advanced editing techniques simplified for your team",
      "Creating scroll-stopping content without complicated software",
    ],
    format: "Group workshop",
    dates: "Dates announced by Deema",
    image: "https://picsum.photos/seed/greenscreen/800/600",
  },
];

const featuredLearns = [
  "Content strategy tailored to your business",
  "Building a real connection with your audience",
  "Platform breakdown (TikTok, Reels, Stories, Snapchat)",
  "High-converting hooks",
  "Content ideas & creative direction",
  "Storytelling & content structure",
  "Practical editing tips",
  "Live feedback & team brainstorming",
];

export default function WorkshopsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const mm = gsap.matchMedia();

      gsap.fromTo(
        ".ws-hero-el",
        { y: 72, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, stagger: 0.14, ease: "expo.out" }
      );

      gsap.fromTo(
        ".ws-hero-tag",
        { x: -18, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.45,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".ws-hero-texture",
        { scale: 1.18, yPercent: -4, rotate: 1.5 },
        {
          scale: 1.06,
          yPercent: 8,
          rotate: -1.5,
          ease: "none",
          scrollTrigger: {
            trigger: ".ws-hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      const featuredTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".ws-featured",
          start: "top 72%",
          toggleActions: "play none none reverse",
        },
      });

      featuredTl
        .fromTo(
          ".ws-featured-img",
          { opacity: 0, y: 64, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
          }
        )
        .fromTo(
          ".ws-featured-frame",
          { opacity: 0, scale: 0.8, rotate: -10 },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.85"
        )
        .fromTo(
          ".ws-featured-badge",
          { opacity: 0, y: 28, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            ease: "power2.out",
          },
          "-=0.7"
        )
        .fromTo(
          ".ws-featured-content > *",
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.8"
        )
        .fromTo(
          ".ws-featured-learn-item",
          { opacity: 0, x: -16 },
          {
            opacity: 1,
            x: 0,
            duration: 0.42,
            stagger: 0.05,
            ease: "power2.out",
          },
          "-=0.45"
        )
        .fromTo(
          ".ws-featured-meta > *",
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.5"
        );

      gsap.fromTo(
        ".ws-featured-photo",
        { scale: 1.08, yPercent: -4 },
        {
          scale: 1,
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: ".ws-featured",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        ".ws-group-header > *",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: ".ws-group-header", start: "top 85%" },
        }
      );

      const animateGroupCards = (isDesktop: boolean) => {
        gsap.utils.toArray<HTMLElement>(".ws-group-card").forEach((card) => {
          const media = card.querySelector<HTMLElement>(".ws-group-media");
          const photo = card.querySelector<HTMLElement>(".ws-group-photo");
          const copy = Array.from(
            card.querySelectorAll<HTMLElement>(".ws-group-copy")
          );
          const learnItems = Array.from(
            card.querySelectorAll<HTMLElement>(".ws-learn-item")
          );
          const metaItems = Array.from(
            card.querySelectorAll<HTMLElement>(".ws-group-meta > *")
          );
          const link = card.querySelector<HTMLElement>(".ws-group-link");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: isDesktop ? "top 78%" : "top 86%",
              toggleActions: "play none none reverse",
            },
          });

          tl.fromTo(
            card,
            { opacity: 0, y: isDesktop ? 72 : 52 },
            {
              opacity: 1,
              y: 0,
              duration: isDesktop ? 0.95 : 0.8,
              ease: "power3.out",
            }
          );

          if (media) {
            tl.fromTo(
              media,
              { opacity: 0, y: isDesktop ? 44 : 28, scale: 0.96 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: isDesktop ? 1 : 0.8,
                ease: "power3.out",
              },
              0
            );
          }

          if (copy.length) {
            tl.fromTo(
              copy,
              { opacity: 0, y: 24 },
              {
                opacity: 1,
                y: 0,
                duration: 0.68,
                stagger: 0.08,
                ease: "power2.out",
              },
              0.2
            );
          }

          if (learnItems.length) {
            tl.fromTo(
              learnItems,
              { opacity: 0, x: -16 },
              {
                opacity: 1,
                x: 0,
                duration: 0.4,
                stagger: 0.06,
                ease: "power2.out",
              },
              0.35
            );
          }

          if (metaItems.length) {
            tl.fromTo(
              metaItems,
              { opacity: 0, y: 18 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: "power2.out",
              },
              0.48
            );
          }

          if (link) {
            tl.fromTo(
              link,
              { opacity: 0, y: 18 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
              },
              0.58
            );
          }

          if (photo) {
            gsap.fromTo(
              photo,
              { scale: 1.08, yPercent: isDesktop ? -5 : -2 },
              {
                scale: 1,
                yPercent: isDesktop ? 10 : 6,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          }
        });
      };

      mm.add("(min-width: 768px)", () => {
        animateGroupCards(true);
      });

      mm.add("(max-width: 767px)", () => {
        animateGroupCards(false);
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-brand-bg font-sans text-brand-dark antialiased"
    >
      <WorksNavbar active="workshops" />

      <main>
        {/* ── Hero ── */}
        <section className="ws-hero relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
            <img
              src="https://picsum.photos/seed/wstexture/1920/1080"
              alt=""
              className="ws-hero-texture w-full h-full object-cover scale-110 rotate-1"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="max-w-360 mx-auto px-6 md:px-12 relative z-10">
            <p className="ws-hero-el text-sm uppercase tracking-[0.3em] text-brand-secondary mb-6">
              Learn &amp; Create
            </p>
            <h1 className="ws-hero-el font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tighter text-brand-dark mb-8">
              Our{" "}
              <span className="font-light italic text-brand-primary">
                Workshops
              </span>
            </h1>
            <p className="ws-hero-el text-lg md:text-xl text-brand-primary/80 font-light max-w-2xl leading-relaxed mb-12">
              Hands-on sessions designed to help businesses and teams create
              stronger content, sharpen editing skills, and produce engaging
              social media content that connects with their audience.
            </p>
            <div className="ws-hero-el flex flex-wrap gap-8">
              {["3 Workshops", "Beginner to Advanced", "Private & Group"].map(
                (tag) => (
                  <div
                    key={tag}
                    className="ws-hero-tag flex items-center gap-3 text-brand-primary/60"
                  >
                    <span className="h-px w-8 bg-brand-secondary/40" />
                    <span className="text-[0.6rem] uppercase tracking-widest font-bold">
                      {tag}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* ── Featured: Content That Converts ── */}
        <section className="ws-featured py-24 md:py-32 bg-brand-surface-low overflow-hidden">
          <div className="max-w-[100rem] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] gap-16 lg:gap-20 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="ws-featured-img aspect-4/5 bg-brand-surface-mid overflow-hidden editorial-shadow">
                  <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
                    alt="Content That Converts Workshop"
                    className="ws-featured-photo w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="ws-featured-badge absolute -bottom-8 -right-8 hidden md:block bg-white/40 backdrop-blur-md p-8  editorial-shadow border border-white/20 w-56">
                  <p className="text-[0.6rem] uppercase tracking-[0.3em] text-brand-secondary font-bold mb-2">
                    Duration
                  </p>
                  <p className="text-sm font-serif leading-tight italic pb-12 ">
                    4-hour intensive session tailored to your business.
                  </p>
                </div>
                <div className="ws-featured-frame absolute -top-6 -left-6 w-32 h-32 border border-brand-secondary/10 hidden md:block" />
              </div>

              <div className="ws-featured-content order-1 lg:order-2 w-full lg:max-w-[56rem]">
                <span className="text-[0.6rem] uppercase tracking-widest bg-brand-secondary text-white px-4 py-2 font-bold inline-block mb-8">
                  Private Workshop
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-brand-primary mb-6 leading-tight">
                  Content That Converts
                </h2>
                <p className="text-brand-primary/80 font-light leading-relaxed text-lg mb-10">
                  A 4-hour intensive session built around your business,
                  audience, and goals — helping your team create content that
                  connects, engages, and converts.
                </p>

                <div className="mb-10">
                  <p className="text-xs tracking-[0.3em] uppercase text-brand-secondary font-bold mb-5">
                    What You'll Learn
                  </p>
                  <div className="grid grid-cols-1 2xl:grid-cols-2 gap-x-6 gap-y-3">
                    {featuredLearns.map((item, i) => (
                      <div
                        key={i}
                        className="ws-featured-learn-item flex items-start gap-3 text-brand-primary/80 font-light text-sm leading-relaxed"
                      >
                        <Check className="w-4 h-4 text-brand-secondary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="ws-featured-meta flex flex-wrap gap-10 mb-10 pt-6 border-t border-brand-surface-high/50">
                  <div>
                    <p className="text-xs tracking-[0.3em] uppercase text-brand-secondary font-bold mb-2">
                      Format
                    </p>
                    <p className="text-brand-primary/80 font-light">
                      Private workshop for one business and its team
                    </p>
                  </div>
                  <div>
                    <p className="text-xs tracking-[0.3em] uppercase text-brand-secondary font-bold mb-2">
                      Dates
                    </p>
                    <p className="text-brand-primary/80 font-light">
                      Scheduled on a date chosen by the client
                    </p>
                  </div>
                </div>

                <a
                  href="/contact#contact-form"
                  className="inline-block relative group bg-brand-secondary text-white px-10 py-4 text-xs tracking-[0.2em] uppercase font-medium hover:bg-brand-dark transition-all overflow-hidden"
                >
                  <span className="relative z-10">Enquire Now</span>
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
          </div>
        </section>

        {/* ── Group Workshops ── */}
        <section className="ws-group-section py-24 md:py-32 bg-brand-bg">
          <div className="max-w-360 mx-auto px-6 md:px-12">
            <div className="ws-group-header text-center mb-16 md:mb-20">
              <span className="text-xs tracking-[0.4em] uppercase text-brand-secondary font-bold block mb-4">
                Group Sessions
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-brand-primary">
                Open Workshops
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              {groupWorkshops.map((ws, idx) => (
                <div key={idx} className="ws-group-card group">
                  <div className="ws-group-media aspect-4/3 bg-brand-surface-low mb-8 overflow-hidden relative">
                    <img
                      src={ws.image}
                      alt={ws.title}
                      className="ws-group-photo w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 px-3 py-1.5 text-[0.6rem] uppercase tracking-widest font-bold text-brand-secondary">
                      {ws.level}
                    </div>
                  </div>

                  <span className="ws-group-copy text-[0.5rem] uppercase tracking-widest bg-brand-surface-mid px-3 py-2 text-brand-secondary font-bold">
                    Group Workshop
                  </span>

                  <h3 className="ws-group-copy text-2xl md:text-3xl font-serif text-brand-primary mt-5 mb-3">
                    {ws.title}
                  </h3>

                  <p className="ws-group-copy text-brand-primary/80 font-light leading-relaxed mb-8">
                    {ws.description}
                  </p>

                  <div className="ws-group-copy mb-8">
                    <p className="text-xs tracking-[0.3em] uppercase text-brand-secondary font-bold mb-4">
                      What You'll Learn
                    </p>
                    <ul className="space-y-2.5">
                      {ws.learns.map((item, i) => (
                        <li
                          key={i}
                          className="ws-learn-item flex items-start gap-3 text-brand-primary/80 font-light text-sm leading-relaxed"
                        >
                          <Check className="w-4 h-4 text-brand-secondary shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="ws-group-meta flex gap-8 mb-8 pt-5 border-t border-brand-surface-high/40">
                    <div>
                      <p className="text-[0.6rem] tracking-widest uppercase text-brand-secondary font-bold mb-1">
                        Format
                      </p>
                      <p className="text-brand-primary/70 font-light text-sm">
                        {ws.format}
                      </p>
                    </div>
                    <div>
                      <p className="text-[0.6rem] tracking-widest uppercase text-brand-secondary font-bold mb-1">
                        Dates
                      </p>
                      <p className="text-brand-primary/70 font-light text-sm">
                        {ws.dates}
                      </p>
                    </div>
                  </div>

                  <a
                    href="/contact#contact-form"
                    className="ws-group-link group/link inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-brand-secondary"
                  >
                    Register
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA — Dark ── */}
      </main>

      <SharedFooter />
    </div>
  );
}
