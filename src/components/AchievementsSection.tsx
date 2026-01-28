import { motion } from "framer-motion";
import { Briefcase, GraduationCap, MapPin, Calendar, Building } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

interface Experience {
  title: string;
  company: string;
  type: string;
  location: string;
  period: string;
  current?: boolean;
  description: string[];
  skills?: string[];
}

interface Education {
  title: string;
  institution: string;
  location: string;
  period: string;
  current?: boolean;
  description?: string;
}

const experiences: Experience[] = [
  {
    title: "Co-fondateur",
    company: "SamaWeb Africa",
    type: "Agence Digitale",
    location: "Sénégal (Hybride)",
    period: "Juin 2025 - Présent",
    current: true,
    description: [
      "Co-fondation d'une agence digitale dédiée aux entreprises africaines",
      "Développement de solutions numériques accessibles et performantes",
      "Gestion de projets clients et coordination d'équipe de développeurs",
    ],
    skills: ["React", "Node.js", "Django", "PostgreSQL"],
  },
  {
    title: "Fondateur & Développeur Principal",
    company: "Snapfolioo",
    type: "Plateforme SaaS",
    location: "Dakar, Sénégal",
    period: "Janv. 2025 - Présent",
    current: true,
    description: [
      "Conception et développement d'une plateforme SaaS (portfolios, CV, bannières)",
      "Développement de +18 templates professionnels avec éditeur visuel temps réel",
      "Implémentation d'authentification sécurisée (Google OAuth, Row Level Security)",
      "Architecture scalable avec auto-sauvegarde et export multi-formats",
    ],
    skills: ["React", "TypeScript", "TailwindCSS", "Supabase", "PostgreSQL"],
  },
];

const educations: Education[] = [
  {
    title: "Licence IAGE",
    institution: "Institut Supérieur d'Informatique (ISI)",
    location: "Dakar, Sénégal",
    period: "2023 - 2026",
    current: true,
    description: "Informatique Appliquée à la Gestion des Entreprises",
  },
  {
    title: "BTS Informatique de Gestion",
    institution: "ISI",
    location: "Dakar, Sénégal",
    period: "2023 - 2025",
  },
  {
    title: "Baccalauréat Série C",
    institution: "École Communautaire Arabo-Islamique",
    location: "Mitsoudjé, Comores",
    period: "2023",
  },
];

const AchievementsSection = () => {
  return (
    <div className="space-y-4">
      {/* Expérience Professionnelle */}
      <AnimatedSection delay={0.1}>
        <div className="section-card">
          <h2 className="section-title">
            <Briefcase className="section-icon" />
            Expérience Professionnelle
          </h2>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="relative pl-4 border-l-2 border-border hover:border-primary/50 transition-colors duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {/* Timeline dot */}
                <div
                  className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 ${
                    exp.current
                      ? "bg-primary border-primary animate-pulse"
                      : "bg-background border-border"
                  }`}
                />

                <div className="space-y-2">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{exp.title}</h3>
                      <p className="text-sm text-primary font-medium">
                        {exp.company} —{" "}
                        <span className="text-muted-foreground font-normal">{exp.type}</span>
                      </p>
                    </div>
                    {exp.current && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/30">
                        Actuel
                      </span>
                    )}
                  </div>

                  {/* Meta info */}
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </span>
                  </div>

                  {/* Description */}
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary mt-1.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Skills */}
                  {exp.skills && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border/50"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Formation */}
      <AnimatedSection delay={0.2}>
        <div className="section-card">
          <h2 className="section-title">
            <GraduationCap className="section-icon" />
            Formation
          </h2>
          <div className="space-y-4">
            {educations.map((edu, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4 p-3 rounded-lg bg-secondary/20 hover:bg-secondary/40 transition-colors duration-300"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                  <Building className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-medium text-foreground">{edu.title}</h3>
                      <p className="text-sm text-muted-foreground">{edu.institution}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm text-primary font-medium">{edu.period}</span>
                      {edu.current && <p className="text-xs text-green-400">(en cours)</p>}
                    </div>
                  </div>
                  {edu.description && (
                    <p className="text-xs text-muted-foreground mt-1">{edu.description}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {edu.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default AchievementsSection;
