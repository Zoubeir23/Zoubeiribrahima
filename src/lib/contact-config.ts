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

// Optional identity facts: leave empty until confirmed, the About page only shows what is filled in.
export interface PaymentMethod {
  label: string;
  /** Secure (https) payment link; without one the method is listed as plain text. */
  href?: string;
}

export const identityConfig = {
  legalStatus: "",
  // Awaiting the NINEA registration (expected within 48 hours of 2026-10-19).
  registrationNumber: "",
  paymentMethods: [{ label: "PayPal", href: "https://www.paypal.biz/Zoubeir05" }] as readonly PaymentMethod[],
};
