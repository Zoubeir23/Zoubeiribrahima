import { ArrowLeft, ArrowUpRight, Download } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import remarkGfm from "remark-gfm";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import {
  findLeadMagnetResource,
  type LeadMagnetDownload,
  type LeadMagnetDownloadKind,
  type LeadMagnetLinkKind,
} from "@/data/leadMagnetResources";
import { usePageMetadata } from "@/hooks/usePageMetadata";

// A resource shared by link only: it is always noindex, whether it exists or not.

const SITE_TITLE_SUFFIX = "Zoubeir Ibrahima";

const downloadKindLabels: Record<LeadMagnetDownloadKind, string> = {
  pdf: "PDF",
  zip: "Zip",
  other: "Fichier",
};

const linkKindLabels: Record<LeadMagnetLinkKind, string> = {
  agent: "Agent IA",
  skill: "Skill",
  mcp: "Serveur MCP",
  repository: "Dépôt",
  other: "Lien",
};

const sectionClassName = "mt-10 border border-[var(--surface-border)] bg-[var(--surface-deepest)] p-6 sm:p-8 rounded-md";
const sectionHeadingClassName = "font-display font-black text-xl sm:text-2xl uppercase text-white";
const itemLinkClassName =
  "flex min-h-11 items-start justify-between gap-4 rounded-md border border-[var(--surface-border)] p-4 transition-colors duration-300 hover:border-white focus-visible:border-white";

const isLocalFile = (download: LeadMagnetDownload): boolean => download.href.startsWith("/");

const LeadMagnetResourcePage = () => {
  const { slug } = useParams();
  const resource = findLeadMagnetResource(slug);

  usePageMetadata({
    title: resource ? `${resource.title} | ${SITE_TITLE_SUFFIX}` : `Ressource introuvable | ${SITE_TITLE_SUFFIX}`,
    description: resource?.summary ?? "Cette ressource n'existe pas ou n'est plus disponible.",
    path: `/lead-magnet/${slug ?? ""}`,
    noindex: true,
  });

  if (!resource) {
    return (
      <div className="min-h-screen bg-[var(--surface-deepest)] font-body text-white">
        <Navbar />
        <main className="mx-auto flex max-w-3xl flex-col items-start gap-6 px-4 pb-24 pt-40 sm:px-6">
          <h1 className="font-display text-3xl uppercase text-white">Ressource introuvable</h1>
          <p className="text-[var(--text-secondary)]">Cette ressource n'existe pas ou n'est plus disponible.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--surface-border)] px-4 py-2 font-mono text-xs uppercase tracking-widest text-white transition-colors duration-300 hover:border-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Retour à l'accueil
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--surface-deepest)] font-body text-white antialiased">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-40 sm:px-6">
        <h1 className="font-display font-black text-3xl sm:text-5xl uppercase text-white">{resource.title}</h1>
        <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)]">{resource.summary}</p>

        {resource.contentMarkdown && (
          <section className={sectionClassName}>
            <div className="font-body text-sm sm:text-base text-white/88 leading-relaxed">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children }) => <h2 className={`mt-8 first:mt-0 ${sectionHeadingClassName}`}>{children}</h2>,
                  h3: ({ children }) => (
                    <h3 className="mt-6 font-display font-black text-lg sm:text-xl uppercase text-white">{children}</h3>
                  ),
                  p: ({ children }) => <p className="mt-4">{children}</p>,
                  ul: ({ children }) => <ul className="mt-4 space-y-2 list-disc pl-5">{children}</ul>,
                  ol: ({ children }) => <ol className="mt-4 space-y-2 list-decimal pl-5">{children}</ol>,
                  a: ({ children, href }) => (
                    <a href={href} className="underline underline-offset-4 hover:text-white" target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  ),
                }}
              >
                {resource.contentMarkdown}
              </ReactMarkdown>
            </div>
          </section>
        )}

        {resource.downloads.length > 0 && (
          <section className={sectionClassName} aria-labelledby="lead-magnet-downloads-heading">
            <h2 id="lead-magnet-downloads-heading" className={sectionHeadingClassName}>Fichiers</h2>
            <ul className="mt-6 space-y-3">
              {resource.downloads.map((download) => (
                <li key={download.href}>
                  <a
                    href={download.href}
                    className={itemLinkClassName}
                    {...(isLocalFile(download) ? { download: "" } : { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    <span className="flex flex-col">
                      <span className="font-semibold text-white">{download.label}</span>
                      <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
                        {downloadKindLabels[download.kind]}
                        {download.sizeLabel ? ` · ${download.sizeLabel}` : ""}
                        {isLocalFile(download) ? "" : " · nouvel onglet"}
                      </span>
                    </span>
                    {isLocalFile(download) ? (
                      <Download className="h-5 w-5 shrink-0" aria-hidden="true" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5 shrink-0" aria-hidden="true" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {resource.links.length > 0 && (
          <section className={sectionClassName} aria-labelledby="lead-magnet-links-heading">
            <h2 id="lead-magnet-links-heading" className={sectionHeadingClassName}>Liens</h2>
            <ul aria-label="Liens de la ressource" className="mt-6 space-y-3">
              {resource.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={itemLinkClassName} target="_blank" rel="noopener noreferrer">
                    <span className="flex flex-col gap-1">
                      <span className="font-semibold text-white">{link.label}</span>
                      <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
                        {linkKindLabels[link.kind]} · nouvel onglet
                      </span>
                      {link.description && <span className="text-sm text-white/80">{link.description}</span>}
                    </span>
                    <ArrowUpRight className="h-5 w-5 shrink-0" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
};

export default LeadMagnetResourcePage;
