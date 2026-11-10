import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

const submitResourceSubscription = vi.fn();
vi.mock("@/lib/resource-subscription/submit-resource-subscription", () => ({
  submitResourceSubscription: (input: unknown) => submitResourceSubscription(input),
}));

import ResourceAccessForm from "@/components/resources/ResourceAccessForm";

function renderForm(onUnlocked = vi.fn()) {
  render(
    <MemoryRouter>
      <ResourceAccessForm resourceSlug="claude-seo-audit-de-site" onUnlocked={onUnlocked} />
    </MemoryRouter>,
  );
  return onUnlocked;
}

function fill(firstName: string, email: string) {
  fireEvent.change(screen.getByLabelText("Prénom"), { target: { value: firstName } });
  fireEvent.change(screen.getByLabelText("E-mail"), { target: { value: email } });
  fireEvent.click(screen.getByRole("button", { name: "Débloquer ce guide" }));
}

describe("formulaire d'accès aux ressources", () => {
  beforeEach(() => {
    submitResourceSubscription.mockReset();
    window.localStorage.clear();
  });

  it("débloque après la confirmation du serveur", async () => {
    submitResourceSubscription.mockResolvedValue({ success: true });
    const onUnlocked = renderForm();
    fill(" Awa ", "Awa@Gmail.com");
    await waitFor(() => expect(onUnlocked).toHaveBeenCalledWith("Awa"));
    expect(submitResourceSubscription).toHaveBeenCalledWith({
      firstName: "Awa",
      email: "awa@gmail.com",
      resourceSlug: "claude-seo-audit-de-site",
      website: "",
    });
  });

  it("n'envoie pas deux fois le même e-mail : le guide s'ouvre sans appeler le serveur", async () => {
    submitResourceSubscription.mockResolvedValue({ success: true });
    const firstVisit = renderForm();
    fill("Awa", "awa@gmail.com");
    await waitFor(() => expect(firstVisit).toHaveBeenCalledTimes(1));
    cleanup();

    const secondVisit = renderForm();
    fill("Awa", "AWA@gmail.com");
    await waitFor(() => expect(secondVisit).toHaveBeenCalledWith("Awa"));
    expect(submitResourceSubscription).toHaveBeenCalledTimes(1);
  });

  it("envoie un e-mail encore inconnu de ce navigateur", async () => {
    submitResourceSubscription.mockResolvedValue({ success: true });
    const firstVisit = renderForm();
    fill("Awa", "awa@gmail.com");
    await waitFor(() => expect(firstVisit).toHaveBeenCalledTimes(1));
    cleanup();

    const secondVisit = renderForm();
    fill("Moussa", "moussa@gmail.com");
    await waitFor(() => expect(secondVisit).toHaveBeenCalledWith("Moussa"));
    expect(submitResourceSubscription).toHaveBeenCalledTimes(2);
  });

  it("ne retient pas un e-mail refusé par le serveur", async () => {
    submitResourceSubscription.mockResolvedValueOnce({ success: false, error: "Refusé" });
    renderForm();
    fill("Awa", "awa@gmail.com");
    expect(await screen.findByRole("alert")).toHaveTextContent("Refusé");
    cleanup();

    submitResourceSubscription.mockResolvedValueOnce({ success: true });
    const secondVisit = renderForm();
    fill("Awa", "awa@gmail.com");
    await waitFor(() => expect(secondVisit).toHaveBeenCalledWith("Awa"));
    expect(submitResourceSubscription).toHaveBeenCalledTimes(2);
  });

  it("signale une faute de frappe sans appeler le serveur", () => {
    renderForm();
    fill("Awa", "awa@gmial.com");
    expect(screen.getByRole("alert")).toHaveTextContent("Tu voulais sans doute écrire awa@gmail.com ?");
    expect(screen.getByLabelText("E-mail")).toHaveAttribute("aria-invalid", "true");
    expect(submitResourceSubscription).not.toHaveBeenCalled();
  });

  it("affiche le refus du serveur et garde la saisie", async () => {
    submitResourceSubscription.mockResolvedValue({ success: false, error: "Ce domaine ne reçoit pas d'e-mails. Vérifie l'adresse." });
    const onUnlocked = renderForm();
    fill("Awa", "awa@domaine-invente.com");
    expect(await screen.findByRole("alert")).toHaveTextContent("Ce domaine ne reçoit pas d'e-mails.");
    expect(screen.getByLabelText("E-mail")).toHaveValue("awa@domaine-invente.com");
    expect(onUnlocked).not.toHaveBeenCalled();
  });

  it("explique l'usage des données et mène à la politique de confidentialité", () => {
    renderForm();
    expect(screen.getByRole("link", { name: "politique de confidentialité" })).toHaveAttribute("href", "/privacy");
  });
});
