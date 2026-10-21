import { render, screen } from "@testing-library/react";
import type { ComponentType } from "react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import ConsentProvider from "@/components/consent/ConsentProvider";
import { LanguageProvider } from "@/hooks/useLanguage";
import { pageContent, type PageContent } from "@/lib/page-content";
import CertificationsPage from "@/pages/CertificationsPage";
import ContactPage from "@/pages/ContactPage";
import ExperiencePage from "@/pages/ExperiencePage";
import FaqPage from "@/pages/FaqPage";
import ProjectsPage from "@/pages/ProjectsPage";
import ServicesPage from "@/pages/ServicesPage";
import SkillsPage from "@/pages/SkillsPage";

type PageKey = Exclude<keyof PageContent, "home" | "teasers">;

const dedicatedPages: Array<[PageKey, string, ComponentType]> = [
  ["services", "/services", ServicesPage],
  ["skills", "/skills", SkillsPage],
  ["projects", "/projects", ProjectsPage],
  ["experience", "/experience", ExperiencePage],
  ["certifications", "/certifications", CertificationsPage],
  ["faq", "/faq", FaqPage],
  ["contact", "/contact", ContactPage],
];

const renderPage = (Page: ComponentType, path: string) =>
  render(
    <LanguageProvider>
      <ConsentProvider>
        <MemoryRouter initialEntries={[path]}>
          <Page />
        </MemoryRouter>
      </ConsentProvider>
    </LanguageProvider>,
  );

describe.each(dedicatedPages)("%s page", (key, path, Page) => {
  beforeEach(() => {
    window.localStorage.clear();
    document.head.innerHTML = "";
    document.title = "";
  });

  it("has a single main heading", () => {
    renderPage(Page, path);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("sets its own title, description and canonical url", () => {
    renderPage(Page, path);
    const meta = pageContent.fr[key];
    expect(document.title).toBe(`${meta.metaTitle ?? meta.title} | Zoubeir Ibrahima`);
    expect(document.head.querySelector('meta[name="description"]')?.getAttribute("content")).toBe(meta.description);
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(`https://zoubeir.me${path}`);
  });

  it("keeps the navigation and the footer around the content", () => {
    renderPage(Page, path);
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getAllByRole("navigation").length).toBeGreaterThan(0);
  });

  it("follows the selected language", () => {
    window.localStorage.setItem("language", "en");
    renderPage(Page, path);
    expect(document.title).toBe(`${pageContent.en[key].metaTitle ?? pageContent.en[key].title} | Zoubeir Ibrahima`);
  });
});
