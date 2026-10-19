import { Code2, Globe2, MessageCircle, UserCheck, type LucideIcon } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { useLandingContent } from "@/hooks/useLandingContent";

const reasonIcons: readonly LucideIcon[] = [MessageCircle, UserCheck, Globe2, Code2];

const ReasonsSection = () => {
  const { reasons } = useLandingContent();

  return (
    <section id="why-me" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading title={reasons.title} />
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.items.map((reason, index) => {
          const ReasonIcon = reasonIcons[index] ?? MessageCircle;
          return (
            <Reveal as="li" key={reason.title} delaySeconds={index * 0.1}>
              <ReasonIcon className="mb-4 h-6 w-6 text-[var(--accent-violet)]" aria-hidden="true" />
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
