import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";

interface HomeTeaserSectionProps {
  emoji: string;
  title: string;
  description: string;
  path: string;
  linkLabel: string;
  children: ReactNode;
}

const HomeTeaserSection = ({ emoji, title, description, path, linkLabel, children }: HomeTeaserSectionProps) => (
  <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
    <SectionHeading emoji={emoji} title={title} subtitle={description} />
    {children}
    <div className="mt-8 flex justify-start sm:justify-end">
      <Link
        to={path}
        className="group inline-flex min-h-11 items-center gap-3 border-b border-[var(--surface-border)] pb-1 font-mono text-sm uppercase tracking-widest text-white transition-colors duration-300 hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-violet)]"
      >
        {linkLabel}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </div>
  </section>
);

export default HomeTeaserSection;
