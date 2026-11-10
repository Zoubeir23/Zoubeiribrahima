import { fingerprintEmail } from "./email-fingerprint.js";
import type { MailDomainStatus } from "./mail-domain-check.js";
import type { RegisteredEmailStore } from "./registered-email-store.js";
import type { ContactStore } from "./resend-contact-store.js";
import { SUBSCRIBER_MESSAGES, readEmailDomain, subscriberSchema } from "./subscriber-validation.js";

// Handles one access request to the resource library: validates the first name and email, checks that the
// domain receives mail, then saves the contact. The browser shows the resource only after a success.

export interface SubscriptionResponse {
  status: number;
  body: { success: true; error: null } | { success: false; error: string };
}

export interface SubscriptionDependencies {
  knownResourceSlugs: ReadonlySet<string>;
  checkMailDomain: (domain: string) => Promise<MailDomainStatus>;
  contactStore: ContactStore;
  /** Optional shortcut that remembers emails already sent to Resend. Without it, Resend alone decides. */
  registeredEmails?: RegisteredEmailStore;
  reportError: (description: string, error: unknown) => void;
}

// Hidden form field that people never fill: a value means an automated submission.
export const TRAP_FIELD_NAME = "website";

const succeed = (): SubscriptionResponse => ({ status: 200, body: { success: true, error: null } });
const fail = (status: number, error: string): SubscriptionResponse => ({ status, body: { success: false, error } });

function isFilledTrapField(rawBody: unknown): boolean {
  if (typeof rawBody !== "object" || rawBody === null || !(TRAP_FIELD_NAME in rawBody)) return false;
  const value = (rawBody as Record<string, unknown>)[TRAP_FIELD_NAME];
  return typeof value === "string" && value.trim() !== "";
}

// The shortcut database only saves a lookup: its failures are reported and never change the visitor's answer.
async function isAlreadyRegistered(dependencies: SubscriptionDependencies, emailFingerprint: string | null): Promise<boolean> {
  if (!dependencies.registeredEmails || emailFingerprint === null) return false;
  try {
    return await dependencies.registeredEmails.has(emailFingerprint);
  } catch (error: unknown) {
    dependencies.reportError("lecture des e-mails déjà enregistrés impossible", error);
    return false;
  }
}

async function rememberRegistered(dependencies: SubscriptionDependencies, emailFingerprint: string | null): Promise<void> {
  if (!dependencies.registeredEmails || emailFingerprint === null) return;
  try {
    await dependencies.registeredEmails.add(emailFingerprint);
  } catch (error: unknown) {
    dependencies.reportError("écriture des e-mails déjà enregistrés impossible", error);
  }
}

export async function handleResourceSubscription(
  rawBody: unknown,
  dependencies: SubscriptionDependencies,
): Promise<SubscriptionResponse> {
  // A robot gets the same answer as a person, so it learns nothing, but nothing is saved.
  if (isFilledTrapField(rawBody)) return succeed();

  const parsed = subscriberSchema.safeParse(rawBody);
  if (!parsed.success) {
    return fail(400, parsed.error.issues[0]?.message ?? SUBSCRIBER_MESSAGES.unexpected);
  }
  const { firstName, email, resourceSlug } = parsed.data;
  if (!dependencies.knownResourceSlugs.has(resourceSlug)) {
    return fail(400, SUBSCRIBER_MESSAGES.unknownResource);
  }

  if ((await dependencies.checkMailDomain(readEmailDomain(email))) === "no-mail") {
    return fail(400, SUBSCRIBER_MESSAGES.unknownEmailDomain);
  }

  const emailFingerprint = dependencies.registeredEmails ? await fingerprintEmail(email) : null;
  if (await isAlreadyRegistered(dependencies, emailFingerprint)) return succeed();

  try {
    await dependencies.contactStore.saveContact({ email, firstName });
  } catch (error: unknown) {
    dependencies.reportError("enregistrement du contact impossible", error);
    return fail(502, SUBSCRIBER_MESSAGES.unexpected);
  }
  await rememberRegistered(dependencies, emailFingerprint);
  return succeed();
}
