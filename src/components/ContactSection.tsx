import { motion } from "framer-motion";
import { useState } from "react";
import { Github, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const response = await fetch("https://formspree.io/f/xaqovjqb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="bg-[#FFFFFF] py-14 sm:py-18 md:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-display font-bold text-[#143DFF] text-sm uppercase tracking-[0.3em] mb-4">
            — Parlons-en
          </p>
          <h2 className="font-display font-black text-[#143DFF] text-3xl sm:text-5xl md:text-8xl uppercase leading-tight">
            Travaillons
            <br />
            Ensemble
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-4 border-[#143DFF]">
          {/* Form */}
          <motion.div
            className="p-6 sm:p-10 border-b-4 lg:border-b-0 lg:border-r-4 border-[#143DFF]"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {submitStatus === "success" ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-16 h-16 bg-[#143DFF] flex items-center justify-center mb-6">
                  <span className="font-display font-black text-2xl text-[#FFFFFF]">✓</span>
                </div>
                <h3 className="font-display font-black text-2xl text-[#143DFF] uppercase mb-3">
                  Message Envoyé !
                </h3>
                <p className="font-body text-[#143DFF]/80">
                  Je vous répondrai dans les plus brefs délais.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8" noValidate>
                <div>
                  <label htmlFor="contact-name" className="block font-display font-bold text-xs uppercase tracking-[0.2em] text-[#143DFF]/80 mb-3">
                    Nom Complet
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jean Dupont"
                    className="w-full bg-transparent border-b-4 border-[#143DFF]/30 focus:border-[#143DFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#143DFF] text-[#143DFF] font-body text-base sm:text-lg py-3 transition-colors duration-200 placeholder:text-[#143DFF]/20"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block font-display font-bold text-xs uppercase tracking-[0.2em] text-[#143DFF]/80 mb-3">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jean@exemple.com"
                    className="w-full bg-transparent border-b-4 border-[#143DFF]/30 focus:border-[#143DFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#143DFF] text-[#143DFF] font-body text-base sm:text-lg py-3 transition-colors duration-200 placeholder:text-[#143DFF]/20"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block font-display font-bold text-xs uppercase tracking-[0.2em] text-[#143DFF]/80 mb-3">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Parlez-moi de votre projet..."
                    className="w-full bg-transparent border-b-4 border-[#143DFF]/30 focus:border-[#143DFF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#143DFF] text-[#143DFF] font-body text-base sm:text-lg py-3 transition-colors duration-200 placeholder:text-[#143DFF]/20 resize-none"
                  />
                </div>
                {submitStatus === "error" && (
                  <p role="status" aria-live="polite" className="font-body text-sm text-red-500">
                    Une erreur s'est produite. Réessayez ou contactez-moi directement par email.
                  </p>
                )}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#143DFF] text-[#FFFFFF] font-display font-black text-xs sm:text-sm uppercase tracking-wide sm:tracking-widest py-4 sm:py-5 border-4 border-[#143DFF] hover:bg-[#FFFFFF] hover:text-[#143DFF] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed min-h-11"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer le Message →"}
                </motion.button>
                <p role="status" aria-live="polite" className="sr-only">
                  {submitStatus === "success"
                    ? "Message envoyé avec succès"
                    : submitStatus === "error"
                    ? "Erreur lors de l'envoi"
                    : ""}
                </p>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            className="p-6 sm:p-10 flex flex-col justify-between gap-8 sm:gap-10"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border-4 border-[#143DFF] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#143DFF]" />
                </div>
                <div>
                  <p className="font-display font-bold text-[#143DFF]/80 text-xs uppercase tracking-[0.2em] mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:Zoubeiribrahima@gmail.com"
                    className="font-body font-semibold text-[#143DFF] text-base hover:text-[#143DFF]/70 transition-colors break-all"
                  >
                    Zoubeiribrahima@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border-4 border-[#143DFF] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#143DFF]" />
                </div>
                <div>
                  <p className="font-display font-bold text-[#143DFF]/80 text-xs uppercase tracking-[0.2em] mb-1">
                    Téléphone
                  </p>
                  <a
                    href="tel:+221785941071"
                    className="font-body font-semibold text-[#143DFF] text-base hover:text-[#143DFF]/70 transition-colors"
                  >
                    +221 78 594 10 71
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border-4 border-[#143DFF] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#143DFF]" />
                </div>
                <div>
                  <p className="font-display font-bold text-[#143DFF]/80 text-xs uppercase tracking-[0.2em] mb-1">
                    Localisation
                  </p>
                  <p className="font-body font-semibold text-[#143DFF] text-base">
                    Sénégal
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t-4 border-[#143DFF]/20 pt-8 space-y-4">
              <p className="font-display font-bold text-[#143DFF]/80 text-xs uppercase tracking-[0.2em]">
                Réseaux Sociaux
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <a
                  href="https://github.com/Zoubeir23"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 border-4 border-[#143DFF] text-[#143DFF] font-display font-black text-xs uppercase tracking-wide hover:bg-[#143DFF] hover:text-[#FFFFFF] transition-all duration-150 min-h-11"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/zoubeir-ibrahima"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 border-4 border-[#143DFF] text-[#143DFF] font-display font-black text-xs uppercase tracking-wide hover:bg-[#143DFF] hover:text-[#FFFFFF] transition-all duration-150 min-h-11"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </div>
              {/* CV Downloads */}
              <div className="flex flex-wrap gap-3 pt-4">
                <a
                  href="/CV.pdf"
                  download="Zoubeir-Ibrahima-Amed-CV.pdf"
                  className="w-full sm:w-auto text-center px-5 py-3 bg-[#143DFF] text-[#FFFFFF] font-display font-black text-xs uppercase tracking-wide border-4 border-[#143DFF] hover:bg-transparent hover:text-[#143DFF] transition-all duration-150 min-h-11"
                >
                  CV PDF →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
