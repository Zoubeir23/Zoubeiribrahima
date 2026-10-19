import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ProcessSection from "@/components/ProcessSection";
import SectionHeading from "@/components/SectionHeading";
import ServiceIllustration from "@/components/ServiceIllustration";
import ServiceOfferingTabs from "@/components/ServiceOfferingTabs";
import SiteFooter from "@/components/SiteFooter";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { isServiceSlug } from "@/lib/service-meta";
import { servicesContent } from "@/lib/services-content";

const backLinkClassName =
  "inline-flex items-center gap-2 rounded-full border border-[var(--surface-border)] px-4 py-2 font-mono text-xs uppercase tracking-widest text-white transition-colors duration-300 hover:border-white";

const ServiceDetail = () => {
  const { slug } = useParams();
  const content = useLocalizedContent(servicesContent);
  const service = isServiceSlug(slug) ? content.services[slug] : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  useEffect(() => {
    if (service) {
      document.title = `${service.title} | ${content.pageTitleSuffix}`;
    }
  }, [service, content.pageTitleSuffix]);

  if (!isServiceSlug(slug) || !service) {
    return (
      <div className="min-h-screen bg-[var(--surface-deepest)] font-body text-white">
        <Navbar />
        <main className="mx-auto flex max-w-3xl flex-col items-start gap-6 px-4 pb-24 pt-40 sm:px-6">
          <h1 className="font-display text-3xl uppercase text-white">{content.notFoundTitle}</h1>
          <p className="text-[var(--text-secondary)]">{content.notFoundBody}</p>
          <Link to="/#services" className={backLinkClassName}>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {content.backToServices}
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const anchorLinks = [
    { href: "#offerings", label: content.anchors.offerings },
    { href: "#included", label: content.anchors.included },
    { href: "#technologies", label: content.anchors.technologies },
    { href: "#process", label: content.anchors.process },
  ];

  return (
    <div className="min-h-screen bg-[var(--surface-deepest)] font-body text-white antialiased">
      <Navbar />
      <main>
        <header className="hero-backdrop px-4 pb-12 pt-32 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <Link to="/#services" className={backLinkClassName}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {content.backToServices}
            </Link>
            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
              <ServiceIllustration slug={slug} className="h-28 w-28 shrink-0 sm:h-36 sm:w-36" />
              <div>
                <span className="inline-block rounded-full border border-[var(--surface-border)] bg-[var(--surface-base)] px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
                  {service.badge}
                </span>
                <h1 className="mt-4 font-display text-[clamp(1.75rem,5vw,3.5rem)] uppercase leading-tight text-white">
                  {service.title}
                </h1>
                <p className="mt-3 max-w-2xl text-[var(--text-secondary)]">{service.summary}</p>
              </div>
            </div>
            <nav aria-label={content.anchors.offerings} className="mt-8 flex flex-wrap gap-2">
              {anchorLinks.map((anchor) => (
                <a
                  key={anchor.href}
                  href={anchor.href}
                  className="rounded-full border border-[var(--surface-border)] bg-[var(--surface-base)] px-4 py-2 font-body text-sm text-white transition-colors duration-300 hover:border-white"
                >
                  {anchor.label}
                </a>
              ))}
            </nav>
          </div>
        </header>

        <section id="offerings" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <SectionHeading eyebrow={content.offeringsEyebrow} title={content.offeringsTitle} />
          <ServiceOfferingTabs offerings={service.offerings} />
        </section>

        <section id="included" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24">
          <div className="rounded-[var(--radius-medium)] border border-[var(--surface-border)] bg-[var(--surface-base)] p-6 sm:p-10">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">{content.includedEyebrow}</p>
            <h2 className="mb-6 font-display text-[clamp(1.75rem,5vw,3rem)] uppercase text-white">{content.includedTitle}</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {content.includedItems.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-md border border-[var(--surface-border)] border-l-[var(--accent-orange)] px-4 py-3 text-sm text-white"
                >
                  <span aria-hidden="true" className="text-[var(--accent-orange)]">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="technologies" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24">
          <SectionHeading eyebrow={content.technologiesEyebrow} title={content.technologiesTitle} />
          <ul className="flex flex-wrap gap-3">
            {service.technologies.map((technology) => (
              <li
                key={technology}
                className="rounded-full border border-[var(--surface-border)] bg-[var(--surface-base)] px-5 py-2 font-mono text-sm uppercase tracking-wider text-white"
              >
                {technology}
              </li>
            ))}
          </ul>
        </section>

        <ProcessSection />

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="gradient-ring relative flex flex-col items-start justify-between gap-6 rounded-[var(--radius-medium)] bg-[var(--surface-base)] p-8 sm:flex-row sm:items-center sm:p-12">
            <h2 className="max-w-xl font-display text-[clamp(1.4rem,3.5vw,2.25rem)] uppercase leading-tight text-white">
              {service.title}
            </h2>
            <Link
              to="/#contact"
              className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-white px-7 py-3.5 font-body text-sm font-semibold text-[var(--surface-deepest)] transition-colors duration-300 hover:bg-[var(--text-secondary)]"
            >
              {content.contactLabel}
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default ServiceDetail;
