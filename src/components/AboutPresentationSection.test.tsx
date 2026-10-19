import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import AboutPresentationSection from "@/components/AboutPresentationSection";
import ConsentProvider from "@/components/consent/ConsentProvider";
import { LanguageProvider } from "@/hooks/useLanguage";
import type { PaymentMethod } from "@/lib/contact-config";

interface RenderOptions {
  paymentMethods?: readonly PaymentMethod[];
  legalStatus?: string;
}

const renderSection = ({ paymentMethods = [], legalStatus = "" }: RenderOptions = {}) =>
  render(
    <LanguageProvider>
      <ConsentProvider>
        <MemoryRouter>
          <AboutPresentationSection headingAs="h1" paymentMethods={paymentMethods} legalStatus={legalStatus} registrationNumber="" />
        </MemoryRouter>
      </ConsentProvider>
    </LanguageProvider>,
  );

describe("AboutPresentationSection", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("renders the page title as the only level one heading", () => {
    renderSection();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("shows the identity card with confirmed facts only", () => {
    renderSection();
    const card = screen.getByRole("table", { name: "Carte d'identité" });
    expect(within(card).getByText("Dakar, Sénégal")).toBeInTheDocument();
    expect(within(card).queryByText("Forme juridique")).not.toBeInTheDocument();
  });

  it("adds the legal form to the identity card once it is configured", () => {
    renderSection({ legalStatus: "Entreprise individuelle" });
    expect(screen.getByText("Entreprise individuelle")).toBeInTheDocument();
  });

  it("opens on the Who I am tab", () => {
    renderSection();
    expect(screen.getByRole("tab", { name: "Qui je suis" })).toHaveAttribute("aria-selected", "true");
  });

  it("hides the payment tab until payment methods are configured", () => {
    renderSection();
    expect(screen.queryByRole("tab", { name: "Paiement" })).not.toBeInTheDocument();
  });

  it("lists payment methods in the payment tab when configured", async () => {
    renderSection({ paymentMethods: [{ label: "Wave" }, { label: "Virement" }] });
    await userEvent.click(screen.getByRole("tab", { name: "Paiement" }));
    expect(screen.getByText("Wave")).toBeInTheDocument();
    expect(screen.getByText("Virement")).toBeInTheDocument();
  });

  it("turns a payment method with a secure address into an external link", async () => {
    renderSection({ paymentMethods: [{ label: "PayPal", href: "https://www.paypal.biz/Zoubeir05" }] });
    await userEvent.click(screen.getByRole("tab", { name: "Paiement" }));
    const link = screen.getByRole("link", { name: "PayPal" });
    expect(link).toHaveAttribute("href", "https://www.paypal.biz/Zoubeir05");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("never links a payment method whose address is not secure", async () => {
    renderSection({ paymentMethods: [{ label: "Fragile", href: "http://example.com/pay" }] });
    await userEvent.click(screen.getByRole("tab", { name: "Paiement" }));
    expect(screen.queryByRole("link", { name: "Fragile" })).not.toBeInTheDocument();
    expect(screen.getByText("Fragile")).toBeInTheDocument();
  });

  it("links the background tab to the experience page", async () => {
    renderSection();
    await userEvent.click(screen.getByRole("tab", { name: "Parcours" }));
    expect(screen.getByRole("link", { name: "Voir le parcours complet" })).toHaveAttribute("href", "/experience");
  });

  it("offers the contact channels in the contact tab", async () => {
    renderSection();
    await userEvent.click(screen.getByRole("tab", { name: "Contact" }));
    expect(screen.getByRole("link", { name: "Écrire un email" })).toHaveAttribute("href", expect.stringContaining("mailto:"));
    expect(screen.getByRole("link", { name: "Ouvrir le formulaire de contact" })).toHaveAttribute("href", "/contact");
  });

  it("links to the privacy policy and the terms", () => {
    renderSection();
    expect(screen.getByRole("link", { name: "Politique de confidentialité" })).toHaveAttribute("href", "/privacy");
    expect(screen.getByRole("link", { name: "Conditions d'utilisation" })).toHaveAttribute("href", "/terms");
  });
});
