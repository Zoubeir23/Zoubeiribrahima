import ClosingCallToAction from "@/components/ClosingCallToAction";
import HeroSection from "@/components/HeroSection";
import {
  CertificationsTeaser,
  ExperienceTeaser,
  FaqTeaser,
  ProjectsTeaser,
  SkillsTeaser,
} from "@/components/HomeTeasers";
import LegacyHashRedirect from "@/components/LegacyHashRedirect";
import Navbar from "@/components/Navbar";
import ProcessSection from "@/components/ProcessSection";
import ReasonsSection from "@/components/ReasonsSection";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import ServiceTicker from "@/components/ServiceTicker";
import ServicesSection from "@/components/ServicesSection";
import SiteFooter from "@/components/SiteFooter";
import { useLandingContent } from "@/hooks/useLandingContent";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { pageContent } from "@/lib/page-content";
import { serviceMeta, serviceSlugs } from "@/lib/service-meta";

const ServiceTickerBand = () => {
  const { hero } = useLandingContent();
  return (
    <ServiceTicker
      items={hero.tickerItems}
      emojis={serviceSlugs.map((slug) => serviceMeta[slug].emoji)}
      label={hero.tickerLabel}
    />
  );
};

const Index = () => {
  const { title, description } = useLocalizedContent(pageContent).home;
  usePageMetadata({ title, description, path: "/" });

  return (
    <div className="min-h-screen bg-[var(--surface-deepest)] font-body text-white antialiased">
      <LegacyHashRedirect />
      <Navbar />
      <main>
        <HeroSection />
        <ServiceTickerBand />
        <ServicesSection />
        <ProcessSection />
        <ReasonsSection />
        <SkillsTeaser />
        <ProjectsTeaser />
        <ExperienceTeaser />
        <CertificationsTeaser />
        <FaqTeaser />
        <ClosingCallToAction />
      </main>
      <SiteFooter />
      <ScrollToTopButton />
    </div>
  );
};

export default Index;
