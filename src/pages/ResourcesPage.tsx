import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ResourceBrandLogos from "@/components/resources/ResourceBrandLogos";
import SiteFooter from "@/components/SiteFooter";
import {
  resourceGuideCategoryLabels,
  resourceGuides,
  type ResourceGuideCategory,
} from "@/data/resourceGuides";
import { usePageMetadata } from "@/hooks/usePageMetadata";

// Public hub of the resource library: titles and summaries are visible and indexable, each guide opens after
// a first name and an email (see ResourceGuidePage).

const CATEGORY_ORDER: readonly ResourceGuideCategory[] = ["audit", "productivity", "design", "research"];

const ResourcesPage = () => {
  usePageMetadata({
    title: "Ressources gratuites pour Claude Code | Zoubeir Ibrahima",
    description:
      "Guides pas à pas pour Claude Code : audit SEO et sécurité, performance, sous-agents, skills utiles. Commandes et prompts prêts à copier.",
    path: "/ressources",
  });

  return (
    <div className="min-h-screen bg-[var(--surface-deepest)] font-body text-white antialiased">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-40 sm:px-6">
        <h1 className="font-display text-4xl font-black uppercase text-white sm:text-6xl">Ressources</h1>
        <p className="mt-6 max-w-2xl text-base text-[var(--text-secondary)] sm:text-lg">
          Des guides courts pour tirer plus de Claude Code : les outils que j'utilise, vérifiés à leur source, avec
          les commandes et les prompts prêts à copier. Laisse ton prénom et ton e-mail une fois pour tout débloquer.
        </p>

        {CATEGORY_ORDER.map((category) => {
          const guides = resourceGuides.filter((guide) => guide.category === category);
          if (guides.length === 0) return null;
          const headingIdentifier = `ressources-${category}`;
          return (
            <section key={category} aria-labelledby={headingIdentifier} className="mt-14">
              <h2 id={headingIdentifier} className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                {resourceGuideCategoryLabels[category]}
              </h2>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {guides.map((guide) => (
                  <li key={guide.slug}>
                    <Link
                      to={`/ressources/${guide.slug}`}
                      className="flex h-full min-h-11 flex-col justify-between gap-6 rounded-md border border-[var(--surface-border)] p-6 transition-colors duration-300 hover:border-white focus-visible:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-violet)]"
                    >
                      <span className="flex flex-col gap-3">
                        <ResourceBrandLogos brands={guide.brands} className="mb-1" />
                        <span className="font-display text-lg font-black uppercase text-white">{guide.title}</span>
                        <span className="text-sm text-white/80">{guide.summary}</span>
                      </span>
                      <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
                        Lire le guide
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
        <p className="mt-14 text-xs text-[var(--text-muted)]">
          Les logos appartiennent à leurs propriétaires respectifs. Ils servent seulement à indiquer l'outil dont parle
          chaque guide.
        </p>
      </main>
      <SiteFooter />
    </div>
  );
};

export default ResourcesPage;
