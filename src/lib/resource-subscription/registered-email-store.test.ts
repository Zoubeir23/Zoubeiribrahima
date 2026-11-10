import { describe, expect, it, vi } from "vitest";
import {
  createNeonRegisteredEmailStore,
  guardRegisteredEmailStore,
  type RegisteredEmailStore,
  type SqlQuery,
} from "./registered-email-store";

const FINGERPRINT = "a".repeat(64);

// A stand-in for the Neon driver: records each statement and answers the lookup with the given rows.
function createFakeSql(lookupRows: unknown[] = []) {
  const statements: string[] = [];
  const sql: SqlQuery = vi.fn(async (strings: TemplateStringsArray) => {
    const statement = strings.join("?").replace(/\s+/g, " ").trim();
    statements.push(statement);
    return statement.startsWith("SELECT") ? lookupRows : [];
  });
  return { sql, statements };
}

describe("createNeonRegisteredEmailStore", () => {
  it("crée la table une seule fois, avant la première lecture", async () => {
    const { sql, statements } = createFakeSql();
    const store = createNeonRegisteredEmailStore(sql);
    await store.has(FINGERPRINT);
    await store.has(FINGERPRINT);
    expect(statements.filter((statement) => statement.startsWith("CREATE TABLE IF NOT EXISTS"))).toHaveLength(1);
    expect(statements[0]).toContain("registered_resource_emails");
  });

  it("répond oui quand l'empreinte est dans la table, non sinon", async () => {
    expect(await createNeonRegisteredEmailStore(createFakeSql([{ one: 1 }]).sql).has(FINGERPRINT)).toBe(true);
    expect(await createNeonRegisteredEmailStore(createFakeSql([]).sql).has(FINGERPRINT)).toBe(false);
  });

  it("ajoute l'empreinte sans erreur si elle existe déjà", async () => {
    const { sql, statements } = createFakeSql();
    await createNeonRegisteredEmailStore(sql).add(FINGERPRINT);
    expect(statements.some((statement) => statement.startsWith("INSERT") && statement.includes("ON CONFLICT DO NOTHING"))).toBe(true);
  });

  it("repasse par la création de la table après un échec", async () => {
    let shouldFail = true;
    const statements: string[] = [];
    const sql: SqlQuery = async (strings) => {
      const statement = strings.join("?").trim();
      statements.push(statement);
      if (shouldFail && statement.startsWith("CREATE")) throw new Error("base en veille");
      return [];
    };
    const store = createNeonRegisteredEmailStore(sql);
    await expect(store.has(FINGERPRINT)).rejects.toThrow("base en veille");
    shouldFail = false;
    await expect(store.has(FINGERPRINT)).resolves.toBe(false);
    expect(statements.filter((statement) => statement.startsWith("CREATE"))).toHaveLength(2);
  });
});

describe("guardRegisteredEmailStore", () => {
  const silent = () => undefined;

  it("transmet la réponse d'une base qui fonctionne", async () => {
    const store: RegisteredEmailStore = { has: async () => true, add: vi.fn(async () => undefined) };
    const guarded = guardRegisteredEmailStore(store, silent, 50);
    expect(await guarded.has(FINGERPRINT)).toBe(true);
    await guarded.add(FINGERPRINT);
    expect(store.add).toHaveBeenCalledWith(FINGERPRINT);
  });

  it("réessaie une fois, puis répond « inconnu » quand la base échoue, sans lever d'erreur", async () => {
    const has = vi.fn(async () => {
      throw new Error("indisponible");
    });
    const reportError = vi.fn();
    const guarded = guardRegisteredEmailStore({ has, add: async () => undefined }, reportError, 50);
    await expect(guarded.has(FINGERPRINT)).resolves.toBe(false);
    expect(has).toHaveBeenCalledTimes(2);
    expect(reportError).toHaveBeenCalledTimes(1);
  });

  it("réussit au second essai quand la base se réveille", async () => {
    const has = vi.fn().mockRejectedValueOnce(new Error("réveil en cours")).mockResolvedValueOnce(true);
    const guarded = guardRegisteredEmailStore({ has, add: async () => undefined }, silent, 50);
    await expect(guarded.has(FINGERPRINT)).resolves.toBe(true);
  });

  it("répond « inconnu » quand la base ne répond pas à temps", async () => {
    const never = () => new Promise<never>(() => undefined);
    const guarded = guardRegisteredEmailStore({ has: never, add: never }, silent, 20);
    await expect(guarded.has(FINGERPRINT)).resolves.toBe(false);
    await expect(guarded.add(FINGERPRINT)).resolves.toBeUndefined();
  });
});
