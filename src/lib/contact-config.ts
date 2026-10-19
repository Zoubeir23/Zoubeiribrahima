import { buildContactChannels } from "@/lib/contact-channels";

export const SITE_DOMAIN = "zoubeir.me";

// Fill whatsappNumber (international format) and bookingUrl (https) to enable those channels.
export const contactConfig = {
  email: "Zoubeiribrahima@gmail.com",
  phoneDisplay: "+221 78 594 10 71",
  phoneHref: "tel:+221785941071",
  whatsappNumber: "+221785941071",
  bookingUrl: "https://calendly.com/zoubeiribrahima/30min",
} as const;

export const contactChannels = buildContactChannels(contactConfig);
