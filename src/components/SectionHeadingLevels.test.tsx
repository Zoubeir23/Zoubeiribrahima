import { render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import AboutSection from "@/components/AboutSection";
import CertificationsWallOfFame from "@/components/CertificationsWallOfFame";
import ConsentProvider from "@/components/consent/ConsentProvider";
import ContactSection from "@/components/ContactSection";
import FaqSection from "@/components/FaqSection";
import ProjectsBentoSection from "@/components/ProjectsBentoSection";
import ServicesSection from "@/components/ServicesSection";
import SkillsSection from "@/components/SkillsSection";
import { LanguageProvider } from "@/hooks/useLanguage";

const renderInApp = (element: ReactElement) =>
  render(
    <LanguageProvider>
      <ConsentProvider>
        <MemoryRouter>{element}</MemoryRouter>
      </ConsentProvider>
    </LanguageProvider>,
  );

const sectionsWithHeadingLevel: Array<[string, (headingAs?: "h1" | "h2") => ReactElement]> = [
  ["ServicesSection", (headingAs) => <ServicesSection headingAs={headingAs} />],
  ["SkillsSection", (headingAs) => <SkillsSection headingAs={headingAs} />],
  ["ProjectsBentoSection", (headingAs) => <ProjectsBentoSection headingAs={headingAs} />],
  ["AboutSection", (headingAs) => <AboutSection headingAs={headingAs} />],
  ["CertificationsWallOfFame", (headingAs) => <CertificationsWallOfFame headingAs={headingAs} />],
  ["FaqSection", (headingAs) => <FaqSection headingAs={headingAs} />],
  ["ContactSection", (headingAs) => <ContactSection headingAs={headingAs} />],
];

describe.each(sectionsWithHeadingLevel)("%s heading level", (_name, createSection) => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("uses a level two heading when embedded in the home page", () => {
    renderInApp(createSection());
    expect(screen.queryByRole("heading", { level: 1 })).not.toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 2 }).length).toBeGreaterThan(0);
  });

  it("uses exactly one level one heading on its dedicated page", () => {
    renderInApp(createSection("h1"));
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });
});
