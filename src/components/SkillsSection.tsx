import type { ElementType } from "react";
import { motion } from "framer-motion";
import { Server, Brain, Cloud } from "lucide-react";

interface SkillCard {
  icon: ElementType;
  title: string;
  techs: string[];
}

const skillCards: SkillCard[] = [
  {
    icon: Server,
    title: "Backend Architecture",
    techs: ["Django", "Spring Boot", "FastAPI", "Node.js", "Laravel", "PHP"],
  },
  {
    icon: Brain,
    title: "AI & Intelligence",
    techs: ["LLMs", "OpenAI SDK", "Claude API", "Prompt Engineering"],
  },
  {
    icon: Cloud,
    title: "DevOps & Cloud",
    techs: ["Docker", "Git", "GitHub", "AWS", "CI/CD", "Supabase"],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="bg-[#F5C400] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-display font-bold text-[#131313]/50 text-sm uppercase tracking-[0.3em] mb-3">
            — Technologies
          </p>
          <h2 className="font-display font-black text-[#131313] text-5xl md:text-7xl uppercase leading-tight">
            My Tech
            <br />
            <span className="bg-[#131313] text-[#F5C400] px-3 inline-block">Stack</span>
          </h2>
        </motion.div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {skillCards.map((card, index) => (
            <motion.div
              key={card.title}
              className="p-8 bg-[#F5C400] border-2 border-[#131313]/20 hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#131313] transition-all duration-200"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Icon */}
              <div className="mb-6">
                <div className="w-12 h-12 border-2 border-[#131313] bg-[#131313] flex items-center justify-center">
                  <card.icon className="w-5 h-5 text-[#F5C400]" />
                </div>
              </div>

              {/* Title */}
              <h3 className="font-display font-black text-xl uppercase text-[#131313] mb-5">
                {card.title}
              </h3>

              {/* Tech list */}
              <ul className="space-y-2">
                {card.techs.map((tech) => (
                  <li
                    key={tech}
                    className="flex items-center gap-3 font-body font-semibold text-sm text-[#131313]/70"
                  >
                    <span className="w-1.5 h-1.5 bg-[#131313] shrink-0" />
                    {tech}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Full stack tags row */}
        <motion.div
          className="mt-12 border-t-2 border-[#131313]/20 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="font-display font-bold text-[#131313]/50 text-xs uppercase tracking-[0.3em] mb-4">
            Langages & Outils maîtrisés
          </p>
          <div className="flex flex-wrap gap-2">
            {["JavaScript", "Python", "PHP", "Java", "SQL", "React.js", "TailwindCSS", "PostgreSQL", "MySQL", "Docker", "GitHub", "Claude Code"].map((tech) => (
              <span
                key={tech}
                className="font-body font-semibold text-xs uppercase tracking-wider border border-[#131313]/30 text-[#131313]/70 px-3 py-1"
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
