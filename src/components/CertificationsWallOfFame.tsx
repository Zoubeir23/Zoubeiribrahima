import { ExternalLink } from "lucide-react";
import IssuerLogo from "@/components/IssuerLogo";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import {
  certificationIssuerCount,
  certifications,
  featuredCertifications,
} from "@/data/certifications";
import { certificationsContent } from "@/lib/certifications-content";

const FEATURED_CERTIFICATIONS_LIMIT = 8;
const featuredForWall = featuredCertifications.slice(
  0,
  FEATURED_CERTIFICATIONS_LIMIT,
);

const extractYear = (date: string): string => date.match(/\d{4}/)?.[0] ?? "-";

const CertificationsWallOfFame = () => {
  const content = useLocalizedContent(certificationsContent);

  return (
    <section
      id="certifications"
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28"
    >
      <SectionHeading
        emoji="🏆"
        eyebrow={content.eyebrow}
        title={content.titleLead}
        highlight={content.titleHighlight}
      />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {featuredForWall.map((certification, index) => {
          const categoryLabel =
            certification.category === "Programme"
              ? content.categoryLabels.program
              : content.categoryLabels.certification;
          const cardClassName =
            "orbit-card spotlight-card group flex h-full flex-col gap-4 rounded-md border border-[var(--surface-border)] bg-[var(--surface-base)] p-5 hover:border-[var(--accent-violet)]";
          const cardBody = (
            <>
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-white">
                  <IssuerLogo issuer={certification.issuer} />
                </div>
                {certification.certUrl ? (
                  <ExternalLink
                    className="mt-1 h-4 w-4 text-[var(--text-muted)] transition-colors duration-300 group-hover:text-white"
                    aria-hidden="true"
                  />
                ) : null}
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  {categoryLabel} · {extractYear(certification.date)}
                </span>
                <h3 className="font-display text-sm uppercase leading-tight text-white sm:text-base">
                  {certification.featuredTitle ?? certification.title}
                </h3>
                {certification.certUrl ? (
                  <span className="mt-2 font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                    {content.viewCredentialLabel} →
                  </span>
                ) : null}
              </div>
            </>
          );

          return (
            <Reveal
              as="li"
              key={certification.id}
              delaySeconds={(index % 4) * 0.08}
            >
              {certification.certUrl ? (
                <a
                  href={certification.certUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClassName}
                >
                  {cardBody}
                </a>
              ) : (
                <div className={cardClassName}>{cardBody}</div>
              )}
            </Reveal>
          );
        })}
      </ul>

      <dl className="mt-8 flex flex-wrap gap-8 rounded-md border border-[var(--surface-border)] bg-[var(--surface-base)] p-6 sm:p-8">
        <div>
          <dd className="font-display text-4xl text-white sm:text-5xl">
            {certifications.length}
          </dd>
          <dt className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
            {content.obtainedLabel}
          </dt>
        </div>
        <div>
          <dd className="font-display text-4xl text-white sm:text-5xl">
            {certificationIssuerCount}
          </dd>
          <dt className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
            {content.issuersLabel}
          </dt>
        </div>
        <div>
          <dd className="font-display text-4xl text-white sm:text-5xl">
            {content.continuousLearning.value}
          </dd>
          <dt className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
            {content.continuousLearning.label}
          </dt>
        </div>
      </dl>
    </section>
  );
};

export default CertificationsWallOfFame;
