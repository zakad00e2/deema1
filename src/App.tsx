import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ArrowRight, 
  Menu, 
  X,
  Calendar, 
  Megaphone, 
  PenTool, 
  Share2, 
  Sparkles,
  Instagram,
  Linkedin
} from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${isScrolled ? "bg-brand-bg/80 backdrop-blur-md border-brand-surface-high/30" : "bg-transparent border-transparent"}`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.png" alt="Athr Logo" className="h-12 md:h-14" />
        </div>
        <div className="hidden md:flex items-center space-x-12 font-serif text-base tracking-tight">
          <a href="#" className="text-brand-dark border-b border-brand-secondary pb-1">Home</a>
          <a href="#" className="text-brand-primary hover:text-brand-secondary transition-colors">Work</a>
          <a href="#" className="text-brand-primary hover:text-brand-secondary transition-colors">Workshops</a>
          <a href="#" className="text-brand-primary hover:text-brand-secondary transition-colors">Contact</a>
        </div>
        <div className="flex items-center gap-6">
          <button className="hidden md:block relative group bg-brand-secondary text-white px-8 py-2.5 text-sm tracking-widest  font-medium hover:bg-brand-dark transition-all rounded-b-xs overflow-hidden">
            <span className="relative z-10">Let's Talk</span>
            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-60 transition-all duration-700 pointer-events-none flex justify-center items-center">
              <img 
                src="/athr.png" 
                alt="Hover Effect" 
                className="w-[200%] h-[200%] max-w-none object-contain scale-150 group-hover:scale-125 transition-transform duration-700"
              />
            </div>
          </button>
          <Menu 
            className="md:hidden text-brand-secondary w-7 h-7 cursor-pointer" 
            onClick={() => setIsMobileMenuOpen(true)}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-0 left-0 w-full h-screen bg-brand-bg z-[100] flex flex-col px-6 py-6 transition-transform duration-500 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex justify-between items-center mb-16">
          <img src="/logo.png" alt="Athr Logo" className="h-12" />
          <X 
            className="text-brand-secondary w-8 h-8 cursor-pointer hover:rotate-90 transition-transform" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
        </div>
        <div className="flex flex-col space-y-8 font-serif text-2xl text-center flex-grow justify-center pb-20">
          <a href="#" className="text-brand-dark hover:text-brand-secondary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
          <a href="#" className="text-brand-primary hover:text-brand-secondary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Work</a>
          <a href="#" className="text-brand-primary hover:text-brand-secondary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Workshops</a>
          <a href="#" className="text-brand-primary hover:text-brand-secondary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
        </div>
        <div className="mt-auto border-t border-brand-surface-high pt-8 pb-6">
          <button className="w-full relative group bg-brand-secondary text-white py-4 text-sm tracking-[0.2em] uppercase font-medium hover:bg-brand-dark transition-all rounded-sm overflow-hidden">
            <span className="relative z-10">Let's Talk</span>
            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-60 transition-all duration-700 pointer-events-none flex justify-center items-center">
              <img 
                src="/athr.png" 
                alt="Hover Effect" 
                className="w-[200%] h-[200%] max-w-none object-contain scale-150 group-hover:scale-125 transition-transform duration-700"
              />
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(".hero-text > *", 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
    )
    .fromTo(".hero-image", 
      { opacity: 0, scale: 0.9 }, 
      { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }, 
      "-=0.5"
    )
    .fromTo(".hero-badge",
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
      "-=0.8"
    );

    // Parallax effect on the background texture
    gsap.to(".hero-bg", {
      y: 100,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-32 pb-16 md:py-0 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none hero-bg">
        <img 
          src="https://picsum.photos/seed/texture/1920/1080" 
          alt="" 
          className="w-full h-full object-cover scale-110 rotate-1"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 lg:gap-8 items-center relative z-10 w-full">
        <div className="md:col-span-7 lg:col-span-7 hero-text">
          <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[1.1] text-brand-primary font-serif tracking-tighter mb-8">
            Leave an <span className="font-light text-brand-secondary">Athr</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-brand-primary/80 font-light max-w-2xl leading-relaxed mb-12">
We turn ideas into creative campaigns, brand experiences, and exceptional events that leave a lasting impression.
          </p>
          <div className="flex flex-wrap items-center gap-8">
            <button className="relative group bg-brand-secondary text-white px-10 py-4 text-xs tracking-[0.2em] uppercase font-medium hover:bg-brand-dark transition-all overflow-hidden">
              <span className="relative z-10">Work with us</span>
              <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-60 transition-all duration-700 pointer-events-none flex justify-center items-center">
                <img 
                  src="/athr.png" 
                  alt="Hover Effect" 
                  className="w-[200%] h-[200%] max-w-none object-contain scale-150 group-hover:scale-125 transition-transform duration-700"
                />
              </div>
            </button>
            <a href="#" className="group flex items-center gap-3 text-brand-secondary tracking-widest uppercase text-xs font-semibold">
              Our work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
        <div className="md:col-span-5 lg:col-span-5 relative hero-image">
          <div className="relative overflow-visible">
            <img 
              src="/hero-img.png" 
              alt="Creative team collaboration" 
              className="w-full h-auto object-contain drop-shadow-2xl"
            />
          </div>
          {/* <div className="absolute -bottom-10 -left-8 hidden md:block w-48 bg-brand-surface-high/40 backdrop-blur-md p-6 pb-20 border border-white/20 hero-badge">
            <p className="text-[0.6rem] uppercase tracking-[0.3em] text-brand-secondary font-bold mb-2">Heritage</p>
            <p className="text-xs font-serif leading-tight italic">Every encounter is a chance to leave a lasting impression.</p>
          </div> */}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(".about-img", 
      { opacity: 0, x: -50 }, 
      { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
    )
    .fromTo(".about-badge",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(".about-text > *",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" },
      "-=0.8"
    )
    .fromTo(".about-stats > div",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" },
      "-=0.4"
    )
    .fromTo(".stat-num-1", 
      { innerHTML: 0 }, 
      { innerHTML: 120, duration: 2, ease: "power2.out", snap: { innerHTML: 1 } }, 
      "-=0.4"
    )
    .fromTo(".stat-num-2", 
      { innerHTML: 0 }, 
      { innerHTML: 12, duration: 2, ease: "power2.out", snap: { innerHTML: 1 } }, 
      "<"
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-32 bg-brand-surface-low overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="order-2 md:order-1 relative">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80" 
              alt="Deema - Professional portrait" 
              className="about-img w-full h-[600px] object-cover editorial-shadow"
              referrerPolicy="no-referrer"
            />
            <div className="about-badge absolute -bottom-8 -left-8 hidden md:block w-64 bg-white/40 backdrop-blur-md p-8 editorial-shadow border border-white/20">
              <p className="text-[0.6rem] uppercase tracking-[0.3em] text-brand-secondary font-bold mb-2">Signature</p>
              <p className="text-sm font-serif leading-tight italic">
                "The mark we leave is defined by the intentionality of every small detail."
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2 about-text">
            <span className="text-xs tracking-[0.4em] uppercase text-brand-secondary font-bold block mb-6">Meet Deema</span>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-primary mb-8 leading-tight">Creative excellence in every touchpoint.</h2>
            <div className="space-y-6 text-brand-primary/80 font-light leading-relaxed text-lg">
              <p>Deema is the creative mind behind “Athr,” seamlessly blending strategic marketing precision with a refined artistic approach to event design and execution. With a strong eye for detail and a deep understanding of brand storytelling, she transforms ideas into thoughtfully curated experiences. Driven by the belief that true impact—your “Athr”—lives in the finest details, she focuses on crafting immersive environments where every element has purpose, allowing brands to come to life in a natural and authentic way while creating meaningful, lasting connections with audiences.</p>
            </div>
            <div className="mt-12 pt-1 border-t border-brand-surface-high/30 about-stats flex gap-12">
              <div>
                <p className="text-5xl md:text-5xl font-serif text-brand-secondary"><span className="stat-num-1">120</span>+</p>
                <p className="text-xs md:text-sm uppercase tracking-widest text-brand-primary/70 mt-3 font-medium">Experiences Crafted</p>
              </div>
              <div>
                <p className="text-5xl md:text-5xl font-serif text-brand-secondary"><span className="stat-num-2">12</span></p>
                <p className="text-xs md:text-sm uppercase tracking-widest text-brand-primary/70 mt-3 font-medium">Global Awards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Specialisms = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });

      tl.fromTo(".spec-title > *",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
      )
      .fromTo(".spec-card",
        { opacity: 0, y: 80, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.4)" },
        "-=0.4"
      )
      .fromTo(".spec-icon", 
        { opacity: 0, scale: 0, rotation: -45 }, 
        { opacity: 1, scale: 1, rotation: 0, duration: 0.6, stagger: 0.1, ease: "back.out(2)" }, 
        "-=0.8"
      );
    });

    mm.add("(max-width: 767px)", () => {
      gsap.fromTo(".spec-title > *",
        { opacity: 0, y: 40 },
        { 
          opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );

      const cards = gsap.utils.toArray(".spec-card");
      cards.forEach((card: any) => {
        const icon = card.querySelector(".spec-icon");
        
        const tlCard = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          }
        });

        tlCard.fromTo(card,
          { opacity: 0, y: 60, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.2)" }
        ).fromTo(icon,
          { opacity: 0, scale: 0, rotation: -45 }, 
          { opacity: 1, scale: 1, rotation: 0, duration: 0.4, ease: "back.out(2)" },
          "-=0.4"
        );
      });
    });
  }, { scope: sectionRef });

  const BrandExperienceIcon = ({ className }: { className?: string }) => (
    <svg className={`scale-[1.25] ${className}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g data-transform-wrapper="on">
        <g fill="none" className="nc-icon-wrapper">
          <path d="M12 22.5612C15.3137 22.5612 18 21.4099 18 19.9898V17.4183L16.9189 19.0102L13.8131 19.9898H10.8023L7.04547 19.0374L6 17.4183V19.9898C6 21.4099 8.68629 22.5612 12 22.5612Z" fill="currentColor" fillOpacity=".3" data-color="color-2"></path>
          <path d="M18 17.4184C18 18.8385 15.3137 19.9898 12 19.9898C8.68629 19.9898 6 18.8385 6 17.4184C6 15.9982 8.68629 14.8469 12 14.8469C12.4449 14.8469 12.8786 14.8677 13.2959 14.9071C15.5766 15.1223 17.3706 15.8936 17.8645 16.8723C17.9532 17.0483 18 17.231 18 17.4184Z" stroke="currentColor"></path>
          <path d="M6 17.4183V19.9898C6 21.4099 8.68629 22.5612 12 22.5612C15.3137 22.5612 18 21.4099 18 19.9898V17.4183" stroke="currentColor"></path>
          <path d="M12 17.1809V6.95525C12 6.62603 12.162 6.31791 12.4333 6.13134L12.9439 5.78012" stroke="currentColor" strokeLinecap="round"></path>
          <path d="M10 17.1809H14" stroke="currentColor" strokeLinecap="round"></path>
          <path d="M17.676 2.24207C15.4389 2.64268 12.6687 2.73451 12.026 4.58081C11.9022 4.93638 12.1027 5.31282 12.4327 5.49409C16.4136 7.68083 16.5546 4.04422 17.7844 2.42969C17.8443 2.35098 17.7734 2.22463 17.676 2.24207Z" stroke="currentColor"></path>
          <path d="M22.4614 13.6509C21.9387 7.38565 18.9957 7.01982 16.1747 8.66534C10.4042 12.0314 20.5262 13.0941 22.3055 13.7682C22.3814 13.7969 22.4681 13.7317 22.4614 13.6509Z" stroke="currentColor"></path>
          <path d="M1.98466 11.5529C2.5073 5.28763 5.45035 4.92179 8.27133 6.56731C14.0419 9.93338 3.91983 10.996 2.1405 11.6701C2.06469 11.6989 1.97793 11.6336 1.98466 11.5529Z" stroke="currentColor"></path>
          <path d="M12.0014 9.54758L13.5489 8.7657C14.1134 8.48048 14.7796 8.47909 15.3453 8.76194L18.4462 10.3124" stroke="currentColor" strokeLinecap="round"></path>
          <path d="M12.0001 7.28928L10.4525 6.5074C9.88802 6.22218 9.22188 6.22079 8.65619 6.50363L5.5553 8.05408" stroke="currentColor" strokeLinecap="round"></path>
        </g>
      </g>
    </svg>
  );

  const InfluencerIcon = ({ className }: { className?: string }) => (
    <svg className={`scale-[1.25] ${className}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g data-transform-wrapper="on" transform="translate(24 0) scale(-1 1)">
        <g fill="none" className="nc-icon-wrapper">
          <path d="M7 13.75L3.5 12L7 9.75V13.75Z" fill="currentColor" fillOpacity=".3" data-color="color-2"></path>
          <path d="M3 12L7 14" stroke="currentColor"></path>
          <path d="M8 18.5L3.55279 16.2764C3.214 16.107 3 15.7607 3 15.382V12.618C3 12.2393 3.214 11.893 3.55279 11.7236L7 10" stroke="currentColor"></path>
          <path d="M11 12V6L17 3V9L11 12Z" fill="currentColor" fillOpacity=".3" data-color="color-2"></path>
          <path d="M15 22V14L21 11V19L15 22Z" fill="currentColor" fillOpacity=".3" data-color="color-2"></path>
          <path d="M7 4L11 6L17 3" stroke="currentColor"></path>
          <path d="M11 6V20" stroke="currentColor"></path>
          <path d="M17 9V3.61803C17 3.23926 16.786 2.893 16.4472 2.72361L13.6708 1.33541C13.2485 1.12426 12.7515 1.12426 12.3292 1.33541L7.55279 3.72361C7.214 3.893 7 4.23926 7 4.61803V18L12 20.5" stroke="currentColor"></path>
          <path d="M11 12L15 14L21 11" stroke="currentColor"></path>
          <path d="M15 14V22" stroke="currentColor"></path>
          <path d="M21 11.618V18.382C21 18.7607 20.786 19.107 20.4472 19.2764L15.6708 21.6646C15.2485 21.8757 14.7515 21.8757 14.3292 21.6646L11 20V12.618C11 12.2393 11.214 11.893 11.5528 11.7236L17 9L20.4472 10.7236C20.786 10.893 21 11.2393 21 11.618Z" stroke="currentColor"></path>
        </g>
      </g>
    </svg>
  );

  const CreativeCampaignsIcon = ({ className }: { className?: string }) => (
    <svg className={`scale-[1.25] ${className}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g data-transform-wrapper="on" transform="translate(24 0) scale(-1 1)">
        <g fill="none" className="nc-icon-wrapper">
          <path d="M17.5 22.5V10L20.5 8.5V21L17.5 22.5Z" fill="currentColor" fillOpacity=".3" data-color="color-2"></path>
          <path d="M3.5 14.573V3.61803C3.5 3.23926 3.714 2.893 4.05279 2.72361L5.82918 1.83541C6.25147 1.62426 6.74853 1.62426 7.17082 1.83541L19.6708 8.08541C20.179 8.3395 20.5 8.85889 20.5 9.42705V20.382C20.5 20.7608 20.286 21.107 19.9472 21.2764L18.1708 22.1646C17.7485 22.3758 17.2515 22.3758 16.8292 22.1646L4.32918 15.9146C3.821 15.6605 3.5 15.1411 3.5 14.573Z" stroke="currentColor"></path>
          <path d="M10.2507 8.04777V6.25126L13.0767 4.83826" stroke="currentColor" strokeLinecap="round"></path>
          <path d="M7 6.443V4.5L9.74414 3.12793" stroke="currentColor" strokeLinecap="round"></path>
          <path d="M14 9.98119L14 7.99998L16.7146 6.6427" stroke="currentColor" strokeLinecap="round"></path>
          <path d="M3.5 6.75L17.5 13.75L20.5 12.25" stroke="currentColor"></path>
          <path d="M17.5 9.99999L20.2942 8.60291" stroke="currentColor"></path>
          <path d="M3.5 3L17.5 10L17.5 22.5" stroke="currentColor"></path>
          <path d="M9.80889 12.9062C9.82829 12.4511 10.1534 12.2581 10.5351 12.4752C10.9168 12.6923 11.2105 13.2373 11.1911 13.6923C11.1717 14.1474 10.8466 14.3404 10.4649 14.1233C10.0832 13.9062 9.78949 13.3613 9.80889 12.9062Z" fill="currentColor"></path>
          <path d="M9.80889 15.5564C9.82829 15.1013 10.1534 14.9084 10.5351 15.1255C10.9168 15.3426 11.2105 15.8875 11.1911 16.3426C11.1717 16.7977 10.8466 16.9906 10.4649 16.7735C10.0832 16.5564 9.78949 16.0115 9.80889 15.5564Z" fill="currentColor"></path>
          <path d="M13.2598 14.6244C13.2792 14.1693 13.6044 13.9764 13.9861 14.1935C14.3677 14.4106 14.6614 14.9555 14.642 15.4106C14.6226 15.8657 14.2975 16.0586 13.9158 15.8415C13.5341 15.6244 13.2404 15.0795 13.2598 14.6244Z" fill="currentColor"></path>
          <path d="M13.2598 17.2747C13.2792 16.8196 13.6044 16.6267 13.9861 16.8438C14.3677 17.0609 14.6614 17.6058 14.642 18.0609C14.6226 18.516 14.2975 18.7089 13.9158 18.4918C13.5341 18.2747 13.2404 17.7298 13.2598 17.2747Z" fill="currentColor"></path>
          <path d="M6.35796 11.1725C6.37736 10.7174 6.70251 10.5245 7.0842 10.7416C7.46589 10.9587 7.75959 11.5036 7.74018 11.9587C7.72078 12.4138 7.39563 12.6067 7.01394 12.3896C6.63225 12.1725 6.33856 11.6276 6.35796 11.1725Z" fill="currentColor"></path>
          <path d="M6.35796 13.8228C6.37736 13.3677 6.70251 13.1748 7.0842 13.3919C7.46589 13.609 7.75959 14.1539 7.74018 14.609C7.72078 15.0641 7.39563 15.257 7.01394 15.0399C6.63225 14.8228 6.33856 14.2779 6.35796 13.8228Z" fill="currentColor"></path>
        </g>
      </g>
    </svg>
  );

  const EventConceptIcon = ({ className }: { className?: string }) => (
    <svg className={`scale-[1.25] ${className}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g data-transform-wrapper="on">
        <g fill="none" className="nc-icon-wrapper">
          <path d="M6.99988 6.49999L5.90502 5.96196C5.5913 5.02961 6.10316 4.02119 7.04095 3.72408L7.20785 3.6712L7.99988 3.99999L7.49988 4.99999L6.99988 6.49999Z" fill="currentColor" fillOpacity=".3" data-color="color-2"></path>
          <path d="M12.5563 20.8301L9.51611 19.31L20.3798 14.1931L21.3142 14.7537C22.5205 15.3167 22.1463 16.3797 21.4391 16.7316L12.9396 21.0672L12.5563 20.8301Z" fill="currentColor" fillOpacity=".3" data-color="color-2"></path>
          <path d="M20.5 14.25L21.7111 14.8556C22.4482 15.2241 22.4482 16.2759 21.7111 16.6444L11.1708 21.9146C10.7485 22.1257 10.2515 22.1257 9.82918 21.9146L2.28885 18.1444C1.55181 17.7759 1.55181 16.7241 2.28885 16.3556L3.5 15.75" stroke="currentColor"></path>
          <path d="M8.17713 10.4114L2.28885 13.3556C1.55181 13.7241 1.55181 14.7759 2.28885 15.1444L9.82918 18.9146C10.2515 19.1257 10.7485 19.1257 11.1708 18.9146L21.7111 13.6444C22.4482 13.2759 22.4482 12.2241 21.7111 11.8556L18.8229 10.4114" stroke="currentColor"></path>
          <path d="M8 7.75001L11.3292 6.08542C11.7515 5.87428 12.2485 5.87428 12.6708 6.08542L17.2466 8.37329" stroke="currentColor"></path>
          <path d="M20 7V9L19 10.5L17 11.625L14 12V9L17 8.5L20 7Z" fill="currentColor" fillOpacity=".3" data-color="color-2"></path>
          <path d="M7 6.75004L2.71902 4.60953C2.27836 4.3892 2 3.93881 2 3.44614C2 3.01124 2.21735 2.60512 2.5792 2.36388L2.71964 2.27025C3.20219 1.94854 3.82013 1.91007 4.33887 2.16944L8.2564 4.12821" stroke="currentColor"></path>
          <path d="M20 6L20 8.5C20 10.433 17.0899 12 13.5 12C9.91015 12 7 10.433 7 8.5L7 6" stroke="currentColor"></path>
          <path d="M20 6C20 7.65685 17.0899 9 13.5 9C9.91015 9 7 7.65685 7 6C7 4.34314 9.91015 3 13.5 3C17.0899 3 20 4.34314 20 6Z" stroke="currentColor"></path>
          <path d="M7 13.75L11 15.75" stroke="currentColor" strokeLinecap="round"></path>
        </g>
      </g>
    </svg>
  );

  const CreativeDirectionIcon = ({ className }: { className?: string }) => (
    <svg className={`scale-x-[-1.25] scale-y-[1.25] ${className}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g data-transform-wrapper="on">
        <g fill="none" className="nc-icon-wrapper">
          <path d="M4.5 8.25V7L18 13.5V15L4.5 8.25Z" fill="currentColor" fillOpacity=".3" data-color="color-2"></path>
          <path d="M20.9452 8.724L18.542 9.98669V13.8155L20.9452 12.7157V8.724Z" fill="currentColor" fillOpacity=".3" data-color="color-2"></path>
          <path d="M18.5064 9.99681L21 8.75" stroke="currentColor"></path>
          <path d="M3 2.25L18.5 10V13.75" stroke="currentColor"></path>
          <path d="M4.82918 1.33541L3.55279 1.97361C3.214 2.143 3 2.48926 3 2.86803V5.62964C3 6.00963 3.21536 6.35678 3.55579 6.52557L17.8484 13.612C18.2599 13.816 18.7422 13.8203 19.1572 13.6235L20.4283 13.021C20.7774 12.8555 21 12.5037 21 12.1174V9.36803C21 8.98926 20.786 8.643 20.4472 8.47361L6.17082 1.33541C5.74853 1.12426 5.25147 1.12426 4.82918 1.33541Z" stroke="currentColor"></path>
          <path d="M4.5 7V15.3153C4.5 15.8832 4.82071 16.4024 5.32853 16.6566L16.5524 22.2753C17.2173 22.6082 18 22.1247 18 21.3811V13.5" stroke="currentColor"></path>
          <path d="M10 19V22" stroke="currentColor" strokeLinecap="round"></path>
          <path d="M7 13.4312L8.72317 14.352L9.43598 16.0009L10.1488 16.3641L10.8872 15.026L11.9055 15.5448L12.8365 14L15 15.0861" stroke="currentColor" strokeLinecap="square" strokeLinejoin="round"></path>
        </g>
      </g>
    </svg>
  );

  const services = [
    { icon: CreativeCampaignsIcon, title: "Creative Campaigns & Concepts", desc: "From conceptual blueprints to flawless execution, we handle the intricate machinery of elite gatherings." },
    { icon: EventConceptIcon, title: "Event Concept & Production", desc: "Narrative-driven campaigns that cut through the noise and deliver measurable brand affinity." },
    { icon: BrandExperienceIcon, title: "Brand Experience", desc: "Defining the visual and verbal language of your brand's unique presence." },
    { icon: InfluencerIcon, title: "Influencer & Content Strategy", desc: "Strategic partnerships and content that resonates with your target audience." },
    { icon: CreativeDirectionIcon, title: "Creative Direction & Consulting", desc: "High-level vision and execution for your most ambitious projects." }
  ];

  return (
    <section ref={sectionRef} className="py-32 bg-brand-bg overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="mb-20 text-center max-w-2xl mx-auto spec-title">
          <h2 className="text-4xl font-serif text-brand-primary mb-6">Our Specialisms</h2>
          <p className="text-brand-primary/70 font-light">Comprehensive solutions designed for those who value substance over spectacle.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className={`spec-card ${idx < 2 ? 'md:col-span-3' : 'md:col-span-2'} bg-brand-surface-low p-12 flex flex-col justify-between group hover:bg-brand-secondary transition-all duration-500 cursor-pointer`}
            >
              <div>
                <div className="spec-icon inline-block mb-8">
                  <service.icon className="w-12 h-12 text-brand-secondary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-serif mb-4 group-hover:text-white transition-colors">{service.title}</h3>
                <p className="text-brand-primary/70 group-hover:text-white/80 font-light transition-colors">{service.desc}</p>
              </div>
              <div className="mt-12 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 transform translate-y-0 md:translate-y-2 md:group-hover:translate-y-0">
                <a href="#" className="text-brand-secondary group-hover:text-white transition-colors text-[0.6rem] tracking-widest uppercase flex items-center gap-2">
                  Explore <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CaseStudy = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      }
    });

    tl.fromTo(".case-header-content",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" }
    )
    .fromTo(".case-header-link",
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(".case-media",
      { opacity: 0, scale: 0.95, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.4"
    )
    .fromTo(".case-content",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-32 bg-brand-surface-mid">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-0 mb-12 md:mb-16">
          <div className="case-header-content">
            <span className="text-xs tracking-[0.4em] uppercase text-brand-secondary font-bold block mb-4">Case Study</span>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-primary">The Obsidian Gala</h2>
          </div>
          <a href="#" className="case-header-link text-[0.6rem] tracking-widest uppercase font-semibold text-brand-primary/60 hover:text-brand-secondary transition-colors pb-2 border-b border-brand-surface-high whitespace-nowrap">
            See All Projects
          </a>
        </div>
        <div className="relative group">
          <div className="case-media aspect-square sm:aspect-[4/3] md:aspect-[21/9] w-full bg-brand-dark overflow-hidden">
            <img 
              src="https://picsum.photos/seed/gala/1600/800" 
              alt="The Obsidian Gala" 
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[2s]"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="case-content md:absolute relative md:bottom-0 md:right-0 p-8 md:p-12 bg-brand-surface-low md:bg-brand-bg w-[85%] sm:w-[75%] md:w-full md:max-w-lg editorial-shadow z-10 -mt-16 md:mt-0 mx-auto md:mx-0 border border-white/5 md:border-none">
            <h4 className="text-xl sm:text-2xl font-serif mb-4">A study in contrast and intimacy.</h4>
            <p className="text-brand-primary/70 font-sm md:font-light leading-relaxed mb-6">A private launch event for a luxury automotive brand, focusing on sensory immersion and architectural lighting.</p>
            <div className="flex flex-wrap gap-3">
              <span className="text-[0.5rem] uppercase tracking-widest bg-brand-bg px-3 py-2 text-brand-secondary font-bold">Creative Direction</span>
              <span className="text-[0.5rem] uppercase tracking-widest bg-brand-bg px-3 py-2 text-brand-secondary font-bold">Event Production</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Workshops = () => {
  const sectionRef = useRef(null);
  const items = [
    { date: "DEC 12", title: "The Art of Presence", desc: "Exploring spatial psychology and how environment shapes brand memory." },
    { date: "JAN 08", title: "Tactile Strategy", desc: "Moving beyond digital: Why physical touch remains the ultimate marketing tool." },
    { date: "FEB 20", title: "Minimalist Impact", desc: "How to create high-impact experiences using the power of restraint." }
  ];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      }
    });

    tl.fromTo(".workshops-header > *",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
    )
    .fromTo(".workshop-item",
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "back.out(1.2)" },
      "-=0.4"
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-32 bg-brand-bg">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="workshops-header mb-16">
          <h2 className="text-4xl font-serif text-brand-primary mb-2">Upcoming Workshops</h2>
          <p className="text-brand-primary/70 font-light">Join us for intimate Sessions exploring the art of the 'Athr'.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {items.map((item, idx) => (
            <div key={idx} className="workshop-item group cursor-pointer">
              <div className="aspect-square bg-brand-surface-low mb-6 overflow-hidden relative">
                <img 
                  src={`https://picsum.photos/seed/workshop${idx}/800/800`} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 text-[0.6rem] uppercase tracking-widest font-bold text-brand-secondary">
                  {item.date}
                </div>
              </div>
              <h3 className="text-xl font-serif text-brand-primary mb-2">{item.title}</h3>
              <p className="text-brand-primary/70 font-light text-sm leading-relaxed mb-4">{item.desc}</p>
              <span className="text-[0.6rem] tracking-widest uppercase font-bold text-brand-secondary border-b border-brand-secondary/20 pb-1 group-hover:border-brand-secondary transition-all">
                Register
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => null;

const Product = () => (
  <section className="py-32 bg-brand-surface-high">
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="max-w-md">
            <span className="text-xs tracking-[0.4em] uppercase text-brand-secondary font-bold block mb-4">Limited Edition</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-brand-primary mb-4 leading-tight whitespace-nowrap">The Athr Planner</h2>
            <p className="text-lg font-serif italic text-brand-primary/70 mb-6">Plan, create, leave an Athr</p>
            <p className="text-brand-primary/80 font-light leading-relaxed mb-12">
              Designed for the visionary mind, this physical companion bridges the gap between ambitious ideation and tactile execution. A signature piece of our methodology, now available for your personal ritual.
            </p>
            <button className="bg-brand-secondary text-white px-10 py-4 text-xs tracking-[0.2em] uppercase font-medium hover:bg-brand-dark transition-all editorial-shadow">
              Explore the Planner
            </button>
          </div>
        </div>
        <div className="lg:col-span-7 order-1 lg:order-2">
          <div className="relative group">
            <div className="aspect-square bg-brand-surface-low overflow-hidden editorial-shadow">
              <img 
                src="https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1000&q=80" 
                alt="The Athr Planner" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -top-6 -right-6 w-32 h-32 border border-brand-secondary/10 hidden md:block"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border border-brand-secondary/10 hidden md:block"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-brand-surface-low py-24 border-t border-brand-surface-high/30">
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start gap-12">
      <div className="max-w-sm">
        <img src="/logo.png" alt="Athr Logo" className="h-12 md:h-16 mb-6" />
        <p className="text-brand-primary/60 text-sm font-light leading-relaxed mb-8">
          An editorial marketing and event agency dedicated to the craft of enduring experiences.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-brand-primary/40 hover:text-brand-secondary transition-colors"><Instagram className="w-5 h-5" /></a>
          <a href="#" className="text-brand-primary/40 hover:text-brand-secondary transition-colors"><Linkedin className="w-5 h-5" /></a>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-24">
        <div className="flex flex-col gap-4">
          <p className="text-[0.6rem] tracking-widest uppercase text-brand-secondary font-bold mb-2">Explore</p>
          <a href="#" className="text-brand-primary/60 hover:text-brand-secondary transition-colors text-xs tracking-widest uppercase">Journal</a>
          <a href="#" className="text-brand-primary/60 hover:text-brand-secondary transition-colors text-xs tracking-widest uppercase">Workshops</a>
          <a href="#" className="text-brand-primary/60 hover:text-brand-secondary transition-colors text-xs tracking-widest uppercase">Archives</a>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-[0.6rem] tracking-widest uppercase text-brand-secondary font-bold mb-2">Legal</p>
          <a href="#" className="text-brand-primary/60 hover:text-brand-secondary transition-colors text-xs tracking-widest uppercase">Privacy</a>
          <a href="#" className="text-brand-primary/60 hover:text-brand-secondary transition-colors text-xs tracking-widest uppercase">Terms</a>
        </div>
      </div>
    </div>
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 mt-24 flex justify-between items-center text-[0.5rem] uppercase tracking-[0.4em] text-brand-primary/30">
      <p>© 2024 Athr. All rights reserved.</p>
      <p>Designed with Intent</p>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Specialisms />
      <CaseStudy />
      <Workshops />
      <CTA />
      <Product />
      <Footer />
    </div>
  );
}
