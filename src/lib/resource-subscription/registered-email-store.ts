import { withTimeout } from "./with-timeout.js";

// Remembers which emails were already sent to Resend, so the same person typing the same email for another guide
// (from any device) is not sent again. It is a shortcut, never the source of truth: Resend keeps the list. When the
// database is asleep, slow or down, the guarded store answers "unknown" and the contact store checks Resend instead.

export const REGISTERED_EMAIL_TIMEOUT_IN_MILLISECONDS = 4000;
const ATTEMPTS = 2;

export interface RegisteredEmailStore {
  has(emailFingerprint: string): Promise<boolean>;
  add(emailFingerprint: string): Promise<void>;
}

// The shape of the Neon driver: a tagged template that runs one statement and returns its rows.
export type SqlQuery = (strings: TemplateStringsArray, ...values: unknown[]) => Promise<unknown[]>;

export function createNeonRegisteredEmailStore(sql: SqlQuery): RegisteredEmailStore {
  // The table is created on first use, on every database (production and each preview branch).
  let tableReady: Promise<unknown> | null = null;
  const ensureTable = (): Promise<unknown> => {
    tableReady ??= sql`CREATE TABLE IF NOT EXISTS registered_resource_emails (
      email_fingerprint text PRIMARY KEY,
      registered_at timestamptz NOT NULL DEFAULT now()
    )`.catch((error: unknown) => {
      tableReady = null;
      throw error;
    });
    return tableReady;
  };

  return {
    async has(emailFingerprint) {
      await ensureTable();
      const rows = await sql`SELECT 1 FROM registered_resource_emails WHERE email_fingerprint = ${emailFingerprint} LIMIT 1`;
      return rows.length > 0;
    },
    async add(emailFingerprint) {
      await ensureTable();
      await sql`INSERT INTO registered_resource_emails (email_fingerprint) VALUES (${emailFingerprint}) ON CONFLICT DO NOTHING`;
    },
  };
}

// Never throws: one retry covers a database that is still waking up, then the failure is reported and ignored.
export function guardRegisteredEmailStore(
  store: RegisteredEmailStore,
  reportError: (description: string, error: unknown) => void,
  timeoutInMilliseconds: number = REGISTERED_EMAIL_TIMEOUT_IN_MILLISECONDS,
): RegisteredEmailStore {
  const attempt = async <Value>(description: string, operation: () => Promise<Value>): Promise<Value | null> => {
    for (let attemptNumber = 1; attemptNumber <= ATTEMPTS; attemptNumber += 1) {
      try {
        return await withTimeout(operation(), timeoutInMilliseconds);
      } catch (error: unknown) {
        if (attemptNumber === ATTEMPTS) reportError(description, error);
      }
    }
    return null;
  };

  return {
    async has(emailFingerprint) {
      return (await attempt("lecture de la base des e-mails enregistrés", () => store.has(emailFingerprint))) === true;
    },
    async add(emailFingerprint) {
      await attempt("écriture dans la base des e-mails enregistrés", () => store.add(emailFingerprint));
    },
  };
}
