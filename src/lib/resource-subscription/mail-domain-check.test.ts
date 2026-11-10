import { describe, expect, it, vi } from "vitest";
import { checkMailDomain } from "./mail-domain-check";

function dnsError(code: string): Error & { code: string } {
  return Object.assign(new Error(code), { code });
}

describe("checkMailDomain", () => {
  it("accepte un domaine qui publie un serveur de messagerie", async () => {
    await expect(checkMailDomain("gmail.com", async () => [{ exchange: "gmail-smtp-in.l.google.com" }])).resolves.toBe("accepts-mail");
  });

  it.each(["ENOTFOUND", "ENODATA"])("refuse un domaine inexistant ou sans messagerie (%s)", async (code) => {
    await expect(checkMailDomain("faux-domaine.zz", async () => Promise.reject(dnsError(code)))).resolves.toBe("no-mail");
  });

  it("refuse un domaine qui déclare n'accepter aucun e-mail (MX nul)", async () => {
    await expect(checkMailDomain("example.com", async () => [{ exchange: "." }])).resolves.toBe("no-mail");
  });

  it("ne bloque pas quand le DNS échoue pour une autre raison", async () => {
    await expect(checkMailDomain("gmail.com", async () => Promise.reject(dnsError("ESERVFAIL")))).resolves.toBe("unknown");
  });

  it("ne bloque pas quand le DNS met trop de temps", async () => {
    vi.useFakeTimers();
    const pending = checkMailDomain("lent.com", () => new Promise(() => undefined));
    await vi.advanceTimersByTimeAsync(3000);
    await expect(pending).resolves.toBe("unknown");
    vi.useRealTimers();
  });
});
