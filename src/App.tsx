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
          <button className="hidden md:block relative group bg-brand-secondary text-white px-8 py-2.5 text-sm tracking-widest uppercase font-medium hover:bg-brand-dark transition-all rounded-b-xs overflow-hidden">
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
            Crafting enduring marketing legacies and bespoke event experiences that resonate through time and space.
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
  }, { scope: sectionRef });

  const services = [
    { icon: Calendar, title: "Creative Campaigns & Concepts", desc: "From conceptual blueprints to flawless execution, we handle the intricate machinery of elite gatherings." },
    { icon: Megaphone, title: "Event Concept & Production", desc: "Narrative-driven campaigns that cut through the noise and deliver measurable brand affinity." },
    { icon: PenTool, title: "Brand Experience", desc: "Defining the visual and verbal language of your brand's unique presence." },
    { icon: Share2, title: "Influencer & Content Strategy", desc: "Strategic partnerships and content that resonates with your target audience." },
    { icon: Sparkles, title: "Creative Direction & Consulting", desc: "High-level vision and execution for your most ambitious projects." }
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
              className={`spec-card ${idx < 2 ? 'md:col-span-3' : 'md:col-span-2'} bg-brand-surface-low p-12 flex flex-col justify-between group hover:bg-brand-secondary transition-all duration-500 cursor-default`}
            >
              <div>
                <div className="spec-icon inline-block p-4 bg-brand-surface-high/50 rounded-full mb-8 group-hover:bg-white/10 transition-colors">
                  <service.icon className="w-8 h-8 text-brand-secondary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-serif mb-4 group-hover:text-white transition-colors">{service.title}</h3>
                <p className="text-brand-primary/70 group-hover:text-white/80 font-light transition-colors">{service.desc}</p>
              </div>
              <div className="mt-12 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                <a href="#" className="text-white text-[0.6rem] tracking-widest uppercase flex items-center gap-2">
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

const CaseStudy = () => (
  <section className="py-32 bg-brand-surface-mid">
    <div className="max-w-[1440px] mx-auto px-6 md:px-12">
      <div className="flex justify-between items-end mb-16">
        <div>
          <span className="text-xs tracking-[0.4em] uppercase text-brand-secondary font-bold block mb-4">Case Study</span>
          <h2 className="text-4xl md:text-5xl font-serif text-brand-primary">The Obsidian Gala</h2>
        </div>
        <a href="#" className="text-[0.6rem] tracking-widest uppercase font-semibold text-brand-primary/60 hover:text-brand-secondary transition-colors pb-2 border-b border-brand-surface-high">
          See All Projects
        </a>
      </div>
      <div className="relative group overflow-hidden">
        <div className="aspect-[21/9] w-full bg-brand-dark overflow-hidden">
          <img 
            src="https://picsum.photos/seed/gala/1600/800" 
            alt="The Obsidian Gala" 
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[2s]"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute bottom-0 right-0 p-12 bg-brand-bg max-w-lg editorial-shadow">
          <h4 className="text-2xl font-serif mb-4">A study in contrast and intimacy.</h4>
          <p className="text-brand-primary/70 font-light mb-6">A private launch event for a luxury automotive brand, focusing on sensory immersion and architectural lighting.</p>
          <div className="flex gap-4">
            <span className="text-[0.5rem] uppercase tracking-widest bg-brand-surface-low px-3 py-1 text-brand-secondary font-bold">Creative Direction</span>
            <span className="text-[0.5rem] uppercase tracking-widest bg-brand-surface-low px-3 py-1 text-brand-secondary font-bold">Event Production</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Workshops = () => {
  const items = [
    { date: "DEC 12", title: "The Art of Presence", desc: "Exploring spatial psychology and how environment shapes brand memory." },
    { date: "JAN 08", title: "Tactile Strategy", desc: "Moving beyond digital: Why physical touch remains the ultimate marketing tool." },
    { date: "FEB 20", title: "Minimalist Impact", desc: "How to create high-impact experiences using the power of restraint." }
  ];

  return (
    <section className="py-32 bg-brand-bg">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="mb-16">
          <h2 className="text-4xl font-serif text-brand-primary mb-2">Upcoming Workshops</h2>
          <p className="text-brand-primary/70 font-light">Join us for intimate sessions exploring the art of the 'Athr'.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {items.map((item, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="aspect-square bg-brand-surface-low mb-6 overflow-hidden relative">
                <img 
                  src={`https://picsum.photos/seed/workshop${idx}/800/800`} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
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
            <h2 className="text-5xl md:text-6xl font-serif text-brand-primary mb-6 leading-tight">The Athr Planner</h2>
            <p className="text-lg font-serif italic text-brand-primary/70 mb-10">Plan, create, leave an Athr</p>
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
                src="https://picsum.photos/seed/planner/1000/1000" 
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
        <div className="text-2xl font-serif text-brand-primary mb-6">Athr</div>
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
