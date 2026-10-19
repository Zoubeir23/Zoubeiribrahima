import { CalendarDays, Github, Linkedin, Mail, MessageCircle, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import Emoji from "@/components/Emoji";
import { useConsent } from "@/hooks/useConsent";
import { useLandingContent } from "@/hooks/useLandingContent";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { contactChannels, contactConfig } from "@/lib/contact-config";
import { NAV_ITEMS, SOCIAL_PROFILES } from "@/lib/site-navigation";
import { serviceMeta, serviceSlugs } from "@/lib/service-meta";
import { servicesContent } from "@/lib/services-content";

interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
  isExternal: boolean;
}

const columnTitleClassName = "mb-4 font-mono text-xs uppercase tracking-[0.25em] text-[var(--text-muted)]";
const footerLinkClassName =
  "inline-flex min-h-9 items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors duration-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-violet)]";

const SiteFooter = () => {
  const { footer, nav, hero, faq } = useLandingContent();
  const services = useLocalizedContent(servicesContent);
  const { openPreferences } = useConsent();
  const currentYear = new Date().getFullYear();

  const whatsappChannel = contactChannels.find((channel) => channel.kind === "whatsapp");
  const bookingChannel = contactChannels.find((channel) => channel.kind === "booking");

  const socialLinks: SocialLink[] = [
    { label: "GitHub", href: SOCIAL_PROFILES.github, icon: Github, isExternal: true },
    { label: "LinkedIn", href: SOCIAL_PROFILES.linkedin, icon: Linkedin, isExternal: true },
    { label: footer.emailLabel, href: `mailto:${contactConfig.email}`, icon: Mail, isExternal: false },
    ...(whatsappChannel
      ? [{ label: footer.whatsappLabel, href: whatsappChannel.href, icon: MessageCircle, isExternal: true }]
      : []),
    ...(bookingChannel
      ? [{ label: services.bookCallLabel, href: bookingChannel.href, icon: CalendarDays, isExternal: true }]
      : []),
  ];

  return (
    <footer className="border-t border-[var(--surface-border)] bg-[var(--surface-base)] px-4 pb-24 pt-14 sm:px-6 lg:pb-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-12 lg:gap-x-12">
          <div className="col-span-2 lg:col-span-4">
            <div className="inline-flex rounded-md border border-[var(--surface-border)] bg-[var(--surface-deepest)] p-3">
              <img
                src="/logo-scale-avec-zoubeir-for-dark-background.png"
                alt="Scale avec Zoubeir"
                className="h-20 w-auto object-contain"
                width={652}
                height={382}
                loading="lazy"
              />
            </div>
            <p className="mt-5 max-w-sm text-sm text-[var(--text-secondary)]">{footer.tagline}</p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--surface-border)] bg-[var(--surface-deepest)] px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
              <span className="animate-status-ping h-2 w-2 rounded-full bg-[var(--status-success)]" aria-hidden="true" />
              {hero.availability}
            </p>
            <h2 className={`${columnTitleClassName} mt-8`}>
              <Emoji symbol="🌐" className="mr-2" />
              {footer.followTitle}
            </h2>
            <ul className="flex flex-wrap gap-3">
              {socialLinks.map((socialLink) => (
                <li key={socialLink.label}>
                  <a
                    href={socialLink.href}
                    aria-label={socialLink.label}
                    title={socialLink.label}
                    {...(socialLink.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="orbit-card flex h-11 w-11 items-center justify-center rounded-full border border-[var(--surface-border)] bg-[var(--surface-deepest)] text-white hover:border-[var(--accent-violet)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-violet)]"
                  >
                    <socialLink.icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label={footer.navigationTitle} className="lg:col-span-2">
            <h2 className={columnTitleClassName}>
              <Emoji symbol="🧭" className="mr-2" />
              {footer.navigationTitle}
            </h2>
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className={footerLinkClassName}>
                    <Emoji symbol={item.emoji} />
                    {nav[item.labelKey]}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/faq" className={footerLinkClassName}>
                  <Emoji symbol="❓" />
                  {faq.title}
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label={footer.servicesTitle} className="lg:col-span-3">
            <h2 className={columnTitleClassName}>
              <Emoji symbol="🛠️" className="mr-2" />
              {footer.servicesTitle}
            </h2>
            <ul className="space-y-1">
              {serviceSlugs.map((slug) => (
                <li key={slug}>
                  <Link to={`/services/${slug}`} className={footerLinkClassName}>
                    <Emoji symbol={serviceMeta[slug].emoji} />
                    {services.services[slug].title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={footer.legalTitle} className="col-span-2 lg:col-span-3">
            <h2 className={columnTitleClassName}>
              <Emoji symbol="⚖️" className="mr-2" />
              {footer.legalTitle}
            </h2>
            <ul className="space-y-1">
              <li>
                <Link to="/privacy" className={footerLinkClassName}>
                  <Emoji symbol="🔒" />
                  {footer.privacyLabel}
                </Link>
              </li>
              <li>
                <Link to="/terms" className={footerLinkClassName}>
                  <Emoji symbol="📜" />
                  {footer.termsLabel}
                </Link>
              </li>
              <li>
                <button type="button" onClick={openPreferences} className={footerLinkClassName}>
                  <Emoji symbol="🍪" />
                  {footer.cookiesLabel}
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[var(--surface-border)] pt-6 text-center sm:flex-row sm:text-left">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
            © {currentYear} Zoubeir Ibrahima Amed — {footer.rights}
          </p>
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
            <Emoji symbol="📍" className="mr-2" />
            {footer.location}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
