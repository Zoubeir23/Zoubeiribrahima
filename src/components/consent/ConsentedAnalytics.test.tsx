import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ConsentProvider from "@/components/consent/ConsentProvider";
import ConsentedAnalytics from "@/components/consent/ConsentedAnalytics";
import { useConsent } from "@/hooks/useConsent";
import { CONSENT_STORAGE_KEY } from "@/lib/consent-storage";

type BeforeSend = (event: { type: string; url: string }) => { type: string; url: string } | null;

let capturedBeforeSend: BeforeSend | undefined;

vi.mock("@vercel/analytics/react", () => ({
  Analytics: ({ beforeSend }: { beforeSend?: BeforeSend }) => {
    capturedBeforeSend = beforeSend;
    return <div data-testid="vercel-analytics" />;
  },
}));

const ConsentButtons = () => {
  const { acceptAll, refuseAll } = useConsent();
  return (
    <>
      <button type="button" onClick={acceptAll}>
        accept
      </button>
      <button type="button" onClick={refuseAll}>
        refuse
      </button>
    </>
  );
};

const renderAnalytics = () =>
  render(
    <ConsentProvider>
      <ConsentedAnalytics />
      <ConsentButtons />
    </ConsentProvider>,
  );

const pageViewEvent = { type: "pageview", url: "https://zoubeir.me/" };

describe("ConsentedAnalytics", () => {
  beforeEach(() => {
    window.localStorage.clear();
    capturedBeforeSend = undefined;
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

  it("lets events through while consent is given", () => {
    renderAnalytics();
    act(() => screen.getByText("accept").click());
    expect(capturedBeforeSend?.(pageViewEvent)).toEqual(pageViewEvent);
  });

  it("cancels every event as soon as consent is withdrawn, without a page reload", () => {
    renderAnalytics();
    act(() => screen.getByText("accept").click());
    const beforeSend = capturedBeforeSend;
    act(() => screen.getByText("refuse").click());
    expect(beforeSend?.(pageViewEvent)).toBeNull();
    expect(capturedBeforeSend?.(pageViewEvent)).toBeNull();
  });

  it("resumes sending events when consent is given again", () => {
    renderAnalytics();
    act(() => screen.getByText("accept").click());
    act(() => screen.getByText("refuse").click());
    act(() => screen.getByText("accept").click());
    expect(capturedBeforeSend?.(pageViewEvent)).toEqual(pageViewEvent);
  });
});
