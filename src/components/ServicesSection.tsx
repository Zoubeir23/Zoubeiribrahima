import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ServiceIllustration from "@/components/ServiceIllustration";
import { useLandingContent } from "@/hooks/useLandingContent";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { serviceSlugs } from "@/lib/service-meta";
import { servicesContent } from "@/lib/services-content";

const ServicesSection = () => {
  const { services } = useLandingContent();
  const content = useLocalizedContent(servicesContent);

  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading emoji="🛠️" title={services.title} subtitle={services.subtitle} />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {serviceSlugs.map((slug, index) => {
          const service = content.services[slug];
          return (
            <Reveal as="li" key={slug} delaySeconds={index * 0.08}>
              <Link
                to={`/services/${slug}`}
                className="orbit-card spotlight-card group flex h-full flex-col gap-4 rounded-md border border-[var(--surface-border)] bg-[var(--surface-base)] p-6 hover:border-[var(--accent-violet)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-violet)]"
              >
                <ServiceIllustration slug={slug} className="aspect-[4/3] w-full transition-transform duration-300 group-hover:scale-[1.02]" emojiClassName="text-6xl" />
                <div className="flex-1">
                  <h3 className="font-body text-lg font-semibold text-white">{service.title}</h3>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">{service.summary}</p>
                </div>
                <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] transition-colors duration-300 group-hover:text-white">
                  {content.learnMoreLabel}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
};

export default ServicesSection;
