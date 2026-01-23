import { motion } from "framer-motion";
import {
  Rocket,
  ExternalLink,
  Github,
  Users,
  FileText,
  Palette,
  Globe,
  Code2,
  Database,
  Shield
} from "lucide-react";
import AnimatedSection from "./AnimatedSection";

interface Project {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  stack: string[];
  url?: string;
  github?: string;
  metrics?: { label: string; value: string }[];
  status: "production" | "development" | "completed";
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "Snapfolioo",
    subtitle: "Plateforme SaaS",
    description: "Plateforme complète permettant de créer des portfolios professionnels, CV et bannières LinkedIn avec un éditeur visuel en temps réel.",
    features: [
      "+18 templates professionnels responsive",
      "Éditeur visuel drag & drop en temps réel",
      "Export multi-formats (HTML, PDF, PNG)",
      "Authentification sécurisée (Google OAuth, Row Level Security)",
      "Architecture scalable avec auto-sauvegarde",
      "Gestion multi-projets par utilisateur"
    ],
    stack: ["React", "TypeScript", "TailwindCSS", "Supabase", "PostgreSQL", "Vite"],
    url: "https://snapfolioo.com",
    metrics: [
      { label: "Templates", value: "18+" },
      { label: "Formats export", value: "3" },
      { label: "Stack", value: "React/Supabase" }
    ],
    status: "production",
    featured: true
  },
  {
    title: "SamaWeb Africa",
    subtitle: "Agence Digitale",
    description: "Co-fondation d'une agence digitale dédiée à la création de sites web et applications mobiles pour entreprises africaines. Accompagnement dans la transformation digitale.",
    features: [
      "Développement de solutions numériques accessibles",
      "Sites web et applications mobiles sur mesure",
      "Gestion de projets clients et coordination d'équipe",
      "Transformation digitale pour entreprises africaines"
    ],
    stack: ["React", "Node.js", "Django", "PostgreSQL", "TailwindCSS"],
    status: "production",
    featured: true
  },
  {
    title: "Système de Gestion d'Employés",
    subtitle: "Application Web Django",
    description: "Application web complète de gestion des employés avec authentification, CRUD et interface responsive.",
    features: [
      "Authentification et gestion des sessions",
      "Interface d'administration complète",
      "API REST pour intégrations",
      "Base de données relationnelle"
    ],
    stack: ["Django", "Python", "JavaScript", "PostgreSQL"],
    github: "https://github.com/Zoubeir23/Gestion_Employer-Django-",
    status: "completed"
  },
  {
    title: "LongHor Voyage",
    subtitle: "Plateforme de Voyage",
    description: "Application web TypeScript pour la gestion et réservation de voyages.",
    features: [
      "Interface utilisateur moderne",
      "Système de réservation",
      "Gestion des itinéraires"
    ],
    stack: ["TypeScript", "React", "TailwindCSS"],
    github: "https://github.com/Zoubeir23/longhorvoyage",
    status: "completed"
  }
];

const statusConfig = {
  production: { label: "En production", color: "bg-green-500/10 text-green-400 border-green-500/30" },
  development: { label: "En développement", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30" },
  completed: { label: "Terminé", color: "bg-blue-500/10 text-blue-400 border-blue-500/30" }
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const status = statusConfig[project.status];

  return (
    <motion.div
      className={`section-card relative overflow-hidden ${project.featured ? 'border-primary/30' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {project.featured && (
        <div className="absolute top-0 right-0 px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-bl-lg">
          Projet phare
        </div>
      )}

      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full border ${status.color}`}>
                {status.label}
              </span>
            </div>
            <p className="text-sm text-primary font-medium">{project.subtitle}</p>
          </div>
          <div className="flex gap-2">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary/50 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label={`Visiter ${project.title}`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-all duration-300"
                aria-label={`GitHub ${project.title}`}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Metrics (for featured projects) */}
        {project.metrics && (
          <div className="grid grid-cols-3 gap-3 mb-4">
            {project.metrics.map((metric, i) => (
              <div key={i} className="text-center p-2 rounded-lg bg-secondary/30">
                <p className="text-lg font-bold text-primary">{metric.value}</p>
                <p className="text-xs text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Features */}
        <div className="mb-4">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Fonctionnalités clés
          </h4>
          <ul className="space-y-1.5">
            {project.features.slice(0, project.featured ? 6 : 4).map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Stack */}
        <div className="mt-auto pt-4 border-t border-border/50">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-1 rounded bg-secondary text-muted-foreground border border-border/50"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <AnimatedSection delay={0.1}>
      <div className="section-card">
        <h2 className="section-title">
          <Rocket className="section-icon" />
          Projets & Réalisations
          <span className="ml-auto text-xs text-muted-foreground font-normal">
            {projects.length} projets
          </span>
        </h2>

        {/* Featured Projects */}
        <div className="space-y-4 mb-6">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <>
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Autres projets</h3>
            <div className="grid gap-4">
              {otherProjects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index + featuredProjects.length} />
              ))}
            </div>
          </>
        )}

        {/* GitHub CTA */}
        <motion.a
          href="https://github.com/Zoubeir23"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 mt-6 py-3 rounded-lg border border-border bg-secondary/30 hover:bg-secondary hover:border-primary/50 transition-all duration-300 text-sm text-muted-foreground hover:text-foreground"
          whileHover={{ scale: 1.01 }}
        >
          <Github className="w-4 h-4" />
          Voir tous mes projets sur GitHub
          <ExternalLink className="w-3 h-3" />
        </motion.a>
      </div>
    </AnimatedSection>
  );
};

export default ProjectsSection;
