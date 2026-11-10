import { describe, expect, it } from "vitest";
import {
  MAXIMUM_FIRST_NAME_LENGTH,
  findEmailDomainCorrection,
  isDisposableEmailDomain,
  readEmailDomain,
  subscriberSchema,
} from "./subscriber-validation";

const VALID_INPUT = { firstName: "Awa", email: "awa.diop@gmail.com", resourceSlug: "claude-seo-audit-de-site" };

describe("subscriberSchema", () => {
  it("accepte un prénom et un e-mail valides, e-mail ramené en minuscules", () => {
    expect(subscriberSchema.parse({ ...VALID_INPUT, firstName: "  Awa ", email: " Awa.Diop@Gmail.com " })).toEqual(VALID_INPUT);
  });

  it.each(["Jean-Pierre", "N'Diaye", "Mame Diarra", "Éloïse"])("accepte le prénom « %s »", (firstName) => {
    expect(subscriberSchema.safeParse({ ...VALID_INPUT, firstName }).success).toBe(true);
  });

  it.each(["", "   ", "123", "<script>", "a@b", "-Awa"])("refuse le prénom « %s »", (firstName) => {
    expect(subscriberSchema.safeParse({ ...VALID_INPUT, firstName }).success).toBe(false);
  });

  it("refuse un prénom trop long", () => {
    const firstName = "a".repeat(MAXIMUM_FIRST_NAME_LENGTH + 1);
    expect(subscriberSchema.safeParse({ ...VALID_INPUT, firstName }).success).toBe(false);
  });

  it.each(["", "awa", "awa@", "@gmail.com", "awa@gmail", "awa diop@gmail.com", "awa@gmail..com"])(
    "refuse l'e-mail « %s » avec un message clair",
    (email) => {
      const result = subscriberSchema.safeParse({ ...VALID_INPUT, email });
      expect(result.success).toBe(false);
      expect(result.error?.issues[0]?.message).toBe("Cette adresse e-mail n'est pas valide.");
    },
  );

  it("refuse une adresse jetable", () => {
    const result = subscriberSchema.safeParse({ ...VALID_INPUT, email: "test@yopmail.com" });
    expect(result.error?.issues[0]?.message).toBe("Les adresses e-mail temporaires ne sont pas acceptées. Utilise ton adresse habituelle.");
  });

  it("propose la bonne orthographe d'un domaine mal tapé", () => {
    const result = subscriberSchema.safeParse({ ...VALID_INPUT, email: "awa@gmial.com" });
    expect(result.error?.issues[0]?.message).toBe("Tu voulais sans doute écrire awa@gmail.com ?");
  });

  it("refuse un identifiant de ressource mal formé", () => {
    expect(subscriberSchema.safeParse({ ...VALID_INPUT, resourceSlug: "../admin" }).success).toBe(false);
  });
});

describe("domaines d'e-mail", () => {
  it("lit le domaine", () => {
    expect(readEmailDomain("awa@Gmail.com")).toBe("gmail.com");
  });

  it("reconnaît un sous-domaine d'un service jetable", () => {
    expect(isDisposableEmailDomain("mail.mailinator.com")).toBe(true);
    expect(isDisposableEmailDomain("gmail.com")).toBe(false);
  });

  it("ne corrige pas un domaine correct", () => {
    expect(findEmailDomainCorrection("gmail.com")).toBeNull();
    expect(findEmailDomainCorrection("hotmial.fr")).toBe("hotmail.fr");
  });
});
