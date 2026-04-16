import { useState, useEffect, useRef } from "react";
import AdminApp from "./admin/AdminApp";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WorkCaseStudyPage from "./WorkCaseStudyPage";
import WorksPage from "./WorksPage";
import WorkshopsPage from "./WorkshopsPage";
import ContactPage from "./ContactPage";
import SharedFooter from "./SharedFooter";
import { useLanguage } from "./i18n/LanguageContext";
import {
  getBrandLogoGreySrc,
  getBrandLogoWhiteSrc,
} from "./brandLogo";
import { 
  ArrowRight,
  ArrowLeft,
  Menu, 
  X,
  Globe,
} from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function LanguageSwitcher({
  className = "",
  tone = "brand",
}: {
  className?: string;
  tone?: "brand" | "light";
}) {
  const { locale, setLocale, t } = useLanguage();
  const toneClass =
    tone === "light"
      ? "text-white hover:text-white/75"
      : "text-brand-primary hover:text-brand-secondary";

  return (
    <button
      type="button"
      onClick={() => setLocale(locale === "en" ? "ar" : "en")}
      className={`lang-switch flex items-center gap-1.5 text-xs font-medium transition-colors ${toneClass} ${className}`}
      aria-label="Switch language"
    >
      <Globe className="w-4 h-4" />
      <span>{t("langSwitch.label")}</span>
    </button>
  );
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, isRTL, locale } = useLanguage();
  const brandLogoSrc = isScrolled
    ? getBrandLogoGreySrc(locale)
    : getBrandLogoWhiteSrc(locale);
  const mobileMenuLogoSrc = getBrandLogoGreySrc(locale);
  const desktopNavLinkClass = isScrolled
    ? "text-brand-primary hover:text-brand-secondary transition-colors"
    : "text-white hover:text-white/75 transition-colors";
  const desktopActiveNavLinkClass = isScrolled
    ? "text-brand-dark border-b border-brand-secondary pb-1 transition-colors"
    : "text-white border-b border-white/75 pb-1 transition-colors";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${isScrolled ? "bg-brand-bg/80 backdrop-blur-md border-brand-surface-high/30" : "bg-transparent border-transparent"}`}>
      <div className="max-w-360 mx-auto h-16 md:h-[4.5rem] px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" aria-label="Go to home page">
            <img src={brandLogoSrc} alt="Athr Logo" className="h-16 md:h-20" />
          </a>
        </div>
        <div className={`hidden md:flex items-center ${isRTL ? "gap-12" : "space-x-12"} font-serif text-base tracking-tight`}>
          <a href="/" className={desktopActiveNavLinkClass}>{t("nav.home")}</a>
          <a href="/work" className={desktopNavLinkClass}>{t("nav.portfolio")}</a>
          <a href="/workshops" className={desktopNavLinkClass}>{t("nav.workshops")}</a>
          <a href="/contact" className={desktopNavLinkClass}>{t("nav.contact")}</a>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <LanguageSwitcher className="hidden md:flex" tone={isScrolled ? "brand" : "light"} />
          <a href="/contact#contact-form" className="hidden md:block relative group bg-brand-secondary text-white px-8 py-2.5 text-sm tracking-widest font-medium hover:bg-brand-dark transition-all rounded-b-xs overflow-hidden">
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

      {/* Mobile Menu */}
      <div className={`fixed top-0 ${isRTL ? "right-0" : "left-0"} w-full h-screen bg-brand-bg z-[100] flex flex-col px-6 py-6 pb-8 transition-transform duration-500 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex justify-between items-center mb-16">
          <a href="/" aria-label="Go to home page" onClick={() => setIsMobileMenuOpen(false)}>
            <img src={mobileMenuLogoSrc} alt="Athr Logo" className="h-16" />
          </a>
          <X 
            className="text-brand-secondary w-8 h-8 cursor-pointer hover:rotate-90 transition-transform" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
        </div>
        <div className="flex flex-col space-y-8 font-serif text-2xl text-center grow justify-center pb-20">
          <a href="/" className="text-brand-dark hover:text-brand-secondary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>{t("nav.home")}</a>
          <a href="/work" className="text-brand-primary hover:text-brand-secondary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>{t("nav.portfolio")}</a>
          <a href="/workshops" className="text-brand-primary hover:text-brand-secondary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>{t("nav.workshops")}</a>
          <a href="/contact" className="text-brand-primary hover:text-brand-secondary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>{t("nav.contact")}</a>
          <LanguageSwitcher className="justify-center text-lg" />
        </div>
        <div className="mt-auto border-t border-brand-surface-high pt-8 pb-6">
          <a href="/contact#contact-form" className="block w-full relative group bg-brand-secondary text-white py-4 text-sm tracking-[0.2em] uppercase font-medium hover:bg-brand-dark transition-all rounded-sm overflow-hidden text-center">
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
};

