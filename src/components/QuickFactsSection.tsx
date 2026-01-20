import { motion } from "framer-motion";
import { User } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const QuickFactsSection = () => {
  return (
    <AnimatedSection delay={0}>
      <div className="section-card">
        <h2 className="section-title">
          <User className="section-icon" />
          Informations Rapides
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Âge</p>
            <motion.p 
              className="text-lg font-semibold text-foreground"
              initial={{ opacity: 0, y: 5 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
            >
              19 ans
            </motion.p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Expérience</p>
            <motion.p 
              className="text-lg font-semibold text-foreground"
              initial={{ opacity: 0, y: 5 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              2+ ans
            </motion.p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default QuickFactsSection;
