import ContactSection from "@/components/ContactSection";
import PageShell from "@/components/PageShell";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { pageContent } from "@/lib/page-content";

const ContactPage = () => {
  const meta = useLocalizedContent(pageContent).contact;

  return (
    <PageShell path="/contact" title={meta.title} description={meta.description} showClosingCallToAction={false}>
      <ContactSection headingAs="h1" />
    </PageShell>
  );
};

export default ContactPage;
