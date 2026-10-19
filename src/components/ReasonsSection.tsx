import Emoji from "@/components/Emoji";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { useLandingContent } from "@/hooks/useLandingContent";
import { REASON_EMOJIS } from "@/lib/icon-sets";

const ReasonsSection = () => {
  const { reasons } = useLandingContent();

  return (
    <section id="why-me" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading emoji="🤝" title={reasons.title} />
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.items.map((reason, index) => {
          return (
            <Reveal as="li" key={reason.title} delaySeconds={index * 0.1}>
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-md border border-[var(--surface-border)] bg-[var(--surface-base)]">
                <Emoji symbol={REASON_EMOJIS[index] ?? "•"} className="text-2xl" />
              </span>
              <h3 className="font-body text-base font-semibold text-white">{reason.title}</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">{reason.description}</p>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
};

export default ReasonsSection;
