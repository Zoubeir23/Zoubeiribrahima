import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Emoji from "@/components/Emoji";
import Reveal from "@/components/Reveal";
import { useLandingContent } from "@/hooks/useLandingContent";

const ClosingCallToAction = () => {
  const { closing } = useLandingContent();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <Reveal>
        <div className="gradient-ring animate-glow-pulse relative flex flex-col items-start justify-between gap-6 rounded-[var(--radius-medium)] bg-[var(--surface-base)] p-8 sm:flex-row sm:items-center sm:p-12">
          <h2 className="max-w-xl font-display text-[clamp(1.4rem,3.5vw,2.25rem)] uppercase leading-tight text-white">
            <Emoji symbol="🤝" className="mr-3" />
            {closing.title}
          </h2>
          <Link
            to="/contact"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3.5 font-body text-sm font-semibold text-[var(--surface-deepest)] transition-colors duration-300 hover:bg-[var(--text-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-violet)]"
          >
            {closing.action}
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
};

export default ClosingCallToAction;
