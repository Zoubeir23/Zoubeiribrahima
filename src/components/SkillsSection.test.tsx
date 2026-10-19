import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import SkillsSection from "@/components/SkillsSection";
import { LanguageProvider } from "@/hooks/useLanguage";
import { skillsContent } from "@/lib/skills-content";

const renderSkills = () =>
  render(
    <LanguageProvider>
      <SkillsSection />
    </LanguageProvider>,
  );

describe("SkillsSection detailed stack", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("shows every stack group with its title", () => {
    renderSkills();
    for (const group of skillsContent.fr.stack.groups) {
      expect(screen.getByRole("heading", { level: 4, name: group.label })).toBeInTheDocument();
    }
  });

  it("lists every technology of each group", () => {
    renderSkills();
    for (const group of skillsContent.fr.stack.groups) {
      const groupList = screen.getByRole("list", { name: group.label });
      for (const item of group.items) {
        expect(within(groupList).getByText(item)).toBeInTheDocument();
      }
    }
  });

  it("shows brand logos for technologies that have one", () => {
    const { container } = renderSkills();
    expect(container.querySelector('img[src="/logos/technologies/django.svg"]')).not.toBeNull();
  });

  it("switches the stack labels to English", () => {
    window.localStorage.setItem("language", "en");
    renderSkills();
    expect(screen.getByRole("heading", { level: 4, name: "Databases" })).toBeInTheDocument();
  });
});
