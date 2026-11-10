import { resolveMx } from "node:dns/promises";
import { listResourceGuideSlugs } from "../../src/data/resourceGuides.js";
import { checkMailDomain } from "../../src/lib/resource-subscription/mail-domain-check.js";
import { createResendContactStore } from "../../src/lib/resource-subscription/resend-contact-store.js";
import { SUBSCRIBER_MESSAGES } from "../../src/lib/resource-subscription/subscriber-validation.js";
import { handleResourceSubscription } from "../../src/lib/resource-subscription/subscribe-handler.js";

// POST /api/resources/subscribe: first name and email in exchange for the resource library.
// RESEND_API_KEY lives in .env.local and in the Vercel project settings, never in the browser.

const MAXIMUM_BODY_LENGTH_IN_BYTES = 2048;

function jsonResponse(status: number, body: unknown): Response {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function reportError(description: string, error: unknown): void {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[ressources] ${description} : ${message}`);
}

async function readJsonBody(request: Request): Promise<unknown> {
  const text = await request.text();
  if (text.length > MAXIMUM_BODY_LENGTH_IN_BYTES) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== "POST") {
      return jsonResponse(405, { success: false, error: "Méthode non autorisée." });
    }
    if (!(request.headers.get("content-type") ?? "").includes("application/json")) {
      return jsonResponse(415, { success: false, error: SUBSCRIBER_MESSAGES.unexpected });
    }
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      reportError("configuration incomplète", new Error("RESEND_API_KEY is missing"));
      return jsonResponse(500, { success: false, error: SUBSCRIBER_MESSAGES.unexpected });
    }

    const response = await handleResourceSubscription(await readJsonBody(request), {
      knownResourceSlugs: listResourceGuideSlugs(),
      checkMailDomain: (domain) => checkMailDomain(domain, resolveMx),
      contactStore: createResendContactStore(apiKey),
      reportError,
    });
    return jsonResponse(response.status, response.body);
  },
};
