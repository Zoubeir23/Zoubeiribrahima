import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import ConsentProvider from "@/components/consent/ConsentProvider";
import ProjectsBentoSection from "@/components/ProjectsBentoSection";
import { LanguageProvider } from "@/hooks/useLanguage";
import { projectsContent } from "@/lib/projects-content";

const SNAPFOLIOO_REPOSITORY_URL = "https://github.com/Zoubeir23/SnapFolioo";
const LAUNCH_AND_FOUNDER_WORDING = /fondateur|founder|lead dev|en production|in production|produit lancé|product launched|vedette|featured/i;

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

describe("projects section", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("lists every project as a card of the same kind", () => {
    renderProjectsSection();
    for (const project of projectsContent.fr.projects) {
      expect(screen.getByRole("heading", { name: project.title })).toBeInTheDocument();
    }
  });

  it("links Snapfolioo to its GitHub repository only, never to its former website", () => {
    renderProjectsSection();
    expect(screen.getAllByRole("link").filter((link) => link.getAttribute("href")?.includes("snapfolioo.com"))).toHaveLength(0);

    const snapfoliooCard = screen.getByRole("heading", { name: "Snapfolioo" }).closest("li");
    expect(snapfoliooCard).not.toBeNull();
    const snapfoliooLinks = within(snapfoliooCard as HTMLElement).getAllByRole("link");
    expect(snapfoliooLinks).toHaveLength(1);
    expect(snapfoliooLinks[0]).toHaveAttribute("href", SNAPFOLIOO_REPOSITORY_URL);
    expect(snapfoliooLinks[0]).toHaveAttribute("target", "_blank");
    expect(snapfoliooLinks[0]).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it.each(["fr", "en"] as const)("no longer claims a founder role, a launch or a production service (%s)", (language) => {
    const everyProjectText = projectsContent[language].projects
      .map((project) => [project.title, project.status, project.description, project.linkLabel].join(" "))
      .join(" ");
    expect(everyProjectText).not.toMatch(LAUNCH_AND_FOUNDER_WORDING);
  });
});
