import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import ConsentProvider from "@/components/consent/ConsentProvider";
import { LanguageProvider } from "@/hooks/useLanguage";
import { aboutContent } from "@/lib/about-content";
import AboutPage from "@/pages/AboutPage";

const renderPage = () =>
  render(
    <LanguageProvider>
      <ConsentProvider>
        <MemoryRouter initialEntries={["/a-propos"]}>
          <AboutPage />
        </MemoryRouter>
      </ConsentProvider>
    </LanguageProvider>,
  );

describe("about page", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.head.innerHTML = "";
  });

  it("has a single level one heading", () => {
    renderPage();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("sets its own title, description and canonical address", () => {
    renderPage();
    expect(document.title).toBe(`${aboutContent.fr.meta.title} | Zoubeir Ibrahima`);
    expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute("content", aboutContent.fr.meta.description);
    expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute("href", "https://zoubeir.me/a-propos");
  });

  it("keeps the meta description within search result limits", () => {
    expect(aboutContent.fr.meta.description.length).toBeLessThanOrEqual(170);
    expect(aboutContent.en.meta.description.length).toBeLessThanOrEqual(170);
  });
});
