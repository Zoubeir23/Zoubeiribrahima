import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import ConsentProvider from "@/components/consent/ConsentProvider";
import { LanguageProvider } from "@/hooks/useLanguage";
import ServiceDetail from "@/pages/ServiceDetail";
import { servicesContent } from "@/lib/services-content";

const french = servicesContent.fr;
const saas = french.services.saas;

const renderPage = (path: string) =>
  render(
    <LanguageProvider>
      <ConsentProvider>
        <MemoryRouter initialEntries={[path]}>
          <Routes>
            <Route path="/services/:slug" element={<ServiceDetail />} />
          </Routes>
        </MemoryRouter>
      </ConsentProvider>
    </LanguageProvider>,
  );

describe("ServiceDetail", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.title = "";
  });

  it("shows the service title as the main heading", () => {
    renderPage("/services/saas");
    expect(screen.getByRole("heading", { level: 1, name: saas.title })).toBeInTheDocument();
  });

  it("updates the document title for the service", () => {
    renderPage("/services/saas");
    expect(document.title).toContain(saas.title);
  });

  it("links back to the services section of the home page", () => {
    renderPage("/services/saas");
    expect(screen.getByRole("link", { name: french.backToServices })).toHaveAttribute("href", "/#services");
  });

  it("shows the first offering and switches when another tab is chosen", () => {
    renderPage("/services/saas");
    expect(screen.getByText(saas.offerings[0].headline)).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByRole("tab", { name: saas.offerings[1].tabLabel }));
    expect(screen.getByText(saas.offerings[1].headline)).toBeInTheDocument();
  });

  it("builds a prefilled WhatsApp quote link for the selected offering", () => {
    renderPage("/services/saas");
    const quoteLink = screen.getByRole("link", { name: french.requestQuoteLabel });
    expect(quoteLink).toHaveAttribute(
      "href",
      `https://wa.me/221785941071?text=${encodeURIComponent(saas.offerings[0].quoteMessage.trim())}`,
    );
  });

  it("lists what is included in every project", () => {
    renderPage("/services/saas");
    for (const item of french.includedItems) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
  });

  it("offers a booking button that opens the public Calendly page", () => {
    renderPage("/services/saas");
    const bookingLink = within(screen.getByRole("main")).getByRole("link", { name: french.bookCallLabel });
    expect(bookingLink).toHaveAttribute("href", "https://calendly.com/zoubeiribrahima/30min");
    expect(bookingLink).toHaveAttribute("target", "_blank");
  });

  it("shows a not found message for an unknown service", () => {
    renderPage("/services/unknown-service");
    expect(screen.getByRole("heading", { name: french.notFoundTitle })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: french.backToServices })).toHaveAttribute("href", "/#services");
  });
});
