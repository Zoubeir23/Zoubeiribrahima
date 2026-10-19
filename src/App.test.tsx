import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import App from "@/App";
import ConsentProvider from "@/components/consent/ConsentProvider";
import { LanguageProvider } from "@/hooks/useLanguage";

const renderAppAt = (url: string) => {
  window.history.pushState({}, "", url);
  return render(
    <LanguageProvider>
      <ConsentProvider>
        <App />
      </ConsentProvider>
    </LanguageProvider>,
  );
};

describe("application routes", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.head.innerHTML = "";
  });

  it.each([
    ["/services", /mes services/i],
    ["/skills", /ma stack/i],
    ["/projects", /mes projets/i],
    ["/experience", /expériences et/i],
    ["/certifications", /mes certifications/i],
    ["/faq", /questions fréquentes/i],
    ["/contact", /travaillons ensemble/i],
  ])("serves %s on its own page", (path, headingPattern) => {
    renderAppAt(path);
    expect(screen.getByRole("heading", { level: 1, name: headingPattern })).toBeInTheDocument();
  });

  it("keeps the home page on the root path", () => {
    renderAppAt("/");
    expect(screen.getByRole("heading", { level: 1, name: /produit digital/i })).toBeInTheDocument();
  });

  it("keeps the service detail pages", () => {
    renderAppAt("/services/saas");
    expect(screen.getByRole("heading", { level: 1, name: /développement saas/i })).toBeInTheDocument();
  });

  it("keeps the legal pages", () => {
    renderAppAt("/privacy");
    expect(screen.getByRole("heading", { level: 1, name: /politique de confidentialité/i })).toBeInTheDocument();
  });

  it("redirects an old home anchor to the matching dedicated page", () => {
    renderAppAt("/#projects");
    expect(screen.getByRole("heading", { level: 1, name: /mes projets/i })).toBeInTheDocument();
  });

  it("shows the not found page for an unknown route", () => {
    renderAppAt("/does-not-exist");
    expect(screen.queryByRole("heading", { level: 1, name: /mes projets/i })).not.toBeInTheDocument();
  });
});
