import FaqSection from "@/components/FaqSection";
import PageShell from "@/components/PageShell";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { pageContent } from "@/lib/page-content";

const FaqPage = () => {
  const meta = useLocalizedContent(pageContent).faq;

  return (
    <PageShell path="/faq" title={meta.title} description={meta.description}>
      <FaqSection headingAs="h1" />
    </PageShell>
  );
};

export default FaqPage;
