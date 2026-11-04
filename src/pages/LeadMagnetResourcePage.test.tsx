import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import ConsentProvider from "@/components/consent/ConsentProvider";
import { LanguageProvider } from "@/hooks/useLanguage";
import type { LeadMagnetResource } from "@/data/leadMagnetResources";

const fixtureResource: LeadMagnetResource = {
  slug: "ressource-de-test",
  title: "Ressource de test",
  summary: "Résumé de la ressource de test.",
  publishedIsoDate: "2026-11-04",
  contentMarkdown: "## Première partie\n\nUn paragraphe de la ressource.",
  downloads: [
    { label: "Guide en PDF", kind: "pdf", href: "/lead-magnet/ressource-de-test/guide.pdf", sizeLabel: "1,2 Mo" },
    { label: "Dossier complet", kind: "zip", href: "https://drive.google.com/exemple" },
  ],
  links: [
    { label: "Agent IA de test", kind: "agent", href: "https://example.com/agent", description: "Un agent à essayer." },
  ],
};

vi.mock("@/data/leadMagnetResources", async (importOriginal) => {
  const original = await importOriginal<typeof import("@/data/leadMagnetResources")>();
  return {
    ...original,
    leadMagnetResources: [fixtureResource],
    findLeadMagnetResource: (slug: string | undefined) => (slug === fixtureResource.slug ? fixtureResource : undefined),
  };
});

const { default: LeadMagnetResourcePage } = await import("@/pages/LeadMagnetResourcePage");

const renderAt = (path: string) =>
  render(
    <LanguageProvider>
      <ConsentProvider>
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route path="/lead-magnet/:slug" element={<LeadMagnetResourcePage />} />
          </Routes>
        </MemoryRouter>
      </ConsentProvider>
    </LanguageProvider>,
  );

describe("LeadMagnetResourcePage", () => {
  afterEach(() => {
    document.head.querySelector('meta[name="robots"]')?.remove();
  });

  it("affiche le titre, le résumé et le contenu en Markdown de la ressource", () => {
    renderAt("/lead-magnet/ressource-de-test");

    expect(screen.getByRole("heading", { level: 1, name: "Ressource de test" })).toBeInTheDocument();
    expect(screen.getByText("Résumé de la ressource de test.")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Première partie" })).toBeInTheDocument();
    expect(screen.getByText("Un paragraphe de la ressource.")).toBeInTheDocument();
  });

  it("propose les fichiers : téléchargement direct pour un fichier du site, nouvel onglet pour un fichier externe", () => {
    renderAt("/lead-magnet/ressource-de-test");

    const localDownload = screen.getByRole("link", { name: /Guide en PDF/ });
    const externalDownload = screen.getByRole("link", { name: /Dossier complet/ });

    expect(localDownload).toHaveAttribute("href", "/lead-magnet/ressource-de-test/guide.pdf");
    expect(localDownload).toHaveAttribute("download");
    expect(localDownload).toHaveTextContent("1,2 Mo");
    expect(externalDownload).toHaveAttribute("target", "_blank");
    expect(externalDownload).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("présente les liens (agent IA, skill, MCP...) avec leur description, ouverts dans un nouvel onglet", () => {
    renderAt("/lead-magnet/ressource-de-test");

    const linksList = screen.getByRole("list", { name: /liens/i });
    const agentLink = within(linksList).getByRole("link", { name: /Agent IA de test/ });

    expect(agentLink).toHaveAttribute("href", "https://example.com/agent");
    expect(agentLink).toHaveAttribute("target", "_blank");
    expect(within(linksList).getByText("Un agent à essayer.")).toBeInTheDocument();
  });

  it("n'est jamais indexée par les moteurs de recherche", () => {
    renderAt("/lead-magnet/ressource-de-test");

    expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute("content", "noindex, follow");
  });

  it("affiche une page introuvable, sans index, pour une ressource inconnue", () => {
    renderAt("/lead-magnet/inconnue");

    expect(screen.getByRole("heading", { level: 1 })).not.toHaveTextContent("Ressource de test");
    expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute("content", "noindex, follow");
  });
});
