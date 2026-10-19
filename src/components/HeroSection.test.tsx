import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import HeroSection from "@/components/HeroSection";
import { LanguageProvider } from "@/hooks/useLanguage";
import { landingContent } from "@/lib/landing-content";

const renderHero = () =>
  render(
    <LanguageProvider>
      <MemoryRouter>
        <HeroSection />
      </MemoryRouter>
    </LanguageProvider>,
  );

describe("HeroSection", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("sends the primary action to the contact page", () => {
    renderHero();
    expect(screen.getByRole("link", { name: landingContent.fr.hero.primaryAction })).toHaveAttribute("href", "/contact");
  });

  it("sends the secondary action to the projects page", () => {
    renderHero();
    expect(screen.getByRole("link", { name: landingContent.fr.hero.secondaryAction })).toHaveAttribute("href", "/projects");
  });

  it("shows the translated location", () => {
    renderHero();
    expect(screen.getByText(landingContent.fr.hero.location)).toBeInTheDocument();
  });
});
