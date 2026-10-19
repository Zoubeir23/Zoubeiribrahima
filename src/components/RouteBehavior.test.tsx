import { act, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import LegacyHashRedirect from "@/components/LegacyHashRedirect";
import RouteScrollReset from "@/components/RouteScrollReset";

describe("LegacyHashRedirect", () => {
  const renderAt = (entry: string) =>
    render(
      <MemoryRouter initialEntries={[entry]}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <LegacyHashRedirect />
                <p>home page</p>
              </>
            }
          />
          <Route path="/projects" element={<p>projects page</p>} />
          <Route path="/contact" element={<p>contact page</p>} />
          <Route path="/services" element={<p>services page</p>} />
        </Routes>
      </MemoryRouter>,
    );

  it("sends an old projects anchor to the projects page", () => {
    renderAt("/#projects");
    expect(screen.getByText("projects page")).toBeInTheDocument();
  });

  it("sends an old contact anchor to the contact page", () => {
    renderAt("/#contact");
    expect(screen.getByText("contact page")).toBeInTheDocument();
  });

  it("sends the process and reasons anchors to the services page", () => {
    renderAt("/#process");
    expect(screen.getByText("services page")).toBeInTheDocument();
  });

  it("keeps the home page for the hero anchor", () => {
    renderAt("/#hero");
    expect(screen.getByText("home page")).toBeInTheDocument();
  });

  it("keeps the home page when there is no anchor", () => {
    renderAt("/");
    expect(screen.getByText("home page")).toBeInTheDocument();
  });
});

describe("RouteScrollReset", () => {
  const scrollTo = vi.fn();

  const Navigator = () => {
    const navigate = useNavigate();
    return (
      <>
        <button type="button" onClick={() => navigate("/projects")}>
          go projects
        </button>
        <button type="button" onClick={() => navigate("/projects#details")}>
          go anchor
        </button>
      </>
    );
  };

  beforeEach(() => {
    scrollTo.mockClear();
    vi.stubGlobal("scrollTo", scrollTo);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  const renderScrollReset = () =>
    render(
      <MemoryRouter initialEntries={["/"]}>
        <RouteScrollReset />
        <Navigator />
      </MemoryRouter>,
    );

  it("scrolls back to the top when the page changes", () => {
    renderScrollReset();
    scrollTo.mockClear();
    act(() => screen.getByText("go projects").click());
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "instant" });
  });

  it("leaves the scroll position alone when navigating to an in-page anchor", () => {
    renderScrollReset();
    scrollTo.mockClear();
    act(() => screen.getByText("go anchor").click());
    expect(scrollTo).not.toHaveBeenCalled();
  });
});
