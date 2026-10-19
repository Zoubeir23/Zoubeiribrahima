import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import ConsentProvider from "@/components/consent/ConsentProvider";
import { LanguageProvider } from "@/hooks/useLanguage";
import { pageContent } from "@/lib/page-content";
import Index from "@/pages/Index";

const renderHome = () =>
  render(
    <LanguageProvider>
      <ConsentProvider>
        <MemoryRouter>
          <Index />
        </MemoryRouter>
      </ConsentProvider>
    </LanguageProvider>,
  );

describe("home page", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.head.innerHTML = "";
    document.title = "";
  });

  it("has a single main heading", () => {
    renderHome();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("sets the home title, description and canonical url", () => {
    renderHome();
    expect(document.title).toBe(pageContent.fr.home.title);
    expect(document.head.querySelector('meta[name="description"]')?.getAttribute("content")).toBe(pageContent.fr.home.description);
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe("https://zoubeir.me/");
  });

  it("previews each dedicated page with a link to it", () => {
    renderHome();
    const teasers = pageContent.fr.teasers;
    expect(screen.getByRole("link", { name: teasers.skills.linkLabel })).toHaveAttribute("href", "/skills");
    expect(screen.getByRole("link", { name: teasers.projects.linkLabel })).toHaveAttribute("href", "/projects");
    expect(screen.getByRole("link", { name: teasers.experience.linkLabel })).toHaveAttribute("href", "/experience");
    expect(screen.getByRole("link", { name: teasers.certifications.linkLabel })).toHaveAttribute("href", "/certifications");
    expect(screen.getByRole("link", { name: teasers.faq.linkLabel })).toHaveAttribute("href", "/faq");
  });

  it("keeps the services grid linking to the service pages", () => {
    renderHome();
    expect(screen.getAllByRole("link").some((link) => link.getAttribute("href") === "/services/saas")).toBe(true);
  });

  it("no longer embeds the contact form or the full sections that have their own page", () => {
    renderHome();
    expect(screen.queryByLabelText("Nom complet")).not.toBeInTheDocument();
    expect(screen.queryByText("Stack détaillée")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /toutes mes certifications/i })).not.toBeInTheDocument();
  });

  it("ends with the call to action towards the contact page", () => {
    renderHome();
    const contactLinks = screen.getAllByRole("link").filter((link) => link.getAttribute("href") === "/contact");
    expect(contactLinks.length).toBeGreaterThan(1);
  });
});
