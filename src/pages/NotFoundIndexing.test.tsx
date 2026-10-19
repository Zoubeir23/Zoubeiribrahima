import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ConsentProvider from "@/components/consent/ConsentProvider";
import { LanguageProvider } from "@/hooks/useLanguage";
import BlogArticle from "@/pages/BlogArticle";
import NotFound from "@/pages/NotFound";
import ServiceDetail from "@/pages/ServiceDetail";

class InertIntersectionObserver {
  observe = () => {};
  unobserve = () => {};
  disconnect = () => {};
}

const renderAt = (path: string) =>
  render(
    <LanguageProvider>
      <ConsentProvider>
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MemoryRouter>
      </ConsentProvider>
    </LanguageProvider>,
  );

const robots = () => document.head.querySelector('meta[name="robots"]')?.getAttribute("content");
const canonical = () => document.head.querySelector('link[rel="canonical"]')?.getAttribute("href");

describe("pages that do not exist", () => {
  beforeEach(() => {
    vi.stubGlobal("IntersectionObserver", InertIntersectionObserver);
    window.localStorage.clear();
    document.head.innerHTML = '<meta name="robots" content="index, follow">';
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("keeps an unknown address out of search results", () => {
    renderAt("/route-inexistante");
    expect(robots()).toBe("noindex, follow");
  });

  it("does not borrow the title of the home page", () => {
    renderAt("/route-inexistante");
    expect(document.title).toContain("introuvable");
  });

  it("keeps an unknown service out of search results", () => {
    renderAt("/services/inconnu");
    expect(robots()).toBe("noindex, follow");
  });

  it("keeps an unknown article out of search results", () => {
    renderAt("/blog/article-inconnu");
    expect(robots()).toBe("noindex, follow");
  });

  it("never points the canonical link of a missing page to the home page", () => {
    renderAt("/route-inexistante");
    expect(canonical()).not.toBe("https://zoubeir.me/");
  });

  it("still indexes an existing article", () => {
    renderAt("/blog/fixer-le-prix-de-son-saas");
    expect(robots()).toBe("index, follow");
  });
});
