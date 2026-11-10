import { SUBSCRIBER_MESSAGES } from "./subscriber-validation";

// Sends the access form to the serverless function. A network failure becomes a clear message, never an exception.

export const RESOURCE_SUBSCRIPTION_ENDPOINT = "/api/resources/subscribe";

export interface ResourceSubscriptionInput {
  firstName: string;
  email: string;
  resourceSlug: string;
  website: string;
}

export type ResourceSubscriptionResult = { success: true } | { success: false; error: string };

const readError = (body: unknown): string | null =>
  typeof body === "object" && body !== null && "error" in body && typeof body.error === "string" ? body.error : null;

export async function submitResourceSubscription(
  input: ResourceSubscriptionInput,
  fetchImplementation: typeof fetch = fetch,
): Promise<ResourceSubscriptionResult> {
  try {
    const response = await fetchImplementation(RESOURCE_SUBSCRIPTION_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (response.ok) return { success: true };
    const body: unknown = await response.json().catch(() => null);
    return { success: false, error: readError(body) ?? SUBSCRIBER_MESSAGES.unexpected };
  } catch {
    return { success: false, error: SUBSCRIBER_MESSAGES.unexpected };
  }
}
