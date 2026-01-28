import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

const experiences = [
  {
    title: "Co-fondateur",
    company: "SamaWeb Africa",
    subtitle: "Agence Digitale",
    period: "Juin 2025 - Présent",
    location: "Sénégal (Hybride)",
    description: [
      "Co-fondation d'une agence digitale dédiée à la création de sites web et applications mobiles pour entreprises africaines",
      "Développement de solutions numériques accessibles et performantes pour accompagner la transformation digitale",
      "Gestion de projets clients et coordination d'une équipe de développeurs",
    ],
    color: "bg-primary",
    current: true,
  },
  {
    title: "Fondateur & Développeur principal",
    company: "Snapfolioo",
    subtitle: "Plateforme SaaS",
    period: "Janv. 2025 - Présent",
    location: "Dakar, Sénégal",
    description: [
      "Conception et développement d'une plateforme SaaS permettant de créer portfolios, CV et bannières LinkedIn",
      "Développement de +18 templates professionnels responsive avec éditeur visuel en temps réel",
      "Implémentation d'un système d'authentification sécurisé (Google OAuth, Row Level Security)",
      "Architecture scalable avec auto-sauvegarde, gestion multi-projets et export multi-formats (HTML, PDF, PNG)",
    ],
    stack: ["React", "TypeScript", "TailwindCSS", "Supabase", "PostgreSQL", "Vite"],
    color: "bg-blue-500",
    current: true,
  },
];

const formations = [
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
    current: false,
  },
  {
    title: "Baccalauréat Série C",
    institution: "École Communautaire Arabo-Islamique",
    location: "Mitsoudjé, Comores",
    period: "2023",
    current: false,
  },
];

const certifications = ["Harvard CS50", "Microsoft", "Cisco", "HackerRank", "Anthropic"];

const ExperienceSection = () => {
  const { t } = useLanguage();

  return (
    <section id="experience" className="py-20 px-4 max-w-5xl mx-auto">
      <motion.h2
        className="text-3xl font-display font-bold text-white mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {t("experience.sectionTitle")}
      </motion.h2>

      {/* Expérience Professionnelle */}
      <motion.h3
        className="text-xl font-semibold text-primary mb-6"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {t("experience.professionalExperience")}
      </motion.h3>

      <div className="relative border-l border-slate-800 ml-4 md:ml-0 space-y-10 mb-16">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className="relative pl-8 md:pl-12"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <span
              className={`absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full ${exp.color} ring-4 ring-slate-950`}
            />

            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2">
              <div>
                <h4 className="text-lg font-bold text-white">{exp.title}</h4>
                <p className="text-primary font-medium">
                  {exp.company} — <span className="text-slate-400 font-normal">{exp.subtitle}</span>
                </p>
              </div>
              <div className="text-right mt-2 sm:mt-0">
                <span
                  className={`text-sm font-mono ${exp.current ? "text-primary" : "text-slate-500"}`}
                >
                  {exp.period}
                </span>
                <p className="text-xs text-slate-500">{exp.location}</p>
              </div>
            </div>

            <ul className="space-y-1 mt-3">
              {exp.description.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                  <span className="text-slate-600 mt-1">—</span>
                  {item}
                </li>
              ))}
            </ul>

            {exp.stack && (
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="text-xs text-slate-500 mr-1">{t("experience.stack")}</span>
                {exp.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Formation */}
      <motion.h3
        className="text-xl font-semibold text-primary mb-6"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {t("experience.education")}
      </motion.h3>

      <div className="space-y-4 mb-16">
        {formations.map((edu, index) => (
          <motion.div
            key={index}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div>
              <h4 className="font-semibold text-white">{edu.title}</h4>
              <p className="text-sm text-slate-400">
                {edu.institution} — {edu.location}
              </p>
              {edu.description && <p className="text-xs text-slate-500 mt-1">{edu.description}</p>}
            </div>
            <div className="mt-2 sm:mt-0 text-right">
              <span
                className={`text-sm font-mono ${edu.current ? "text-primary" : "text-slate-500"}`}
              >
                {edu.period}
              </span>
              {edu.current && (
                <p className="text-xs text-emerald-400">{t("experience.inProgress")}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Certifications */}
      <motion.div
        className="pt-8 border-t border-slate-800"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <p className="text-center text-slate-500 text-sm mb-6 uppercase tracking-widest">
          {t("experience.certifiedBy")}
        </p>
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {certifications.map((cert) => (
            <div
              key={cert}
              className="text-base md:text-lg font-bold text-slate-400 hover:text-white transition"
            >
              {cert}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ExperienceSection;
