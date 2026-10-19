import PageShell from "@/components/PageShell";
import ProjectsBentoSection from "@/components/ProjectsBentoSection";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { pageContent } from "@/lib/page-content";

const ProjectsPage = () => {
  const meta = useLocalizedContent(pageContent).projects;

  return (
    <PageShell path="/projects" title={meta.title} description={meta.description}>
      <ProjectsBentoSection headingAs="h1" />
    </PageShell>
  );
};

export default ProjectsPage;
