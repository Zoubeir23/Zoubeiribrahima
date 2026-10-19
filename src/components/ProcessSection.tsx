import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Emoji from "@/components/Emoji";
import { useLandingContent } from "@/hooks/useLandingContent";
import { PROCESS_EMOJIS } from "@/lib/icon-sets";

const ProcessSection = () => {
  const { process } = useLandingContent();

  return (
    <section id="process" className="border-y border-[var(--surface-border)] bg-[var(--surface-base)]">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading emoji="🧭" title={process.title} subtitle={process.subtitle} />
        <ol className="grid gap-6 md:grid-cols-3">
          {process.steps.map((step, index) => (
            <Reveal as="li" key={step.title} delaySeconds={index * 0.12}>
              <div className="orbit-card spotlight-card h-full rounded-md border border-[var(--surface-border)] bg-[var(--surface-deepest)] p-6 hover:border-[var(--accent-violet)]">
                <div className="flex items-center justify-between">
                  <Emoji symbol={PROCESS_EMOJIS[index] ?? "•"} className="text-3xl" />
                  <span className="font-mono text-sm tracking-widest text-[var(--accent-violet)]" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl uppercase text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ProcessSection;
