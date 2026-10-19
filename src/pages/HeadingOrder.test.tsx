import { render } from "@testing-library/react";
import type { ComponentType } from "react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import ConsentProvider from "@/components/consent/ConsentProvider";
import { LanguageProvider } from "@/hooks/useLanguage";
import CertificationsPage from "@/pages/CertificationsPage";
import ContactPage from "@/pages/ContactPage";
import ExperiencePage from "@/pages/ExperiencePage";
import FaqPage from "@/pages/FaqPage";
import Index from "@/pages/Index";
import ProjectsPage from "@/pages/ProjectsPage";
import ServicesPage from "@/pages/ServicesPage";
import SkillsPage from "@/pages/SkillsPage";

const pages: Array<[string, ComponentType]> = [
  ["home", Index],
  ["services", ServicesPage],
  ["skills", SkillsPage],
  ["projects", ProjectsPage],
  ["experience", ExperiencePage],
  ["certifications", CertificationsPage],
  ["faq", FaqPage],
  ["contact", ContactPage],
];

const headingLevels = (container: HTMLElement): number[] =>
  [...container.querySelectorAll("h1, h2, h3, h4, h5, h6")].map((heading) => Number(heading.tagName.slice(1)));

describe.each(pages)("%s page heading order", (_name, Page) => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("never skips a heading level when going deeper", () => {
    const { container } = render(
      <LanguageProvider>
        <ConsentProvider>
          <MemoryRouter>
            <Page />
          </MemoryRouter>
        </ConsentProvider>
      </LanguageProvider>,
    );
    const levels = headingLevels(container);
    const skips = levels
      .map((level, index) => ({ level, previous: levels[index - 1] }))
      .filter(({ level, previous }) => previous !== undefined && level > previous + 1);
    expect(skips).toEqual([]);
  });
});
