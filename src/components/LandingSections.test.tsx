import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { beforeEach, describe, expect, it } from "vitest";
import FaqSection from "@/components/FaqSection";
import ProcessSection from "@/components/ProcessSection";
import ReasonsSection from "@/components/ReasonsSection";
import ServicesSection from "@/components/ServicesSection";
import { LanguageProvider } from "@/hooks/useLanguage";
import { landingContent } from "@/lib/landing-content";

const renderWithLanguage = (element: ReactElement) =>
  render(<LanguageProvider>{element}</LanguageProvider>);

describe("landing sections", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("renders every offered service under the services anchor", () => {
    const { container } = renderWithLanguage(<ServicesSection />);
    expect(container.querySelector("#services")).not.toBeNull();
    for (const service of landingContent.fr.services.items) {
      expect(screen.getByRole("heading", { name: service.title })).toBeInTheDocument();
    }
  });

  it("renders the three process steps in order", () => {
    renderWithLanguage(<ProcessSection />);
    const stepHeadings = screen.getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent);
    expect(stepHeadings).toEqual(landingContent.fr.process.steps.map((step) => step.title));
  });

  it("renders every reason to work together", () => {
    renderWithLanguage(<ReasonsSection />);
    for (const reason of landingContent.fr.reasons.items) {
      expect(screen.getByText(reason.title)).toBeInTheDocument();
    }
  });

  it("reveals an answer when its question is opened", () => {
    renderWithLanguage(<FaqSection />);
    const firstFaqItem = landingContent.fr.faq.items[0];
    expect(screen.queryByText(firstFaqItem.answer)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: firstFaqItem.question }));
    expect(screen.getByText(firstFaqItem.answer)).toBeVisible();
  });
});
