import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { CONSENT_STORAGE_KEY } from "@/lib/consent-storage";
import ConsentGate from "@/components/consent/ConsentGate";
import ConsentProvider from "@/components/consent/ConsentProvider";

const renderGate = () =>
  render(
    <ConsentProvider>
      <ConsentGate
        providerName="Cal.com"
        description="This content is hosted by Cal.com, which may set cookies."
        loadButtonLabel="Show Cal.com"
      >
        <iframe title="booking" src="https://cal.com/example" />
      </ConsentGate>
    </ConsentProvider>,
  );

describe("ConsentGate", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("does not render the third-party content before consent", () => {
    renderGate();
    expect(screen.queryByTitle("booking")).not.toBeInTheDocument();
    expect(screen.getByText(/may set cookies/i)).toBeInTheDocument();
  });

  it("renders the content after the visitor clicks the load button", () => {
    renderGate();
    fireEvent.click(screen.getByRole("button", { name: "Show Cal.com" }));
    expect(screen.getByTitle("booking")).toBeInTheDocument();
    expect(
      JSON.parse(window.localStorage.getItem(CONSENT_STORAGE_KEY) ?? "null"),
    ).toEqual({
      analytics: false,
      externalContent: true,
    });
  });

  it("renders the content immediately when consent was already given", () => {
    window.localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({ analytics: false, externalContent: true }),
    );
    renderGate();
    expect(screen.getByTitle("booking")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Show Cal.com" }),
    ).not.toBeInTheDocument();
  });
});
