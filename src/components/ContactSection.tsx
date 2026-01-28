import { motion } from "framer-motion";
import { Linkedin, Github, Phone, FileImage, FileText, Send, Heart, Mail } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("https://formspree.io/f/xaqovjqb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="py-16 px-4">
        <motion.div
          className="max-w-3xl mx-auto bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 rounded-3xl p-8 md:p-14 text-center overflow-hidden relative backdrop-blur-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-600/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2" />

          {/* Profile Image */}
          <motion.div
            className="relative w-20 h-20 mx-auto mb-5"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="w-full h-full rounded-full overflow-hidden border-3 border-primary shadow-xl shadow-primary/20">
              <img
                src="/Zoubeiriprofile.jpeg"
                alt="Zoubeiri Ibrahima Amed"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.h2
            className="text-2xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t("contact.title")}
          </motion.h2>

          <motion.p
            className="text-slate-500 dark:text-slate-400 mb-1 max-w-md mx-auto text-sm"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t("contact.subtitle")}
          </motion.p>

          <motion.p
            className="text-slate-400 dark:text-slate-500 text-xs mb-6 max-w-md mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            {t("contact.responseTime")}
          </motion.p>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto mb-6 space-y-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                type="text"
                name="name"
                placeholder={t("contact.yourName")}
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-primary"
              />
              <Input
                type="email"
                name="email"
                placeholder={t("contact.yourEmail")}
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-primary"
              />
            </div>
            <Textarea
              name="message"
              placeholder={t("contact.message")}
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-primary resize-none"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-white font-display font-bold tracking-wide transition-all shadow-lg shadow-primary/25"
            >
              {isSubmitting ? (
                <>
                  <Send className="w-4 h-4 mr-2 animate-pulse" />
                  {t("contact.sending")}...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  {t("contact.send")}
                </>
              )}
            </Button>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 text-center">
              {t("contact.privacy")}
            </p>
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-green-50 dark:bg-green-500/20 border border-green-200 dark:border-green-500/50 rounded-lg text-green-600 dark:text-green-400 text-sm text-center"
              >
                {t("contact.sendMessage")}
              </motion.div>
            )}
            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-50 dark:bg-red-500/20 border border-red-200 dark:border-red-500/50 rounded-lg text-red-600 dark:text-red-400 text-sm text-center"
              >
                {t("contact.errorMessage")}
              </motion.div>
            )}
          </motion.form>

          {/* Email link */}
          <motion.a
            href="mailto:Zoubeiribrahima@gmail.com"
            className="inline-flex items-center gap-2 text-lg md:text-xl font-bold text-slate-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Mail className="w-5 h-5" />
            Zoubeiribrahima@gmail.com
          </motion.a>

          {/* CV Download Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-3 mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <a
              href="/CV_page-0001.jpg"
              download="Zoubeir-Ibrahima-Amed-CV.jpg"
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-full text-sm font-display font-bold tracking-wide transition-all shadow-lg shadow-primary/25"
            >
              <FileImage className="w-4 h-4" />
              {t("contact.downloadCVImage")}
            </a>
            <a
              href="/CV.pdf"
              download="Zoubeir-Ibrahima-Amed-CV.pdf"
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white rounded-full text-sm font-display font-bold tracking-wide hover:bg-slate-200 dark:hover:bg-white/10 transition-all"
            >
              <FileText className="w-4 h-4" />
              {t("contact.downloadCVPDF")}
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            className="flex justify-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a
              href="https://www.linkedin.com/in/zoubeir-ibrahima/"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5] transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/Zoubeir23"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-900 hover:text-white hover:border-slate-900 dark:hover:bg-white dark:hover:text-slate-900 transition-all"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="tel:+221785941071"
              className="h-10 w-10 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-green-500 hover:text-white hover:border-green-500 transition-all"
              aria-label="Phone"
            >
              <Phone className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/50">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Left : Branding */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-primary">
                <img
                  src="/Zoubeiriprofile.jpeg"
                  alt="Z.I.A"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-display font-bold text-slate-900 dark:text-white">
                Z.I.A
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500">
                | {t("contact.footer")}
              </span>
            </div>

            {/* Center : Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/zoubeir-ibrahima/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/Zoubeir23"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="mailto:Zoubeiribrahima@gmail.com"
                className="text-slate-400 hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            {/* Right : Credit */}
            <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
              {t("contact.footerCredit")}
              <Heart className="w-3 h-3 text-red-400 inline" />
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ContactSection;
