import { motion } from "framer-motion";
import { Rocket, Code, ExternalLink, Github, Star, Calendar, ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import ogImage from "@/assets/og-image.png";
import samaWebImage from "@/assets/Sama-web.jpeg";

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  status?: "active" | "completed" | "in-progress";
  category?: "saas" | "web" | "mobile" | "fullstack";
}

const projects: Project[] = [
  {
    title: "Snapfolioo",
    description:
      "Plateforme SaaS no-code pour créer des portfolios professionnels en quelques minutes avec éditeur visuel temps réel.",
    image: ogImage,
    tags: ["React", "TypeScript", "Supabase", "Tailwind", "PostgreSQL"],
    demoUrl: "https://snapfolioo.com",
    githubUrl: "https://github.com/Zoubeir23",
    featured: true,
    status: "active",
    category: "saas",
  },
  {
    title: "SamaWeb Africa",
    description:
      "Agence digitale co-fondée. Développement de solutions numériques, sites web et applications mobiles sur mesure.",
    image: samaWebImage,
    tags: ["Django", "React", "Python", "PostgreSQL"],
    demoUrl: "https://www.linkedin.com/company/samawebafrica/",
    featured: false,
    status: "active",
    category: "fullstack",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const ProjectsBentoSection = () => {
  const { t } = useLanguage();

  const featuredProject = projects.find((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-10 bg-background-light dark:bg-background-dark relative">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[100px] opacity-50 dark:opacity-40 mix-blend-multiply dark:mix-blend-screen"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] opacity-50 dark:opacity-30 mix-blend-multiply dark:mix-blend-screen"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <motion.div
            className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Portfolio
          </motion.div>
          <motion.h2
            className="text-4xl md:text-6xl font-display font-bold mb-4 tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Mes{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-neon-purple dark:to-cyan-400">
              Projets
            </span>
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Découvrez mes réalisations et les produits sur lesquels j'ai travaillé
          </motion.p>
        </div>

        {/* Featured Project */}
        {featuredProject && (
          <motion.div
            className="mb-10 group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative glass-card bg-white dark:bg-card-dark rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] transition-all duration-500">
              {/* Image Section */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-card-dark via-transparent to-transparent z-10"
                  initial={{ opacity: 0.5 }}
                  whileHover={{ opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                    <Star className="w-3 h-3" /> Projet Vedette
                  </span>
                </div>
                <div className="absolute top-4 right-4 z-20">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      featuredProject.status === "active"
                        ? "bg-green-500 text-white"
                        : featuredProject.status === "in-progress"
                          ? "bg-yellow-500 text-white"
                          : "bg-blue-500 text-white"
                    }`}
                  >
                    {featuredProject.status === "active"
                      ? "En Production"
                      : featuredProject.status === "in-progress"
                        ? "En Développement"
                        : "Terminé"}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
                  <div className="flex-1">
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                      {featuredProject.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                      {featuredProject.description}
                    </p>
                  </div>
                  <div className="flex gap-3 md:flex-col md:gap-3">
                    {featuredProject.demoUrl && (
                      <motion.a
                        href={featuredProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-xl bg-primary text-white font-semibold shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:scale-105 transition-all duration-300 flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Rocket className="w-4 h-4" /> Voir la Démo
                      </motion.a>
                    )}
                    {featuredProject.githubUrl && (
                      <motion.a
                        href={featuredProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white font-semibold hover:bg-slate-300 dark:hover:bg-white/20 transition-all duration-300 flex items-center gap-2 border border-slate-300 dark:border-white/10"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className="w-4 h-4" /> GitHub
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {featuredProject.tags.map((tag, index) => (
                    <motion.span
                      key={index}
                      className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 text-sm font-medium"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8 }}
            >
              <div className="relative glass-card bg-white dark:bg-card-dark rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group h-full flex flex-col">
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-card-dark via-transparent to-transparent z-10"
                    initial={{ opacity: 0.5 }}
                    whileHover={{ opacity: 0.3 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                  />
                  <div className="absolute top-3 left-3 z-20">
                    <span
                      className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        project.status === "active"
                          ? "bg-green-500 text-white"
                          : project.status === "in-progress"
                            ? "bg-yellow-500 text-white"
                            : "bg-blue-500 text-white"
                      }`}
                    >
                      {project.status === "active"
                        ? "Actif"
                        : project.status === "in-progress"
                          ? "En cours"
                          : "Terminé"}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 flex-1">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.slice(0, 4).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 text-xs font-medium border border-slate-200 dark:border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 text-xs font-medium border border-slate-200 dark:border-white/5">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2 border-t border-slate-200 dark:border-white/5">
                    {project.demoUrl && (
                      <motion.a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-3 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-1"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Démo
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-3 py-2 rounded-lg bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white text-sm font-medium hover:bg-slate-300 dark:hover:bg-white/20 transition-colors flex items-center justify-center gap-1 border border-slate-300 dark:border-white/10"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Github className="w-3.5 h-3.5" /> Code
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Link */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.a
            href="https://github.com/Zoubeir23"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors font-medium"
            whileHover={{ x: 5 }}
          >
            Voir tous mes projets sur GitHub
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsBentoSection;
