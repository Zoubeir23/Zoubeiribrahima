import type { ReactNode } from "react";
import ClosingCallToAction from "@/components/ClosingCallToAction";
import Navbar from "@/components/Navbar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import SiteFooter from "@/components/SiteFooter";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const SITE_NAME = "Zoubeir Ibrahima";

interface PageShellProps {
  title: string;
  description: string;
  path: string;
  showClosingCallToAction?: boolean;
  children: ReactNode;
}

const PageShell = ({ title, description, path, showClosingCallToAction = true, children }: PageShellProps) => {
  usePageMetadata({ title: `${title} | ${SITE_NAME}`, description, path });

  return (
    <div className="min-h-screen bg-[var(--surface-deepest)] font-body text-white antialiased">
      <Navbar />
      <main className="pt-20 sm:pt-24">
        {children}
        {showClosingCallToAction ? <ClosingCallToAction /> : null}
      </main>
      <SiteFooter />
      <ScrollToTopButton />
    </div>
  );
};

export default PageShell;
