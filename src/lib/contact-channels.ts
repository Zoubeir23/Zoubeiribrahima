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

const BOOKING_EMBED_COLORS = {
  background_color: "0f0f0f",
  text_color: "ffffff",
  primary_color: "8b5cf6",
} as const;

export const buildBookingEmbedUrl = (bookingUrl: string, embeddingDomain: string): string => {
  try {
    const embedUrl = new URL(bookingUrl);
    embedUrl.searchParams.set("embed_domain", embeddingDomain);
    embedUrl.searchParams.set("embed_type", "Inline");
    for (const [name, value] of Object.entries(BOOKING_EMBED_COLORS)) {
      embedUrl.searchParams.set(name, value);
    }
    return embedUrl.toString();
  } catch {
    return bookingUrl;
  }
};
