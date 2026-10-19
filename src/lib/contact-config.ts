import { buildContactChannels } from "@/lib/contact-channels";

// Fill whatsappNumber (international format) and bookingUrl (https) to enable those channels.
export const contactConfig = {
  email: "Zoubeiribrahima@gmail.com",
  whatsappNumber: "",
  bookingUrl: "",
} as const;

export const contactChannels = buildContactChannels(contactConfig);
