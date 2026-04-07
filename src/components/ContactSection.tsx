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
    <section id="contact" className="bg-[#131313] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-display font-bold text-[#F5C400] text-sm uppercase tracking-[0.3em] mb-4">
            — Parlons-en
          </p>
          <h2 className="font-display font-black text-[#F5C400] text-5xl md:text-8xl uppercase leading-tight">
            Travaillons
            <br />
            Ensemble
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-4 border-[#F5C400]">
          {/* Form */}
          <motion.div
            className="p-10 border-b-4 lg:border-b-0 lg:border-r-4 border-[#F5C400]"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {submitStatus === "success" ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-16 h-16 bg-[#F5C400] flex items-center justify-center mb-6">
                  <span className="font-display font-black text-2xl text-[#131313]">✓</span>
                </div>
                <h3 className="font-display font-black text-2xl text-[#F5C400] uppercase mb-3">
                  Message Envoyé !
                </h3>
                <p className="font-body text-[#F5C400]/70">
                  Je vous répondrai dans les plus brefs délais.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="block font-display font-bold text-xs uppercase tracking-[0.2em] text-[#F5C400]/60 mb-3">
                    Nom Complet
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jean Dupont"
                    className="w-full bg-transparent border-b-4 border-[#F5C400]/30 focus:border-[#F5C400] text-[#F5C400] font-body text-lg py-3 outline-none transition-colors duration-200 placeholder:text-[#F5C400]/20"
                  />
                </div>
                <div>
                  <label className="block font-display font-bold text-xs uppercase tracking-[0.2em] text-[#F5C400]/60 mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jean@exemple.com"
                    className="w-full bg-transparent border-b-4 border-[#F5C400]/30 focus:border-[#F5C400] text-[#F5C400] font-body text-lg py-3 outline-none transition-colors duration-200 placeholder:text-[#F5C400]/20"
                  />
                </div>
                <div>
                  <label className="block font-display font-bold text-xs uppercase tracking-[0.2em] text-[#F5C400]/60 mb-3">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Parlez-moi de votre projet..."
                    className="w-full bg-transparent border-b-4 border-[#F5C400]/30 focus:border-[#F5C400] text-[#F5C400] font-body text-lg py-3 outline-none transition-colors duration-200 placeholder:text-[#F5C400]/20 resize-none"
                  />
                </div>
                {submitStatus === "error" && (
                  <p className="font-body text-sm text-red-400">
                    Une erreur s'est produite. Réessayez ou contactez-moi directement par email.
                  </p>
                )}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#F5C400] text-[#131313] font-display font-black text-sm uppercase tracking-widest py-5 border-4 border-[#F5C400] hover:bg-[#131313] hover:text-[#F5C400] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer le Message →"}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            className="p-10 flex flex-col justify-between gap-10"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border-4 border-[#F5C400] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#F5C400]" />
                </div>
                <div>
                  <p className="font-display font-bold text-[#F5C400]/50 text-xs uppercase tracking-[0.2em] mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:Zoubeiribrahima@gmail.com"
                    className="font-body font-semibold text-[#F5C400] text-base hover:text-[#F5C400]/70 transition-colors break-all"
                  >
                    Zoubeiribrahima@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border-4 border-[#F5C400] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#F5C400]" />
                </div>
                <div>
                  <p className="font-display font-bold text-[#F5C400]/50 text-xs uppercase tracking-[0.2em] mb-1">
                    Téléphone
                  </p>
                  <a
                    href="tel:+221785941071"
                    className="font-body font-semibold text-[#F5C400] text-base hover:text-[#F5C400]/70 transition-colors"
                  >
                    +221 78 594 10 71
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border-4 border-[#F5C400] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#F5C400]" />
                </div>
                <div>
                  <p className="font-display font-bold text-[#F5C400]/50 text-xs uppercase tracking-[0.2em] mb-1">
                    Localisation
                  </p>
                  <p className="font-body font-semibold text-[#F5C400] text-base">
                    Grand-Dakar, Dakar, Sénégal
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t-4 border-[#F5C400]/20 pt-8 space-y-4">
              <p className="font-display font-bold text-[#F5C400]/50 text-xs uppercase tracking-[0.2em]">
                Réseaux Sociaux
              </p>
              <div className="flex gap-4">
                <a
                  href="https://github.com/Zoubeir23"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 border-4 border-[#F5C400] text-[#F5C400] font-display font-black text-xs uppercase tracking-wider hover:bg-[#F5C400] hover:text-[#131313] transition-all duration-150"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/zoubeir-ibrahima"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 border-4 border-[#F5C400] text-[#F5C400] font-display font-black text-xs uppercase tracking-wider hover:bg-[#F5C400] hover:text-[#131313] transition-all duration-150"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </div>
              {/* CV Downloads */}
              <div className="flex gap-3 pt-4">
                <a
                  href="/CV.pdf"
                  download="Zoubeir-Ibrahima-Amed-CV.pdf"
                  className="px-5 py-3 bg-[#F5C400] text-[#131313] font-display font-black text-xs uppercase tracking-wider border-4 border-[#F5C400] hover:bg-transparent hover:text-[#F5C400] transition-all duration-150"
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
