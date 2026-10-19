import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ConsentProvider from "@/components/consent/ConsentProvider";
import ContactSection from "@/components/ContactSection";
import { LanguageProvider } from "@/hooks/useLanguage";

const renderContact = () =>
  render(
    <LanguageProvider>
      <ConsentProvider>
        <ContactSection />
      </ConsentProvider>
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

  it("keeps the booking calendar behind the consent gate until the visitor agrees", () => {
    const { container } = renderContact();
    expect(screen.getByRole("group", { name: "Prise de rendez-vous" })).toBeInTheDocument();
    expect(container.querySelector("iframe")).toBeNull();
  });

  it("embeds the public Calendly page once the visitor agrees to load it", () => {
    const { container } = renderContact();
    fireEvent.click(screen.getByRole("button", { name: "Afficher le calendrier" }));
    const frame = container.querySelector("iframe");
    expect(frame).not.toBeNull();
    const frameUrl = new URL(frame?.getAttribute("src") ?? "");
    expect(frameUrl.origin + frameUrl.pathname).toBe("https://calendly.com/zoubeiribrahima/30min");
    expect(frameUrl.searchParams.get("embed_domain")).toBe("zoubeir.me");
  });

  it("links to WhatsApp with the configured international number", () => {
    renderContact();
    expect(screen.getByRole("link", { name: "WhatsApp" })).toHaveAttribute("href", "https://wa.me/221785941071");
  });
});
