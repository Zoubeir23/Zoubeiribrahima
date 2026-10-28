import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ConsentProvider from "@/components/consent/ConsentProvider";
import { LanguageProvider } from "@/hooks/useLanguage";
import BlogArticle from "@/pages/BlogArticle";

const articlePath = "/blog/fixer-le-prix-de-son-saas";

class InertIntersectionObserver {
  observe = () => {};
  unobserve = () => {};
  disconnect = () => {};
}

const renderArticle = () =>
  render(
    <LanguageProvider>
      <ConsentProvider>
        <MemoryRouter initialEntries={[articlePath]}>
          <Routes>
            <Route path="/blog/:slug" element={<BlogArticle />} />
          </Routes>
        </MemoryRouter>
      </ConsentProvider>
    </LanguageProvider>,
  );

const readStructuredData = (identifier: string) => {
  const script = document.head.querySelector(`script[data-structured-data="${identifier}"]`);
  return script ? JSON.parse(script.textContent ?? "{}") : null;
};

describe("blog article structure", () => {
  beforeEach(() => {
    vi.stubGlobal("IntersectionObserver", InertIntersectionObserver);
    window.localStorage.clear();
    document.head.innerHTML = "";
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("shows a breadcrumb trail ending on the current article", () => {
    renderArticle();

    const breadcrumb = screen.getByRole("navigation", { name: "Fil d'Ariane" });
    expect(within(breadcrumb).getByRole("link", { name: "Accueil" })).toHaveAttribute("href", "/");
    expect(within(breadcrumb).getByRole("link", { name: "Blog" })).toHaveAttribute("href", "/blog");
    expect(within(breadcrumb).getByText(/Fixer le prix de son SaaS/)).toHaveAttribute("aria-current", "page");
  });

  it("leaves structured data to the prerendered page instead of injecting a duplicate", () => {
    renderArticle();

    expect(readStructuredData("article")).toBeNull();
    expect(readStructuredData("breadcrumb")).toBeNull();
  });

  it("links a SaaS article to the SaaS service page", () => {
    renderArticle();

    const serviceLink = screen.getByRole("link", { name: /offre de développement saas/i });
    expect(serviceLink).toHaveAttribute("href", "/services/saas");
  });

  it("invites readers to start a project after the article", () => {
    renderArticle();

    const callToAction = screen.getByRole("link", { name: /discuter de votre projet/i });
    expect(callToAction).toHaveAttribute("href", "/contact");
  });
});
