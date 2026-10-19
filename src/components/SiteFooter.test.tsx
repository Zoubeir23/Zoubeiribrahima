import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import ConsentProvider from "@/components/consent/ConsentProvider";
import CookieBanner from "@/components/consent/CookieBanner";
import SiteFooter from "@/components/SiteFooter";
import { LanguageProvider } from "@/hooks/useLanguage";
import { CONSENT_STORAGE_KEY } from "@/lib/consent-storage";
import { landingContent } from "@/lib/landing-content";
import { serviceSlugs } from "@/lib/service-meta";
import { servicesContent } from "@/lib/services-content";

const text = landingContent.fr.footer;

const renderFooter = () =>
  render(
    <LanguageProvider>
      <ConsentProvider>
        <MemoryRouter>
          <SiteFooter />
          <CookieBanner />
        </MemoryRouter>
      </ConsentProvider>
    </LanguageProvider>,
  );

describe("SiteFooter", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("presents the brand with its logo and tagline", () => {
    renderFooter();
    expect(screen.getByRole("img", { name: "Scale avec Zoubeir" })).toBeInTheDocument();
    expect(screen.getByText(text.tagline)).toBeInTheDocument();
  });

  it("offers every social and contact channel as a labelled icon link", () => {
    renderFooter();
    const footer = screen.getByRole("contentinfo");
    expect(within(footer).getByRole("link", { name: "GitHub" })).toHaveAttribute("href", "https://github.com/Zoubeir23");
    expect(within(footer).getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://linkedin.com/in/zoubeir-ibrahima",
    );
    expect(within(footer).getByRole("link", { name: text.emailLabel })).toHaveAttribute(
      "href",
      "mailto:Zoubeiribrahima@gmail.com",
    );
    expect(within(footer).getByRole("link", { name: text.whatsappLabel })).toHaveAttribute(
      "href",
      "https://wa.me/221785941071",
    );
    expect(within(footer).getByRole("link", { name: servicesContent.fr.bookCallLabel })).toHaveAttribute(
      "href",
      "https://calendly.com/zoubeiribrahima/30min",
    );
  });

  it("opens external profiles safely in a new tab", () => {
    renderFooter();
    const gitHubLink = within(screen.getByRole("contentinfo")).getByRole("link", { name: "GitHub" });
    expect(gitHubLink).toHaveAttribute("target", "_blank");
    expect(gitHubLink).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("links to every dedicated page of the site", () => {
    renderFooter();
    const navigation = screen.getByRole("navigation", { name: text.navigationTitle });
    expect(within(navigation).getByRole("link", { name: landingContent.fr.nav.services })).toHaveAttribute("href", "/services");
    expect(within(navigation).getByRole("link", { name: landingContent.fr.nav.contact })).toHaveAttribute("href", "/contact");
    expect(within(navigation).getByRole("link", { name: landingContent.fr.nav.blog })).toHaveAttribute("href", "/blog");
    expect(within(navigation).getByRole("link", { name: landingContent.fr.nav.stack })).toHaveAttribute("href", "/skills");
    expect(within(navigation).getByRole("link", { name: landingContent.fr.faq.title })).toHaveAttribute("href", "/faq");
  });

  it("links to the five service pages", () => {
    renderFooter();
    const services = screen.getByRole("navigation", { name: text.servicesTitle });
    for (const slug of serviceSlugs) {
      expect(
        within(services).getByRole("link", { name: servicesContent.fr.services[slug].title }),
      ).toHaveAttribute("href", `/services/${slug}`);
    }
  });

  it("links to the privacy policy and the terms of use", () => {
    renderFooter();
    const legal = screen.getByRole("navigation", { name: text.legalTitle });
    expect(within(legal).getByRole("link", { name: text.privacyLabel })).toHaveAttribute("href", "/privacy");
    expect(within(legal).getByRole("link", { name: text.termsLabel })).toHaveAttribute("href", "/terms");
  });

  it("reopens the cookie preferences from the footer", () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({ analytics: false, externalContent: false }));
    renderFooter();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    const legal = screen.getByRole("navigation", { name: text.legalTitle });
    fireEvent.click(within(legal).getByRole("button", { name: text.cookiesLabel }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("shows the current year in the copyright line", () => {
    renderFooter();
    expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument();
  });

  it("keeps the footer content in English when the language is English", () => {
    window.localStorage.setItem("language", "en");
    renderFooter();
    expect(screen.getByText(landingContent.en.footer.tagline)).toBeInTheDocument();
  });
});
