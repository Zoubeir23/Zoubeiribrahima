import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ResourceBrandLogos from "@/components/resources/ResourceBrandLogos";
import ResourceAccessForm from "@/components/resources/ResourceAccessForm";
import ResourceGuideContent from "@/components/resources/ResourceGuideContent";
import SiteFooter from "@/components/SiteFooter";
import { loadResourceGuideText } from "@/data/resourceGuideText";
import { findResourceGuide, type ResourceGuide } from "@/data/resourceGuides";
import { usePageMetadata } from "@/hooks/usePageMetadata";
import { useResourceAccess } from "@/hooks/useResourceAccess";

// One resource guide. The title and summary are public; the text loads only once the library is unlocked.

const SITE_TITLE_SUFFIX = "Zoubeir Ibrahima";
const panelClassName = "mt-10 rounded-md border border-[var(--surface-border)] bg-[var(--surface-base)] p-6 sm:p-8";
const backLinkClassName =
  "inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--surface-border)] px-4 py-2 font-mono text-xs uppercase tracking-widest text-white transition-colors duration-300 hover:border-white";

type TextState = { kind: "loading" } | { kind: "ready"; markdown: string } | { kind: "failed" };

const GuideText = ({ slug }: { slug: string }) => {
  const [textState, setTextState] = useState<TextState>({ kind: "loading" });

  useEffect(() => {
    let isCurrent = true;
    setTextState({ kind: "loading" });
    loadResourceGuideText(slug)
      .then((markdown) => isCurrent && setTextState({ kind: "ready", markdown }))
      .catch(() => isCurrent && setTextState({ kind: "failed" }));
    return () => {
      isCurrent = false;
    };
  }, [slug]);

  if (textState.kind === "loading") return <p role="status">Chargement du guide...</p>;
  if (textState.kind === "failed") {
    return <p role="alert">Le guide n'a pas pu se charger. Recharge la page pour réessayer.</p>;
  }
  return <ResourceGuideContent markdown={textState.markdown} />;
};

const describeTool = (guide: ResourceGuide): string =>
  guide.toolLicense ? `Par ${guide.toolAuthor}, licence ${guide.toolLicense}` : `Par ${guide.toolAuthor}`;

const ResourceGuidePage = () => {
  const { slug } = useParams();
  const guide = findResourceGuide(slug);
  const { state, unlock } = useResourceAccess(slug);

  usePageMetadata({
    title: guide ? `${guide.title} | ${SITE_TITLE_SUFFIX}` : `Ressource introuvable | ${SITE_TITLE_SUFFIX}`,
    description: guide?.summary ?? "Cette ressource n'existe pas ou n'est plus disponible.",
    path: `/ressources/${slug ?? ""}`,
    noindex: !guide,
  });

  return (
    <div className="min-h-screen bg-[var(--surface-deepest)] font-body text-white antialiased">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-40 sm:px-6">
        <Link to="/ressources" className={backLinkClassName}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Toutes les ressources
        </Link>

        {!guide ? (
          <>
            <h1 className="mt-8 font-display text-3xl uppercase text-white">Ressource introuvable</h1>
            <p className="mt-4 text-[var(--text-secondary)]">Cette ressource n'existe pas ou n'est plus disponible.</p>
          </>
        ) : (
          <>
            <ResourceBrandLogos brands={guide.brands} className="mt-8" />
            <h1 className="mt-6 font-display text-3xl font-black uppercase text-white sm:text-5xl">{guide.title}</h1>
            <p className="mt-4 text-base text-[var(--text-secondary)] sm:text-lg">{guide.summary}</p>
            <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
              <span>{describeTool(guide)}</span>
              <a href={guide.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-white">
                Source
                <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                <span className="sr-only">(nouvel onglet)</span>
              </a>
            </p>

            <section className={panelClassName} aria-label={state === "unlocked" ? "Guide" : "Débloquer le guide"}>
              {state === "unlocked" && <GuideText slug={guide.slug} />}
              {state === "locked" && (
                <>
                  <h2 className="font-display text-xl font-black uppercase text-white sm:text-2xl">Débloque le guide</h2>
                  <p className="mb-8 mt-3 text-sm text-[var(--text-secondary)]">
                    Ton prénom et ton e-mail, et tu lis ce guide. Les autres guides, et celui-ci à ta prochaine visite, demandent de nouveau le formulaire.
                  </p>
                  <ResourceAccessForm resourceSlug={guide.slug} onUnlocked={unlock} />
                </>
              )}
            </section>
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
};

export default ResourceGuidePage;
