import { Cloud, Globe, Headset, LayoutTemplate, Smartphone, type LucideIcon } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { useLandingContent } from "@/hooks/useLandingContent";

const serviceIcons: readonly LucideIcon[] = [Cloud, Globe, Smartphone, LayoutTemplate, Headset];

const ServicesSection = () => {
  const { services } = useLandingContent();

  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading title={services.title} subtitle={services.subtitle} />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.items.map((service, index) => {
          const ServiceIcon = serviceIcons[index] ?? Cloud;
          return (
            <li
              key={service.title}
              className="group rounded-md border border-[var(--surface-border)] bg-[var(--surface-base)] p-6 transition-colors duration-300 hover:border-[var(--accent-violet)]"
            >
              <ServiceIcon className="mb-5 h-7 w-7 text-[var(--accent-orange)]" aria-hidden="true" />
              <h3 className="font-body text-lg font-semibold text-white">{service.title}</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">{service.description}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default ServicesSection;
