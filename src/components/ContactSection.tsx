import { Github, Linkedin, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import ConsentGate from "@/components/consent/ConsentGate";
import SectionHeading from "@/components/SectionHeading";
import { useLandingContent } from "@/hooks/useLandingContent";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { contactChannels, contactConfig } from "@/lib/contact-config";
import { contactContent } from "@/lib/contact-content";

const FORM_ENDPOINT = "https://formspree.io/f/xaqovjqb";

type SubmitStatus = "idle" | "success" | "error";

const fieldClassName =
  "w-full border-b border-[var(--surface-border)] bg-transparent py-3 font-body text-base text-white transition-colors duration-300 placeholder:text-[var(--text-muted)] focus:border-[var(--accent-violet)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-violet)] sm:text-lg";
const labelClassName = "mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]";
const pillLinkClassName =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-body text-sm font-semibold text-[var(--surface-deepest)] transition-colors duration-300 hover:bg-[var(--text-secondary)]";

interface InfoRowProps {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}

const InfoRow = ({ icon: Icon, label, children }: InfoRowProps) => (
  <div className="flex items-start gap-4">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[var(--surface-border)]">
      <Icon className="h-4 w-4 text-white" aria-hidden="true" />
    </div>
    <div>
      <p className="mb-1 font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">{label}</p>
      {children}
    </div>
  </div>
);

const ContactSection = () => {
  const contact = useLocalizedContent(contactContent);
  const { booking } = useLandingContent();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");

  const whatsappChannel = contactChannels.find((channel) => channel.kind === "whatsapp");
  const bookingChannel = contactChannels.find((channel) => channel.kind === "booking");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
    };

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitStatus("success");
        formRef.current?.reset();
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const announcement =
    submitStatus === "success" ? contact.successAnnouncement : submitStatus === "error" ? contact.errorAnnouncement : "";

  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading eyebrow={contact.eyebrow} title={contact.titleLead} highlight={contact.titleHighlight} />

      <div className="grid overflow-hidden rounded-[var(--radius-medium)] border border-[var(--surface-border)] bg-[var(--surface-base)] lg:grid-cols-2">
        <div className="border-b border-[var(--surface-border)] p-6 sm:p-10 lg:border-b-0 lg:border-r">
          {submitStatus === "success" ? (
            <div className="flex h-full flex-col items-center justify-center py-16 text-center">
              <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white font-display text-2xl text-[var(--surface-deepest)]">
                ✓
              </span>
              <h3 className="mb-3 font-display text-2xl uppercase text-white">{contact.successTitle}</h3>
              <p className="text-[var(--text-secondary)]">{contact.successBody}</p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-7" noValidate>
              <div>
                <label htmlFor="contact-name" className={labelClassName}>
                  {contact.nameLabel}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder={contact.namePlaceholder}
                  className={fieldClassName}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className={labelClassName}>
                  {contact.emailLabel}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder={contact.emailPlaceholder}
                  className={fieldClassName}
                />
              </div>
              <div>
                <label htmlFor="contact-message" className={labelClassName}>
                  {contact.messageLabel}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder={contact.messagePlaceholder}
                  className={`${fieldClassName} resize-none`}
                />
              </div>
              {submitStatus === "error" ? (
                <p className="text-sm text-[var(--status-error)]">{contact.errorMessage}</p>
              ) : null}
              <button
                type="submit"
                disabled={isSubmitting}
                className="min-h-11 w-full rounded-full bg-white py-4 font-body text-sm font-semibold text-[var(--surface-deepest)] transition-colors duration-300 hover:bg-[var(--text-secondary)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? contact.submittingLabel : contact.submitLabel}
              </button>
              <p role="status" aria-live="polite" className="sr-only">
                {announcement}
              </p>
            </form>
          )}
        </div>

        <div className="flex flex-col justify-between gap-10 p-6 sm:p-10">
          <div className="space-y-8">
            <InfoRow icon={Mail} label={contact.emailLabel}>
              <a href={`mailto:${contactConfig.email}`} className="break-all font-semibold text-white hover:text-[var(--text-secondary)]">
                {contactConfig.email}
              </a>
            </InfoRow>
            <InfoRow icon={Phone} label={contact.phoneLabel}>
              <a href={contactConfig.phoneHref} className="font-semibold text-white hover:text-[var(--text-secondary)]">
                {contactConfig.phoneDisplay}
              </a>
            </InfoRow>
            {whatsappChannel ? (
              <InfoRow icon={MessageCircle} label={contact.whatsappLabel}>
                <a
                  href={whatsappChannel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-white hover:text-[var(--text-secondary)]"
                >
                  {contact.whatsappLabel}
                </a>
              </InfoRow>
            ) : null}
            <InfoRow icon={MapPin} label={contact.locationLabel}>
              <p className="font-semibold text-white">{contact.locationValue}</p>
            </InfoRow>
          </div>

          <div className="space-y-4 border-t border-[var(--surface-border)] pt-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">{contact.socialsLabel}</p>
            <div className="flex flex-wrap gap-3">
              <a href="https://github.com/Zoubeir23" target="_blank" rel="noopener noreferrer" className={pillLinkClassName}>
                <Github className="h-4 w-4" aria-hidden="true" />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/zoubeir-ibrahima"
                target="_blank"
                rel="noopener noreferrer"
                className={pillLinkClassName}
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
                LinkedIn
              </a>
              <a href="/CV.pdf" download="Zoubeir-Ibrahima-Amed-CV.pdf" className={pillLinkClassName}>
                {contact.downloadCvLabel}
              </a>
            </div>
          </div>
        </div>
      </div>

      {bookingChannel ? (
        <div className="mt-8">
          <ConsentGate
            providerName={booking.providerName}
            description={booking.description}
            loadButtonLabel={booking.loadButtonLabel}
          >
            <iframe
              title={booking.providerName}
              src={bookingChannel.href}
              loading="lazy"
              className="h-[640px] w-full rounded-md border border-[var(--surface-border)] bg-white"
            />
          </ConsentGate>
        </div>
      ) : null}
    </section>
  );
};

export default ContactSection;
