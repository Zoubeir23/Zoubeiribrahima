import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { useLanguage } from "@/hooks/useLanguage";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
};

const languages = [
  { name: "Français", level: "Natif" },
  { name: "Arabe", level: "Courant" },
  { name: "Anglais", level: "Intermédiaire (B1)" },
];

const LanguagesSection = () => {
  const { t } = useLanguage();

  return (
    <AnimatedSection delay={0.05}>
      <div className="section-card">
        <h2 className="section-title">
          <Globe className="section-icon" />
          {t("languages.title")}
        </h2>
        <motion.div
          className="flex flex-wrap gap-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {languages.map((lang) => (
            <motion.div
              key={lang.name}
              className="skill-badge flex items-center gap-2"
              variants={itemVariants}
              whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary))" }}
            >
              <span className="font-medium">{lang.name}</span>
              <span className="text-muted-foreground text-xs">({lang.level})</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
};

export default LanguagesSection;
