import { useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import SectionHeading, { type SectionHeadingLevel } from "@/components/SectionHeading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { buildIdentityRows } from "@/lib/about-identity";
import { aboutContent } from "@/lib/about-content";
import { contactChannels, contactConfig, identityConfig, type PaymentMethod } from "@/lib/contact-config";
import { getSubheadingTag } from "@/lib/heading-levels";

interface AboutPresentationSectionProps {
  headingAs?: SectionHeadingLevel;
  paymentMethods?: readonly PaymentMethod[];
  legalStatus?: string;
  registrationNumber?: string;
}

const tabTriggerClassName =
  "rounded-full border border-[var(--surface-border)] bg-[var(--surface-base)] px-4 py-2 font-body text-sm text-white transition-colors duration-300 hover:border-white data-[state=active]:border-white data-[state=active]:bg-white data-[state=active]:text-[var(--surface-deepest)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-violet)]";
const actionLinkClassName =
  "inline-flex min-h-11 items-center rounded-full bg-white px-5 py-2 font-body text-sm font-semibold text-[var(--surface-deepest)] transition-colors duration-300 hover:bg-[var(--text-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-violet)]";
const secondaryLinkClassName =
  "inline-flex min-h-11 items-center rounded-full border border-[var(--surface-border)] px-5 py-2 font-body text-sm text-white transition-colors duration-300 hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-violet)]";

const AboutPresentationSection = ({
  headingAs,
  paymentMethods = identityConfig.paymentMethods,
  legalStatus = identityConfig.legalStatus,
  registrationNumber = identityConfig.registrationNumber,
}: AboutPresentationSectionProps) => {
  const about = useLocalizedContent(aboutContent);
  const [activeTab, setActiveTab] = useState("who");
  const TabHeading = getSubheadingTag(headingAs, 1);
  const hasPaymentMethods = paymentMethods.length > 0;

  const identityRows = buildIdentityRows({
    labels: about.identityLabels,
    ...about.identityValues,
    legalStatus,
    registrationNumber,
    email: contactConfig.email,
    phoneDisplay: contactConfig.phoneDisplay,
  });

  const contactChannelLabels = {
    email: about.tabs.contact.emailLabel,
    whatsapp: about.tabs.contact.whatsappLabel,
    booking: about.tabs.contact.bookingLabel,
  } as const;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <SectionHeading
        headingAs={headingAs}
        emoji="👤"
        eyebrow={about.eyebrow}
        title={about.titleLead}
        highlight={about.titleHighlight}
        subtitle={about.summary}
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_20rem] lg:items-start">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList aria-label={about.tabListLabel} className="mb-6 flex h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
            <TabsTrigger value="who" className={tabTriggerClassName}>
              {about.tabs.who.label}
            </TabsTrigger>
            <TabsTrigger value="journey" className={tabTriggerClassName}>
              {about.tabs.journey.label}
            </TabsTrigger>
            <TabsTrigger value="method" className={tabTriggerClassName}>
              {about.tabs.method.label}
            </TabsTrigger>
            {hasPaymentMethods ? (
              <TabsTrigger value="payment" className={tabTriggerClassName}>
                {about.tabs.payment.label}
              </TabsTrigger>
            ) : null}
            <TabsTrigger value="contact" className={tabTriggerClassName}>
              {about.tabs.contact.label}
            </TabsTrigger>
          </TabsList>

          <Reveal className="rounded-[var(--radius-medium)] border border-[var(--surface-border)] bg-[var(--surface-base)] p-6 sm:p-8">
            <TabsContent value="who" forceMount hidden={activeTab !== "who"} className="mt-0 space-y-4">
              <TabHeading className="font-display text-2xl uppercase text-white">{about.tabs.who.title}</TabHeading>
              {about.tabs.who.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-[var(--text-secondary)]">
                  {paragraph}
                </p>
              ))}
            </TabsContent>

            <TabsContent value="journey" forceMount hidden={activeTab !== "journey"} className="mt-0 space-y-4">
              <TabHeading className="font-display text-2xl uppercase text-white">{about.tabs.journey.title}</TabHeading>
              {about.tabs.journey.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-[var(--text-secondary)]">
                  {paragraph}
                </p>
              ))}
              <Link to="/experience" className={actionLinkClassName}>
                {about.tabs.journey.linkLabel}
              </Link>
            </TabsContent>

            <TabsContent value="method" forceMount hidden={activeTab !== "method"} className="mt-0 space-y-4">
              <TabHeading className="font-display text-2xl uppercase text-white">{about.tabs.method.title}</TabHeading>
              {about.tabs.method.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-[var(--text-secondary)]">
                  {paragraph}
                </p>
              ))}
              <Link to="/services" className={actionLinkClassName}>
                {about.tabs.method.linkLabel}
              </Link>
            </TabsContent>

            {hasPaymentMethods ? (
              <TabsContent value="payment" forceMount hidden={activeTab !== "payment"} className="mt-0 space-y-4">
                <TabHeading className="font-display text-2xl uppercase text-white">{about.tabs.payment.title}</TabHeading>
                {about.tabs.payment.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-[var(--text-secondary)]">
                    {paragraph}
                  </p>
                ))}
                <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">{about.tabs.payment.methodsLabel}</p>
                <ul className="flex flex-wrap gap-2">
                  {paymentMethods.map((method) => (
                    <li key={method.label}>
                      {method.href?.startsWith("https://") ? (
                        <a
                          href={method.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-11 items-center rounded-full border border-[var(--surface-border)] px-4 py-1.5 text-sm text-white transition-colors duration-300 hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-violet)]"
                        >
                          {method.label}
                        </a>
                      ) : (
                        <span className="inline-flex rounded-full border border-[var(--surface-border)] px-4 py-1.5 text-sm text-white">
                          {method.label}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
                <Link to="/terms" className={secondaryLinkClassName}>
                  {about.tabs.payment.linkLabel}
                </Link>
              </TabsContent>
            ) : null}

            <TabsContent value="contact" forceMount hidden={activeTab !== "contact"} className="mt-0 space-y-4">
              <TabHeading className="font-display text-2xl uppercase text-white">{about.tabs.contact.title}</TabHeading>
              {about.tabs.contact.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-[var(--text-secondary)]">
                  {paragraph}
                </p>
              ))}
              <div className="flex flex-wrap gap-3">
                <Link to="/contact" className={actionLinkClassName}>
                  {about.tabs.contact.linkLabel}
                </Link>
                {contactChannels.map((channel) => (
                  <a
                    key={channel.kind}
                    href={channel.href}
                    {...(channel.kind === "email" ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                    className={secondaryLinkClassName}
                  >
                    {contactChannelLabels[channel.kind]}
                  </a>
                ))}
              </div>
            </TabsContent>
          </Reveal>
        </Tabs>

        <aside className="space-y-6 lg:sticky lg:top-28">
          <div className="rounded-[var(--radius-medium)] border border-[var(--surface-border)] bg-[var(--surface-base)] p-5">
            <img
              src="/zoubeir-portrait-avatar.webp"
              alt={about.portraitAlt}
              className="mx-auto h-40 w-auto object-contain"
              width={300}
              height={343}
              loading="lazy"
            />
          </div>
          <table
            aria-label={about.identityTitle}
            className="w-full overflow-hidden rounded-[var(--radius-medium)] border border-[var(--surface-border)] bg-[var(--surface-base)] text-left text-sm"
          >
            <tbody>
              {identityRows.map((row) => (
                <tr key={row.label} className="border-b border-[var(--surface-border)] last:border-b-0">
                  <th scope="row" className="w-2/5 px-4 py-3 font-mono text-xs font-normal uppercase tracking-wider text-[var(--text-muted)]">
                    {row.label}
                  </th>
                  <td className="px-4 py-3 text-white">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav aria-label={about.legalLinks.title} className="flex flex-col gap-2">
            <Link to="/privacy" className={secondaryLinkClassName}>
              {about.legalLinks.privacy}
            </Link>
            <Link to="/terms" className={secondaryLinkClassName}>
              {about.legalLinks.terms}
            </Link>
          </nav>
        </aside>
      </div>
    </section>
  );
};

export default AboutPresentationSection;
