import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ResourceGuideContent from "@/components/resources/ResourceGuideContent";

const MARKDOWN = "## Installer\n\nLance `npm` puis :\n\n```bash\nnpx skills add exemple\n```\n";

describe("texte d'une ressource", () => {
  it("affiche les commandes dans un bloc de code copiable", async () => {
    const writeText = vi.fn(async () => undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    render(<ResourceGuideContent markdown={MARKDOWN} />);

    expect(screen.getByRole("heading", { level: 2, name: "Installer" })).toBeInTheDocument();
    expect(screen.getByText("npx skills add exemple").closest("pre")).not.toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Copier" }));
    await waitFor(() => expect(screen.getByRole("button", { name: "Copié" })).toBeInTheDocument());
    expect(writeText).toHaveBeenCalledWith("npx skills add exemple");
  });

  it("garde le code en ligne hors des blocs", () => {
    render(<ResourceGuideContent markdown={MARKDOWN} />);
    expect(screen.getByText("npm").closest("pre")).toBeNull();
  });
});
