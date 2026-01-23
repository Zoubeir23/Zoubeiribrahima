import { motion } from "framer-motion";
import { User, Target, Briefcase, Heart, Zap, Code2 } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const highlights = [
  {
    icon: Code2,
    title: "FullStack",
    description: "Expertise complète du frontend au backend"
  },
  {
    icon: Zap,
    title: "Certifié Harvard",
    description: "CS50x et CS50p - Fondations solides"
  },
  {
    icon: Briefcase,
    title: "Entrepreneur",
    description: "Fondateur de Snapfolioo, Co-fondateur SamaWeb"
  },
  {
    icon: Target,
    title: "Orienté résultats",
    description: "Produits en production, utilisateurs réels"
  }
];

const AboutSection = () => {
  return (
    <AnimatedSection delay={0.1}>
      <div className="section-card" id="about">
        <h2 className="section-title">
          <User className="section-icon" />
          À propos
        </h2>

        {/* Introduction narrative */}
        <div className="space-y-4 mb-6">
          <motion.p
            className="text-muted-foreground leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-foreground font-medium">Développeur FullStack</span> passionné basé à Dakar,
            je conçois des plateformes web qui résolvent des problèmes concrets.
            Mon parcours m'a mené de la formation autodidacte jusqu'aux certifications
            <span className="text-primary"> Harvard CS50</span>, en passant par la création
            de mon propre SaaS.
          </motion.p>

          <motion.p
            className="text-muted-foreground leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            En <span className="text-foreground font-medium">janvier 2025</span>, j'ai lancé
            <span className="text-primary font-medium"> Snapfolioo</span> — une plateforme SaaS
            permettant de créer des portfolios, CV et bannières LinkedIn professionnels.
            Ce projet représente mon approche : identifier un besoin réel et construire
            une solution complète, de la conception à la mise en production.
          </motion.p>

          <motion.p
            className="text-muted-foreground leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Aujourd'hui, je co-dirige également <span className="text-primary font-medium">SamaWeb Africa</span>,
            une agence digitale qui accompagne les entreprises africaines dans leur
            transformation numérique. Je suis constamment en quête de nouveaux défis
            et opportunités pour apprendre et grandir.
          </motion.p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              className="p-3 rounded-lg bg-secondary/30 border border-border/50 hover:border-primary/30 transition-all duration-300"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <item.icon className="w-5 h-5 text-primary mb-2" />
              <h3 className="text-sm font-medium text-foreground">{item.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Ce qui me motive */}
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-medium text-foreground">Ce qui me motive</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Créer des outils qui simplifient la vie des utilisateurs et contribuer
            à l'écosystème tech africain. Je crois au pouvoir du code pour
            transformer des idées en solutions concrètes et accessibles.
          </p>
        </div>

        {/* Call to action subtil */}
        <motion.p
          className="text-center text-sm text-muted-foreground mt-6 pt-4 border-t border-border/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Actuellement en <span className="text-primary">Licence IAGE</span> à l'Institut Supérieur d'Informatique (ISI) de Dakar,
          <br />je suis ouvert aux opportunités de <span className="text-foreground font-medium">stage</span>,
          <span className="text-foreground font-medium"> emploi</span> ou
          <span className="text-foreground font-medium"> missions freelance</span>.
        </motion.p>
      </div>
    </AnimatedSection>
  );
};

export default AboutSection;
