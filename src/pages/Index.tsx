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
        
        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>© 2026 Zoubeir Ibrahima. Tous droits réservés.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
