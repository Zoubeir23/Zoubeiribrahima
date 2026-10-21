import PageShell from "@/components/PageShell";
import SkillsSection from "@/components/SkillsSection";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { pageContent } from "@/lib/page-content";

const SkillsPage = () => {
  const meta = useLocalizedContent(pageContent).skills;

  return (
    <PageShell path="/skills" title={meta.title} metaTitle={meta.metaTitle} description={meta.description}>
      <SkillsSection headingAs="h1" />
    </PageShell>
  );
};

export default SkillsPage;
