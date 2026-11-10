import { describe, expect, it } from "vitest";
import { TimeoutError, withTimeout } from "./with-timeout";

describe("withTimeout", () => {
  it("rend la valeur d'une opération assez rapide", async () => {
    await expect(withTimeout(Promise.resolve("ok"), 50)).resolves.toBe("ok");
  });

  it("laisse passer l'erreur d'une opération qui échoue", async () => {
    await expect(withTimeout(Promise.reject(new Error("refusé")), 50)).rejects.toThrow("refusé");
  });

  it("échoue avec une TimeoutError quand l'opération ne répond pas à temps", async () => {
    await expect(withTimeout(new Promise<never>(() => undefined), 20)).rejects.toBeInstanceOf(TimeoutError);
  });
});
