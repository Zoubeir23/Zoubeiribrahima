import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ConsentProvider from "@/components/consent/ConsentProvider";
import ConsentedAnalytics from "@/components/consent/ConsentedAnalytics";
import { useConsent } from "@/hooks/useConsent";
import { CONSENT_STORAGE_KEY } from "@/lib/consent-storage";

vi.mock("@vercel/analytics/react", () => ({
  Analytics: () => <div data-testid="vercel-analytics" />,
}));

const AcceptButton = () => {
  const { acceptAll } = useConsent();
  return (
    <button type="button" onClick={acceptAll}>
      accept
    </button>
  );
};

const renderAnalytics = () =>
  render(
    <ConsentProvider>
      <ConsentedAnalytics />
      <AcceptButton />
    </ConsentProvider>,
  );

describe("ConsentedAnalytics", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("does not load analytics before the visitor decides", () => {
    renderAnalytics();
    expect(screen.queryByTestId("vercel-analytics")).not.toBeInTheDocument();
  });

  it("does not load analytics when the visitor refused them", () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({ analytics: false, externalContent: true }));
    renderAnalytics();
    expect(screen.queryByTestId("vercel-analytics")).not.toBeInTheDocument();
  });

  it("loads analytics as soon as the visitor accepts", () => {
    renderAnalytics();
    act(() => screen.getByText("accept").click());
    expect(screen.getByTestId("vercel-analytics")).toBeInTheDocument();
  });

  it("loads analytics immediately for a returning visitor who accepted", () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({ analytics: true, externalContent: false }));
    renderAnalytics();
    expect(screen.getByTestId("vercel-analytics")).toBeInTheDocument();
  });
});
