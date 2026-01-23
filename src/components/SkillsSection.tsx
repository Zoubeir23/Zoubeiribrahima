import { motion } from "framer-motion";
import { Code2, Server, Database, Wrench, BookOpen, Layers } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2 }
  },
};

interface SkillCategory {
  icon: React.ElementType;
  title: string;
  skills: { name: string; level?: "expert" | "advanced" | "intermediate" }[];
}

const skillCategories: SkillCategory[] = [
  {
    icon: Code2,
    title: "Langages",
    skills: [
      { name: "JavaScript", level: "expert" },
      { name: "TypeScript", level: "advanced" },
      { name: "Python", level: "expert" },
      { name: "PHP", level: "advanced" },
      { name: "Java", level: "intermediate" },
      { name: "SQL", level: "advanced" },
      { name: "HTML/CSS", level: "expert" }
    ]
  },
  {
    icon: Layers,
    title: "Frontend",
    skills: [
      { name: "React.js", level: "expert" },
      { name: "Angular", level: "intermediate" },
      { name: "TailwindCSS", level: "expert" },
      { name: "Responsive Design", level: "expert" },
      { name: "UI/UX", level: "advanced" },
      { name: "Framer Motion", level: "advanced" }
    ]
  },
  {
    icon: Server,
    title: "Backend",
    skills: [
      { name: "Node.js", level: "advanced" },
      { name: "Django", level: "expert" },
      { name: "Laravel", level: "intermediate" },
      { name: "Express.js", level: "advanced" },
      { name: "NestJS", level: "intermediate" },
      { name: "API REST", level: "expert" }
    ]
  },
  {
    icon: Database,
    title: "Base de données",
    skills: [
      { name: "PostgreSQL", level: "expert" },
      { name: "Supabase", level: "expert" },
      { name: "MySQL", level: "advanced" }
    ]
  },
  {
    icon: Wrench,
    title: "Outils & DevOps",
    skills: [
      { name: "Git", level: "expert" },
      { name: "GitHub", level: "expert" },
      { name: "GitHub Copilot", level: "advanced" },
      { name: "Claude Code", level: "advanced" },
      { name: "VS Code", level: "expert" },
      { name: "Vercel", level: "advanced" },
      { name: "Vite", level: "advanced" }
    ]
  },
  {
    icon: BookOpen,
    title: "Méthodologies",
    skills: [
      { name: "Agile", level: "advanced" },
      { name: "Clean Code", level: "advanced" },
      { name: "Tests unitaires", level: "intermediate" }
    ]
  }
];

const levelColors = {
  expert: "bg-primary/20 text-primary border-primary/40",
  advanced: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  intermediate: "bg-secondary text-muted-foreground border-border"
};

const SkillsSection = () => {
  return (
    <AnimatedSection delay={0.1}>
      <div className="section-card">
        <h2 className="section-title">
          <Code2 className="section-icon" />
          Compétences Techniques
        </h2>

        <div className="space-y-5">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: categoryIndex * 0.05 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <category.icon className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-medium text-foreground">{category.title}</h3>
              </div>
              <motion.div
                className="flex flex-wrap gap-1.5"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill.name}
                    className={`text-xs px-2.5 py-1 rounded-md border transition-all duration-200 ${
                      skill.level ? levelColors[skill.level] : levelColors.intermediate
                    }`}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary))" }}
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Légende */}
        <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-border/50">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Expert</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span className="text-xs text-muted-foreground">Avancé</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-muted-foreground" />
            <span className="text-xs text-muted-foreground">Intermédiaire</span>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default SkillsSection;
