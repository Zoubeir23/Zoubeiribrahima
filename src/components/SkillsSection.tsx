import { motion } from "framer-motion";
import { Code2, Server, Database, Wrench, BookOpen, Layers } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useLanguage } from "@/hooks/useLanguage";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

interface SkillCategory {
  icon: React.ElementType;
  title: string;
  color: string;
  skills: { name: string; iconUrl?: string }[];
}

const skillCategories: SkillCategory[] = [
  {
    icon: Layers,
    title: "Frontend",
    color: "from-blue-500 to-cyan-400",
    skills: [
      { name: "React.js", iconUrl: "https://cdn.svgporn.com/logos/react.svg" },
      { name: "TailwindCSS", iconUrl: "https://cdn.svgporn.com/logos/tailwindcss-icon.svg" },
      { name: "TypeScript", iconUrl: "https://cdn.svgporn.com/logos/typescript-icon.svg" },
      { name: "Framer Motion", iconUrl: "https://cdn.svgporn.com/logos/framer.svg" },
    ],
  },
  {
    icon: Server,
    title: "Backend",
    color: "from-green-500 to-emerald-400",
    skills: [
      { name: "Django", iconUrl: "https://cdn.svgporn.com/logos/django-icon.svg" },
      { name: "Python", iconUrl: "https://cdn.svgporn.com/logos/python.svg" },
      { name: "Node.js", iconUrl: "https://cdn.svgporn.com/logos/nodejs-icon.svg" },
      { name: "Express.js", iconUrl: "https://cdn.svgporn.com/logos/express.svg" },
    ],
  },
  {
    icon: Database,
    title: "Base de données",
    color: "from-purple-500 to-violet-400",
    skills: [
      { name: "PostgreSQL", iconUrl: "https://cdn.svgporn.com/logos/postgresql.svg" },
      { name: "Supabase", iconUrl: "https://cdn.svgporn.com/logos/supabase-icon.svg" },
      { name: "MySQL", iconUrl: "https://cdn.svgporn.com/logos/mysql-icon.svg" },
    ],
  },
  {
    icon: Wrench,
    title: "Outils & DevOps",
    color: "from-orange-500 to-amber-400",
    skills: [
      { name: "Git", iconUrl: "https://cdn.svgporn.com/logos/git-icon.svg" },
      { name: "GitHub", iconUrl: "https://cdn.svgporn.com/logos/github-icon.svg" },
      { name: "Claude Code", iconUrl: "https://cdn.svgporn.com/logos/anthropic-icon.svg" },
      { name: "VS Code", iconUrl: "https://cdn.svgporn.com/logos/visual-studio-code.svg" },
      { name: "Vercel", iconUrl: "https://cdn.svgporn.com/logos/vercel-icon.svg" },
    ],
  },
];

const SkillsSection = () => {
  const { t } = useLanguage();

  const coreSkills = [
    { name: "React", iconUrl: "https://cdn.svgporn.com/logos/react.svg" },
    { name: "Django", iconUrl: "https://cdn.svgporn.com/logos/django-icon.svg" },
    { name: "PostgreSQL", iconUrl: "https://cdn.svgporn.com/logos/postgresql.svg" },
    { name: "Claude Code", iconUrl: "https://cdn.svgporn.com/logos/anthropic-icon.svg" },
    { name: "Git", iconUrl: "https://cdn.svgporn.com/logos/git-icon.svg" },
    { name: "PHP", iconUrl: "https://cdn.svgporn.com/logos/php.svg" },
  ];

  return (
    <AnimatedSection delay={0.1}>
      <div className="space-y-12">
        {/* Section header */}
        <div className="text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Code2 className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              {t("skills.title")}
            </span>
          </motion.div>
          <motion.h2
            className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Stack & Compétences
          </motion.h2>
        </div>

        {/* Technologies Phares */}
        <motion.div
          className="relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-800/50 dark:via-slate-900/80 dark:to-slate-800/50 border border-white/10 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute top-0 left-1/4 w-64 h-32 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 h-24 bg-purple-600/15 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider">
                Technologies Phares
              </h3>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {coreSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="group flex flex-col items-center gap-3"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <motion.div
                    className="w-16 h-16 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center backdrop-blur-sm group-hover:bg-white/15 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/10 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={skill.iconUrl}
                      alt={skill.name}
                      className="w-8 h-8 md:w-9 md:h-9 object-contain"
                    />
                  </motion.div>
                  <span className="text-xs font-medium text-white/60 group-hover:text-white/90 transition-colors text-center">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Catégories en grille de cartes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="group relative p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
            >
              {/* Card header */}
              <div className="flex items-center gap-3 mb-5">
                <div className={`p-2 rounded-xl bg-gradient-to-br ${category.color} shadow-lg`}>
                  <category.icon className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {category.title}
                </h3>
                <span className="ml-auto text-xs text-slate-400 dark:text-slate-500 font-medium">
                  {category.skills.length} techs
                </span>
              </div>

              {/* Skills list */}
              <motion.div
                className="grid grid-cols-2 gap-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-primary/30 dark:hover:border-primary/30 hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-200"
                    variants={itemVariants}
                    whileHover={{ x: 4 }}
                  >
                    <img
                      src={skill.iconUrl}
                      alt={skill.name}
                      className="w-7 h-7 object-contain shrink-0"
                    />
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default SkillsSection;
