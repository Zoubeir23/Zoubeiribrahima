import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ConsentProvider from "@/components/consent/ConsentProvider";
import { resourceBrandLogos } from "@/data/resourceBrandLogos";
import { resourceGuides } from "@/data/resourceGuides";
import { LanguageProvider } from "@/hooks/useLanguage";

const accessState = { state: "locked" as "checking" | "locked" | "unlocked", unlock: vi.fn() };
vi.mock("@/hooks/useResourceAccess", () => ({ useResourceAccess: () => accessState }));
vi.mock("@/data/resourceGuideText", () => ({
  loadResourceGuideText: async () => "## Installer\n\n```bash\nnpx exemple\n```\n",
}));

const { default: ResourcesPage } = await import("@/pages/ResourcesPage");
const { default: ResourceGuidePage } = await import("@/pages/ResourceGuidePage");

const renderAt = (path: string) =>
  render(
    <LanguageProvider>
      <ConsentProvider>
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route path="/ressources" element={<ResourcesPage />} />
            <Route path="/ressources/:slug" element={<ResourceGuidePage />} />
          </Routes>
        </MemoryRouter>
      </ConsentProvider>
    </LanguageProvider>,
  );

const firstGuide = resourceGuides[0];

describe("page Ressources", () => {
  it("liste chaque ressource avec un lien vers son guide", () => {
    renderAt("/ressources");
    expect(screen.getByRole("heading", { level: 1, name: "Ressources" })).toBeInTheDocument();
    const main = screen.getByRole("main");
    resourceGuides.forEach((guide) => {
      expect(within(main).getByRole("link", { name: new RegExp(guide.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) })).toHaveAttribute(
        "href",
        `/ressources/${guide.slug}`,
      );
    });
  });
});

describe("logos des ressources", () => {
  it("montre sur chaque carte le logo de la marque concernée", () => {
    renderAt("/ressources");
    const main = screen.getByRole("main");
    resourceGuides.forEach((guide) => {
      const card = within(main).getByRole("link", { name: new RegExp(guide.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) });
      const logoSources = [...card.querySelectorAll("img")].map((image) => image.getAttribute("src"));
      expect(logoSources, guide.slug).toEqual(guide.brands.map((brand) => resourceBrandLogos[brand].path));
    });
  });

  it("montre les logos en tête du guide", () => {
    renderAt(`/ressources/${firstGuide.slug}`);
    const logoSources = [...screen.getByRole("main").querySelectorAll("img")].map((image) => image.getAttribute("src"));
    expect(logoSources).toEqual(firstGuide.brands.map((brand) => resourceBrandLogos[brand].path));
  });

  it("précise que les logos appartiennent à leurs propriétaires", () => {
    renderAt("/ressources");
    expect(screen.getByText(/logos appartiennent à leurs propriétaires/i)).toBeInTheDocument();
  });
});

describe("page d'une ressource", () => {
  beforeEach(() => {
    accessState.state = "locked";
  });
  afterEach(() => {
    document.head.querySelector('meta[name="robots"]')?.remove();
  });

  it("montre le titre, la source et le formulaire tant que l'accès n'est pas débloqué, sans le texte", () => {
    renderAt(`/ressources/${firstGuide.slug}`);
    expect(screen.getByRole("heading", { level: 1, name: firstGuide.title })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Source/ })).toHaveAttribute("href", firstGuide.sourceUrl);
    expect(screen.getByLabelText("Prénom")).toBeInTheDocument();
    expect(screen.queryByText("npx exemple")).not.toBeInTheDocument();
  });

  it("affiche le texte une fois l'accès débloqué", async () => {
    accessState.state = "unlocked";
    renderAt(`/ressources/${firstGuide.slug}`);
    expect(await screen.findByText("npx exemple")).toBeInTheDocument();
    expect(screen.queryByLabelText("Prénom")).not.toBeInTheDocument();
  });

  it("dit qu'une ressource inconnue est introuvable et l'exclut des moteurs", () => {
    renderAt("/ressources/inconnue");
    expect(screen.getByRole("heading", { level: 1, name: "Ressource introuvable" })).toBeInTheDocument();
    expect(document.head.querySelector('meta[name="robots"]')?.getAttribute("content")).toBe("noindex, follow");
  });
});
