import { motion } from "framer-motion";
import { Trophy, GraduationCap } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const achievements = [
  {
    title: "CS50x Completion",
    description: "Terminé le cours CS50x de Harvard sur edX",
    year: "2024",
  },
  {
    title: "CS50p Completion",
    description: "Terminé le cours CS50 Python de Harvard",
    year: "2024",
  },
];

const education = [
  {
    title: "Formation Développeur",
    subtitle: "En cours",
    year: "2024-2026",
    badge: "Python, Java, Web",
  },
];

const AchievementsSection = () => {
  return (
    <div className="space-y-4">
      <AnimatedSection delay={0.1}>
        <div className="section-card">
          <h2 className="section-title">
            <Trophy className="section-icon" />
            Réalisations
          </h2>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <motion.div 
                key={index} 
                className="flex justify-between items-start"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div>
                  <h3 className="font-medium text-foreground">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
                <motion.span 
                  className="text-sm text-primary font-medium shrink-0 ml-4"
                  whileHover={{ scale: 1.1 }}
                >
                  {achievement.year}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <div className="section-card">
          <h2 className="section-title">
            <GraduationCap className="section-icon" />
            Formation
          </h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <motion.div 
                key={index} 
                className="flex justify-between items-start"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div>
                  <h3 className="font-medium text-foreground">{edu.title}</h3>
                  <p className="text-sm text-muted-foreground">{edu.subtitle}</p>
                  {edu.badge && (
                    <motion.span 
                      className="inline-block mt-2 text-xs px-2 py-0.5 rounded bg-secondary border border-border text-muted-foreground"
                      whileHover={{ borderColor: "hsl(var(--primary) / 0.5)" }}
                    >
                      {edu.badge}
                    </motion.span>
                  )}
                </div>
                <motion.span 
                  className="text-sm text-primary font-medium shrink-0 ml-4"
                  whileHover={{ scale: 1.1 }}
                >
                  {edu.year}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default AchievementsSection;
