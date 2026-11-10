import { createHash } from "node:crypto";
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

  describe("e-mails déjà enregistrés", () => {
    const EXPECTED_FINGERPRINT = createHash("sha256").update("awa@gmail.com").digest("hex");

    function buildStore(isRegistered: boolean) {
      return { has: vi.fn(async () => isRegistered), add: vi.fn(async () => undefined) };
    }

    it("répond ok sans rien demander à Resend quand l'e-mail est déjà enregistré", async () => {
      const registeredEmails = buildStore(true);
      const { dependencies, saveContact } = buildDependencies({ registeredEmails });
      const response = await handleResourceSubscription(VALID_BODY, dependencies);
      expect(response).toEqual({ status: 200, body: { success: true, error: null } });
      expect(registeredEmails.has).toHaveBeenCalledWith(EXPECTED_FINGERPRINT);
      expect(saveContact).not.toHaveBeenCalled();
      expect(registeredEmails.add).not.toHaveBeenCalled();
    });

    it("enregistre l'e-mail inconnu dans Resend, puis retient son empreinte", async () => {
      const registeredEmails = buildStore(false);
      const { dependencies, saveContact } = buildDependencies({ registeredEmails });
      expect((await handleResourceSubscription(VALID_BODY, dependencies)).status).toBe(200);
      expect(saveContact).toHaveBeenCalledWith({ email: "awa@gmail.com", firstName: "Awa" });
      expect(registeredEmails.add).toHaveBeenCalledWith(EXPECTED_FINGERPRINT);
    });

    it("ne retient pas l'empreinte quand Resend refuse le contact", async () => {
      const registeredEmails = buildStore(false);
      const { dependencies } = buildDependencies({
        registeredEmails,
        contactStore: {
          saveContact: async () => {
            throw new ContactStoreError("refusé");
          },
        },
      });
      expect((await handleResourceSubscription(VALID_BODY, dependencies)).status).toBe(502);
      expect(registeredEmails.add).not.toHaveBeenCalled();
    });

    it("réussit quand la base des e-mails enregistrés échoue : Resend reste la référence", async () => {
      const registeredEmails = {
        has: vi.fn(async () => {
          throw new Error("base indisponible");
        }),
        add: vi.fn(async () => {
          throw new Error("base indisponible");
        }),
      };
      const { dependencies, saveContact } = buildDependencies({ registeredEmails });
      expect((await handleResourceSubscription(VALID_BODY, dependencies)).status).toBe(200);
      expect(saveContact).toHaveBeenCalledTimes(1);
      expect(dependencies.reportError).toHaveBeenCalledTimes(2);
    });

    it("ne consulte pas la base pour une saisie invalide, un domaine sans e-mail ou un robot", async () => {
      const registeredEmails = buildStore(false);
      const { dependencies } = buildDependencies({ registeredEmails, checkMailDomain: async () => "no-mail" });
      await handleResourceSubscription({ ...VALID_BODY, email: "pas-un-email" }, dependencies);
      await handleResourceSubscription(VALID_BODY, dependencies);
      await handleResourceSubscription({ ...VALID_BODY, website: "http://spam.example" }, dependencies);
      expect(registeredEmails.has).not.toHaveBeenCalled();
    });

    it("fonctionne comme avant quand aucune base n'est configurée", async () => {
      const { dependencies, saveContact } = buildDependencies();
      expect((await handleResourceSubscription(VALID_BODY, dependencies)).status).toBe(200);
      expect(saveContact).toHaveBeenCalledTimes(1);
    });
  });
});
