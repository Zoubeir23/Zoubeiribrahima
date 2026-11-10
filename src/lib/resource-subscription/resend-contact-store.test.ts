import { describe, expect, it, vi } from "vitest";
import { ContactStoreError, createResendContactStore } from "./resend-contact-store";

const CONTACT = { email: "awa@gmail.com", firstName: "Awa" };

function respond(status: number): Response {
  return new Response("{}", { status });
}

// Answers a lookup (GET) and a creation (POST) with the given statuses.
function stubResend(lookupStatus: number, creationStatus = 200) {
  return vi.fn(async (_url: string, init?: RequestInit) => respond(init?.method === "GET" ? lookupStatus : creationStatus));
}

function callsOf(fetchImplementation: ReturnType<typeof stubResend>) {
  return fetchImplementation.mock.calls.map(([url, init]) => `${init?.method} ${url}`);
}

describe("createResendContactStore", () => {
  it("ne renvoie rien à Resend pour un contact déjà présent : il lit seulement la liste", async () => {
    const fetchImplementation = stubResend(200);
    await expect(
      createResendContactStore("cle", fetchImplementation as unknown as typeof fetch).saveContact(CONTACT),
    ).resolves.toBeUndefined();
    expect(callsOf(fetchImplementation)).toEqual(["GET https://api.resend.com/contacts/awa%40gmail.com"]);
  });

  it("crée le contact absent avec la clé, le prénom et l'en-tête User-Agent exigé par Resend", async () => {
    const fetchImplementation = stubResend(404);
    await createResendContactStore("cle-de-test", fetchImplementation as unknown as typeof fetch).saveContact(CONTACT);

    expect(callsOf(fetchImplementation)).toEqual([
      "GET https://api.resend.com/contacts/awa%40gmail.com",
      "POST https://api.resend.com/contacts",
    ]);
    const [, init] = fetchImplementation.mock.calls[1] as unknown as [string, RequestInit];
    expect(JSON.parse(String(init.body))).toEqual({ email: "awa@gmail.com", first_name: "Awa", unsubscribed: false });
    expect(init.headers).toMatchObject({ Authorization: "Bearer cle-de-test", "User-Agent": "zoubeir-portfolio/1.0" });
  });

  it("crée quand même le contact si la clé ne permet pas de lire la liste", async () => {
    const fetchImplementation = stubResend(403);
    await createResendContactStore("cle", fetchImplementation as unknown as typeof fetch).saveContact(CONTACT);
    expect(callsOf(fetchImplementation)).toEqual([
      "GET https://api.resend.com/contacts/awa%40gmail.com",
      "POST https://api.resend.com/contacts",
    ]);
  });

  it("signale un refus de Resend sans divulguer la clé", async () => {
    const fetchImplementation = stubResend(404, 401);
    const saving = createResendContactStore("cle-secrete", fetchImplementation as unknown as typeof fetch).saveContact(CONTACT);
    await expect(saving).rejects.toThrow(ContactStoreError);
    await expect(saving).rejects.not.toThrow(/cle-secrete/);
  });
});
