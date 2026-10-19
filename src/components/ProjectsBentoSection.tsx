import { motion } from "@/lib/static-motion";
import { ArrowRight, ExternalLink } from "lucide-react";

const ProjectsBentoSection = () => {
  const mobileProjects = [
    {
      title: "Snapfolioo",
      status: "Projet Vedette",
      desc: "Plateforme SaaS no-code permettant aux professionnels de créer des portfolios, CV et bannières LinkedIn en quelques minutes.",
      tags: ["React 18", "TypeScript", "Vite", "Supabase", "Tailwind CSS", "Vercel", "Playwright"],
      link: "https://snapfolioo.com",
      cta: "Explorer le Projet",
      featured: true,
    },
    {
      title: "Smart-HR",
      status: "Coming Soon",
      desc: "Système de Gestion RH intelligent avec IA intégrée, recrutement automatisé et analytics avancés.",
      tags: ["Django", "React", "TypeScript", "PostgreSQL", "Docker"],
      link: "https://github.com/Zoubeir23",
      cta: "Voir le profil",
      featured: false,
    },
    {
      title: "Tchokos SARL — B2B",
      status: "En cours",
      desc: "Plateforme e-commerce B2B sur mesure avec catalogue centralisé, portail revendeurs et back-office admin.",
      tags: ["Django", "Python", "PostgreSQL", "TailwindCSS"],
      link: "https://github.com/Zoubeir23",
      cta: "Voir le profil",
      featured: false,
    },
  ];

  return (
    <section id="projects" className="bg-[var(--surface-deepest)] py-14 sm:py-18 md:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-display font-bold text-white/50 text-sm uppercase tracking-[0.3em] mb-3">
            — Portfolio
          </p>
          <h2 className="font-display font-black text-white text-3xl sm:text-5xl md:text-7xl uppercase leading-tight">
            Mes
            <br />
            <span className="bg-white text-[var(--surface-deepest)] px-3 inline-block rounded-full">Projets</span>
          </h2>
        </motion.div>

        <div className="md:hidden mb-8 -mx-4 px-4">
          <div
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2"
            tabIndex={0}
            aria-label="Projets défilables horizontalement"
          >
            {mobileProjects.map((project) => (
              <article
                key={project.title}
                className={`snap-start shrink-0 w-[86vw] border border-[var(--surface-border)] p-5 flex flex-col gap-5 ${project.featured ? "bg-[var(--surface-raised)]" : "bg-[var(--surface-deepest)]"}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-display font-black text-[10px] uppercase tracking-[0.22em] bg-white text-[var(--surface-deepest)] px-3 py-1.5 rounded-full">
                    {project.status}
                  </span>
                  {project.featured ? (
                    <span className="font-display font-black text-[10px] uppercase tracking-[0.22em] text-white/70">
                      Swipe mobile
                    </span>
                  ) : null}
                </div>

                <div>
                  <h3 className="font-display font-black text-3xl uppercase text-white leading-none mb-3">
                    {project.title}
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-white/80">
                    {project.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-body font-bold text-[10px] uppercase tracking-wider border border-[var(--surface-border)] text-white px-2.5 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white text-[var(--surface-deepest)] font-display font-black text-xs uppercase tracking-wide border border-[var(--surface-border)] rounded-full"
                >
                  {project.cta}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </article>
            ))}
          </div>
          <p className="mt-3 font-body text-xs uppercase tracking-[0.18em] text-white/65 text-center">
            Glisse à droite ou à gauche pour voir les projets
          </p>
        </div>

        <div className="hidden md:block">
        {/* Featured Project - Snapfolioo */}
        <motion.div
          className="mb-4 border border-[var(--surface-border)] bg-[var(--surface-deepest)] group hover:bg-[var(--surface-raised)] transition-all duration-200 rounded-md"
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
                  <span className="font-display font-black text-xs uppercase tracking-widest bg-[var(--surface-deepest)] text-white px-4 py-2">
                    ★ Projet Vedette
                  </span>
                  <span className="font-display font-black text-xs uppercase tracking-widest border border-[var(--surface-border)] text-white px-4 py-2">
                    En Production
                  </span>
                </div>
                <h3 className="font-display font-black text-3xl sm:text-5xl md:text-6xl uppercase text-white leading-none mb-4">
                  Snapfolioo
                </h3>
                <p className="font-body text-white/85 text-base sm:text-lg leading-relaxed mb-8">
                  Plateforme SaaS no-code permettant aux professionnels de creer des portfolios, CV et bannieres LinkedIn en quelques minutes. Editeur visuel en temps reel, +18 templates, sauvegarde cloud Supabase et publication instantanee.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["React 18", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "Vercel", "Playwright"].map((tag) => (
                    <span
                      key={tag}
                      className="font-display font-bold text-xs uppercase tracking-wider border border-[var(--surface-border)] text-white px-3 py-1 hover:bg-white hover:text-[var(--surface-deepest)] transition-all duration-150"
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
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 sm:px-8 py-3.5 sm:py-4 bg-white text-[var(--surface-deepest)] font-display font-black text-xs sm:text-sm uppercase tracking-wide border border-[var(--surface-border)] hover:bg-[var(--text-secondary)] hover:text-[var(--surface-deepest)] transition-all duration-150 min-h-11 rounded-full"
                >
                  <ExternalLink className="w-4 h-4" />
                  Explorer le Projet
                </a>
                <a
                  href="https://github.com/Zoubeir23"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 sm:px-8 py-3.5 sm:py-4 bg-white text-[var(--surface-deepest)] font-display font-black text-xs sm:text-sm uppercase tracking-wide border border-[var(--surface-border)] hover:bg-[var(--text-secondary)] hover:text-[var(--surface-deepest)] transition-all duration-150 min-h-11 rounded-full"
                >
                  GitHub →
                </a>
              </div>
            </div>

            {/* Visual / Stats side */}
            <div className="border-t lg:border-t-0 lg:border-l border-[var(--surface-border)] p-6 sm:p-8 md:p-14 flex flex-col justify-center gap-6 sm:gap-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { number: "SaaS", label: "Produit lancé" },
                  { number: "18+", label: "Templates" },
                  { number: "Jan 2026", label: "Depuis" },
                  { number: "Vercel", label: "Deploiement" },
                ].map((stat) => (
                  <div key={stat.label} className="border border-[var(--surface-border)] p-5">
                    <p className="font-display font-black text-2xl sm:text-3xl text-white mb-1">
                      {stat.number}
                    </p>
                    <p className="font-body font-semibold text-xs uppercase tracking-wider text-white/80">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-[var(--surface-border)] pt-6">
                <p className="font-display font-bold text-xs uppercase tracking-[0.2em] text-white/75 mb-3">
                  Architecture
                </p>
                <p className="font-body text-sm text-white/85 leading-relaxed">
                  Frontend React 18 + TypeScript + Vite · Styling Tailwind CSS · Backend Supabase (PostgreSQL + Auth) · Tests Playwright · Deploye sur Vercel
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
              className="border border-[var(--surface-border)] p-6 sm:p-8 bg-[var(--surface-deepest)] group hover:bg-white transition-all duration-200 rounded-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between mb-6">
                <h3 className="font-display font-black text-xl sm:text-2xl uppercase text-white group-hover:text-[var(--surface-deepest)] transition-colors duration-200 leading-tight">
                  {project.title}
                </h3>
                <span className="font-display font-black text-xs uppercase tracking-widest bg-white group-hover:bg-[var(--surface-raised)] text-[var(--surface-deepest)] group-hover:text-white px-3 py-1.5 shrink-0 ml-4 transition-all duration-200 rounded-full">
                  {project.status}
                </span>
              </div>
              <p className="font-body text-sm text-white/70 group-hover:text-[var(--surface-deepest)]/70 leading-relaxed mb-6 transition-colors duration-200">
                {project.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-body font-bold text-xs uppercase tracking-wider border border-[var(--surface-border)] group-hover:border-[var(--accent-violet)] text-white group-hover:text-[var(--surface-deepest)] px-3 py-1 transition-all duration-200"
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
            className="inline-flex items-center gap-3 font-display font-black text-sm uppercase tracking-widest text-white border-b border-[var(--surface-border)] pb-1 hover:border-transparent transition-all duration-150 group"
          >
            Voir tous mes projets sur GitHub
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsBentoSection;
