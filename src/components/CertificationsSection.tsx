import { Award, ExternalLink } from "lucide-react";
import IssuerLogo from "@/components/IssuerLogo";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { certifications } from "@/data/certifications";
import { certificationsContent } from "@/lib/certifications-content";

const CertificationsSection = () => {
  const content = useLocalizedContent(certificationsContent);

  return (
    <section className="border-y border-[var(--surface-border)] bg-[var(--surface-base)]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-10">
          <div className="mb-2 flex items-center gap-3">
            <Award className="h-5 w-5 text-[var(--accent-orange)]" aria-hidden="true" />
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">{content.listEyebrow}</p>
          </div>
          <h3 className="font-display text-2xl uppercase text-white">
            {content.listTitle}
            <span className="ml-3 font-mono text-sm text-[var(--text-muted)]">({certifications.length})</span>
          </h3>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((certification) => {
            const itemClassName =
              "orbit-card spotlight-card group flex h-full items-start gap-4 rounded-md border border-[var(--surface-border)] bg-[var(--surface-deepest)] p-5 hover:border-[var(--accent-violet)]";
            const itemBody = (
              <>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white">
                  <IssuerLogo issuer={certification.issuer} />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="line-clamp-2 font-display text-sm uppercase leading-tight text-white">{certification.title}</h4>
                  <p className="mt-1 font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">{certification.date}</p>
                  {certification.skills && certification.skills.length > 0 ? (
                    <ul className="mt-2 flex flex-wrap gap-1">
                      {certification.skills.map((skill) => (
                        <li
                          key={skill}
                          className="rounded-full border border-[var(--surface-border)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-[var(--text-secondary)]"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                {certification.certUrl ? (
                  <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-[var(--text-muted)] transition-colors duration-300 group-hover:text-white" aria-hidden="true" />
                ) : null}
              </>
            );

            return (
              <li key={certification.id}>
                {certification.certUrl ? (
                  <a href={certification.certUrl} target="_blank" rel="noopener noreferrer" className={itemClassName}>
                    {itemBody}
                  </a>
                ) : (
                  <div className={itemClassName}>{itemBody}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default CertificationsSection;
