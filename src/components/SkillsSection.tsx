import type { ElementType } from "react";
import { motion } from "@/lib/static-motion";
import { Server, Brain, Cloud } from "lucide-react";

interface SkillCard {
  icon: ElementType;
  title: string;
  techs: string[];
  emoji: string;
}

const skillCards: SkillCard[] = [
  {
    icon: Server,
    title: "Backend Architecture",
    techs: ["Architecture backend", "API REST", "Modelisation de donnees", "Integration de services"],
    emoji: "⚙️",
  },
  {
    icon: Brain,
    title: "AI & Intelligence",
    techs: ["Automatisation intelligente", "Conception de prompts", "Integration IA", "Analyse de donnees"],
    emoji: "🧠",
  },
  {
    icon: Cloud,
    title: "DevOps & Cloud",
    techs: ["Conteneurisation", "Deploiement continu", "Versioning", "Supervision"],
    emoji: "☁️",
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="bg-[var(--surface-deepest)] py-14 sm:py-18 md:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-display font-bold text-white/55 text-sm uppercase tracking-[0.3em] mb-3">
            — Technologies
          </p>
          <h2 className="font-display font-black text-white text-3xl sm:text-5xl md:text-7xl uppercase leading-tight">
            My Tech
            <br />
            <span className="text-white/35">Stack</span>
          </h2>
        </motion.div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[var(--surface-border)] bg-[var(--surface-deepest)] rounded-md">
          {skillCards.map((card, index) => (
            <motion.div
              key={card.title}
              className="group border-b md:border-b-0 md:border-r border-[var(--surface-border)] last:border-b-0 md:last:border-r-0 p-5 sm:p-6 md:p-7 bg-[var(--surface-deepest)] hover:bg-white transition-all duration-200 cursor-default"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Icon */}
              <div className="mb-6">
                <div className="w-14 h-14 border border-[var(--surface-border)] group-hover:border-[var(--accent-violet)] flex items-center justify-center bg-white group-hover:bg-[var(--surface-raised)] transition-all duration-200 rounded-md">
                  <card.icon className="w-6 h-6 text-[var(--surface-deepest)] group-hover:text-white transition-colors duration-200" />
                </div>
              </div>

              {/* Title */}
              <h3 className="font-display font-black text-lg sm:text-xl uppercase text-white group-hover:text-[var(--surface-deepest)] mb-6 transition-colors duration-200">
                {card.title}
              </h3>

              {/* Tech list */}
              <ul className="space-y-2">
                {card.techs.map((tech) => (
                  <li
                    key={tech}
                    className="flex min-w-0 items-center gap-3 font-body font-semibold text-xs sm:text-sm text-white/80 group-hover:text-[var(--surface-deepest)]/80 transition-colors duration-200"
                  >
                    <span className="w-2 h-2 bg-white group-hover:bg-[var(--surface-raised)] shrink-0 transition-colors duration-200" />
                    {tech}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Full stack tags row */}
        <motion.div
          className="mt-12 border-t border-[var(--surface-border)] pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="font-display font-bold text-white/70 text-xs uppercase tracking-[0.3em] mb-4">
            Domaines maitrises
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {["Backend", "APIs", "Data", "Frontend", "Automatisation", "DevOps", "Architecture", "Qualite", "Securite", "Scalabilite"].map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-2 font-body font-bold text-[11px] sm:text-xs uppercase tracking-[0.08em] sm:tracking-wider border border-[var(--surface-border)] text-white px-3 py-1.5 hover:bg-white hover:text-[var(--surface-deepest)] transition-all duration-150 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
