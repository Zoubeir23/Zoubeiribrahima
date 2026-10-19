import type { CSSProperties } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import Emoji from "@/components/Emoji";
import { useLandingContent } from "@/hooks/useLandingContent";

const TRUST_BADGE_EMOJIS = ["💼", "💻", "🌍"] as const;
const STAT_EMOJIS = ["⏱️", "🏆", "🚀"] as const;

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
            <div
              className="reveal-up flex flex-wrap items-center gap-3"
              style={{ "--reveal-delay": "0.05s" } as CSSProperties}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--surface-border)] bg-[var(--surface-base)] px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
                <span
                  className="animate-status-ping h-2 w-2 rounded-full bg-[var(--status-success)]"
                  aria-hidden="true"
                />
                {hero.availability}
              </span>
              <span className="inline-flex items-center gap-1.5 font-body text-sm text-[var(--text-muted)]">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {hero.location}
              </span>
            </div>

            <h1
              className="reveal-up font-display text-[clamp(2rem,7vw,4.25rem)] font-extrabold uppercase leading-[1.02] text-white"
              style={{ "--reveal-delay": "0.15s" } as CSSProperties}
            >
              {hero.headlineLead}{" "}
              <span className="text-[var(--accent-violet)]">
                {hero.headlineHighlight}
              </span>
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
                className="animate-glow-pulse group inline-flex min-h-11 items-center justify-center gap-3 rounded-full bg-white px-7 py-3.5 font-body text-sm font-semibold text-[var(--surface-deepest)] transition-colors duration-300 hover:bg-[var(--text-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-violet)]"
              >
                <Emoji symbol="🚀" />
                {hero.primaryAction}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
              <a
                href="#projects"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--surface-border)] px-7 py-3.5 font-body text-sm font-semibold text-white transition-colors duration-300 hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-violet)]"
              >
                <Emoji symbol="📂" className="mr-2" />
                {hero.secondaryAction}
              </a>
            </div>

            <ul
              className="reveal-up flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]"
              style={{ "--reveal-delay": "0.45s" } as CSSProperties}
            >
              {hero.trustBadges.map((badge, index) => (
                <li key={badge} className="flex items-center gap-2">
                  <Emoji symbol={TRUST_BADGE_EMOJIS[index] ?? "◆"} className="text-sm" />
                  {badge}
                </li>
              ))}
            </ul>

            <dl
              className="reveal-up grid grid-cols-3 gap-4 border-t border-[var(--surface-border)] pt-6"
              style={{ "--reveal-delay": "0.55s" } as CSSProperties}
            >
              {hero.stats.map((stat, index) => (
                <div key={stat.label}>
                  <dd className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                    {stat.value}
                  </dd>
                  <dt className="font-body text-xs uppercase tracking-wider text-[var(--text-muted)] sm:text-sm">
                    <Emoji symbol={STAT_EMOJIS[index] ?? "•"} className="mr-1.5" />
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <div className="animate-float-soft">
              <div
                className="reveal-up gradient-ring relative w-64 rounded-[var(--radius-medium)] bg-[var(--surface-base)] sm:w-72 md:w-96"
                style={{ "--reveal-delay": "0.3s" } as CSSProperties}
              >
                <div className="scan-surface rounded-[inherit]">
                  <img
                    src="/Gemini_Generated_Image_5omzhk5omzhk5omz-removebg-preview.png"
                    alt="Zoubeir Ibrahima Amed"
                    className="h-72 w-full object-contain object-bottom sm:h-80 md:h-[28rem]"
                    width={768}
                    height={896}
                    {...{ fetchpriority: "high" }}
                  />
                </div>
                <span className="absolute -bottom-3 left-4 rounded-full border border-[var(--surface-border)] bg-[var(--surface-raised)] px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-white">
                  Django · Python · AI
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
