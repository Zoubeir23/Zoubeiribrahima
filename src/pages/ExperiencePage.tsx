import AboutSection from "@/components/AboutSection";
import PageShell from "@/components/PageShell";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { pageContent } from "@/lib/page-content";

const ExperiencePage = () => {
  const meta = useLocalizedContent(pageContent).experience;

  return (
    <PageShell path="/experience" title={meta.title} description={meta.description}>
      <AboutSection headingAs="h1" />
    </PageShell>
  );
};

export default ExperiencePage;
