import { describe, expect, it, vi } from "vitest";
import { ContactStoreError, createResendContactStore } from "./resend-contact-store";

const CONTACT = { email: "awa@gmail.com", firstName: "Awa" };

function respond(status: number): Response {
  return new Response("{}", { status });
}

describe("createResendContactStore", () => {
  it("crée le contact avec la clé, le prénom et l'en-tête User-Agent exigé par Resend", async () => {
    const fetchImplementation = vi.fn(async () => respond(200));
    await createResendContactStore("cle-de-test", fetchImplementation).saveContact(CONTACT);

    const [url, init] = fetchImplementation.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://api.resend.com/contacts");
    expect(init.method).toBe("POST");
    expect(JSON.parse(String(init.body))).toEqual({ email: "awa@gmail.com", first_name: "Awa", unsubscribed: false });
    expect(init.headers).toMatchObject({ Authorization: "Bearer cle-de-test", "User-Agent": "zoubeir-portfolio/1.0" });
  });

  it("considère un contact déjà présent comme enregistré", async () => {
    const fetchImplementation = vi.fn(async (url: string) => respond(String(url).endsWith("/contacts") ? 409 : 200));
    await expect(createResendContactStore("cle", fetchImplementation as unknown as typeof fetch).saveContact(CONTACT)).resolves.toBeUndefined();
    expect(fetchImplementation.mock.calls[1]?.[0]).toBe("https://api.resend.com/contacts/awa%40gmail.com");
  });

  it("signale un refus de Resend sans divulguer la clé", async () => {
    const fetchImplementation = vi.fn(async () => respond(401));
    const saving = createResendContactStore("cle-secrete", fetchImplementation).saveContact(CONTACT);
    await expect(saving).rejects.toThrow(ContactStoreError);
    await expect(saving).rejects.not.toThrow(/cle-secrete/);
  });
});
