import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/hooks/useLanguage";

const renderNavbar = () =>
  render(
    <LanguageProvider>
      <MemoryRouter initialEntries={["/"]}>
        <Navbar />
      </MemoryRouter>
    </LanguageProvider>,
  );

describe("Navbar", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("shows French labels by default", () => {
    renderNavbar();
    expect(screen.getAllByText("Accueil").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Démarrer un projet").length).toBeGreaterThan(0);
  });

  it("switches labels to English with the language button", () => {
    renderNavbar();
    fireEvent.click(screen.getByRole("button", { name: "Passer en anglais" }));
    expect(screen.getAllByText("Home").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Start a project").length).toBeGreaterThan(0);
  });

  it("opens the mobile menu and exposes its state", () => {
    renderNavbar();
    const toggleButton = screen.getByRole("button", { name: "Ouvrir ou fermer le menu" });
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-expanded", "true");
    expect(document.getElementById("mobile-nav-menu")).not.toBeNull();
  });

  it("no longer offers a color palette toggle", () => {
    renderNavbar();
    expect(screen.queryByText(/mode (bleu|warm)/i)).not.toBeInTheDocument();
  });
});
