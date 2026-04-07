import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsBentoSection from "@/components/ProjectsBentoSection";
import AboutSection from "@/components/AboutSection";
import CertificationsWallOfFame from "@/components/CertificationsWallOfFame";
import ContactSection from "@/components/ContactSection";

/* ── Marquee ticker ───────────────────────────────────────────── */
const MarqueeSection = () => {
  const items = [
    "Django", "Python", "React.js", "Spring Boot",
    "PostgreSQL", "Node.js", "LangChain", "Docker",
    "Supabase", "FastAPI", "TypeScript", "Claude API",
    "Django", "Python", "React.js", "Spring Boot",
    "PostgreSQL", "Node.js", "LangChain", "Docker",
    "Supabase", "FastAPI", "TypeScript", "Claude API",
  ];
  return (
    <div className="bg-[#FFFFFF] border-y-4 border-[#F5C400] py-5 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 mx-0">
            {i % 2 === 0 ? (
              <span className="font-display font-black text-3xl md:text-5xl uppercase text-[#F5C400] tracking-tight">
                {item}
              </span>
            ) : (
              <span
                className="font-display font-black text-3xl md:text-5xl uppercase tracking-tight"
                style={{ WebkitTextStroke: "1.5px #F5C400", color: "transparent" }}
              >
                {item}
              </span>
            )}
            <span className="w-3 h-3 bg-[#F5C400] rotate-45 shrink-0 mx-6" />
          </span>
        ))}
      </div>
    </div>
  );
};

/* ── CTA Band ─────────────────────────────────────────────────── */
const CtaBand = () => {
  const text = "VOUS AVEZ UN PROJET ? TRAVAILLONS ENSEMBLE → VOUS AVEZ UN PROJET ? TRAVAILLONS ENSEMBLE → ";
  return (
    <div className="bg-[#FFFFFF] border-y-8 border-[#F5C400] py-6 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[text, text].map((t, i) => (
          <span key={i} className="font-display font-black text-2xl md:text-4xl uppercase text-[#F5C400] tracking-tight shrink-0">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ── Footer ───────────────────────────────────────────────────── */
const Footer = () => (
  <footer className="bg-[#F5C400] border-t-8 border-[#FFFFFF] py-12 px-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
      <img
          src="/Gemini_Generated_Image_s7afnts7afnts7af-removebg-preview.png"
          alt="Scale avec Zoubeir"
          className="h-12 w-auto object-contain"
        />
      <p className="font-body text-[10px] font-black uppercase tracking-[0.25em] text-[#FFFFFF]/60 text-center">
        © 2025 Zoubeir Ibrahima Amed — Tous droits réservés
      </p>
      <div className="flex gap-8">
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
            className="font-display font-black text-xs uppercase tracking-[0.2em] text-[#FFFFFF]/50 hover:text-[#FFFFFF] border-b-2 border-transparent hover:border-[#FFFFFF] transition-all duration-200 pb-0.5"
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

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5C400] text-[#FFFFFF] font-body antialiased">
      <Navbar />
      <HeroSection />
      <MarqueeSection />
      <SkillsSection />
      <ProjectsBentoSection />
      <CtaBand />
      <AboutSection />
      <CertificationsWallOfFame />
      <ContactSection />
      <Footer />

      {/* Scroll to top */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 p-4 bg-[#FFFFFF] text-[#F5C400] border-4 border-[#FFFFFF] hover:bg-[#F5C400] hover:text-[#FFFFFF] transition-all duration-150 z-50 font-display font-black text-xs"
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
