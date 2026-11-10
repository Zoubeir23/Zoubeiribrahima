import { z } from "zod";

// Validation of the resource access form, shared by the browser (immediate feedback) and the serverless
// function api/resources/subscribe.ts (the real check). Relative imports only: the function bundler does
// not resolve the "@/" alias.

export const MAXIMUM_FIRST_NAME_LENGTH = 60;
const MAXIMUM_EMAIL_LENGTH = 254;

export const SUBSCRIBER_MESSAGES = {
  invalidFirstName: "Indique ton prénom, en lettres.",
  invalidEmail: "Cette adresse e-mail n'est pas valide.",
  disposableEmail: "Les adresses e-mail temporaires ne sont pas acceptées. Utilise ton adresse habituelle.",
  unknownEmailDomain: "Ce domaine ne reçoit pas d'e-mails. Vérifie l'adresse.",
  unknownResource: "Cette ressource n'existe pas.",
  unexpected: "L'inscription n'a pas abouti. Réessaie dans un instant.",
} as const;

// Temporary inbox services. Not exhaustive: the domain check on the server stops invented domains.
const DISPOSABLE_EMAIL_DOMAINS: ReadonlySet<string> = new Set([
  "10minutemail.com",
  "burnermail.io",
  "discard.email",
  "dispostable.com",
  "emailondeck.com",
  "fakeinbox.com",
  "getnada.com",
  "guerrillamail.com",
  "guerrillamail.net",
  "jetable.org",
  "mailinator.com",
  "maildrop.cc",
  "mailnesia.com",
  "mintemail.com",
  "mohmal.com",
  "mytemp.email",
  "sharklasers.com",
  "spamgourmet.com",
  "temp-mail.org",
  "tempail.com",
  "tempmail.com",
  "tempr.email",
  "throwawaymail.com",
  "trashmail.com",
  "yopmail.com",
  "yopmail.fr",
  "yopmail.net",
]);

// Frequent typos of the most used mailbox domains.
const EMAIL_DOMAIN_CORRECTIONS: Readonly<Record<string, string>> = {
  "gmial.com": "gmail.com",
  "gamil.com": "gmail.com",
  "gmai.com": "gmail.com",
  "gmail.co": "gmail.com",
  "gmail.con": "gmail.com",
  "gnail.com": "gmail.com",
  "hotmial.com": "hotmail.com",
  "hotmial.fr": "hotmail.fr",
  "hotmal.com": "hotmail.com",
  "outlok.com": "outlook.com",
  "outlook.co": "outlook.com",
  "yahooo.com": "yahoo.com",
  "yahooo.fr": "yahoo.fr",
  "yaho.fr": "yahoo.fr",
  "icloud.co": "icloud.com",
};

export function readEmailDomain(email: string): string {
  return email.slice(email.lastIndexOf("@") + 1).toLowerCase();
}

export function isDisposableEmailDomain(domain: string): boolean {
  return [...DISPOSABLE_EMAIL_DOMAINS].some((disposable) => domain === disposable || domain.endsWith(`.${disposable}`));
}

export function findEmailDomainCorrection(domain: string): string | null {
  return EMAIL_DOMAIN_CORRECTIONS[domain] ?? null;
}

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .max(MAXIMUM_EMAIL_LENGTH, SUBSCRIBER_MESSAGES.invalidEmail)
  .email(SUBSCRIBER_MESSAGES.invalidEmail)
  .superRefine((email, context) => {
    const domain = readEmailDomain(email);
    const correction = findEmailDomainCorrection(domain);
    if (correction) {
      context.addIssue({ code: z.ZodIssueCode.custom, message: `Tu voulais sans doute écrire ${email.slice(0, email.lastIndexOf("@"))}@${correction} ?` });
    } else if (isDisposableEmailDomain(domain)) {
      context.addIssue({ code: z.ZodIssueCode.custom, message: SUBSCRIBER_MESSAGES.disposableEmail });
    }
  });

export const subscriberSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, SUBSCRIBER_MESSAGES.invalidFirstName)
    .max(MAXIMUM_FIRST_NAME_LENGTH, SUBSCRIBER_MESSAGES.invalidFirstName)
    .regex(/^\p{L}[\p{L}\p{M}' -]*$/u, SUBSCRIBER_MESSAGES.invalidFirstName),
  email: emailSchema,
  resourceSlug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, SUBSCRIBER_MESSAGES.unknownResource),
});

export type Subscriber = z.infer<typeof subscriberSchema>;
