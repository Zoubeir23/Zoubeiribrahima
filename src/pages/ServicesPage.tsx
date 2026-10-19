import PageShell from "@/components/PageShell";
import ProcessSection from "@/components/ProcessSection";
import ReasonsSection from "@/components/ReasonsSection";
import ServicesSection from "@/components/ServicesSection";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { pageContent } from "@/lib/page-content";

const ServicesPage = () => {
  const meta = useLocalizedContent(pageContent).services;

  return (
    <PageShell path="/services" title={meta.title} description={meta.description}>
      <ServicesSection headingAs="h1" />
      <ProcessSection />
      <ReasonsSection />
    </PageShell>
  );
};

export default ServicesPage;