const Hero = () => {
  const containerRef = useRef(null);
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const heroActions = [
    {
      href: "/contact#contact-form",
      variant: "primary" as const,
      label: t("hero.cta"),
    },
    {
      href: "/work",
      variant: "secondary" as const,
      label: t("hero.ctaSecondary"),
    },
  ];

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(".hero-text > *", 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
    )
    .fromTo(".hero-media", 
      { opacity: 0, scale: 0.9 }, 
      { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }, 
      "-=0.5"
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative flex min-h-[100dvh] items-end overflow-hidden bg-brand-dark pt-28 md:pt-32 lg:pt-36">
      <div
        className="hero-media absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: "url('/ed02b462-b517-438d-b25a-932331549f62.jpg')" }}
        aria-hidden="true"
      />
      <div className={`hero-overlay absolute inset-0 z-10 ${isRTL ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-[#1c1c18]/82 via-[#1c1c18]/48 to-[#1c1c18]/10`} />
      <div className="absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-[#1c1c18]/50 to-transparent" />
      <div className="max-w-360 mx-auto px-6 md:px-12 relative z-20 flex min-h-[100dvh] w-full items-end">
        <div className={`hero-text max-w-xl pb-16 md:pb-20 lg:max-w-2xl lg:pb-24 ${isRTL ? "ml-auto text-right" : "mr-auto text-left"}`}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-white font-serif tracking-tighter mb-6">
            {t("hero.titlePart1")} <span className="text-white">{t("hero.titleHighlight")}</span>
          </h1>
          <p className={`max-w-xl text-base md:text-lg lg:text-xl text-white/85 font-light leading-relaxed ${isRTL ? "ml-auto" : "mr-auto"}`}>
            {t("hero.subtitle")}
          </p>
          <div className="mt-10 flex w-full flex-wrap items-center justify-start gap-5 md:gap-7">
            {heroActions.map((action) =>
              action.variant === "primary" ? (
                <a
                  key={action.href}
                  href={action.href}
                  className="relative group bg-brand-secondary text-white px-10 py-4 text-xs tracking-[0.2em] uppercase font-medium hover:bg-brand-dark transition-all overflow-hidden"
                >
                  <span className="relative z-10">{action.label}</span>
                  <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-60 transition-all duration-700 pointer-events-none flex justify-center items-center">
                    <img 
                      src="/athr.png" 
                      alt="" 
                      className="w-[200%] h-[200%] max-w-none object-contain scale-150 group-hover:scale-125 transition-transform duration-700"
                    />
                  </div>
                </a>
              ) : (
                <a
                  key={action.href}
                  href={action.href}
                  className="group flex items-center gap-3 text-[#f4e5d4] tracking-widest uppercase text-xs font-semibold"
                >
                  {action.label} <ArrowIcon className={`w-4 h-4 transition-transform ${isRTL ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const sectionRef = useRef(null);
  const { t, isRTL, locale } = useLanguage();
  const aboutBadgeText = locale === "ar" ? "مـــــــــؤسـسة أثـــــــــــــر " : "Athr Foundation";

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(".about-img", 
      { opacity: 0, x: isRTL ? 50 : -50 }, 
      { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
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
    );

    const statsObj = { num1: 0, num2: 0 };
    tl.to(statsObj, {
      num1: 120,
      num2: 12,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => {
        const el1 = document.querySelector(".stat-num-1");
        const el2 = document.querySelector(".stat-num-2");
        if (el1) el1.innerHTML = isRTL ? new Intl.NumberFormat("ar-EG").format(Math.round(statsObj.num1)) : String(Math.round(statsObj.num1));
        if (el2) el2.innerHTML = isRTL ? new Intl.NumberFormat("ar-EG").format(Math.round(statsObj.num2)) : String(Math.round(statsObj.num2));
      }
    }, "-=0.4");

  }, { scope: sectionRef, dependencies: [isRTL] });

  return (
    <section ref={sectionRef} className="py-20 md:py-24 bg-brand-surface-low overflow-hidden">
      <div className="max-w-360 mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">
          <div className={`${isRTL ? "order-2 md:order-2" : "order-2 md:order-1"} relative`}>
            <img 
              src="/deema1.jpg" 
              alt="Deema - Professional portrait" 
              className="about-img w-[96%] md:w-[80%] mx-auto h-[32rem] md:h-[34rem] block object-cover object-top editorial-shadow"
              referrerPolicy="no-referrer"
            />
            <div className={`about-badge absolute bottom-5 md:bottom-7 ${isRTL ? "right-[5%] md:right-[13%]" : "left-[5%] md:left-[13%]"}`}>
              <div
                className={`inline-flex w-fit items-center rounded-[14px] bg-[#f4eeea] px-4 py-3 shadow-[0_10px_28px_rgba(71,49,34,0.14)] ring-1 ring-white/70 flex-row justify-start gap-3`}
              >
                <span className="status-glow-dot h-2.5 w-2.5 shrink-0 rounded-full bg-[#46cf72]" />
                <span className={`whitespace-nowrap font-medium leading-none text-[#473122] ${isRTL ? "text-[1rem] text-right" : "text-[0.82rem] text-left tracking-[0.03em]"}`}>
                  {aboutBadgeText}
                </span>
              </div>
            </div>
          </div>
          <div className={`${isRTL ? "order-1 md:order-1" : "order-1 md:order-2"} about-text`}>
            <span className={`${isRTL ? "text-base" : "text-xs"} tracking-[0.4em] uppercase text-brand-secondary font-bold block mb-6`}>{t("about.label")}</span>
            <h2 className={`${isRTL ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl"} font-serif text-brand-primary mb-8 leading-tight`}>{t("about.title")}</h2>
            <div className="space-y-6 text-brand-primary/80 font-light leading-relaxed text-lg">
              <p>{t("about.bio")}</p>
            </div>
            <div className={`mt-12 pt-1 border-t border-brand-surface-high/30 about-stats flex gap-12`}>
              <div>
                <p className="text-5xl md:text-5xl font-serif text-brand-secondary"><span className="stat-num-1">{isRTL ? "١٢٠" : "120"}</span>+</p>
                <p className="text-xs md:text-sm uppercase tracking-widest text-brand-primary/70 mt-3 font-medium">{t("about.stat1Label")}</p>
              </div>
              <div>
                <p className="text-5xl md:text-5xl font-serif text-brand-secondary"><span className="stat-num-2">{isRTL ? "١٢" : "12"}</span></p>
                <p className="text-xs md:text-sm uppercase tracking-widest text-brand-primary/70 mt-3 font-medium">{t("about.stat2Label")}</p>
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
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

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
    <svg className={`scale-x-[-1.25] scale-y-[1.25] ${className}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g data-transform-wrapper="on">
        <g fill="none" className="nc-icon-wrapper">
          <path d="M14.222 13.2619L10.5969 3.5L13.5969 2L17.1677 11.7451L14.222 13.2619Z" fill="currentColor" fillOpacity=".3" data-color="color-2"></path>
          <path d="M17.5969 23V15L20.5969 13.5V21.5L17.5969 23Z" fill="currentColor" fillOpacity=".3" data-color="color-2"></path>
          <path d="M3.59692 5.00012L8.23512 7.31922C8.40135 7.40233 8.59692 7.28146 8.59692 7.09561V4" stroke="currentColor" strokeMiterlimit="2"></path>
          <path d="M17.5969 23L17.5969 15.6181C17.5969 15.2393 17.3829 14.8931 17.0441 14.7237L14.4555 13.4294C14.2254 13.3143 14.0485 13.115 13.9615 12.8728L10.7324 3.87738C10.6455 3.63521 10.4685 3.43587 10.2384 3.32081L8.59692 2.50012" stroke="currentColor" strokeMiterlimit="2"></path>
          <path d="M13.7326 2.37726L16.9617 11.3727C17.0486 11.6148 17.2255 11.8142 17.4557 11.9292L20.0443 13.2236C20.3831 13.393 20.5971 13.7392 20.5971 14.118V20.882C20.5971 21.2608 20.3831 21.6071 20.0443 21.7764L18.2677 22.6647C17.8454 22.8758 17.3484 22.8758 16.9261 22.6647L7.3095 17.8563C6.84254 17.6228 6.441 17.2739 6.16524 16.8306C4.44805 14.0701 3.21959 10.7915 3.55551 5.56058C3.57788 5.2123 3.78743 4.90478 4.09958 4.74871L6.14986 3.7236C6.43138 3.58284 6.76275 3.58284 7.04428 3.7236L8.59707 4.5V3.11803C8.59707 2.73926 8.81107 2.393 9.14986 2.22361L11.1499 1.2236C11.4314 1.08284 11.7627 1.08283 12.0443 1.22359L13.2386 1.82068C13.4687 1.93575 13.6456 2.13509 13.7326 2.37726Z" stroke="currentColor" strokeMiterlimit="2" strokeLinecap="square"></path>
          <path d="M17.5969 15L20.5969 13.5" stroke="currentColor"></path>
          <path d="M14.3027 13.2339L17.3027 11.7339" stroke="currentColor"></path>
          <path d="M10.5 3.59314C11.6716 3.00735 12.3284 2.67893 13.5 2.09314" stroke="currentColor"></path>
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
    <svg className={`scale-x-[-1.25] scale-y-[1.25] ${className}`} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g data-transform-wrapper="on">
        <g fill="none" className="nc-icon-wrapper">
          <path d="M17.5625 10.3508L14.2642 12L15.3636 14.1989V15.848L14.8139 18.5966L17.5625 17.4972L18.6619 15.848V13.0994L17.5625 10.3508Z" fill="currentColor" fillOpacity=".3" data-color="color-2"></path>
          <path d="M15.4102 5.68321L14.4397 6.16851L17.4984 9.59567L18.7609 14.0423L19.7106 13.5674C22.3533 12.4789 17.4984 3.93618 15.4102 5.68321Z" fill="currentColor" fillOpacity=".3" data-color="color-2"></path>
          <path d="M7.24658 7.15243L10.5449 5.50275C11.479 5.03238 12.7422 5.16094 14.1006 5.99948C16.8 7.66582 18.8701 11.5049 18.7243 14.5743C18.6527 16.083 18.0473 17.1249 17.1415 17.5966L13.8432 19.2462" stroke="currentColor"></path>
          <path d="M18.8563 14.0475L22.0935 12.4287C22.684 12.1212 23.0786 11.4419 23.1253 10.4584C23.2204 8.4574 21.8708 5.95464 20.111 4.86832C19.2255 4.32166 18.402 4.23786 17.793 4.5445L14.333 6.27478" stroke="currentColor"></path>
          <path d="M6.39017 13.8463C5.88907 12.6149 5.6223 11.3322 5.6779 10.1615C5.82365 7.09211 8.13009 5.95471 10.8295 7.62105C13.5289 9.2874 15.599 13.1265 15.4532 16.1959C15.3075 19.2653 13.0011 20.4027 10.3017 18.7363C9.22249 18.0701 8.24388 17.0567 7.46723 15.884" stroke="currentColor"></path>
          <path d="M9.86623 11.9786L9.60359 12.404L9.86623 11.9786ZM8.83939 11.9786L9.14216 12.3765L9.17334 12.3528L9.20044 12.3245L8.83939 11.9786ZM10.5222 14.8371L10.6773 15.3125L10.68 15.3116L10.5222 14.8371ZM1.00008 17.9436L0.697309 17.5457C0.503159 17.6935 0.443971 17.9597 0.557257 18.1758C0.670543 18.3919 0.923224 18.4946 1.15516 18.419L1.00008 17.9436ZM9.86623 11.9786L9.60359 12.404C9.84125 12.5508 10.0763 12.8121 10.2483 13.1311C10.4208 13.451 10.5042 13.781 10.4919 14.0413L10.9913 14.065L11.4907 14.0887C11.5138 13.6022 11.3632 13.0917 11.1285 12.6565C10.8933 12.2203 10.548 11.8119 10.1289 11.5531L9.86623 11.9786ZM8.83939 11.9786L9.20044 12.3245C9.21734 12.3068 9.23931 12.2925 9.2887 12.2919C9.34669 12.2911 9.45355 12.3114 9.60359 12.404L9.86623 11.9786L10.1289 11.5531C9.59909 11.2261 8.93383 11.1572 8.47833 11.6327L8.83939 11.9786ZM10.9913 14.065L10.4919 14.0413C10.4851 14.1827 10.4523 14.2657 10.426 14.3079C10.4024 14.3456 10.3814 14.357 10.3644 14.3627L10.5222 14.8371L10.68 15.3116C11.2098 15.1354 11.465 14.6304 11.4907 14.0887L10.9913 14.065ZM10.5222 14.8371L10.3671 14.3618L0.845005 17.4683L1.00008 17.9436L1.15516 18.419L10.6773 15.3125L10.5222 14.8371ZM1.00008 17.9436L1.30286 18.3415L9.14216 12.3765L8.83939 11.9786L8.53661 11.5807L0.697309 17.5457L1.00008 17.9436Z" fill="currentColor"></path>
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

  const serviceKeys = [
    "creativeCampaigns",
    "eventConcept",
    "brandExperience",
    "influencer",
    "creativeDirection",
  ] as const;

  const serviceIcons = [
    CreativeCampaignsIcon,
    EventConceptIcon,
    BrandExperienceIcon,
    InfluencerIcon,
    CreativeDirectionIcon,
  ];

  return (
    <section ref={sectionRef} className="py-32 bg-brand-bg overflow-hidden">
      <div className="max-w-360 mx-auto px-6 md:px-12">
        <div className="mb-20 text-center max-w-2xl mx-auto spec-title">
          <h2 className="text-4xl font-serif text-brand-primary mb-6">{t("specialisms.title")}</h2>
          <p className="text-brand-primary/70 font-light">{t("specialisms.subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          {serviceKeys.map((key, idx) => {
            const Icon = serviceIcons[idx];
            return (
              <div 
                key={key} 
                className={`spec-card ${idx < 2 ? 'md:col-span-3' : 'md:col-span-2'} bg-brand-surface-low p-12 flex flex-col justify-between group hover:bg-brand-secondary transition-all duration-500`}
              >
                <div>
                  <div className="spec-icon inline-block mb-8">
                    <div className={isRTL ? "[transform:scaleX(-1)]" : ""}>
                      <Icon className="w-12 h-12 text-brand-secondary group-hover:text-white transition-colors" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-serif mb-4 group-hover:text-white transition-colors">{t(`specialisms.services.${key}.title`)}</h3>
                  <p className="text-brand-primary/70 group-hover:text-white/80 font-light transition-colors">{t(`specialisms.services.${key}.desc`)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const CaseStudy = () => {
  const sectionRef = useRef(null);
  const { t, isRTL, locale } = useLanguage();

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
      { opacity: 0, x: isRTL ? 20 : -20 },
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
      <div className="max-w-360 mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-0 mb-12 md:mb-16">
          <div className="case-header-content">
            <span className={`${locale === "ar" ? "text-sm md:text-base tracking-[0.28em]" : "text-xs tracking-[0.4em]"} uppercase text-brand-secondary font-bold block mb-4`}>{t("caseStudy.label")}</span>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-primary">{t("caseStudy.title")}</h2>
          </div>
          <a href="/work/the-obsidian-gala" className={`case-header-link ${locale === "ar" ? "text-[0.8rem] tracking-[0.18em]" : "text-[0.6rem] tracking-widest"} uppercase font-semibold text-brand-primary/60 hover:text-brand-secondary transition-colors pb-2 border-b border-brand-surface-high whitespace-nowrap`}>
            {t("caseStudy.seeAll")}
          </a>
        </div>
        <div className="relative group">
          <div className="case-media aspect-square sm:aspect-4/3 md:aspect-21/9 w-full bg-brand-dark overflow-hidden">
            <img 
              src="/cover.jpeg" 
              alt="Besan Khalaily – Spring Launch" 
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[2s]"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className={`case-content md:absolute relative md:bottom-0 ${isRTL ? "md:left-0" : "md:right-0"} p-8 md:p-12 bg-brand-surface-low md:bg-brand-bg w-[85%] sm:w-[75%] md:w-full md:max-w-lg editorial-shadow z-10 -mt-16 md:mt-0 mx-auto md:mx-0 border border-white/5 md:border-none`}>
            <h4 className="text-xl sm:text-2xl font-serif mb-4">{t("caseStudy.cardTitle")}</h4>
            <p className="text-brand-primary/70 font-sm md:font-light leading-relaxed mb-6">{t("caseStudy.cardDesc")}</p>
            <div className="flex flex-wrap gap-3">
              {[t("caseStudy.tag1"), t("caseStudy.tag2")].map((tag) => (
                <span key={tag} className={`${locale === "ar" ? "text-[0.78rem] tracking-[0.18em] px-5 py-3" : "text-[0.5rem] tracking-widest px-3 py-2"} uppercase bg-brand-bg text-brand-secondary font-bold`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const WorkshopsHome = () => {
  const sectionRef = useRef(null);
  const { t, isRTL, locale } = useLanguage();

  const items = locale === "ar"
    ? (ar_workshops_items())
    : (en_workshops_items());

  function en_workshops_items() {
    return [
      { date: "DEC 12", title: "The Art of Presence", desc: "Exploring spatial psychology and how environment shapes brand memory." },
      { date: "JAN 08", title: "Tactile Strategy", desc: "Moving beyond digital: Why physical touch remains the ultimate marketing tool." },
      { date: "FEB 20", title: "Minimalist Impact", desc: "How to create high-impact experiences using the power of restraint." },
    ];
  }

  function ar_workshops_items() {
    return [
      { date: "ديسمبر ١٢", title: "فن الحضور", desc: "استكشاف علم نفس المكان وكيف تشكّل البيئة ذاكرة العلامة التجارية." },
      { date: "يناير ٠٨", title: "الاستراتيجية الملموسة", desc: "ما وراء الرقمية: لماذا يظل اللمس الفعلي أقوى أداة تسويقية." },
      { date: "فبراير ٢٠", title: "التأثير البسيط", desc: "كيف تصنع تجارب عالية التأثير باستخدام قوة ضبط النفس." },
    ];
  }

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
    <section id="workshops" ref={sectionRef} className="py-32 bg-brand-bg">
      <div className="max-w-360 mx-auto px-6 md:px-12">
        <div className="workshops-header mb-16">
          <h2 className="text-4xl font-serif text-brand-primary mb-2">{t("workshops.title")}</h2>
          <p className="text-brand-primary/70 font-light">{t("workshops.subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {items.map((item, idx) => (
            <a href="/workshops" key={idx} className="workshop-item group block cursor-pointer">
              <div className="aspect-square bg-brand-surface-low mb-6 overflow-hidden relative">
                <img 
                  src={`https://picsum.photos/seed/workshop${idx}/800/800`} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className={`absolute top-4 ${isRTL ? "left-4" : "right-4"} bg-white/90 px-3 py-1 text-[0.6rem] uppercase tracking-widest font-bold text-brand-secondary`}>
                  {item.date}
                </div>
              </div>
              <h3 className="text-xl font-serif text-brand-primary mb-2">{item.title}</h3>
              <p className="text-brand-primary/70 font-light text-sm leading-relaxed mb-4">{item.desc}</p>
              <span className={`${locale === "ar" ? "text-[0.82rem] tracking-[0.18em]" : "text-[0.6rem] tracking-widest"} uppercase font-bold text-brand-secondary border-b border-brand-secondary/20 pb-1 group-hover:border-brand-secondary transition-all`}>
                {t("workshops.register")}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => null;

const Product = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="py-32 bg-brand-surface-high">
      <div className="max-w-360 mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className={`lg:col-span-5 ${isRTL ? "order-2 lg:order-2" : "order-2 lg:order-1"}`}>
            <div className="max-w-md">
              <span className="text-xs tracking-[0.4em] uppercase text-brand-secondary font-bold block mb-4">{t("product.label")}</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-brand-primary mb-4 leading-tight whitespace-nowrap">{t("product.title")}</h2>
              <p className="text-lg font-serif italic text-brand-primary/70 mb-6">{t("product.tagline")}</p>
              <p className="text-brand-primary/80 font-light leading-relaxed mb-12">
                {t("product.desc")}
              </p>
              <a href="/contact#contact-form" className="inline-block bg-brand-secondary text-white px-10 py-4 text-xs tracking-[0.2em] uppercase font-medium hover:bg-brand-dark transition-all editorial-shadow">
                {t("product.cta")}
              </a>
            </div>
          </div>
          <div className={`lg:col-span-7 ${isRTL ? "order-1 lg:order-1" : "order-1 lg:order-2"}`}>
            <div className="relative group">
              <div className="aspect-square bg-brand-surface-low overflow-hidden editorial-shadow">
                <img 
                  src="https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1000&q=80" 
                  alt="The Athr Planner" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className={`absolute -top-6 ${isRTL ? "-left-6" : "-right-6"} w-32 h-32 border border-brand-secondary/10 hidden md:block`}></div>
              <div className={`absolute -bottom-6 ${isRTL ? "-right-6" : "-left-6"} w-32 h-32 border border-brand-secondary/10 hidden md:block`}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function HomePage() {
  return (
    <div id="top" className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Specialisms />
      <CaseStudy />
      <WorkshopsHome />
      <CTA />
      <Product />
      <SharedFooter />
    </div>
  );
}

export default function App() {
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";

  // ── Admin Dashboard ──────────────────────────────────────────────────────────
  if (pathname.startsWith("/admin")) {
    return <AdminApp />;
  }

  const isWorksPage = pathname === "/work";
  const isWorkshopsPage = pathname === "/workshops";
  const isContactPage = pathname === "/contact";
  const workSlug = pathname.startsWith("/work/") ? pathname.slice("/work/".length) : null;

  if (isWorksPage) {
    return <WorksPage />;
  }

  if (isWorkshopsPage) {
    return <WorkshopsPage />;
  }

  if (isContactPage) {
    return <ContactPage />;
  }

  if (workSlug) {
    return <WorkCaseStudyPage slug={workSlug} />;
  }

  return <HomePage />;
}
