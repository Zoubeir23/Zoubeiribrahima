import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Github, Send, MessageSquare, Calendar } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "Zoubeiribrahima@gmail.com",
    href: "mailto:Zoubeiribrahima@gmail.com",
    description: "Réponse sous 24h"
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "+221 78 594 10 71",
    href: "tel:+221785941071",
    description: "WhatsApp disponible"
  },
  {
    icon: MapPin,
    label: "Localisation",
    value: "Grand-Dakar, Sénégal",
    href: null,
    description: "Disponible en remote"
  }
];

const socialLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/zoubeir-ibrahima/",
    color: "hover:bg-[#0077B5]/10 hover:text-[#0077B5] hover:border-[#0077B5]/50"
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/Zoubeir23",
    color: "hover:bg-white/10 hover:text-white hover:border-white/30"
  }
];

const ContactSection = () => {
  return (
    <AnimatedSection delay={0.1}>
      <div className="section-card" id="contact">
        <h2 className="section-title">
          <MessageSquare className="section-icon" />
          Contact
        </h2>

        {/* Introduction */}
        <motion.p
          className="text-muted-foreground text-center mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Un projet en tête ? Une opportunité à discuter ?<br />
          <span className="text-foreground font-medium">Je suis disponible pour échanger.</span>
        </motion.p>

        {/* Contact Methods */}
        <div className="space-y-3 mb-6">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.label}
              className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30 border border-border/50 hover:border-primary/30 transition-all duration-300"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ x: 4 }}
            >
              <div className="p-2 rounded-lg bg-primary/10">
                <method.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  {method.label}
                </p>
                {method.href ? (
                  <a
                    href={method.href}
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {method.value}
                  </a>
                ) : (
                  <p className="text-sm font-medium text-foreground">{method.value}</p>
                )}
              </div>
              <span className="text-xs text-muted-foreground hidden sm:block">
                {method.description}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-3 mb-6">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-secondary/30 transition-all duration-300 ${social.color}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <social.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{social.label}</span>
            </motion.a>
          ))}
        </div>

        {/* CTA Principal */}
        <motion.div
          className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
            <h3 className="text-sm font-medium text-foreground mb-1">
              Disponible pour opportunités
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              Stage, emploi, freelance ou collaboration
            </p>
            <motion.a
              href="mailto:Zoubeiribrahima@gmail.com?subject=Opportunité%20-%20Portfolio%20Contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 text-sm font-medium shadow-lg shadow-primary/25"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="w-4 h-4" />
              Envoyer un message
            </motion.a>
          </div>
        </motion.div>

        {/* Disponibilité */}
        <p className="text-center text-xs text-muted-foreground mt-4">
          Généralement disponible pour répondre sous <span className="text-primary">24 heures</span>
        </p>
      </div>
    </AnimatedSection>
  );
};

export default ContactSection;
