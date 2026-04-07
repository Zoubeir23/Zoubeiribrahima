import type { ElementType } from "react";
import { motion } from "framer-motion";
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
    techs: ["Django", "Spring Boot", "FastAPI", "Node.js", "Laravel", "PHP"],
    emoji: "⚙️",
  },
  {
    icon: Brain,
    title: "AI & Intelligence",
    techs: ["LLMs", "OpenAI SDK", "Claude API", "Prompt Engineering"],
    emoji: "🧠",
  },
  {
    icon: Cloud,
    title: "DevOps & Cloud",
    techs: ["Docker", "Git", "GitHub", "AWS", "CI/CD", "Supabase"],
    emoji: "☁️",
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="bg-[#FFFFFF] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-display font-bold text-[#F5C400] text-sm uppercase tracking-[0.3em] mb-3">
            — Technologies
          </p>
          <h2 className="font-display font-black text-[#F5C400] text-5xl md:text-7xl uppercase leading-tight">
            My Tech
            <br />
            <span className="text-[#F5C400]">Stack</span>
          </h2>
        </motion.div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-4 border-[#F5C400]">
          {skillCards.map((card, index) => (
            <motion.div
              key={card.title}
              className="group border-r-4 border-[#F5C400] last:border-r-0 p-8 bg-[#FFFFFF] hover:bg-[#F5C400] transition-all duration-200 cursor-default"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Icon */}
              <div className="mb-6">
                <div className="w-14 h-14 border-4 border-[#F5C400] group-hover:border-[#FFFFFF] flex items-center justify-center bg-[#F5C400] group-hover:bg-[#FFFFFF] transition-all duration-200">
                  <card.icon className="w-6 h-6 text-[#FFFFFF] group-hover:text-[#F5C400] transition-colors duration-200" />
                </div>
              </div>

              {/* Title */}
              <h3 className="font-display font-black text-xl uppercase text-[#F5C400] group-hover:text-[#FFFFFF] mb-6 transition-colors duration-200">
                {card.title}
              </h3>

              {/* Tech list */}
              <ul className="space-y-2">
                {card.techs.map((tech) => (
                  <li
                    key={tech}
                    className="flex items-center gap-3 font-body font-semibold text-sm text-[#F5C400]/80 group-hover:text-[#FFFFFF]/80 transition-colors duration-200"
                  >
                    <span className="w-2 h-2 bg-[#F5C400] group-hover:bg-[#FFFFFF] shrink-0 transition-colors duration-200" />
                    {tech}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Full stack tags row */}
        <motion.div
          className="mt-12 border-t-4 border-[#F5C400] pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="font-display font-bold text-[#F5C400] text-xs uppercase tracking-[0.3em] mb-4">
            Langages & Outils maîtrisés
          </p>
          <div className="flex flex-wrap gap-3">
            {["JavaScript", "Python", "PHP", "Java", "SQL", "React.js", "TailwindCSS", "PostgreSQL", "MySQL", "Docker", "GitHub", "Claude Code"].map((tech) => (
              <span
                key={tech}
                className="font-body font-bold text-xs uppercase tracking-wider border-2 border-[#F5C400] text-[#F5C400] px-3 py-1 hover:bg-[#F5C400] hover:text-[#FFFFFF] transition-all duration-150 cursor-default"
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
