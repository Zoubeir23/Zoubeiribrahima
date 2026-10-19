import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import CookieBanner from "@/components/consent/CookieBanner";
import ConsentProvider from "@/components/consent/ConsentProvider";
import CookieSettingsButton from "@/components/consent/CookieSettingsButton";
import { LanguageProvider } from "@/hooks/useLanguage";
import { useConsent } from "@/hooks/useConsent";
import { CONSENT_STORAGE_KEY } from "@/lib/consent-storage";
import { landingContent } from "@/lib/landing-content";

const text = landingContent.fr.consent;

const ConsentProbe = () => {
  const { canUseAnalytics, canLoadExternalContent } = useConsent();
  return <output data-testid="probe">{`${canUseAnalytics}|${canLoadExternalContent}`}</output>;
};

const renderBanner = () =>
  render(
    <LanguageProvider>
      <ConsentProvider>
        <CookieBanner />
        <CookieSettingsButton />
        <ConsentProbe />
      </ConsentProvider>
    </LanguageProvider>,
  );

const storedPreferences = () => JSON.parse(window.localStorage.getItem(CONSENT_STORAGE_KEY) ?? "null");

describe("CookieBanner", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("is visible and announced as a dialog before any decision", () => {
    renderBanner();
    expect(screen.getByRole("dialog", { name: text.title })).toBeInTheDocument();
    expect(screen.getByTestId("probe")).toHaveTextContent("false|false");
  });

  it("enables every category and disappears when accepting all", () => {
    renderBanner();
    fireEvent.click(screen.getByRole("button", { name: text.acceptAll }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByTestId("probe")).toHaveTextContent("true|true");
    expect(storedPreferences()).toEqual({ analytics: true, externalContent: true });
  });

  it("keeps every category blocked and disappears when refusing all", () => {
    renderBanner();
    fireEvent.click(screen.getByRole("button", { name: text.refuseAll }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByTestId("probe")).toHaveTextContent("false|false");
    expect(storedPreferences()).toEqual({ analytics: false, externalContent: false });
  });

  it("saves per-category choices from the customize panel", () => {
    renderBanner();
    fireEvent.click(screen.getByRole("button", { name: text.customize }));
    fireEvent.click(screen.getByRole("switch", { name: text.analyticsTitle }));
    fireEvent.click(screen.getByRole("button", { name: text.savePreferences }));
    expect(storedPreferences()).toEqual({ analytics: true, externalContent: false });
    expect(screen.getByTestId("probe")).toHaveTextContent("true|false");
  });

  it("stays hidden on later visits and can be reopened from the settings button", () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({ analytics: false, externalContent: false }));
    renderBanner();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: text.settingsButtonLabel }));
    expect(screen.getByRole("dialog", { name: text.title })).toBeInTheDocument();
  });

  it("preselects the current choices when reopened", () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({ analytics: true, externalContent: false }));
    renderBanner();
    fireEvent.click(screen.getByRole("button", { name: text.settingsButtonLabel }));
    fireEvent.click(screen.getByRole("button", { name: text.customize }));
    expect(screen.getByRole("switch", { name: text.analyticsTitle })).toBeChecked();
    expect(screen.getByRole("switch", { name: text.externalContentTitle })).not.toBeChecked();
  });

  it("does not steal keyboard focus on the first visit", () => {
    renderBanner();
    expect(screen.getByRole("dialog")).not.toContainElement(document.activeElement as HTMLElement);
  });

  it("offers no close button before a decision and ignores Escape", () => {
    renderBanner();
    expect(screen.queryByRole("button", { name: text.close })).not.toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.getByRole("dialog", { name: text.title })).toBeInTheDocument();
  });

  it("moves focus into the dialog when reopened from the settings button", () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({ analytics: false, externalContent: false }));
    renderBanner();
    fireEvent.click(screen.getByRole("button", { name: text.settingsButtonLabel }));
    expect(screen.getByRole("dialog", { name: text.title })).toHaveFocus();
  });

  it("closes the reopened dialog with the close button without changing choices", () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({ analytics: true, externalContent: false }));
    renderBanner();
    fireEvent.click(screen.getByRole("button", { name: text.settingsButtonLabel }));
    fireEvent.click(screen.getByRole("button", { name: text.close }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(storedPreferences()).toEqual({ analytics: true, externalContent: false });
  });

  it("closes the reopened dialog with Escape", () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({ analytics: false, externalContent: false }));
    renderBanner();
    fireEvent.click(screen.getByRole("button", { name: text.settingsButtonLabel }));
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("keeps the dialog scrollable inside small viewports", () => {
    renderBanner();
    expect(screen.getByRole("dialog").className).toMatch(/overflow-y-auto/);
    expect(screen.getByRole("dialog").className).toMatch(/max-h-/);
  });

  it("shows the choices just made when reopened in the same session", () => {
    renderBanner();
    fireEvent.click(screen.getByRole("button", { name: text.acceptAll }));
    fireEvent.click(screen.getByRole("button", { name: text.settingsButtonLabel }));
    fireEvent.click(screen.getByRole("button", { name: text.customize }));
    expect(screen.getByRole("switch", { name: text.analyticsTitle })).toBeChecked();
    expect(screen.getByRole("switch", { name: text.externalContentTitle })).toBeChecked();
  });

  it("starts from the summary view each time it is reopened", () => {
    renderBanner();
    fireEvent.click(screen.getByRole("button", { name: text.customize }));
    fireEvent.click(screen.getByRole("button", { name: text.savePreferences }));
    fireEvent.click(screen.getByRole("button", { name: text.settingsButtonLabel }));
    expect(screen.getByRole("button", { name: text.acceptAll })).toBeInTheDocument();
  });

  it("links to the privacy policy so the visitor can read what the choices mean", () => {
    renderBanner();
    expect(screen.getByRole("link", { name: text.learnMore })).toHaveAttribute("href", "/privacy");
  });
});

