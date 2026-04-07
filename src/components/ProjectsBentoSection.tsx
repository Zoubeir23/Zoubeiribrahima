import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";

const ProjectsBentoSection = () => {
  return (
    <section id="projects" className="bg-[#143DFF] py-14 sm:py-18 md:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-display font-bold text-[#FFFFFF]/50 text-sm uppercase tracking-[0.3em] mb-3">
            — Portfolio
          </p>
          <h2 className="font-display font-black text-[#FFFFFF] text-3xl sm:text-5xl md:text-7xl uppercase leading-tight">
            Mes
            <br />
            <span className="bg-[#FFFFFF] text-[#143DFF] px-3 inline-block">Projets</span>
          </h2>
        </motion.div>

        {/* Featured Project - Snapfolioo */}
        <motion.div
          className="mb-4 border-4 border-[#FFFFFF] bg-[#FFFFFF] group hover:bg-[#FFFFFF] transition-all duration-200"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Content */}
            <div className="p-6 sm:p-8 md:p-14 flex flex-col justify-between gap-8 sm:gap-10">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-display font-black text-xs uppercase tracking-widest bg-[#143DFF] text-[#FFFFFF] px-4 py-2">
                    ★ Projet Vedette
                  </span>
                  <span className="font-display font-black text-xs uppercase tracking-widest border-2 border-[#143DFF]/45 text-[#143DFF] px-4 py-2">
                    En Production
                  </span>
                </div>
                <h3 className="font-display font-black text-3xl sm:text-5xl md:text-6xl uppercase text-[#143DFF] leading-none mb-4">
                  Snapfolioo
                </h3>
                <p className="font-body text-[#143DFF] text-base sm:text-lg leading-relaxed mb-8">
                  Plateforme SaaS no-code permettant aux professionnels de créer des portfolios, CV et bannières LinkedIn en quelques minutes. Éditeur visuel temps réel, +18 templates, export multi-formats.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["Django", "OpenAI SDK", "React", "Supabase", "PostgreSQL"].map((tag) => (
                    <span
                      key={tag}
                      className="font-display font-bold text-xs uppercase tracking-wider border-2 border-[#143DFF]/40 text-[#143DFF] px-3 py-1 hover:bg-[#143DFF] hover:text-[#FFFFFF] transition-all duration-150"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <a
                  href="https://snapfolioo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 sm:px-8 py-3.5 sm:py-4 bg-[#143DFF] text-[#FFFFFF] font-display font-black text-xs sm:text-sm uppercase tracking-wide border-4 border-[#143DFF] hover:bg-transparent hover:text-[#143DFF] transition-all duration-150 min-h-11"
                >
                  <ExternalLink className="w-4 h-4" />
                  Explorer le Projet
                </a>
                <a
                  href="https://github.com/Zoubeir23"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 sm:px-8 py-3.5 sm:py-4 bg-transparent text-[#143DFF] font-display font-black text-xs sm:text-sm uppercase tracking-wide border-4 border-[#143DFF] hover:bg-[#143DFF] hover:text-[#FFFFFF] transition-all duration-150 min-h-11"
                >
                  GitHub →
                </a>
              </div>
            </div>

            {/* Visual / Stats side */}
            <div className="border-t-4 lg:border-t-0 lg:border-l-4 border-[#143DFF]/30 p-6 sm:p-8 md:p-14 flex flex-col justify-center gap-6 sm:gap-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { number: "SaaS", label: "Produit lancé" },
                  { number: "18+", label: "Templates" },
                  { number: "Jan 2026", label: "Depuis" },
                  { number: "AI", label: "Powered" },
                ].map((stat) => (
                  <div key={stat.label} className="border-4 border-[#143DFF]/20 p-5">
                    <p className="font-display font-black text-2xl sm:text-3xl text-[#143DFF] mb-1">
                      {stat.number}
                    </p>
                    <p className="font-body font-semibold text-xs uppercase tracking-wider text-[#143DFF]/80">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t-4 border-[#143DFF]/20 pt-6">
                <p className="font-display font-bold text-xs uppercase tracking-[0.2em] text-[#143DFF]/75 mb-3">
                  Architecture
                </p>
                <p className="font-body text-sm text-[#143DFF]/85 leading-relaxed">
                  Backend Django REST Framework · Frontend React/TypeScript · Auth & DB Supabase · IA via OpenAI SDK · Déployé sur VPS
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Secondary Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Smart-HR",
              desc: "Système de Gestion RH intelligent avec IA intégrée — recrutement automatisé, gestion des congés, paie et analytics avancés.",
              tags: ["Django", "React", "TypeScript", "PostgreSQL", "Docker"],
              status: "Coming Soon",
            },
            {
              title: "Tchokos SARL — B2B",
              desc: "Plateforme e-commerce B2B sur mesure pour un grossiste mode à Douala. Catalogue centralisé, portail revendeurs, gestion des demandes d'importation et back-office admin.",
              tags: ["Django", "Python", "PostgreSQL", "TailwindCSS"],
              status: "En cours",
            },
          ].map((project, index) => (
            <motion.div
              key={project.title}
              className="border-4 border-[#FFFFFF] p-6 sm:p-8 bg-[#143DFF] group hover:bg-[#FFFFFF] transition-all duration-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between mb-6">
                <h3 className="font-display font-black text-xl sm:text-2xl uppercase text-[#FFFFFF] group-hover:text-[#143DFF] transition-colors duration-200 leading-tight">
                  {project.title}
                </h3>
                <span className="font-display font-black text-xs uppercase tracking-widest bg-[#FFFFFF] group-hover:bg-[#143DFF] text-[#143DFF] group-hover:text-[#FFFFFF] px-3 py-1.5 shrink-0 ml-4 transition-all duration-200">
                  {project.status}
                </span>
              </div>
              <p className="font-body text-sm text-[#FFFFFF]/70 group-hover:text-[#143DFF]/70 leading-relaxed mb-6 transition-colors duration-200">
                {project.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-body font-bold text-xs uppercase tracking-wider border-2 border-[#FFFFFF] group-hover:border-[#143DFF] text-[#FFFFFF] group-hover:text-[#143DFF] px-3 py-1 transition-all duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          className="mt-8 flex justify-start sm:justify-end"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <a
            href="https://github.com/Zoubeir23"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-display font-black text-sm uppercase tracking-widest text-[#FFFFFF] border-b-4 border-[#FFFFFF] pb-1 hover:border-transparent transition-all duration-150 group"
          >
            Voir tous mes projets sur GitHub
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsBentoSection;
