import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import ConsentProvider from "@/components/consent/ConsentProvider";
import ProjectsBentoSection from "@/components/ProjectsBentoSection";
import { LanguageProvider } from "@/hooks/useLanguage";

const FEATURED_PROJECT_REPOSITORY_URL = "https://github.com/Zoubeir23/SnapFolioo";

const renderProjectsSection = () =>
  render(
    <LanguageProvider>
      <ConsentProvider>
        <MemoryRouter>
          <ProjectsBentoSection />
        </MemoryRouter>
      </ConsentProvider>
    </LanguageProvider>,
  );

describe("featured project links", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("does not link to the Snapfolioo website any more", () => {
    renderProjectsSection();
    const everyLink = screen.getAllByRole("link");
    expect(everyLink.filter((link) => link.getAttribute("href")?.includes("snapfolioo.com"))).toHaveLength(0);
  });

  it("links the featured project to its GitHub repository only", () => {
    renderProjectsSection();
    const featuredCard = screen.getByRole("heading", { name: "Snapfolioo" }).closest("article");
    expect(featuredCard).not.toBeNull();
    const featuredLinks = within(featuredCard as HTMLElement).getAllByRole("link");
    expect(featuredLinks).toHaveLength(1);
    expect(featuredLinks[0]).toHaveAttribute("href", FEATURED_PROJECT_REPOSITORY_URL);
    expect(featuredLinks[0]).toHaveAttribute("target", "_blank");
    expect(featuredLinks[0]).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });
});
