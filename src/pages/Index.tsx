import { motion, useReducedMotion } from "@/lib/static-motion";
import { ArrowUp } from "lucide-react";
import { useState, useEffect, useRef, lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServiceTicker from "@/components/ServiceTicker";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import ReasonsSection from "@/components/ReasonsSection";
import { useLandingContent } from "@/hooks/useLandingContent";
import SkillsSection from "@/components/SkillsSection";
import ProjectsBentoSection from "@/components/ProjectsBentoSection";
const AboutSection = lazy(() => import("@/components/AboutSection"));
const CertificationsWallOfFame = lazy(() => import("@/components/CertificationsWallOfFame"));
const CertificationsSection = lazy(() => import("@/components/CertificationsSection"));
const FaqSection = lazy(() => import("@/components/FaqSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

const SectionPlaceholder = ({ minHeight = "360px" }: { minHeight?: string }) => (
  <div
    className="w-full border-y-4 border-[#F5C518]/20 bg-[#020285]/50"
    style={{ minHeight }}
    aria-hidden="true"
  />
);

/* ── Service Ticker ───────────────────────────────────────────── */
const ServiceTickerBand = () => {
  const { hero } = useLandingContent();
  return <ServiceTicker items={hero.tickerItems} label={hero.tickerLabel} />;
};

/* ── Static CTA Band ──────────────────────────────────────────── */
const CtaBand = () => {
  const text = "VOUS AVEZ UN PROJET ? TRAVAILLONS ENSEMBLE → ";

  return (
    <div className="bg-[#0303AB] border-y-8 border-[#F5C518] py-4 sm:py-6 overflow-hidden">
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "marquee 24s linear infinite" }}
      >
        {[text, text, text].map((t, i) => (
          <span
            key={i}
            className="font-display font-black text-sm sm:text-lg md:text-3xl uppercase text-[#FFFFFF] tracking-tight shrink-0"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ── Footer ───────────────────────────────────────────────────── */
const Footer = () => (
  <footer className="bg-[#020285] border-t-8 border-[#F5C518] py-10 sm:py-12 px-4 sm:px-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-8">
      <span className="logo-shell inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-3">
        <img
            src="/logo-scale-avec-zoubeir-for-dark-background.png"
            alt="Scale avec Zoubeir"
            className="h-16 max-[390px]:h-14 sm:h-20 md:h-24 w-auto object-contain"
            width={420}
            height={96}
          />
      </span>
      <p className="font-body text-[10px] font-black uppercase tracking-[0.16em] sm:tracking-[0.25em] text-[#FFFFFF]/60 text-center">
        © 2025 Zoubeir Ibrahima Amed — Tous droits réservés
      </p>
      <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
        {[
          { label: "GitHub", href: "https://github.com/Zoubeir23" },
          { label: "LinkedIn", href: "https://linkedin.com/in/zoubeir-ibrahima" },
          { label: "Email", href: "mailto:Zoubeiribrahima@gmail.com" },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display font-black text-[11px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.2em] text-[#FFFFFF]/50 hover:text-[#FFFFFF] border-b-2 border-transparent hover:border-[#F5C518] transition-all duration-200 pb-0.5"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

/* ── Page ─────────────────────────────────────────────────────── */
const Index = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [deferDeepSections, setDeferDeepSections] = useState(false);
  const deepSectionsTriggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setDeferDeepSections(true);
      return;
    }

    const triggerNode = deepSectionsTriggerRef.current;
    if (!triggerNode || deferDeepSections) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setDeferDeepSections(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "900px 0px",
        threshold: 0,
      }
    );

    observer.observe(triggerNode);
    return () => observer.disconnect();
  }, [deferDeepSections]);

  return (
    <div className="min-h-screen bg-[#020285] text-[#FFFFFF] font-body antialiased">
      <Navbar />
      <HeroSection />
      <ServiceTickerBand />
      <ServicesSection />
      <SkillsSection />
      <ProjectsBentoSection />
      <ProcessSection />
      <ReasonsSection />
      <CtaBand />
      <div ref={deepSectionsTriggerRef} aria-hidden="true" className="h-px w-full" />
      {deferDeepSections ? (
        <>
          <Suspense fallback={<SectionPlaceholder minHeight="520px" />}>
            <AboutSection />
          </Suspense>
          <Suspense fallback={<SectionPlaceholder minHeight="520px" />}>
            <CertificationsWallOfFame />
          </Suspense>
          <Suspense fallback={<SectionPlaceholder minHeight="420px" />}>
            <CertificationsSection />
          </Suspense>
          <Suspense fallback={<SectionPlaceholder minHeight="420px" />}>
            <FaqSection />
          </Suspense>
          <Suspense fallback={<SectionPlaceholder minHeight="520px" />}>
            <ContactSection />
          </Suspense>
        </>
      ) : (
        <>
          <section id="experience" aria-label="Chargement de la section experience">
            <SectionPlaceholder minHeight="520px" />
          </section>
          <section id="certifications" aria-label="Chargement de la section certifications">
            <SectionPlaceholder minHeight="520px" />
          </section>
          <section aria-label="Chargement de la liste complete des certifications">
            <SectionPlaceholder minHeight="420px" />
          </section>
          <section id="contact" aria-label="Chargement de la section contact">
            <SectionPlaceholder minHeight="520px" />
          </section>
        </>
      )}
      <Footer />

      {/* Scroll to top */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed right-4 sm:right-6 bottom-[max(env(safe-area-inset-bottom),1rem)] sm:bottom-6 p-3 sm:p-4 min-h-11 min-w-11 bg-[#F5C518] text-[#020285] border-4 border-[#F5C518] hover:bg-[#F5C518] hover:text-[#020285] transition-all duration-150 z-50 font-display font-black text-xs shadow-lg"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Retour en haut"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </div>
  );
};

export default Index;
