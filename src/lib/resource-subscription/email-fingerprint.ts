// Fingerprint of an email: its SHA-256 in hexadecimal. The database that remembers which emails were already sent
// to Resend keeps only this value, never the address. It is a plain hash, not a keyed one: the table holds nothing
// that is not already in the Resend list, and a lost or emptied table only costs a lookup in Resend.

export async function fingerprintEmail(email: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(email));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
