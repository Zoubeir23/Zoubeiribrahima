import type { CSSProperties } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { useLandingContent } from "@/hooks/useLandingContent";

const HeroSection = () => {
  const { hero } = useLandingContent();

  return (
    <section
      id="hero"
      className="hero-backdrop flex min-h-[100svh] items-center overflow-hidden pt-24 sm:pt-20"
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="space-y-7 lg:col-span-7">
            <div className="reveal-up flex flex-wrap items-center gap-3" style={{ "--reveal-delay": "0.05s" } as CSSProperties}>
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--surface-border)] bg-[var(--surface-base)] px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--status-success)]" aria-hidden="true" />
                {hero.availability}
              </span>
              <span className="inline-flex items-center gap-1.5 font-body text-sm text-[var(--text-muted)]">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                Sénégal
              </span>
            </div>

            <h1
              className="reveal-up font-display text-[clamp(2rem,7vw,4.25rem)] font-extrabold uppercase leading-[1.02] text-white"
              style={{ "--reveal-delay": "0.15s" } as CSSProperties}
            >
              {hero.headlineLead}{" "}
              <span className="text-[var(--accent-violet)]">{hero.headlineHighlight}</span>
            </h1>

            <p
              className="reveal-up max-w-xl text-base text-[var(--text-secondary)] sm:text-lg"
              style={{ "--reveal-delay": "0.25s" } as CSSProperties}
            >
              {hero.subtitle}
            </p>

            <div
              className="reveal-up flex flex-wrap gap-3"
              style={{ "--reveal-delay": "0.35s" } as CSSProperties}
            >
              <a
                href="#contact"
                className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-full bg-white px-7 py-3.5 font-body text-sm font-semibold text-[var(--surface-deepest)] transition-colors duration-300 hover:bg-[var(--text-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-violet)]"
              >
                {hero.primaryAction}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a
                href="#projects"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--surface-border)] px-7 py-3.5 font-body text-sm font-semibold text-white transition-colors duration-300 hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-violet)]"
              >
                {hero.secondaryAction}
              </a>
            </div>

            <ul
              className="reveal-up flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]"
              style={{ "--reveal-delay": "0.45s" } as CSSProperties}
            >
              {hero.trustBadges.map((badge) => (
                <li key={badge} className="flex items-center gap-2">
                  <span className="text-[var(--accent-orange)]" aria-hidden="true">
                    ◆
                  </span>
                  {badge}
                </li>
              ))}
            </ul>

            <dl
              className="reveal-up grid grid-cols-3 gap-4 border-t border-[var(--surface-border)] pt-6"
              style={{ "--reveal-delay": "0.55s" } as CSSProperties}
            >
              {hero.stats.map((stat) => (
                <div key={stat.label}>
                  <dd className="font-display text-3xl font-extrabold text-white sm:text-4xl">{stat.value}</dd>
                  <dt className="font-body text-xs uppercase tracking-wider text-[var(--text-muted)] sm:text-sm">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <div
              className="reveal-up gradient-ring relative w-64 rounded-[var(--radius-medium)] bg-[var(--surface-base)] sm:w-72 md:w-96"
              style={{ "--reveal-delay": "0.3s" } as CSSProperties}
            >
              <img
                src="/Gemini_Generated_Image_5omzhk5omzhk5omz-removebg-preview.png"
                alt="Zoubeir Ibrahima Amed"
                className="h-72 w-full object-contain object-bottom sm:h-80 md:h-[28rem]"
                width={768}
                height={896}
                fetchPriority="high"
              />
              <span className="absolute -bottom-3 left-4 rounded-full border border-[var(--surface-border)] bg-[var(--surface-raised)] px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-white">
                Django · Python · AI
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
