import { describe, expect, it } from "vitest";
import { buildIdentityRows, type IdentityLabels } from "@/lib/about-identity";

const labels: IdentityLabels = {
  tradeName: "Nom",
  location: "Localisation",
  status: "Statut",
  legalStatus: "Forme juridique",
  registrationNumber: "NINEA",
  email: "Email",
  phone: "Téléphone",
};

const baseInput = {
  labels,
  tradeName: "Zoubeir Ibrahima",
  location: "Dakar, Sénégal",
  status: "Développeur freelance",
  email: "contact@example.com",
  phoneDisplay: "+221 78 594 10 71",
  legalStatus: "",
  registrationNumber: "",
};

describe("buildIdentityRows", () => {
  it("lists the always-known facts in a stable order", () => {
    const rows = buildIdentityRows(baseInput);
    expect(rows.map((row) => row.label)).toEqual(["Nom", "Localisation", "Statut", "Email", "Téléphone"]);
  });

  it("hides the legal status and the registration number while they are empty", () => {
    const labelsInRows = buildIdentityRows(baseInput).map((row) => row.label);
    expect(labelsInRows).not.toContain("Forme juridique");
    expect(labelsInRows).not.toContain("NINEA");
  });

  it("shows them once they are filled in, after the status", () => {
    const rows = buildIdentityRows({ ...baseInput, legalStatus: "Entreprise individuelle", registrationNumber: "0123456789" });
    expect(rows.map((row) => row.label)).toEqual([
      "Nom",
      "Localisation",
      "Statut",
      "Forme juridique",
      "NINEA",
      "Email",
      "Téléphone",
    ]);
    expect(rows.find((row) => row.label === "NINEA")?.value).toBe("0123456789");
  });

  it("ignores values that only contain spaces", () => {
    const rows = buildIdentityRows({ ...baseInput, legalStatus: "   " });
    expect(rows.map((row) => row.label)).not.toContain("Forme juridique");
  });
});
