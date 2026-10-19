import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ContactSection from "@/components/ContactSection";
import { LanguageProvider } from "@/hooks/useLanguage";

const renderContact = () =>
  render(
    <LanguageProvider>
      <ContactSection />
    </LanguageProvider>,
  );

const fillAndSubmit = () => {
  fireEvent.change(screen.getByLabelText("Nom complet"), { target: { value: "Jean Dupont" } });
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: "jean@example.com" } });
  fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Bonjour" } });
  fireEvent.click(screen.getByRole("button", { name: /envoyer le message/i }));
};

describe("ContactSection", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("sends the form payload as JSON and confirms success", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    renderContact();
    fillAndSubmit();

    await waitFor(() => expect(screen.getByText("Message envoyé !")).toBeInTheDocument());
    const [, requestInit] = fetchMock.mock.calls[0];
    expect(JSON.parse(requestInit.body)).toEqual({
      name: "Jean Dupont",
      email: "jean@example.com",
      message: "Bonjour",
    });
  });

  it("shows an error message when the request fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    renderContact();
    fillAndSubmit();

    await waitFor(() => expect(screen.getByText(/une erreur s'est produite/i)).toBeInTheDocument());
  });

  it("shows English labels after switching language", () => {
    window.localStorage.setItem("language", "en");
    renderContact();
    expect(screen.getByLabelText("Full name")).toBeInTheDocument();
  });

  it("does not render the booking calendar when no booking link is configured", () => {
    renderContact();
    expect(screen.queryByRole("group", { name: "Prise de rendez-vous" })).not.toBeInTheDocument();
  });
});
