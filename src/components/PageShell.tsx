import type { ReactNode } from "react";
import ClosingCallToAction from "@/components/ClosingCallToAction";
import Navbar from "@/components/Navbar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import SiteFooter from "@/components/SiteFooter";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const SITE_NAME = "Zoubeir Ibrahima";

interface PageShellProps {
  title: string;
  /** Keyword-rich <title> without the brand suffix; falls back to `title`. */
  metaTitle?: string;
  description: string;
  path: string;
  showClosingCallToAction?: boolean;
  children: ReactNode;
}

const PageShell = ({ title, metaTitle, description, path, showClosingCallToAction = true, children }: PageShellProps) => {
  usePageMetadata({ title: `${metaTitle ?? title} | ${SITE_NAME}`, description, path });

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
