import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import ConsentProvider from "@/components/consent/ConsentProvider";
import { LanguageProvider } from "@/hooks/useLanguage";
import { legalContent } from "@/lib/legal-content";
import LegalPage from "@/pages/LegalPage";

const renderPage = (kind: "privacy" | "terms") =>
  render(
    <LanguageProvider>
      <ConsentProvider>
        <MemoryRouter>
          <LegalPage kind={kind} />
        </MemoryRouter>
      </ConsentProvider>
    </LanguageProvider>,
  );

describe("LegalPage", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.title = "";
  });

  it.each(["privacy", "terms"] as const)("shows the %s document title and every section", (kind) => {
    renderPage(kind);
    const legalDocument = legalContent.fr[kind];
    expect(screen.getByRole("heading", { level: 1, name: legalDocument.title })).toBeInTheDocument();
    for (const section of legalDocument.sections) {
      expect(screen.getByRole("heading", { level: 2, name: new RegExp(section.title) })).toBeInTheDocument();
    }
  });

  it("shows when the document was last updated", () => {
    renderPage("privacy");
    expect(screen.getByText(new RegExp(legalContent.fr.privacy.lastUpdated))).toBeInTheDocument();
  });

  it("links back to the home page", () => {
    renderPage("privacy");
    expect(screen.getByRole("link", { name: legalContent.fr.backHome })).toHaveAttribute("href", "/");
  });

  it("points from the privacy policy to the terms and back", () => {
    const { unmount } = renderPage("privacy");
    expect(screen.getAllByRole("link", { name: new RegExp(legalContent.fr.terms.title) })[0]).toHaveAttribute("href", "/terms");
    unmount();
    renderPage("terms");
    expect(screen.getAllByRole("link", { name: new RegExp(legalContent.fr.privacy.title) })[0]).toHaveAttribute("href", "/privacy");
  });

  it("updates the document title", () => {
    renderPage("terms");
    expect(document.title).toContain(legalContent.fr.terms.title);
  });

  it("renders in English when the language is English", () => {
    window.localStorage.setItem("language", "en");
    renderPage("privacy");
    expect(screen.getByRole("heading", { level: 1, name: legalContent.en.privacy.title })).toBeInTheDocument();
  });

  it("renders bullet items when a section has them", () => {
    renderPage("privacy");
    const firstItem = legalContent.fr.privacy.sections.find((section) => section.items)?.items?.[0] ?? "";
    expect(screen.getByText(firstItem)).toBeInTheDocument();
  });
});
