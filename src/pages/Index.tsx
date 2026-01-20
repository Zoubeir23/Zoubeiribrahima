import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import CertificationsSection from "@/components/CertificationsSection";
import AchievementsSection from "@/components/AchievementsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl mx-auto px-4 pb-16">
        <HeroSection />
        
        <div className="space-y-4">
          <SkillsSection />
          <CertificationsSection />
          <AchievementsSection />
        </div>
        
        <motion.footer 
          className="mt-12 text-center text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p>© 2026 Zoubeir Ibrahima. Tous droits réservés.</p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;
