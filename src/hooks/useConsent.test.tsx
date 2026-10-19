import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it } from "vitest";
import ConsentProvider from "@/components/consent/ConsentProvider";
import { useConsent } from "@/hooks/useConsent";
import { CONSENT_STORAGE_KEY } from "@/lib/consent-storage";

const wrapper = ({ children }: { children: ReactNode }) => <ConsentProvider>{children}</ConsentProvider>;

describe("useConsent", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("starts undecided with every category blocked", () => {
    const { result } = renderHook(() => useConsent(), { wrapper });
    expect(result.current.hasDecided).toBe(false);
    expect(result.current.isBannerVisible).toBe(true);
    expect(result.current.canUseAnalytics).toBe(false);
    expect(result.current.canLoadExternalContent).toBe(false);
  });

  it("enables every category after accepting all and persists the choice", () => {
    const { result } = renderHook(() => useConsent(), { wrapper });
    act(() => result.current.acceptAll());
    expect(result.current.canUseAnalytics).toBe(true);
    expect(result.current.canLoadExternalContent).toBe(true);
    expect(result.current.isBannerVisible).toBe(false);
    expect(JSON.parse(window.localStorage.getItem(CONSENT_STORAGE_KEY) ?? "null")).toEqual({
      analytics: true,
      externalContent: true,
    });
  });

  it("blocks every category after refusing all but closes the banner", () => {
    const { result } = renderHook(() => useConsent(), { wrapper });
    act(() => result.current.refuseAll());
    expect(result.current.hasDecided).toBe(true);
    expect(result.current.canUseAnalytics).toBe(false);
    expect(result.current.canLoadExternalContent).toBe(false);
    expect(result.current.isBannerVisible).toBe(false);
  });

  it("applies custom category choices", () => {
    const { result } = renderHook(() => useConsent(), { wrapper });
    act(() => result.current.savePreferences({ analytics: true, externalContent: false }));
    expect(result.current.canUseAnalytics).toBe(true);
    expect(result.current.canLoadExternalContent).toBe(false);
  });

  it("restores a previous choice on mount without showing the banner", () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({ analytics: false, externalContent: true }));
    const { result } = renderHook(() => useConsent(), { wrapper });
    expect(result.current.canLoadExternalContent).toBe(true);
    expect(result.current.canUseAnalytics).toBe(false);
    expect(result.current.isBannerVisible).toBe(false);
  });

  it("reopens the banner on demand after a decision", () => {
    const { result } = renderHook(() => useConsent(), { wrapper });
    act(() => result.current.acceptAll());
    act(() => result.current.openPreferences());
    expect(result.current.isBannerVisible).toBe(true);
  });

  it("allows external content alone while keeping other categories as they were", () => {
    const { result } = renderHook(() => useConsent(), { wrapper });
    act(() => result.current.allowExternalContent());
    expect(result.current.canLoadExternalContent).toBe(true);
    expect(result.current.canUseAnalytics).toBe(false);
  });

  it("shares one decision between several consumers", () => {
    const { result } = renderHook(() => ({ first: useConsent(), second: useConsent() }), { wrapper });
    act(() => result.current.first.acceptAll());
    expect(result.current.second.canUseAnalytics).toBe(true);
  });

  it("throws when used outside the provider", () => {
    expect(() => renderHook(() => useConsent())).toThrow(/ConsentProvider/);
  });

  it("closes the reopened banner without changing the stored choice", () => {
    const { result } = renderHook(() => useConsent(), { wrapper });
    act(() => result.current.acceptAll());
    act(() => result.current.openPreferences());
    act(() => result.current.closePreferences());
    expect(result.current.isBannerVisible).toBe(false);
    expect(result.current.canUseAnalytics).toBe(true);
  });

  it("keeps the banner open before any decision when asked to close", () => {
    const { result } = renderHook(() => useConsent(), { wrapper });
    act(() => result.current.closePreferences());
    expect(result.current.isBannerVisible).toBe(true);
  });
});
