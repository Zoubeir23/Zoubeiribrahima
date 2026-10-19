import * as Tabs from "@radix-ui/react-tabs";
import { CalendarDays, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Emoji from "@/components/Emoji";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { buildWhatsappLink } from "@/lib/contact-channels";
import { contactChannels, contactConfig } from "@/lib/contact-config";
import { servicesContent } from "@/lib/services-content";
import { OFFERING_CHIP_EMOJIS } from "@/lib/icon-sets";
import type { ServiceSlug } from "@/lib/service-meta";
import type { ServiceOffering } from "@/lib/services-types";

interface ServiceOfferingTabsProps {
  slug: ServiceSlug;
  offerings: ServiceOffering[];
}

const primaryActionClassName =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-body text-sm font-semibold text-[var(--surface-deepest)] transition-colors duration-300 hover:bg-[var(--text-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-violet)]";
const secondaryActionClassName =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[var(--surface-border)] px-6 py-3 font-body text-sm font-semibold text-white transition-colors duration-300 hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-violet)]";

const ServiceOfferingTabs = ({ slug, offerings }: ServiceOfferingTabsProps) => {
  const content = useLocalizedContent(servicesContent);
  const bookingChannel = contactChannels.find((channel) => channel.kind === "booking");

  return (
    <Tabs.Root defaultValue="offering-0">
      <Tabs.List
        aria-label={content.offeringsTitle}
        className="mb-6 flex gap-2 overflow-x-auto rounded-full border border-[var(--surface-border)] bg-[var(--surface-base)] p-1"
      >
        {offerings.map((offering, index) => (
          <Tabs.Trigger
            key={offering.tabLabel}
            value={`offering-${index}`}
            className="shrink-0 rounded-full px-5 py-2.5 font-body text-sm text-white transition-colors duration-300 hover:bg-[var(--surface-raised)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent-violet)] data-[state=active]:bg-white data-[state=active]:font-semibold data-[state=active]:text-[var(--surface-deepest)]"
          >
            <Emoji symbol={offering.emoji} className="mr-2" />
            {offering.tabLabel}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {offerings.map((offering, index) => {
        const quoteLink = buildWhatsappLink(contactConfig.whatsappNumber, offering.quoteMessage);
        return (
          <Tabs.Content
            key={offering.tabLabel}
            value={`offering-${index}`}
            className="gradient-ring relative rounded-[var(--radius-medium)] bg-[var(--surface-base)] p-6 focus-visible:outline-none sm:p-10"
          >
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">
              <Emoji symbol={offering.emoji} className="mr-2" />
              {offering.tabLabel}
            </p>
            <h3 className="bg-gradient-to-b from-white via-white to-[var(--accent-violet)] bg-clip-text font-display text-[clamp(2.25rem,8vw,5rem)] uppercase leading-none text-transparent">
              {offering.headline}
            </h3>
            <p className="mt-4 font-body text-lg font-semibold text-white sm:text-xl">{offering.tagline}</p>
            <p className="mt-3 max-w-2xl text-[var(--text-secondary)]">{offering.description}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {offering.chips.map((chip, chipIndex) => (
                <li
                  key={chip}
                  className="rounded-full border border-[var(--surface-border)] px-3 py-1 font-mono text-xs uppercase tracking-wider text-white"
                >
                  <Emoji symbol={OFFERING_CHIP_EMOJIS[slug][index]?.[chipIndex] ?? "•"} className="mr-2" />
                  {chip}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              {quoteLink ? (
                <a href={quoteLink} target="_blank" rel="noopener noreferrer" className={primaryActionClassName}>
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  {content.requestQuoteLabel}
                </a>
              ) : (
                <Link to="/#contact" className={primaryActionClassName}>
                  {content.requestQuoteLabel}
                </Link>
              )}
              {bookingChannel ? (
                <a href={bookingChannel.href} target="_blank" rel="noopener noreferrer" className={secondaryActionClassName}>
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  {content.bookCallLabel}
                </a>
              ) : null}
            </div>
          </Tabs.Content>
        );
      })}
    </Tabs.Root>
  );
};

export default ServiceOfferingTabs;
