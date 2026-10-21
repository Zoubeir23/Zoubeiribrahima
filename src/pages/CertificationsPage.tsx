import CertificationsSection from "@/components/CertificationsSection";
import CertificationsWallOfFame from "@/components/CertificationsWallOfFame";
import PageShell from "@/components/PageShell";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { pageContent } from "@/lib/page-content";

const CertificationsPage = () => {
  const meta = useLocalizedContent(pageContent).certifications;

  return (
    <PageShell path="/certifications" title={meta.title} metaTitle={meta.metaTitle} description={meta.description}>
      <CertificationsWallOfFame headingAs="h1" />
      <CertificationsSection />
    </PageShell>
  );
};

export default CertificationsPage;
