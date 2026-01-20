import { motion } from "framer-motion";
import { Github, Linkedin, MapPin } from "lucide-react";
import avatar from "@/assets/avatar.png";

const HeroSection = () => {
  return (
    <motion.section 
      className="flex flex-col items-center text-center py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div 
        className="avatar-ring mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        whileHover={{ scale: 1.05 }}
      >
        <img
          src={avatar}
          alt="Zoubeir Ibrahima"
          className="w-28 h-28 rounded-full object-cover"
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
        className="text-lg text-muted-foreground mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Développeur Logiciel
      </motion.p>
      
      <motion.div 
        className="flex items-center gap-1.5 text-muted-foreground mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <MapPin className="w-4 h-4" />
        <span className="text-sm">France</span>
      </motion.div>
      
      <motion.div 
        className="flex items-center gap-4 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <a
          href="https://github.com/zoubeiribrahima"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors duration-300"
          aria-label="GitHub"
        >
          <Github className="w-5 h-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/zoubeir-ibrahima/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors duration-300"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </a>
      </motion.div>
      
      <motion.p 
        className="text-muted-foreground italic mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        Je crée des solutions numériques.
      </motion.p>
      
      <motion.a
        href="https://www.linkedin.com/in/zoubeir-ibrahima/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-secondary hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 text-sm font-medium"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Linkedin className="w-4 h-4" />
        Voir mon profil LinkedIn
      </motion.a>
    </motion.section>
  );
};

export default HeroSection;
