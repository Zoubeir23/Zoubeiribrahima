import Emoji from "@/components/Emoji";
import Reveal from "@/components/Reveal";

export type SectionHeadingLevel = "h1" | "h2";

interface SectionHeadingProps {
  title: string;
  highlight?: string;
  eyebrow?: string;
  subtitle?: string;
  emoji?: string;
  headingAs?: SectionHeadingLevel;
}

const SectionHeading = ({ title, highlight, eyebrow, subtitle, emoji, headingAs: HeadingTag = "h2" }: SectionHeadingProps) => (
  <Reveal className="mb-10 max-w-3xl sm:mb-14">
    {eyebrow ? (
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">— {eyebrow}</p>
    ) : null}
    <HeadingTag className="font-display text-[clamp(1.6rem,4.5vw,3rem)] uppercase leading-tight text-white">
      {emoji ? <Emoji symbol={emoji} className="mr-3 align-middle text-[0.8em]" /> : null}
      {title}
      {highlight ? (
        <>
          {" "}
          <span className="inline-block rounded-full bg-white px-3 text-[var(--surface-deepest)]">{highlight}</span>
        </>
      ) : null}
    </HeadingTag>
    {subtitle ? <p className="mt-4 text-[var(--text-secondary)]">{subtitle}</p> : null}
  </Reveal>
);

export default SectionHeading;
