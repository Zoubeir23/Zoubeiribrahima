import { motion } from "framer-motion";
import { Github, Linkedin, MapPin, Mail, ExternalLink, Rocket } from "lucide-react";
import avatar from "@/assets/avatar.png";

const HeroSection = () => {
  return (
    <motion.section
      className="flex flex-col items-center text-center py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Badge "Disponible" */}
      <motion.div
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-medium mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        Disponible pour opportunités
      </motion.div>

      <motion.div
        className="avatar-ring mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        whileHover={{ scale: 1.05 }}
      >
        <img
          src={avatar}
          alt="Zoubeir Ibrahima - Développeur FullStack"
          className="w-32 h-32 rounded-full object-cover"
        />
      </motion.div>

      <motion.h1
        className="text-4xl font-bold text-foreground mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Zoubeir Ibrahima
      </motion.h1>

      <motion.p
        className="text-xl text-primary font-semibold mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Développeur FullStack
      </motion.p>

      <motion.p
        className="text-sm text-muted-foreground mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        React • Node.js • Python/Django • PostgreSQL
      </motion.p>

      <motion.div
        className="flex items-center gap-1.5 text-muted-foreground mb-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <MapPin className="w-4 h-4" />
        <span className="text-sm">Dakar, Sénégal</span>
        <span className="text-xs text-muted-foreground/60 ml-1">(Disponible remote)</span>
      </motion.div>

      {/* Proposition de valeur */}
      <motion.div
        className="max-w-md mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <p className="text-muted-foreground leading-relaxed">
          Je conçois et développe des <span className="text-foreground font-medium">plateformes SaaS</span> et
          <span className="text-foreground font-medium"> applications web</span> performantes.
          <br />
          <span className="text-primary">Fondateur de Snapfolioo</span> — plateforme utilisée pour créer
          portfolios, CV et bannières LinkedIn.
        </p>
      </motion.div>

      {/* Social Links */}
      <motion.div
        className="flex items-center gap-3 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55 }}
      >
        <a
          href="https://github.com/Zoubeir23"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary border border-border hover:border-primary/50 transition-all duration-300 text-sm"
          aria-label="GitHub"
        >
          <Github className="w-4 h-4" />
          <span className="text-muted-foreground">GitHub</span>
        </a>
        <a
          href="https://www.linkedin.com/in/zoubeir-ibrahima/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary border border-border hover:border-primary/50 transition-all duration-300 text-sm"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
          <span className="text-muted-foreground">LinkedIn</span>
        </a>
        <a
          href="mailto:Zoubeiribrahima@gmail.com"
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary border border-border hover:border-primary/50 transition-all duration-300 text-sm"
          aria-label="Email"
        >
          <Mail className="w-4 h-4" />
          <span className="text-muted-foreground">Email</span>
        </a>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row items-center gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <motion.a
          href="https://snapfolioo.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 text-sm font-medium shadow-lg shadow-primary/25"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Rocket className="w-4 h-4" />
          Voir Snapfolioo
          <ExternalLink className="w-3 h-3" />
        </motion.a>
        <motion.a
          href="#contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-secondary hover:bg-secondary/80 hover:border-primary/50 transition-all duration-300 text-sm font-medium"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Mail className="w-4 h-4" />
          Me contacter
        </motion.a>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
