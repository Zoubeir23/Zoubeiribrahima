import { Brain, Cloud, Server, type LucideIcon } from "lucide-react";
import Emoji from "@/components/Emoji";
import Reveal from "@/components/Reveal";
import { getSubheadingTag } from "@/lib/heading-levels";
import SectionHeading, { type SectionHeadingLevel } from "@/components/SectionHeading";
import TechnologyIcon from "@/components/TechnologyIcon";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { DOMAIN_EMOJIS, SKILL_CARD_EMOJIS } from "@/lib/icon-sets";
import { skillsContent } from "@/lib/skills-content";

const skillIcons: readonly LucideIcon[] = [Server, Brain, Cloud];

const SkillsSection = ({ headingAs }: { headingAs?: SectionHeadingLevel }) => {
  const CardHeading = getSubheadingTag(headingAs, 1);
  const GroupHeading = getSubheadingTag(headingAs, 2);
  const skills = useLocalizedContent(skillsContent);

  return (
    <section
      id="skills"
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28"
    >
      <SectionHeading headingAs={headingAs}
        emoji="⚙️"
        eyebrow={skills.eyebrow}
        title={skills.titleLead}
        highlight={skills.titleHighlight}
      />

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {skills.cards.map((card, index) => {
          const SkillIcon = skillIcons[index] ?? Server;
          return (
            <Reveal as="li" key={card.title} delaySeconds={index * 0.1}>
              <div className="orbit-card spotlight-card group h-full rounded-md border border-[var(--surface-border)] bg-[var(--surface-base)] p-6 hover:border-[var(--accent-violet)]">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-md bg-white">
                  <SkillIcon
                    className="h-6 w-6 text-[var(--surface-deepest)]"
                    aria-hidden="true"
                  />
                </div>
                <CardHeading className="mb-5 font-display text-lg uppercase text-white">
                  <Emoji symbol={SKILL_CARD_EMOJIS[index] ?? "•"} className="mr-2" />
                  {card.title}
                </CardHeading>
                <ul className="space-y-2">
                  {card.techs.map((tech) => (
                    <li
                      key={tech}
                      className="flex items-center gap-3 text-sm text-[var(--text-secondary)]"
                    >
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-orange)]"
                        aria-hidden="true"
                      />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </ul>

      <Reveal className="mt-12">
        <CardHeading className="mb-6 font-display text-xl uppercase text-white">
          <Emoji symbol="🧰" className="mr-3" />
          {skills.stack.title}
        </CardHeading>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.stack.groups.map((group) => (
            <div
              key={group.label}
              className="spotlight-card rounded-md border border-[var(--surface-border)] bg-[var(--surface-base)] p-5"
            >
              <GroupHeading className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-[var(--text-muted)]">{group.label}</GroupHeading>
              <ul aria-label={group.label} className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--surface-border)] bg-[var(--surface-deepest)] py-1.5 pl-2 pr-3 font-mono text-xs uppercase tracking-wider text-white"
                  >
                    <TechnologyIcon name={item} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-12 border-t border-[var(--surface-border)] pt-8">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">
          {skills.domainsLabel}
        </p>
        <ul className="flex flex-wrap gap-2 sm:gap-3">
          {skills.domains.map((domain, index) => (
            <li
              key={domain}
              className="rounded-full border border-[var(--surface-border)] px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-white"
            >
              <Emoji symbol={DOMAIN_EMOJIS[index] ?? "•"} className="mr-2" />
              {domain}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SkillsSection;
