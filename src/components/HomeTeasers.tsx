import { Link } from "react-router-dom";
import Emoji from "@/components/Emoji";
import HomeTeaserSection from "@/components/HomeTeaserSection";
import Reveal from "@/components/Reveal";
import TechnologyIcon from "@/components/TechnologyIcon";
import { certificationIssuerCount, certifications, featuredCertifications } from "@/data/certifications";
import { useLandingContent } from "@/hooks/useLandingContent";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { certificationsContent } from "@/lib/certifications-content";
import { experienceContent } from "@/lib/experience-content";
import { FAQ_EMOJIS } from "@/lib/icon-sets";
import { pageContent } from "@/lib/page-content";
import { projectsContent } from "@/lib/projects-content";
import { skillsContent } from "@/lib/skills-content";
import { getTechnologyLogo } from "@/lib/technology-logos";

const SKILLS_TEASER_LOGO_LIMIT = 12;
const FAQ_TEASER_QUESTION_LIMIT = 3;
const FEATURED_CERTIFICATIONS_LIMIT = 4;

const chipClassName =
  "inline-flex items-center gap-2 rounded-full border border-[var(--surface-border)] bg-[var(--surface-base)] py-1.5 pl-2 pr-3 font-mono text-xs uppercase tracking-wider text-white";
const cardClassName =
  "orbit-card spotlight-card rounded-md border border-[var(--surface-border)] bg-[var(--surface-base)] p-6 hover:border-[var(--accent-violet)]";

export const SkillsTeaser = () => {
  const teaser = useLocalizedContent(pageContent).teasers.skills;
  const skills = useLocalizedContent(skillsContent);
  const technologies = skills.stack.groups
    .flatMap((group) => group.items)
    .filter((name) => getTechnologyLogo(name) !== null)
    .slice(0, SKILLS_TEASER_LOGO_LIMIT);

  return (
    <HomeTeaserSection emoji="⚙️" title={teaser.title} description={teaser.description} path="/skills" linkLabel={teaser.linkLabel}>
      <ul className="flex flex-wrap gap-3">
        {technologies.map((name, index) => (
          <Reveal as="li" key={name} delaySeconds={index * 0.04}>
            <span className={chipClassName}>
              <TechnologyIcon name={name} />
              {name}
            </span>
          </Reveal>
        ))}
      </ul>
    </HomeTeaserSection>
  );
};

export const ProjectsTeaser = () => {
  const teaser = useLocalizedContent(pageContent).teasers.projects;
  const { featured } = useLocalizedContent(projectsContent);

  return (
    <HomeTeaserSection emoji="🚀" title={teaser.title} description={teaser.description} path="/projects" linkLabel={teaser.linkLabel}>
      <Reveal>
        <article className={cardClassName}>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-display text-2xl uppercase text-white sm:text-3xl">{featured.title}</h3>
            <span className="rounded-full border border-[var(--surface-border)] px-3 py-1 font-mono text-xs uppercase tracking-widest text-white">
              {featured.status}
            </span>
          </div>
          <p className="mb-5 max-w-3xl text-[var(--text-secondary)]">{featured.description}</p>
          <ul className="flex flex-wrap gap-2">
            {featured.tags.map((tag) => (
              <li key={tag} className={chipClassName}>
                <TechnologyIcon name={tag} />
                {tag}
              </li>
            ))}
          </ul>
        </article>
      </Reveal>
    </HomeTeaserSection>
  );
};

export const ExperienceTeaser = () => {
  const teaser = useLocalizedContent(pageContent).teasers.experience;
  const { experiences } = useLocalizedContent(experienceContent);

  return (
    <HomeTeaserSection emoji="🎓" title={teaser.title} description={teaser.description} path="/experience" linkLabel={teaser.linkLabel}>
      <ul className="grid gap-4 md:grid-cols-2">
        {experiences.map((item, index) => (
          <Reveal as="li" key={item.company} delaySeconds={index * 0.1}>
            <div className={`${cardClassName} h-full`}>
              <h3 className="font-display text-xl uppercase text-white">{item.company}</h3>
              <p className="mt-1 font-semibold text-white">{item.role}</p>
              <p className="mt-3 font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                <Emoji symbol="📅" className="mr-2" />
                {item.period}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </HomeTeaserSection>
  );
};

export const CertificationsTeaser = () => {
  const teaser = useLocalizedContent(pageContent).teasers.certifications;
  const content = useLocalizedContent(certificationsContent);

  return (
    <HomeTeaserSection
      emoji="🏆"
      title={teaser.title}
      description={teaser.description}
      path="/certifications"
      linkLabel={teaser.linkLabel}
    >
      <Reveal>
        <div className={`${cardClassName} flex flex-wrap items-center gap-8`}>
          <dl className="flex flex-wrap gap-8">
            <div>
              <dd className="font-display text-4xl text-white sm:text-5xl">{certifications.length}</dd>
              <dt className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">{content.obtainedLabel}</dt>
            </div>
            <div>
              <dd className="font-display text-4xl text-white sm:text-5xl">{certificationIssuerCount}</dd>
              <dt className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">{content.issuersLabel}</dt>
            </div>
          </dl>
          <ul className="flex flex-1 flex-wrap gap-2">
            {featuredCertifications.slice(0, FEATURED_CERTIFICATIONS_LIMIT).map((certification) => (
              <li
                key={certification.id}
                className="rounded-full border border-[var(--surface-border)] px-3 py-1 font-mono text-xs uppercase tracking-wider text-[var(--text-secondary)]"
              >
                {certification.featuredTitle ?? certification.title}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </HomeTeaserSection>
  );
};

export const FaqTeaser = () => {
  const teaser = useLocalizedContent(pageContent).teasers.faq;
  const { faq } = useLandingContent();

  return (
    <HomeTeaserSection emoji="❓" title={teaser.title} description={teaser.description} path="/faq" linkLabel={teaser.linkLabel}>
      <ul className="space-y-3">
        {faq.items.slice(0, FAQ_TEASER_QUESTION_LIMIT).map((item, index) => (
          <Reveal as="li" key={item.question} delaySeconds={index * 0.08}>
            <Link to="/faq" className={`${cardClassName} flex items-center gap-4 font-semibold text-white`}>
              <Emoji symbol={FAQ_EMOJIS[index] ?? "❓"} className="text-xl" />
              {item.question}
            </Link>
          </Reveal>
        ))}
      </ul>
    </HomeTeaserSection>
  );
};
