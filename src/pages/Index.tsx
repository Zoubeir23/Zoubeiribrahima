import { lazy, Suspense, useEffect, useRef, useState } from "react";
import ClosingCallToAction from "@/components/ClosingCallToAction";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import ProcessSection from "@/components/ProcessSection";
import ProjectsBentoSection from "@/components/ProjectsBentoSection";
import ReasonsSection from "@/components/ReasonsSection";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import ServiceTicker from "@/components/ServiceTicker";
import ServicesSection from "@/components/ServicesSection";
import SiteFooter from "@/components/SiteFooter";
import SkillsSection from "@/components/SkillsSection";
import { useLandingContent } from "@/hooks/useLandingContent";

const AboutSection = lazy(() => import("@/components/AboutSection"));
const CertificationsWallOfFame = lazy(() => import("@/components/CertificationsWallOfFame"));
const CertificationsSection = lazy(() => import("@/components/CertificationsSection"));
const FaqSection = lazy(() => import("@/components/FaqSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

const DEFERRED_SECTIONS_ROOT_MARGIN = "900px 0px";

const SectionPlaceholder = ({ minHeight = "360px" }: { minHeight?: string }) => (
  <div
    className="w-full border-y border-[var(--surface-border)] bg-[var(--surface-base)]/50"
    style={{ minHeight }}
    aria-hidden="true"
  />
);

const ServiceTickerBand = () => {
  const { hero } = useLandingContent();
  return <ServiceTicker items={hero.tickerItems} label={hero.tickerLabel} />;
};

const Index = () => {
  const [deferDeepSections, setDeferDeepSections] = useState(false);
  const deepSectionsTriggerRef = useRef<HTMLDivElement | null>(null);

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
      { root: null, rootMargin: DEFERRED_SECTIONS_ROOT_MARGIN, threshold: 0 },
    );

    observer.observe(triggerNode);
    return () => observer.disconnect();
  }, [deferDeepSections]);

  return (
    <div className="min-h-screen bg-[var(--surface-deepest)] font-body text-white antialiased">
      <Navbar />
      <main>
        <HeroSection />
        <ServiceTickerBand />
        <ServicesSection />
        <SkillsSection />
        <ProjectsBentoSection />
        <ProcessSection />
        <ReasonsSection />
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
            <ClosingCallToAction />
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
      </main>
      <SiteFooter />
      <ScrollToTopButton />
    </div>
  );
};

export default Index;
