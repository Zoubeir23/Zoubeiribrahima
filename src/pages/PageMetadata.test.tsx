import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ConsentProvider from "@/components/consent/ConsentProvider";
import { blogPosts } from "@/data/blogPosts";
import { LanguageProvider } from "@/hooks/useLanguage";
import { legalContent } from "@/lib/legal-content";
import { toMetaDescription } from "@/lib/meta-description";
import { pageContent } from "@/lib/page-content";
import { servicesContent } from "@/lib/services-content";
import Blog from "@/pages/Blog";
import BlogArticle from "@/pages/BlogArticle";
import LegalPage from "@/pages/LegalPage";
import ServiceDetail from "@/pages/ServiceDetail";

const renderRoute = (path: string) =>
  render(
    <LanguageProvider>
      <ConsentProvider>
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/privacy" element={<LegalPage kind="privacy" />} />
          </Routes>
        </MemoryRouter>
      </ConsentProvider>
    </LanguageProvider>,
  );

const description = () => document.head.querySelector('meta[name="description"]')?.getAttribute("content");
const canonical = () => document.head.querySelector('link[rel="canonical"]')?.getAttribute("href");

class InertIntersectionObserver {
  observe = () => {};
  unobserve = () => {};
  disconnect = () => {};
}

describe("metadata of secondary pages", () => {
  beforeEach(() => {
    // The blog article observes headings, and jsdom has no IntersectionObserver.
    vi.stubGlobal("IntersectionObserver", InertIntersectionObserver);
    window.localStorage.clear();
    document.head.innerHTML = "";
    document.title = "";
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("gives the blog list its own title, description and canonical url", () => {
    renderRoute("/blog");
    expect(document.title).toBe(`${pageContent.fr.blog.metaTitle} | Zoubeir Ibrahima`);
    expect(description()).toBe(pageContent.fr.blog.description);
    expect(canonical()).toBe("https://zoubeir.me/blog");
  });

  it("gives a blog article the article title and a trimmed excerpt", () => {
    const post = blogPosts[0];
    renderRoute(`/blog/${post.slug}`);
    expect(document.title).toBe(`${post.title} | Zoubeir Ibrahima`);
    expect(description()).toBe(toMetaDescription(post.excerpt));
    expect(canonical()).toBe(`https://zoubeir.me/blog/${post.slug}`);
  });

  it("gives a service page its search title, description and canonical url", () => {
    renderRoute("/services/saas");
    const service = servicesContent.fr.services.saas;
    expect(document.title).toBe(service.metaTitle);
    expect(description()).toBe(service.metaDescription);
    expect(canonical()).toBe("https://zoubeir.me/services/saas");
  });

  it("gives a legal page its introduction and canonical url", () => {
    renderRoute("/privacy");
    expect(description()).toBe(toMetaDescription(legalContent.fr.privacy.intro));
    expect(canonical()).toBe("https://zoubeir.me/privacy");
  });
});
