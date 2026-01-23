import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import AchievementsSection from "@/components/AchievementsSection";
import CertificationsSection from "@/components/CertificationsSection";
import LanguagesSection from "@/components/LanguagesSection";
import ContactSection from "@/components/ContactSection";

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
    <div className="min-h-screen bg-background relative">
      {/* Background gradient effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      </div>

      {/* Navbar */}
      <Navbar />

      <div className="container max-w-2xl mx-auto px-4 pb-16 pt-16 relative z-10">
        {/* Hero - Première impression */}
        <HeroSection />

        <div className="space-y-4">
          {/* About - Storytelling et proposition de valeur */}
          <section id="about">
            <AboutSection />
          </section>

          {/* Projets - La preuve par l'action (Snapfolioo + SamaWeb) */}
          <section id="projects">
            <ProjectsSection />
          </section>

          {/* Compétences techniques - Stack complet */}
          <section id="skills">
            <SkillsSection />
          </section>

          {/* Expérience & Formation */}
          <section id="experience">
            <AchievementsSection />
          </section>

          {/* Certifications - Crédibilité (Harvard, Microsoft, Cisco) */}
          <section id="certifications">
            <CertificationsSection />
          </section>

          {/* Langues */}
          <LanguagesSection />

          {/* Contact - Call to action final */}
          <section id="contact">
            <ContactSection />
          </section>
        </div>

        {/* Footer */}
        <motion.footer
          className="mt-12 pt-8 border-t border-border/50 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-sm text-muted-foreground mb-2">
            Conçu et développé avec React, TypeScript & TailwindCSS
          </p>
          <p className="text-xs text-muted-foreground/60">
            © 2026 Zoubeir Ibrahima. Tous droits réservés.
          </p>
        </motion.footer>
      </div>

      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all duration-300 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0
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
