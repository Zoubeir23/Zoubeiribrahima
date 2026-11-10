import { describe, expect, it, vi } from "vitest";
import { submitResourceSubscription } from "./submit-resource-subscription";

const INPUT = { firstName: "Awa", email: "awa@gmail.com", resourceSlug: "claude-seo-audit-de-site", website: "" };

describe("submitResourceSubscription", () => {
  it("envoie le formulaire en JSON à la fonction serveur", async () => {
    const fetchImplementation = vi.fn(async () => Response.json({ success: true, error: null }));
    await expect(submitResourceSubscription(INPUT, fetchImplementation)).resolves.toEqual({ success: true });
    const [url, init] = fetchImplementation.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("/api/resources/subscribe");
    expect(JSON.parse(String(init.body))).toEqual(INPUT);
  });

  it("relaie le message d'erreur du serveur", async () => {
    const fetchImplementation = vi.fn(async () => Response.json({ success: false, error: "Ce domaine ne reçoit pas d'e-mails." }, { status: 400 }));
    await expect(submitResourceSubscription(INPUT, fetchImplementation)).resolves.toEqual({
      success: false,
      error: "Ce domaine ne reçoit pas d'e-mails.",
    });
  });

  it("donne un message générique quand la réponse est illisible ou le réseau coupé", async () => {
    const unreadable = vi.fn(async () => new Response("<html>", { status: 500 }));
    const offline = vi.fn(async () => Promise.reject(new TypeError("Failed to fetch")));
    const expected = { success: false, error: "L'inscription n'a pas abouti. Réessaie dans un instant." };
    await expect(submitResourceSubscription(INPUT, unreadable)).resolves.toEqual(expected);
    await expect(submitResourceSubscription(INPUT, offline)).resolves.toEqual(expected);
  });
});
