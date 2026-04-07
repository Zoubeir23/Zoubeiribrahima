import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useState, useEffect, useRef, lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsBentoSection from "@/components/ProjectsBentoSection";
const AboutSection = lazy(() => import("@/components/AboutSection"));
const CertificationsWallOfFame = lazy(() => import("@/components/CertificationsWallOfFame"));
const CertificationsSection = lazy(() => import("@/components/CertificationsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

const SectionPlaceholder = ({ minHeight = "360px" }: { minHeight?: string }) => (
  <div
    className="w-full border-y-4 border-[#FFFFFF]/20 bg-[#143DFF]/50"
    style={{ minHeight }}
    aria-hidden="true"
  />
);

/* ── Marquee ticker ───────────────────────────────────────────── */
const MarqueeSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const items = [
    "Django", "Python", "React.js", "Spring Boot",
    "PostgreSQL", "Node.js", "Docker", "Supabase",
    "FastAPI", "TypeScript", "Claude API", "OpenAI SDK",
    "Django", "Python", "React.js", "Spring Boot",
    "PostgreSQL", "Node.js", "Docker", "Supabase",
    "FastAPI", "TypeScript", "Claude API", "OpenAI SDK",
  ];
  return (
    <div className="bg-[#FFFFFF] border-y-4 border-[#143DFF] py-3 sm:py-5 overflow-hidden">
      <div className={`flex whitespace-nowrap ${shouldReduceMotion ? "" : "animate-marquee"}`}>
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 sm:gap-6 mx-0">
            {i % 2 === 0 ? (
              <span className="font-display font-black text-xl sm:text-2xl md:text-5xl uppercase text-[#143DFF] tracking-tight">
                {item}
              </span>
            ) : (
              <span
                className="font-display font-black text-xl sm:text-2xl md:text-5xl uppercase tracking-tight"
                style={{ WebkitTextStroke: "1.5px #143DFF", color: "transparent" }}
              >
                {item}
              </span>
            )}
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#143DFF] rotate-45 shrink-0 mx-4 sm:mx-6" />
          </span>
        ))}
      </div>
    </div>
  );
};

/* ── CTA Band ─────────────────────────────────────────────────── */
const CtaBand = () => {
  const shouldReduceMotion = useReducedMotion();
  const text = "VOUS AVEZ UN PROJET ? TRAVAILLONS ENSEMBLE → VOUS AVEZ UN PROJET ? TRAVAILLONS ENSEMBLE → ";
  return (
    <div className="bg-[#FFFFFF] border-y-8 border-[#143DFF] py-4 sm:py-6 overflow-hidden">
      <div className={`flex whitespace-nowrap ${shouldReduceMotion ? "" : "animate-marquee"}`}>
        {[text, text].map((t, i) => (
          <span key={i} className="font-display font-black text-lg sm:text-xl md:text-4xl uppercase text-[#143DFF] tracking-tight shrink-0">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ── Footer ───────────────────────────────────────────────────── */
const Footer = () => (
  <footer className="bg-[#143DFF] border-t-8 border-[#FFFFFF] py-10 sm:py-12 px-4 sm:px-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-8">
      <img
          src="/Gemini_Generated_Image_s7afnts7afnts7af-removebg-preview.png"
          alt="Scale avec Zoubeir"
          className="h-16 max-[390px]:h-14 sm:h-20 md:h-24 w-auto object-contain"
          width={420}
          height={96}
        />
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
            className="font-display font-black text-[11px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.2em] text-[#FFFFFF]/50 hover:text-[#FFFFFF] border-b-2 border-transparent hover:border-[#FFFFFF] transition-all duration-200 pb-0.5"
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
    <div className="min-h-screen bg-[#143DFF] text-[#FFFFFF] font-body antialiased">
      <Navbar />
      <HeroSection />
      <MarqueeSection />
      <SkillsSection />
      <ProjectsBentoSection />
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
        className="fixed right-4 sm:right-6 bottom-[max(env(safe-area-inset-bottom),1rem)] sm:bottom-6 p-3 sm:p-4 min-h-11 min-w-11 bg-[#FFFFFF] text-[#143DFF] border-4 border-[#FFFFFF] hover:bg-[#143DFF] hover:text-[#FFFFFF] transition-all duration-150 z-50 font-display font-black text-xs shadow-lg"
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
