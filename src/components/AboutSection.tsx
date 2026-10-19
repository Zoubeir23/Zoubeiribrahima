import Emoji from "@/components/Emoji";
import Reveal from "@/components/Reveal";
import TechnologyIcon from "@/components/TechnologyIcon";
import SectionHeading, { type SectionHeadingLevel } from "@/components/SectionHeading";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { experienceContent } from "@/lib/experience-content";

const AboutSection = ({ headingAs }: { headingAs?: SectionHeadingLevel }) => {
  const experience = useLocalizedContent(experienceContent);

  return (
    <section
      id="experience"
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading headingAs={headingAs}
          emoji="🎓"
          eyebrow={experience.eyebrow}
          title={experience.titleLead}
          highlight={experience.titleHighlight}
        />
        <div className="flex h-36 w-28 shrink-0 items-end justify-center overflow-hidden rounded-md border border-[var(--surface-border)] bg-[var(--surface-base)] sm:h-44 sm:w-36">
          <img
            src="/Sans_titre-removebg-preview.png"
            alt={experience.portraitAlt}
            className="h-full w-full object-contain object-bottom"
            width={467}
            height={534}
            loading="lazy"
          />
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h3 className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">
            {experience.professionalLabel}
          </h3>
          <ol className="space-y-12 border-l border-[var(--surface-border)] pl-6 sm:pl-8">
            {experience.experiences.map((item, index) => (
              <Reveal
                as="li"
                key={item.company}
                className="relative"
                delaySeconds={index * 0.12}
              >
                <span
                  aria-hidden="true"
                  className={`absolute -left-[2.2rem] top-1.5 h-3 w-3 rounded-full sm:-left-[2.7rem] ${
                    item.isCurrent
                      ? "animate-status-ping bg-[var(--accent-orange)]"
                      : "bg-[var(--surface-border)]"
                  }`}
                />
                <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                  <h4 className="font-display text-xl uppercase leading-none text-white sm:text-2xl">
                    {item.company}
                  </h4>
                  <span className="rounded-full border border-[var(--surface-border)] px-3 py-1 font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)]">
                    <Emoji symbol="📅" className="mr-2" />
                    {item.period}
                  </span>
                </div>
                <p className="font-body text-base font-semibold text-white">
                  {item.role}
                </p>
                <p className="mb-4 font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                  <Emoji symbol="📍" className="mr-2" />
                  {item.location}
                </p>
                <p className="mb-5 text-sm text-[var(--text-secondary)] sm:text-base">
                  {item.description}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-[var(--surface-border)] px-3 py-1 font-mono text-xs uppercase tracking-wider text-white"
                    >
                      <TechnologyIcon name={tag} className="mr-2" />
                      {tag}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">
            {experience.educationLabel}
          </h3>
          <ul>
            {experience.education.map((item, index) => (
              <Reveal
                as="li"
                key={item.degree}
                className="flex flex-col gap-1 border-b border-[var(--surface-border)] py-6"
                delaySeconds={index * 0.1}
              >
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                  <Emoji symbol="🎓" className="mr-2" />
                  {item.period}
                </span>
                <h4 className="font-display text-lg uppercase leading-tight text-white sm:text-xl">
                  {item.degree}
                </h4>
                <p className="text-sm text-[var(--text-secondary)]">
                  {item.school}
                </p>
              </Reveal>
            ))}
          </ul>

          <div className="mt-10 rounded-md border border-[var(--surface-border)] bg-[var(--surface-base)] p-6 sm:p-8">
            <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">
              {experience.languagesLabel}
            </h3>
            <ul className="space-y-4">
              {experience.languages.map((language) => (
                <li key={language.name}>
                  <div className="mb-1 flex justify-between gap-4">
                    <span className="font-body text-sm font-semibold text-white">
                      {language.name}
                    </span>
                    <span className="font-mono text-xs uppercase text-[var(--text-muted)]">
                      {language.level}
                    </span>
                  </div>
                  <div
                    role="progressbar"
                    aria-label={language.name}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={language.percentage}
                    className="h-1.5 overflow-hidden rounded-full bg-[var(--surface-raised)]"
                  >
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[var(--accent-violet)] to-[var(--accent-orange)]"
                      style={{ width: `${language.percentage}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
