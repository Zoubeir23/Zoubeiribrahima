import { motion } from "framer-motion";
import { Sparkles, Code2, BookOpen } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.3 }
  },
};

interface SkillCardProps {
  icon: React.ElementType;
  title: string;
  skills: string[];
  delay?: number;
}

const SkillCard = ({ icon: Icon, title, skills, delay = 0 }: SkillCardProps) => (
  <AnimatedSection delay={delay}>
    <div className="section-card">
      <h2 className="section-title">
        <Icon className="section-icon" />
        {title}
      </h2>
      <motion.div 
        className="flex flex-wrap gap-2"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {skills.map((skill) => (
          <motion.span 
            key={skill} 
            className="skill-badge"
            variants={itemVariants}
            whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary))" }}
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </div>
  </AnimatedSection>
);

const SkillsSection = () => {
  const skills = ["Développement Web", "Développement Logiciel", "Automatisation", "API REST"];
  const programmingLanguages = ["Python", "Java", "JavaScript", "HTML5", "CSS", "SQL"];
  const frameworks = ["Django", "Flask", "React", "WordPress"];
  const learning = ["Cybersécurité", "GitHub Copilot", "Claude AI", "Cloud Computing"];

  return (
    <div className="space-y-4">
      <SkillCard icon={Sparkles} title="Compétences" skills={skills} delay={0} />
      <SkillCard icon={Code2} title="Langages de Programmation" skills={programmingLanguages} delay={0.1} />
      <SkillCard icon={Code2} title="Frameworks & Outils" skills={frameworks} delay={0.15} />
      <SkillCard icon={BookOpen} title="En cours d'apprentissage" skills={learning} delay={0.2} />
    </div>
  );
};

export default SkillsSection;
