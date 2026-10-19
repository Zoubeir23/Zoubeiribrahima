import { ArrowLeft, FileText, ShieldCheck } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Emoji from "@/components/Emoji";
import Navbar from "@/components/Navbar";
import Reveal from "@/components/Reveal";
import SiteFooter from "@/components/SiteFooter";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { legalContent } from "@/lib/legal-content";

type LegalKind = "privacy" | "terms";

interface LegalPageProps {
  kind: LegalKind;
}

const LEGAL_ROUTES: Record<LegalKind, string> = {
  privacy: "/privacy",
  terms: "/terms",
};

const LEGAL_EMOJIS: Record<LegalKind, string> = {
  privacy: "🔒",
  terms: "📜",
};

const SITE_NAME = "Zoubeir Ibrahima";

const LegalPage = ({ kind }: LegalPageProps) => {
  const content = useLocalizedContent(legalContent);
  const legalDocument = content[kind];
  const otherKind: LegalKind = kind === "privacy" ? "terms" : "privacy";
  const otherDocument = content[otherKind];
  const OtherIcon = otherKind === "privacy" ? ShieldCheck : FileText;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [kind]);

  useEffect(() => {
    document.title = `${legalDocument.title} | ${SITE_NAME}`;
  }, [legalDocument.title]);

  return (
    <div className="min-h-screen bg-[var(--surface-deepest)] font-body text-white antialiased">
      <Navbar />
      <main>
        <header className="hero-backdrop">
          <div className="mx-auto max-w-4xl px-4 pb-12 pt-32 sm:px-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--surface-border)] px-4 py-2 font-mono text-xs uppercase tracking-widest text-white transition-colors duration-300 hover:border-white"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {content.backHome}
            </Link>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">
              — {legalDocument.eyebrow}
            </p>
            <h1 className="mt-3 font-display text-[clamp(1.75rem,5vw,3.25rem)] uppercase leading-tight text-white">
              <Emoji symbol={LEGAL_EMOJIS[kind]} className="mr-3 align-middle text-[0.8em]" />
              {legalDocument.title}
            </h1>
            <p className="mt-4 font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
              {legalDocument.lastUpdatedLabel} : {legalDocument.lastUpdated}
            </p>
            <p className="mt-6 max-w-3xl text-[var(--text-secondary)]">{legalDocument.intro}</p>
          </div>
        </header>

        <div className="mx-auto max-w-4xl space-y-6 px-4 py-12 sm:px-6">
          {legalDocument.sections.map((section, index) => (
            <Reveal
              key={section.title}
              as="section"
              className="rounded-md border border-[var(--surface-border)] bg-[var(--surface-base)] p-6 sm:p-8"
            >
              <h2 className="mb-4 font-display text-lg uppercase leading-tight text-white sm:text-xl">
                <span className="mr-3 font-mono text-sm text-[var(--accent-violet)]" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {section.title}
              </h2>
              <div className="space-y-3 text-sm text-[var(--text-secondary)] sm:text-base">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.items ? (
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-orange)]" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </Reveal>
          ))}

          <Link
            to={LEGAL_ROUTES[otherKind]}
            className="orbit-card spotlight-card flex items-center gap-4 rounded-md border border-[var(--surface-border)] bg-[var(--surface-base)] p-6 hover:border-[var(--accent-violet)]"
          >
            <OtherIcon className="h-6 w-6 text-[var(--accent-orange)]" aria-hidden="true" />
            <span>
              <span className="block font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
                {content.otherDocumentLabel}
              </span>
              <span className="font-semibold text-white">{otherDocument.title}</span>
            </span>
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default LegalPage;
