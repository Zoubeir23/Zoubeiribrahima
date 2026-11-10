import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { fingerprintEmail } from "./email-fingerprint";

describe("empreinte d'un e-mail", () => {
  it("est le SHA-256 en hexadécimal de l'adresse, sans jamais la contenir", async () => {
    const fingerprint = await fingerprintEmail("awa@gmail.com");
    expect(fingerprint).toBe(createHash("sha256").update("awa@gmail.com").digest("hex"));
    expect(fingerprint).toMatch(/^[0-9a-f]{64}$/);
    expect(fingerprint).not.toContain("awa");
  });

  it("donne une empreinte différente pour une autre adresse", async () => {
    expect(await fingerprintEmail("awa@gmail.com")).not.toBe(await fingerprintEmail("moussa@gmail.com"));
  });
});
