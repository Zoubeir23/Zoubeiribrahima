// Saves a subscriber as a contact in Resend (https://resend.com/docs/api-reference/contacts/create-contact).
// No email is sent: Resend only keeps the list. The API key stays on the server.

const RESEND_API_ORIGIN = "https://api.resend.com";
const REQUEST_TIMEOUT_IN_MILLISECONDS = 5000;
// Resend rejects requests without a User-Agent header (403).
const USER_AGENT = "zoubeir-portfolio/1.0";

export interface ContactToSave {
  email: string;
  firstName: string;
}

export interface ContactStore {
  saveContact(contact: ContactToSave): Promise<void>;
}

export class ContactStoreError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContactStoreError";
  }
}

export function createResendContactStore(apiKey: string, fetchImplementation: typeof fetch = fetch): ContactStore {
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    "User-Agent": USER_AGENT,
  };

  const request = (path: string, init: RequestInit): Promise<Response> =>
    fetchImplementation(`${RESEND_API_ORIGIN}${path}`, {
      ...init,
      headers,
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_IN_MILLISECONDS),
    });

  return {
    async saveContact({ email, firstName }) {
      const created = await request("/contacts", {
        method: "POST",
        body: JSON.stringify({ email, first_name: firstName, unsubscribed: false }),
      });
      if (created.ok) return;

      // The documentation does not describe the answer for an existing contact: a contact that can be read
      // back is already on the list, which is the goal. Any other failure is reported.
      const existing = await request(`/contacts/${encodeURIComponent(email)}`, { method: "GET" });
      if (existing.ok) return;

      throw new ContactStoreError(`Resend refused the contact (status ${created.status})`);
    },
  };
}
