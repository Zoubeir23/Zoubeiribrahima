import { ArrowRight } from "lucide-react";
import TechnologyIcon from "@/components/TechnologyIcon";
import Reveal from "@/components/Reveal";
import { getSubheadingTag } from "@/lib/heading-levels";
import SectionHeading, { type SectionHeadingLevel } from "@/components/SectionHeading";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { projectsContent } from "@/lib/projects-content";

const GITHUB_PROFILE_URL = "https://github.com/Zoubeir23";

const tagClassName =
  "rounded-full border border-[var(--surface-border)] px-3 py-1 font-mono text-xs uppercase tracking-wider text-white";

const ProjectsBentoSection = ({ headingAs }: { headingAs?: SectionHeadingLevel }) => {
  const CardHeading = getSubheadingTag(headingAs, 1);
  const projects = useLocalizedContent(projectsContent);

  return (
    <section
      id="projects"
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28"
    >
      <SectionHeading headingAs={headingAs}
        emoji="🚀"
        eyebrow={projects.eyebrow}
        title={projects.titleLead}
        highlight={projects.titleHighlight}
      />

      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.projects.map((project, index) => (
          <Reveal as="li" key={project.title} delaySeconds={index * 0.1}>
            <div className="orbit-card spotlight-card h-full rounded-md border border-[var(--surface-border)] bg-[var(--surface-base)] p-6 hover:border-[var(--accent-violet)] sm:p-8">
              <div className="mb-5 flex items-start justify-between gap-4">
                <CardHeading className="font-display text-xl uppercase leading-tight text-white sm:text-2xl">
                  {project.title}
                </CardHeading>
                <span className="shrink-0 rounded-full border border-[var(--surface-border)] px-3 py-1 font-mono text-xs uppercase tracking-widest text-white">
                  {project.status}
                </span>
              </div>
              <p className="mb-6 text-sm text-[var(--text-secondary)]">
                {project.description}
              </p>
              <ul className="mb-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li key={tag} className={tagClassName}>
                    <TechnologyIcon name={tag} className="mr-2" />
                    {tag}
                  </li>
                ))}
              </ul>
              <a
                href={project.repositoryUrl ?? GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white underline-offset-4 hover:underline"
              >
                {project.linkLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        ))}
      </ul>

      <div className="mt-8 flex justify-start sm:justify-end">
        <a
          href={GITHUB_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex min-h-11 items-center gap-3 border-b border-[var(--surface-border)] pb-1 font-mono text-sm uppercase tracking-widest text-white transition-colors duration-300 hover:border-white"
        >
          {projects.githubAllProjects}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </a>
      </div>
    </section>
  );
};

export default ProjectsBentoSection;
