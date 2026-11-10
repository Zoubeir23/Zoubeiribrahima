import { describe, expect, it, vi } from "vitest";
import { ContactStoreError } from "./resend-contact-store";
import { handleResourceSubscription, type SubscriptionDependencies } from "./subscribe-handler";

const VALID_BODY = { firstName: "Awa", email: "Awa@Gmail.com", resourceSlug: "claude-seo-audit-de-site" };

function buildDependencies(overrides: Partial<SubscriptionDependencies> = {}) {
  const saveContact = vi.fn(async () => undefined);
  const dependencies: SubscriptionDependencies = {
    knownResourceSlugs: new Set(["claude-seo-audit-de-site"]),
    checkMailDomain: vi.fn(async () => "accepts-mail" as const),
    contactStore: { saveContact },
    reportError: vi.fn(),
    ...overrides,
  };
  return { dependencies, saveContact };
}

describe("handleResourceSubscription", () => {
  it("enregistre un inscrit valide, e-mail en minuscules", async () => {
    const { dependencies, saveContact } = buildDependencies();
    const response = await handleResourceSubscription(VALID_BODY, dependencies);
    expect(response).toEqual({ status: 200, body: { success: true, error: null } });
    expect(saveContact).toHaveBeenCalledWith({ email: "awa@gmail.com", firstName: "Awa" });
    expect(dependencies.checkMailDomain).toHaveBeenCalledWith("gmail.com");
  });

  it("refuse une saisie invalide sans rien enregistrer", async () => {
    const { dependencies, saveContact } = buildDependencies();
    const response = await handleResourceSubscription({ ...VALID_BODY, email: "pas-un-email" }, dependencies);
    expect(response).toEqual({ status: 400, body: { success: false, error: "Cette adresse e-mail n'est pas valide." } });
    expect(saveContact).not.toHaveBeenCalled();
  });

  it("refuse un corps de requête qui n'est pas un objet", async () => {
    const { dependencies } = buildDependencies();
    expect((await handleResourceSubscription(null, dependencies)).status).toBe(400);
  });

  it("refuse une ressource inconnue", async () => {
    const { dependencies } = buildDependencies();
    const response = await handleResourceSubscription({ ...VALID_BODY, resourceSlug: "inconnue" }, dependencies);
    expect(response.body).toEqual({ success: false, error: "Cette ressource n'existe pas." });
  });

  it("refuse un domaine qui ne reçoit pas d'e-mails", async () => {
    const { dependencies, saveContact } = buildDependencies({ checkMailDomain: async () => "no-mail" });
    const response = await handleResourceSubscription({ ...VALID_BODY, email: "awa@domaine-invente.com" }, dependencies);
    expect(response.body).toEqual({ success: false, error: "Ce domaine ne reçoit pas d'e-mails. Vérifie l'adresse." });
    expect(saveContact).not.toHaveBeenCalled();
  });

  it("accepte quand le DNS ne sait pas répondre", async () => {
    const { dependencies, saveContact } = buildDependencies({ checkMailDomain: async () => "unknown" });
    expect((await handleResourceSubscription(VALID_BODY, dependencies)).status).toBe(200);
    expect(saveContact).toHaveBeenCalled();
  });

  it("répond comme un succès à un robot qui remplit le champ piège, sans rien enregistrer", async () => {
    const { dependencies, saveContact } = buildDependencies();
    const response = await handleResourceSubscription({ ...VALID_BODY, website: "https://spam.example" }, dependencies);
    expect(response.status).toBe(200);
    expect(saveContact).not.toHaveBeenCalled();
  });

  it("rapporte l'échec de Resend et répond par un message générique", async () => {
    const { dependencies } = buildDependencies({
      contactStore: { saveContact: async () => Promise.reject(new ContactStoreError("status 500")) },
    });
    const response = await handleResourceSubscription(VALID_BODY, dependencies);
    expect(response).toEqual({ status: 502, body: { success: false, error: "L'inscription n'a pas abouti. Réessaie dans un instant." } });
    expect(dependencies.reportError).toHaveBeenCalledWith("enregistrement du contact impossible", expect.any(ContactStoreError));
  });
});
