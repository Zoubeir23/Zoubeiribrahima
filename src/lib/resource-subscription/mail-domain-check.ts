// Checks that an email domain can receive mail (it publishes MX records). An invented domain fails here even
// when its spelling is valid. A slow or failing DNS server does not block a visitor: the answer is "unknown".

export type MailDomainStatus = "accepts-mail" | "no-mail" | "unknown";

export type ResolveMailExchangers = (domain: string) => Promise<readonly { exchange: string }[]>;

const DNS_TIMEOUT_IN_MILLISECONDS = 3000;
// Node DNS error codes that mean the domain does not exist or publishes no mail server.
const MISSING_DOMAIN_ERROR_CODES: ReadonlySet<string> = new Set(["ENOTFOUND", "ENODATA", "ENONAME"]);

function readErrorCode(error: unknown): string | null {
  return typeof error === "object" && error !== null && "code" in error ? String(error.code) : null;
}

export async function checkMailDomain(domain: string, resolveMailExchangers: ResolveMailExchangers): Promise<MailDomainStatus> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<"timeout">((resolve) => {
    timer = setTimeout(() => resolve("timeout"), DNS_TIMEOUT_IN_MILLISECONDS);
  });
  try {
    const answer = await Promise.race([resolveMailExchangers(domain), timeout]);
    if (answer === "timeout") return "unknown";
    // A "null MX" (a single record pointing to ".") explicitly says the domain accepts no mail (RFC 7505).
    const usableExchangers = answer.filter((record) => record.exchange !== "" && record.exchange !== ".");
    return usableExchangers.length > 0 ? "accepts-mail" : "no-mail";
  } catch (error: unknown) {
    const code = readErrorCode(error);
    return code !== null && MISSING_DOMAIN_ERROR_CODES.has(code) ? "no-mail" : "unknown";
  } finally {
    clearTimeout(timer);
  }
}
