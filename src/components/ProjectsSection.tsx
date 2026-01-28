import { motion } from "framer-motion";
import { ExternalLink, Github, Rocket, Briefcase, Users, Plane } from "lucide-react";

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-28 px-4 max-w-6xl mx-auto">
      <div className="flex items-end justify-between mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-display font-bold text-white">Créations Digitales</h2>
          <p className="text-slate-400 mt-2">
            Des produits que j'ai conçus, développés et déployés.
          </p>
        </motion.div>
        <motion.a
          href="https://github.com/Zoubeir23"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Voir tout GitHub <ExternalLink className="w-4 h-4" />
        </motion.a>
      </div>

      {/* Featured Project - Snapfolioo */}
      <motion.div
        className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden mb-8 grid md:grid-cols-2 group hover:border-primary/50 transition duration-500"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/20">
              EN PRODUCTION
            </span>
            <span className="text-slate-500 text-sm">SaaS Platform</span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-4">Snapfolioo</h3>

          <div className="space-y-4 mb-6">
            <div>
              <h4 className="text-sm font-bold text-primary mb-1">🎯 Problème</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Les freelances et créateurs ont du mal à créer un portfolio professionnel rapidement
                sans compétences techniques.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-primary mb-1">🛠️ Solution</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Plateforme SaaS no-code avec éditeur visuel temps réel, templates pro et
                authentification sécurisée.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-primary mb-1">🚀 Résultat</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Portfolio créé en 5 min, +50 templates disponibles, architecture scalable sur
                Supabase.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-primary mb-1">👨‍💻 Mon rôle</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Fullstack Developer — Conception, développement et déploiement complet (React,
                Supabase, PostgreSQL).
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 bg-slate-800 rounded text-xs text-slate-300">React</span>
            <span className="px-3 py-1 bg-slate-800 rounded text-xs text-slate-300">Supabase</span>
            <span className="px-3 py-1 bg-slate-800 rounded text-xs text-slate-300">Tailwind</span>
            <span className="px-3 py-1 bg-slate-800 rounded text-xs text-slate-300">
              PostgreSQL
            </span>
          </div>
          <div className="flex gap-4">
            <a
              href="https://snapfolioo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition flex items-center gap-2"
            >
              <Rocket className="w-4 h-4" /> Voir le site
            </a>
          </div>
        </div>
        <div className="bg-slate-800 order-1 md:order-2 relative overflow-hidden h-64 md:h-auto">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 group-hover:scale-105 transition duration-700">
            <div className="w-3/4 h-3/4 bg-slate-950 rounded-xl border border-slate-700 shadow-2xl flex items-center justify-center">
              <span className="text-slate-600 font-display text-2xl font-bold">UI Snapfolioo</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Other Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* SamaWeb Africa */}
        <motion.div
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:-translate-y-1 transition duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="h-10 w-10 rounded bg-blue-900/30 flex items-center justify-center text-blue-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <a
              href="https://github.com/Zoubeir23"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-white cursor-pointer"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
          <h4 className="text-xl font-bold text-white mb-2">SamaWeb Africa</h4>
          <p className="text-sm text-slate-400 mb-4 line-clamp-3">
            Agence digitale co-fondée. Développement de solutions numériques, sites web et
            applications mobiles sur mesure pour entreprises africaines.
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            <span className="text-xs text-blue-400">#Django</span>
            <span className="text-xs text-blue-400">#React</span>
          </div>
        </motion.div>

        {/* Gestion Employés */}
        <motion.div
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:-translate-y-1 transition duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="h-10 w-10 rounded bg-indigo-900/30 flex items-center justify-center text-indigo-400">
              <Users className="w-5 h-5" />
            </div>
            <a
              href="https://github.com/Zoubeir23/Gestion_Employer-Django-"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-white cursor-pointer"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
          <h4 className="text-xl font-bold text-white mb-2">Gestion Employés</h4>
          <p className="text-sm text-slate-400 mb-4 line-clamp-3">
            Application CRUD complète avec Authentification, Admin Interface et API REST.
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            <span className="text-xs text-indigo-400">#Python</span>
            <span className="text-xs text-indigo-400">#PostgreSQL</span>
          </div>
        </motion.div>

        {/* LongHor Voyage */}
        <motion.div
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:-translate-y-1 transition duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="h-10 w-10 rounded bg-orange-900/30 flex items-center justify-center text-orange-400">
              <Plane className="w-5 h-5" />
            </div>
            <a
              href="https://github.com/Zoubeir23/longhorvoyage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-white cursor-pointer"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
          <h4 className="text-xl font-bold text-white mb-2">LongHor Voyage</h4>
          <p className="text-sm text-slate-400 mb-4 line-clamp-3">
            App de réservation de voyages avec TypeScript. Gestion d'itinéraires et interface
            utilisateur moderne.
          </p>
          <div className="flex flex-wrap gap-2 mt-auto">
            <span className="text-xs text-orange-400">#TypeScript</span>
            <span className="text-xs text-orange-400">#React</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
