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

  it("publishes Article and BreadcrumbList structured data", () => {
    renderArticle();

    expect(readStructuredData("article")?.["@type"]).toBe("Article");
    expect(readStructuredData("breadcrumb")?.["@type"]).toBe("BreadcrumbList");
  });

  it("invites readers to start a project after the article", () => {
    renderArticle();

    const callToAction = screen.getByRole("link", { name: /discuter de votre projet/i });
    expect(callToAction).toHaveAttribute("href", "/contact");
  });
});
