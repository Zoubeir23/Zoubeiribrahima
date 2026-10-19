import { buildContactChannels } from "@/lib/contact-channels";

// Fill whatsappNumber (international format) and bookingUrl (https) to enable those channels.
export const contactConfig = {
  email: "Zoubeiribrahima@gmail.com",
  phoneDisplay: "+221 78 594 10 71",
  phoneHref: "tel:+221785941071",
  whatsappNumber: "",
  bookingUrl: "",
} as const;

export const contactChannels = buildContactChannels(contactConfig);
