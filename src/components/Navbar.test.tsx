import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/hooks/useLanguage";

const renderNavbar = (initialPath = "/") =>
  render(
    <LanguageProvider>
      <MemoryRouter initialEntries={[initialPath]}>
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

  it("marks the blog link as the current page on blog routes", () => {
    renderNavbar("/blog");
    const blogLinks = screen.getAllByRole("link", { name: "Blog" });
    expect(blogLinks.some((link) => link.getAttribute("aria-current") === "page")).toBe(true);
  });

  it("links every item to its own page instead of an in-page anchor", () => {
    renderNavbar();
    const desktopNavigation = screen.getAllByRole("link").filter((link) => link.getAttribute("href")?.startsWith("/"));
    const hrefs = desktopNavigation.map((link) => link.getAttribute("href"));
    for (const path of ["/", "/services", "/skills", "/projects", "/experience", "/certifications", "/contact", "/blog"]) {
      expect(hrefs, path).toContain(path);
    }
    expect(screen.getAllByRole("link").some((link) => link.getAttribute("href")?.includes("#"))).toBe(false);
  });

  it("marks the page being viewed as current", () => {
    renderNavbar("/projects");
    const current = screen.getAllByRole("link").filter((link) => link.getAttribute("aria-current") === "page");
    expect(current.map((link) => link.getAttribute("href"))).toEqual(["/projects"]);
  });

  it("keeps the services link current on a service detail page", () => {
    renderNavbar("/services/saas");
    const current = screen.getAllByRole("link").filter((link) => link.getAttribute("aria-current") === "page");
    expect(current.map((link) => link.getAttribute("href"))).toEqual(["/services"]);
  });

  it("marks only the home link as current on the home page", () => {
    renderNavbar("/");
    const current = screen.getAllByRole("link").filter((link) => link.getAttribute("aria-current") === "page");
    expect(current.map((link) => link.getAttribute("href"))).toEqual(["/"]);
  });

  it("sends the call to action to the contact page", () => {
    renderNavbar();
    const callToAction = screen.getAllByRole("link", { name: /démarrer un projet/i })[0];
    expect(callToAction).toHaveAttribute("href", "/contact");
  });

  it("closes the mobile menu after choosing a page", () => {
    renderNavbar();
    fireEvent.click(screen.getByRole("button", { name: "Ouvrir ou fermer le menu" }));
    const mobileMenu = document.getElementById("mobile-nav-menu") as HTMLElement;
    fireEvent.click(within(mobileMenu).getByRole("link", { name: /projets/i }));
    expect(document.getElementById("mobile-nav-menu")).toBeNull();
  });
});

