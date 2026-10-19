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

export const buildWhatsappLink = (phoneNumber: string): string | null => {
  const digitsOnly = phoneNumber.replace(/\D/g, "");
  return digitsOnly.length >= MINIMUM_PHONE_DIGITS ? `https://wa.me/${digitsOnly}` : null;
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
