import { motion } from "motion/react";
import { 
  ArrowRight, 
  Menu, 
  Calendar, 
  Megaphone, 
  PenTool, 
  Share2, 
  Sparkles,
  Instagram,
  Linkedin
} from "lucide-react";

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 bg-brand-bg/80 backdrop-blur-md border-b border-brand-surface-high/30">
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex justify-between items-center">
      <div className="text-2xl font-serif tracking-tighter text-brand-primary">Athr</div>
      <div className="hidden md:flex items-center space-x-12 font-serif text-sm tracking-tight">
        <a href="#" className="text-brand-dark border-b border-brand-secondary pb-1">Home</a>
        <a href="#" className="text-brand-primary hover:text-brand-secondary transition-colors">Work</a>
        <a href="#" className="text-brand-primary hover:text-brand-secondary transition-colors">Workshops</a>
        <a href="#" className="text-brand-primary hover:text-brand-secondary transition-colors">Contact</a>
      </div>
      <div className="flex items-center gap-6">
        <button className="bg-brand-secondary text-white px-8 py-2 text-xs tracking-widest uppercase hover:bg-brand-dark transition-all rounded-sm">
          Inquire
        </button>
        <Menu className="md:hidden text-brand-secondary w-6 h-6 cursor-pointer" />
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
    <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
      <img 
        src="https://picsum.photos/seed/texture/1920/1080" 
        alt="" 
        className="w-full h-full object-cover scale-110 rotate-1"
        referrerPolicy="no-referrer"
      />
    </div>
    <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="md:col-span-7"
      >
        <h1 className="text-6xl md:text-8xl leading-[1.1] text-brand-primary font-serif tracking-tighter mb-8">
          Leave an <span className="italic text-brand-secondary">Athr</span>
        </h1>
        <p className="text-xl md:text-2xl text-brand-primary/80 font-light max-w-xl leading-relaxed mb-12">
          Crafting enduring marketing legacies and bespoke event experiences that resonate through time and space.
        </p>
        <div className="flex flex-wrap items-center gap-8">
          <button className="bg-brand-secondary text-white px-10 py-4 text-xs tracking-[0.2em] uppercase font-medium hover:bg-brand-dark transition-all">
            Work with us
          </button>
          <a href="#" className="group flex items-center gap-3 text-brand-secondary tracking-widest uppercase text-xs font-semibold">
            Our work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="md:col-span-5 relative"
      >
        <div className="aspect-[4/5] bg-brand-surface-mid relative editorial-shadow overflow-hidden">
          <img 
            src="https://picsum.photos/seed/creative/800/1000" 
            alt="Creative team collaboration" 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute -bottom-8 -left-8 hidden md:block w-48 bg-brand-surface-high/40 backdrop-blur-md p-6 border border-white/20">
          <p className="text-[0.6rem] uppercase tracking-[0.3em] text-brand-secondary font-bold mb-2">Heritage</p>
          <p className="text-xs font-serif leading-tight italic">Every encounter is a chance to leave a lasting impression.</p>
        </div>
      </motion.div>
    </div>
  </section>
);

const About = () => (
  <section className="py-32 bg-brand-surface-low">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        <div className="order-2 md:order-1 relative">
          <img 
            src="https://picsum.photos/seed/editorial/800/1000" 
            alt="Editorial photography" 
            className="w-full h-[600px] object-cover editorial-shadow"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-8 -left-8 hidden md:block w-64 bg-white/40 backdrop-blur-md p-8 editorial-shadow border border-white/20">
            <p className="text-[0.6rem] uppercase tracking-[0.3em] text-brand-secondary font-bold mb-2">Signature</p>
            <p className="text-sm font-serif leading-tight italic">
              "The mark we leave is defined by the intentionality of every small detail."
            </p>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <span className="text-xs tracking-[0.4em] uppercase text-brand-secondary font-bold block mb-6">Meet Deema</span>
          <h2 className="text-4xl md:text-5xl font-serif text-brand-primary mb-8 leading-tight">Editorial excellence in every touchpoint.</h2>
          <div className="space-y-6 text-brand-primary/80 font-light leading-relaxed text-lg">
            <p>Athr is a boutique agency born from the desire to merge strategic marketing rigor with the soul of high-end event management.</p>
            <p>Based on the philosophy that true impact—your 'Athr'—is found in the quiet details, we curate atmospheres where brands breathe and audiences connect deeply.</p>
          </div>
          <div className="mt-12 pt-12 border-t border-brand-surface-high/30">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-3xl font-serif text-brand-secondary">120+</p>
                <p className="text-[0.6rem] uppercase tracking-widest text-brand-primary/60 mt-1">Experiences Crafted</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-brand-secondary">12</p>
                <p className="text-[0.6rem] uppercase tracking-widest text-brand-primary/60 mt-1">Global Awards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Specialisms = () => {
  const services = [
    { icon: Calendar, title: "Creative Campaigns & Concepts", desc: "From conceptual blueprints to flawless execution, we handle the intricate machinery of elite gatherings." },
    { icon: Megaphone, title: "Event Concept & Production", desc: "Narrative-driven campaigns that cut through the noise and deliver measurable brand affinity." },
    { icon: PenTool, title: "Brand Experience", desc: "Defining the visual and verbal language of your brand's unique presence." },
    { icon: Share2, title: "Influencer & Content Strategy", desc: "Strategic partnerships and content that resonates with your target audience." },
    { icon: Sparkles, title: "Creative Direction & Consulting", desc: "High-level vision and execution for your most ambitious projects." }
  ];

  return (
    <section className="py-32 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-serif text-brand-primary mb-6">Our Specialisms</h2>
          <p className="text-brand-primary/70 font-light">Comprehensive solutions designed for those who value substance over spectacle.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className={`${idx < 2 ? 'md:col-span-3' : 'md:col-span-2'} bg-brand-surface-low p-12 flex flex-col justify-between group hover:bg-brand-secondary transition-all duration-500 cursor-default`}
            >
              <div>
                <service.icon className="w-8 h-8 mb-8 text-brand-secondary group-hover:text-white transition-colors" />
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
    <div className="max-w-7xl mx-auto px-6 md:px-12">
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
      <div className="max-w-7xl mx-auto px-6 md:px-12">
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

const CTA = () => (
  <section className="py-48 bg-brand-surface-low text-center overflow-hidden relative">
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
      <div className="text-[30rem] font-serif absolute -bottom-40 -left-20 leading-none">A</div>
      <div className="text-[30rem] font-serif absolute -top-40 -right-20 leading-none">T</div>
    </div>
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <h2 className="text-5xl md:text-7xl font-serif text-brand-primary mb-12 max-w-4xl mx-auto leading-tight">
        Ready to leave your mark?
      </h2>
      <button className="bg-brand-secondary text-white px-16 py-6 text-xs tracking-[0.3em] uppercase font-bold hover:bg-brand-dark transition-all editorial-shadow">
        Start a Project
      </button>
    </div>
  </section>
);

const Product = () => (
  <section className="py-32 bg-brand-surface-high">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
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
    <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start gap-12">
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
    <div className="max-w-7xl mx-auto px-6 md:px-12 mt-24 flex justify-between items-center text-[0.5rem] uppercase tracking-[0.4em] text-brand-primary/30">
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
