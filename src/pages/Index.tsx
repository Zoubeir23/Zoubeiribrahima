import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsBentoSection from "@/components/ProjectsBentoSection";
import CertificationsWallOfFame from "@/components/CertificationsWallOfFame";

const Index = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 font-sans antialiased selection:bg-primary selection:text-white relative">
      {/* Grain Overlay */}
      <div className="grain-overlay"></div>

      {/* Navbar flottante */}
      <Navbar />

      {/* Hero Section - Full screen */}
      <HeroSection />

      {/* About Section - Bento grid */}
      <div className="py-8 md:py-14">
        <AboutSection />
      </div>

      {/* Skills Section */}
      <section id="skills" className="py-8 md:py-14 px-4 max-w-5xl mx-auto">
        <SkillsSection />
      </section>

      {/* Projects & Experience Section - Bento Grid */}
      <div className="py-8 md:py-14">
        <ProjectsBentoSection />
      </div>

      {/* Certifications */}
      <div className="py-8 md:py-14">
        <CertificationsWallOfFame />
      </div>

      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-white dark:bg-slate-800 text-slate-950 dark:text-white shadow-lg shadow-white/10 hover:bg-primary hover:text-white transition-all duration-300 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Retour en haut"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </div>
  );
};

export default Index;
