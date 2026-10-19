import { ArrowRight, ExternalLink } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { projectsContent } from "@/lib/projects-content";

const FEATURED_PROJECT_URL = "https://snapfolioo.com";
const GITHUB_PROFILE_URL = "https://github.com/Zoubeir23";

const tagClassName =
  "rounded-full border border-[var(--surface-border)] px-3 py-1 font-mono text-xs uppercase tracking-wider text-white";

const ProjectsBentoSection = () => {
  const projects = useLocalizedContent(projectsContent);

  return (
    <section id="projects" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading eyebrow={projects.eyebrow} title={projects.titleLead} highlight={projects.titleHighlight} />

      <article className="gradient-ring relative mb-4 grid rounded-[var(--radius-medium)] bg-[var(--surface-base)] lg:grid-cols-2">
        <div className="flex flex-col justify-between gap-8 p-6 sm:p-10">
          <div>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-white px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-[var(--surface-deepest)]">
                ★ {projects.featuredBadge}
              </span>
              <span className="rounded-full border border-[var(--surface-border)] px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-white">
                {projects.featured.status}
              </span>
            </div>
            <h3 className="mb-4 font-display text-4xl uppercase leading-none text-white sm:text-5xl">
              {projects.featured.title}
            </h3>
            <p className="mb-8 text-base text-[var(--text-secondary)] sm:text-lg">{projects.featured.description}</p>
            <ul className="flex flex-wrap gap-2">
              {projects.featured.tags.map((tag) => (
                <li key={tag} className={tagClassName}>
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={FEATURED_PROJECT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-body text-sm font-semibold text-[var(--surface-deepest)] transition-colors duration-300 hover:bg-[var(--text-secondary)]"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              {projects.featured.linkLabel}
            </a>
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-[var(--surface-border)] px-6 py-3 font-body text-sm font-semibold text-white transition-colors duration-300 hover:border-white"
            >
              GitHub →
            </a>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-6 border-t border-[var(--surface-border)] p-6 sm:p-10 lg:border-l lg:border-t-0">
          <dl className="grid grid-cols-2 gap-4">
            {projects.featuredStats.map((stat) => (
              <div key={stat.label} className="rounded-md border border-[var(--surface-border)] p-5">
                <dd className="font-display text-2xl text-white sm:text-3xl">{stat.value}</dd>
                <dt className="mt-1 font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">{stat.label}</dt>
              </div>
            ))}
          </dl>
          <div className="border-t border-[var(--surface-border)] pt-6">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
              {projects.architectureLabel}
            </p>
            <p className="text-sm text-[var(--text-secondary)]">{projects.architectureText}</p>
          </div>
        </div>
      </article>

      <ul className="grid gap-4 md:grid-cols-2">
        {projects.others.map((project) => (
          <li
            key={project.title}
            className="rounded-md border border-[var(--surface-border)] bg-[var(--surface-base)] p-6 transition-colors duration-300 hover:border-[var(--accent-violet)] sm:p-8"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <h3 className="font-display text-xl uppercase leading-tight text-white sm:text-2xl">{project.title}</h3>
              <span className="shrink-0 rounded-full border border-[var(--surface-border)] px-3 py-1 font-mono text-xs uppercase tracking-widest text-white">
                {project.status}
              </span>
            </div>
            <p className="mb-6 text-sm text-[var(--text-secondary)]">{project.description}</p>
            <ul className="mb-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li key={tag} className={tagClassName}>
                  {tag}
                </li>
              ))}
            </ul>
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white underline-offset-4 hover:underline"
            >
              {project.linkLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </li>
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
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};

export default ProjectsBentoSection;
