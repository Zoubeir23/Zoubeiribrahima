export type ContactChannelKind = "email" | "whatsapp" | "booking";

export interface ContactChannel {
  kind: ContactChannelKind;
  href: string;
}

export interface ContactChannelsConfig {
  email: string;
  whatsappNumber: string;
  bookingUrl: string;
}

const MINIMUM_PHONE_DIGITS = 8;

export const buildWhatsappLink = (phoneNumber: string, prefilledMessage?: string): string | null => {
  const digitsOnly = phoneNumber.replace(/\D/g, "");
  if (digitsOnly.length < MINIMUM_PHONE_DIGITS) {
    return null;
  }

  const baseLink = `https://wa.me/${digitsOnly}`;
  const trimmedMessage = prefilledMessage?.trim();
  return trimmedMessage ? `${baseLink}?text=${encodeURIComponent(trimmedMessage)}` : baseLink;
};

const isSecureUrl = (candidate: string): boolean => {
  try {
    return new URL(candidate).protocol === "https:";
  } catch {
    return false;
  }
};

export const buildContactChannels = (config: ContactChannelsConfig): ContactChannel[] => {
  const whatsappLink = buildWhatsappLink(config.whatsappNumber);
  const channels: ContactChannel[] = [{ kind: "email", href: `mailto:${config.email}` }];

  if (whatsappLink) {
    channels.push({ kind: "whatsapp", href: whatsappLink });
  }
  if (isSecureUrl(config.bookingUrl)) {
    channels.push({ kind: "booking", href: config.bookingUrl });
  }
  return channels;
};
