import { Instagram, Linkedin } from "lucide-react";

export default function SharedFooter() {
  return (
    <footer id="contact" className="border-t border-white/8 bg-brand-dark py-24">
      <div className="mx-auto grid max-w-360 gap-12 px-6 md:px-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.45fr)]">
        <div className="max-w-sm">
          <img src="/logo.png" alt="Athr Logo" className="mb-6 h-12 md:h-16" />
          <p className="mb-8 text-sm font-light leading-relaxed text-white/62">
            An editorial marketing and event agency dedicated to the craft of enduring experiences.
          </p>
          <div className="flex gap-6">
            <a href="/" className="text-white/45 transition-colors hover:text-brand-secondary" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="/" className="text-white/45 transition-colors hover:text-brand-secondary" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 sm:pl-8 lg:pl-10">
      

          <div className="flex flex-col gap-4">
            <p className="text-[0.6rem] font-bold uppercase tracking-widest text-brand-secondary">Explore</p>
            <a href="/" className="text-xs uppercase tracking-widest text-white/62 transition-colors hover:text-brand-secondary">
              Home
            </a>
            <a href="/work" className="text-xs uppercase tracking-widest text-white/62 transition-colors hover:text-brand-secondary">
              Portfolio
            </a>
            <a href="/workshops" className="text-xs uppercase tracking-widest text-white/62 transition-colors hover:text-brand-secondary">
              Workshops
            </a>
            <a href="/contact" className="text-xs uppercase tracking-widest text-white/62 transition-colors hover:text-brand-secondary">
              Contact
            </a>
          </div>

              <div className="flex flex-col gap-6">
            <p className="text-[0.6rem] font-bold uppercase tracking-widest text-brand-secondary">Contact</p>
            <div className="flex flex-col gap-2">
              <a href="mailto:hello@athr.studio" className="text-xs tracking-widest text-white/62 transition-colors hover:text-brand-secondary">
                hello@athr.studio
              </a>
              <a href="tel:+97143411367" className="text-xs tracking-widest text-white/62 transition-colors hover:text-brand-secondary">
                +971 (0) 4 341 1367
              </a>
            </div>
            <p className="text-xs leading-relaxed tracking-widest text-white/62">
              482 Al Serkal Avenue
              <br />
              Al Quoz 1, Dubai
              <br />
              United Arab Emirates
            </p>
          </div>

        </div>
      </div>

      <div className="mx-auto mt-24 flex max-w-360 justify-between px-6 text-[0.5rem] uppercase tracking-[0.4em] text-white/28 md:px-12">
        <p>© 2024 Athr. All rights reserved.</p>
        <p>Designed with Intent</p>
      </div>
    </footer>
  );
}
