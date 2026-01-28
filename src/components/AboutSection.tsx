import { motion } from "framer-motion";
import { MapPin, ArrowRight, Award, Code2, Rocket } from "lucide-react";
import avatar from "@/assets/Zoubeir-profil.jpeg";
import { useLanguage } from "@/hooks/useLanguage";

const AboutSection = () => {
  const { t } = useLanguage();

  const techStack = [
    { name: "React", icon: "https://cdn.svgporn.com/logos/react.svg" },
    { name: "Django", icon: "https://cdn.svgporn.com/logos/django-icon.svg" },
    { name: "Node.js", icon: "https://cdn.svgporn.com/logos/nodejs-icon.svg" },
    { name: "PostgreSQL", icon: "https://cdn.svgporn.com/logos/postgresql.svg" },
    { name: "PHP", icon: "https://cdn.svgporn.com/logos/php.svg" },
  ];

  return (
    <section id="about" className="py-14 px-4 max-w-6xl mx-auto">
      {/* Section header */}
      <div className="text-center mb-12">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Code2 className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            {t("about.essentials")}
          </span>
        </motion.div>
        <motion.h2
          className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {t("about.title")}
        </motion.h2>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">

        {/* Card 1 : Photo + Identité - Grande carte a gauche */}
        <motion.div
          className="md:col-span-4 relative rounded-3xl overflow-hidden group border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 min-h-[380px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <img
            src={avatar}
            alt="Zoubeiri Ibrahima"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          {/* Status badge */}
          <div className="absolute top-4 left-4 z-10">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-medium text-white/90">
                Open to work
              </span>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
            <h3 className="text-xl font-bold text-white mb-1">
              {t("about.fullName")}
            </h3>
            <p className="text-sm text-white/70 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {t("about.locationLabel")}
            </p>
          </div>
        </motion.div>

        {/* Colonne droite : 2 rangees */}
        <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">

          {/* Card 2 : Bio principale */}
          <motion.div
            className="md:col-span-2 p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 group hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-purple-600 shadow-lg shadow-primary/25 shrink-0">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                  {t("about.developerEntrepreneur")}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                  {t("about.description")}
                </p>
              </div>
            </div>
            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {["React", "Node.js", "Django", "PostgreSQL", "TypeScript"].map(
                (tech, i) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:border-primary/40 hover:text-primary dark:hover:text-primary transition-colors"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.04 }}
                  >
                    {tech}
                  </motion.span>
                ),
              )}
            </div>
          </motion.div>

          {/* Card 3 : Stack Principale */}
          <motion.div
            className="p-6 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">
              {t("about.mainStack")}
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              {techStack.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  className="group/icon flex flex-col items-center gap-1.5"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + i * 0.06 }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center group-hover/icon:border-primary/40 group-hover/icon:shadow-md transition-all"
                    whileHover={{ scale: 1.1, y: -3 }}
                  >
                    <img src={tech.icon} alt={tech.name} className="w-6 h-6 object-contain" />
                  </motion.div>
                  <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Card 4 : Certifications */}
          <motion.div
            className="relative p-6 rounded-3xl bg-gradient-to-br from-primary/5 via-purple-600/5 to-transparent dark:from-primary/10 dark:via-purple-600/10 dark:to-transparent border border-primary/20 dark:border-primary/15 overflow-hidden hover:border-primary/40 transition-all duration-300 flex flex-col justify-center items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            <Award className="w-8 h-8 text-primary mb-3 relative z-10" />
            <motion.p
              className="text-4xl font-black text-slate-900 dark:text-white relative z-10"
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 120, delay: 0.3 }}
            >
              20+
            </motion.p>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 relative z-10">
              {t("about.certifications")}
            </p>
          </motion.div>
        </div>

        {/* Rangée du bas : 2 cartes */}
        {/* Card 5 : Projet Phare - Snapfolioo */}
        <motion.a
          href="https://snapfolioo.com"
          target="_blank"
          rel="noopener noreferrer"
          className="md:col-span-8 p-6 md:p-7 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 hover:border-primary/30 dark:hover:border-primary/30 flex items-center justify-between gap-4 group transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div>
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
              {t("about.featuredProject")}
            </p>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary transition-colors">
              {t("about.snapfoliooFounder")}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {t("about.snapfoliooDesc")}
            </p>
          </div>
          <motion.div
            className="w-11 h-11 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:border-primary group-hover:text-white text-slate-400 transition-all duration-300"
            whileHover={{ rotate: 45 }}
          >
            <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
          </motion.div>
        </motion.a>

        {/* Card 6 : Localisation */}
        <motion.div
          className="md:col-span-4 p-6 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 hover:border-primary/30 dark:hover:border-primary/30 flex flex-col justify-center items-center text-center transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-3">
            <MapPin className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-base font-bold text-slate-900 dark:text-white">
            {t("about.location")}
          </p>
          <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-1">
            {t("about.workMode")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
