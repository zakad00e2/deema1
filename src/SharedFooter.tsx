import { Instagram, Linkedin } from "lucide-react";

export default function SharedFooter() {
  return (
    <footer id="contact" className="bg-brand-dark py-24 border-t border-white/8">
      <div className="max-w-360 mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-sm">
          <img src="/logo.png" alt="Athr Logo" className="h-12 md:h-16 mb-6" />
          <p className="text-white/62 text-sm font-light leading-relaxed mb-8">
            An editorial marketing and event agency dedicated to the craft of enduring experiences.
          </p>
          <div className="flex gap-6">
            <a href="/" className="text-white/45 hover:text-brand-secondary transition-colors" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="/" className="text-white/45 hover:text-brand-secondary transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-24">
          <div className="flex flex-col gap-4">
            <p className="text-[0.6rem] tracking-widest uppercase text-brand-secondary font-bold mb-2">Explore</p>
            <a href="/work#journal" className="text-white/62 hover:text-brand-secondary transition-colors text-xs tracking-widest uppercase">
              Journal
            </a>
            <a href="/workshops" className="text-white/62 hover:text-brand-secondary transition-colors text-xs tracking-widest uppercase">
              Workshops
            </a>
            <a href="/work" className="text-white/62 hover:text-brand-secondary transition-colors text-xs tracking-widest uppercase">
              Work
            </a>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-[0.6rem] tracking-widest uppercase text-brand-secondary font-bold mb-2">Legal</p>
            <a href="/#contact" className="text-white/62 hover:text-brand-secondary transition-colors text-xs tracking-widest uppercase">
              Privacy
            </a>
            <a href="/#contact" className="text-white/62 hover:text-brand-secondary transition-colors text-xs tracking-widest uppercase">
              Terms
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-360 mx-auto px-6 md:px-12 mt-24 flex justify-between items-center text-[0.5rem] uppercase tracking-[0.4em] text-white/28">
        <p>© 2024 Athr. All rights reserved.</p>
        <p>Designed with Intent</p>
      </div>
    </footer>
  );
}
