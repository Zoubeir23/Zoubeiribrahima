import AboutPresentationSection from "@/components/AboutPresentationSection";
import PageShell from "@/components/PageShell";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { aboutContent } from "@/lib/about-content";

const AboutPage = () => {
  const { meta } = useLocalizedContent(aboutContent);

  return (
    <PageShell path="/a-propos" title={meta.title} description={meta.description}>
      <AboutPresentationSection headingAs="h1" />
    </PageShell>
  );
};

export default AboutPage;
