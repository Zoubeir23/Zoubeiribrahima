import type { LandingLanguage } from "@/lib/landing-content";

export interface ContactContent {
  eyebrow: string;
  titleLead: string;
  titleHighlight: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitLabel: string;
  submittingLabel: string;
  successTitle: string;
  successBody: string;
  successAnnouncement: string;
  errorMessage: string;
  errorAnnouncement: string;
  phoneLabel: string;
  locationLabel: string;
  locationValue: string;
  whatsappLabel: string;
  socialsLabel: string;
  downloadCvLabel: string;
}

export const contactContent: Record<LandingLanguage, ContactContent> = {
  fr: {
    eyebrow: "Parlons-en",
    titleLead: "Travaillons",
    titleHighlight: "ensemble",
    nameLabel: "Nom complet",
    namePlaceholder: "Jean Dupont",
    emailLabel: "Email",
    emailPlaceholder: "jean@exemple.com",
    messageLabel: "Message",
    messagePlaceholder: "Parlez-moi de votre projet...",
    submitLabel: "Envoyer le message →",
    submittingLabel: "Envoi en cours...",
    successTitle: "Message envoyé !",
    successBody: "Je vous répondrai dans les plus brefs délais.",
    successAnnouncement: "Message envoyé avec succès",
    errorMessage: "Une erreur s'est produite. Réessayez ou contactez-moi directement par email.",
    errorAnnouncement: "Erreur lors de l'envoi",
    phoneLabel: "Téléphone",
    locationLabel: "Localisation",
    locationValue: "Sénégal",
    whatsappLabel: "WhatsApp",
    socialsLabel: "Réseaux sociaux",
    downloadCvLabel: "CV PDF →",
  },
  en: {
    eyebrow: "Let's talk",
    titleLead: "Let's work",
    titleHighlight: "together",
    nameLabel: "Full name",
    namePlaceholder: "John Smith",
    emailLabel: "Email",
    emailPlaceholder: "john@example.com",
    messageLabel: "Message",
    messagePlaceholder: "Tell me about your project...",
    submitLabel: "Send message →",
    submittingLabel: "Sending...",
    successTitle: "Message sent!",
    successBody: "I will get back to you as soon as possible.",
    successAnnouncement: "Message sent successfully",
    errorMessage: "Something went wrong. Please try again or contact me directly by email.",
    errorAnnouncement: "Error while sending",
    phoneLabel: "Phone",
    locationLabel: "Location",
    locationValue: "Senegal",
    whatsappLabel: "WhatsApp",
    socialsLabel: "Social links",
    downloadCvLabel: "Resume PDF →",
  },
};
