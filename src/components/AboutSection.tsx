import { motion } from "framer-motion";

const experiences = [
  {
    company: "HooYia",
    role: "Stagiaire Développeur Backend",
    period: "Févr. 2026 — Présent",
    location: "Cameroun · À distance",
    desc: "Participation au développement et à la maintenance des applications backend. Conception et optimisation d'API et de bases de données. Collaboration avec l'équipe technique pour la mise en œuvre de nouvelles fonctionnalités.",
    tags: ["Spring Boot", "Java", "PostgreSQL", "REST API"],
    active: true,
  },
  {
    company: "Snapfolioo",
    role: "Fondateur & Développeur Principal",
    period: "Janv. 2026 — Présent",
    location: "Dakar, Sénégal",
    desc: "Conception et développement d'une plateforme SaaS permettant de créer portfolios, CV et bannières LinkedIn. Développement de +18 templates professionnels avec éditeur visuel en temps réel. Architecture scalable avec auto-sauvegarde et export multi-formats.",
    tags: ["React", "TypeScript", "Supabase", "TailwindCSS", "OpenAI SDK"],
    active: true,
  },
];

const education = [
  {
    degree: "Licence IAGE",
    school: "ISI — Institut Supérieur d'Informatique, Dakar",
    period: "2023 — 2026 (en cours)",
  },
  {
    degree: "BTS Informatique de Gestion",
    school: "ISI, Dakar, Sénégal",
    period: "2023 — 2025",
  },
  {
    degree: "Baccalauréat Série C",
    school: "École Communautaire Arabo-Islamique, Mitsoudjé, Comores",
    period: "2023",
  },
];

const AboutSection = () => {
  return (
    <section id="experience" className="bg-[#F5C400] py-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-display font-bold text-[#131313]/50 text-sm uppercase tracking-[0.3em] mb-3">
            — Parcours
          </p>
          <h2 className="font-display font-black text-[#131313] text-5xl md:text-8xl uppercase leading-tight">
            Expériences<br />
            <span className="text-[#131313]/30">&amp; Formation</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

          {/* ── Experiences column ── */}
          <div className="border-r-0 lg:border-r-8 border-b-8 lg:border-b-0 border-[#131313] pr-0 lg:pr-12 pb-12 lg:pb-0">
            <p className="font-display font-black text-xs uppercase tracking-[0.3em] text-[#131313]/50 mb-10">
              Expérience professionnelle
            </p>

            <div className="relative border-l-8 border-[#131313] pl-8 space-y-16">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.company}
                  className="relative"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  {/* Square dot */}
                  <div
                    className={`absolute -left-[2.625rem] top-1 w-5 h-5 border-4 border-[#131313] ${
                      exp.active ? "bg-[#131313]" : "bg-[#F5C400]"
                    }`}
                  />

                  <div className="flex flex-col gap-1 mb-3">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h3 className="font-display font-black text-2xl md:text-3xl text-[#131313] uppercase tracking-tight leading-none">
                        {exp.company}
                      </h3>
                      <span className="font-body font-bold text-xs uppercase tracking-wider text-[#131313]/50 bg-[#131313]/10 px-3 py-1 border-2 border-[#131313]/20">
                        {exp.period}
                      </span>
                    </div>
                    <p className="font-display font-bold text-base text-[#131313]/70 uppercase tracking-wide">
                      {exp.role}
                    </p>
                    <p className="font-body text-xs font-semibold text-[#131313]/50 uppercase tracking-wider">
                      {exp.location}
                    </p>
                  </div>

                  <p className="font-body text-[#131313]/80 leading-relaxed mb-5">
                    {exp.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-body font-bold text-xs uppercase tracking-wider bg-[#131313] text-[#F5C400] px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Education column ── */}
          <div className="pt-12 lg:pt-0 lg:pl-12">
            <p className="font-display font-black text-xs uppercase tracking-[0.3em] text-[#131313]/50 mb-10">
              Formation académique
            </p>

            <div className="space-y-0">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.degree}
                  className="border-b-4 border-[#131313] py-8 group hover:bg-[#131313] hover:px-4 transition-all duration-200"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-body font-bold text-xs uppercase tracking-wider text-[#131313]/50 group-hover:text-[#F5C400]/60 transition-colors">
                      {edu.period}
                    </span>
                    <h4 className="font-display font-black text-xl uppercase text-[#131313] group-hover:text-[#F5C400] transition-colors leading-tight">
                      {edu.degree}
                    </h4>
                    <p className="font-body text-sm text-[#131313]/70 group-hover:text-[#F5C400]/70 transition-colors">
                      {edu.school}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Languages */}
            <motion.div
              className="mt-12 border-4 border-[#131313] p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <p className="font-display font-black text-xs uppercase tracking-[0.3em] text-[#131313]/50 mb-6">
                Langues
              </p>
              <div className="space-y-4">
                {[
                  { lang: "Français", level: "Natif", pct: 100 },
                  { lang: "Anglais", level: "Technique", pct: 70 },
                  { lang: "Arabe", level: "Lecture & Écriture", pct: 60 },
                ].map((l) => (
                  <div key={l.lang}>
                    <div className="flex justify-between mb-1">
                      <span className="font-display font-black text-sm uppercase text-[#131313]">{l.lang}</span>
                      <span className="font-body font-bold text-xs uppercase text-[#131313]/60">{l.level}</span>
                    </div>
                    <div className="h-2 bg-[#131313]/10 border-2 border-[#131313]">
                      <div
                        className="h-full bg-[#131313]"
                        style={{ width: `${l.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
