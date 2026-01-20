import { Sparkles, Code2, BookOpen } from "lucide-react";

const SkillsSection = () => {
  const skills = ["Développement Web", "Développement Logiciel", "Python", "Django", "Java"];
  const programmingLanguages = ["Python", "Java", "HTML5", "CSS", "JavaScript"];
  const learning = ["Cybersécurité", "GitHub Copilot", "Intelligence Artificielle"];

  return (
    <div className="space-y-4">
      <div className="section-card">
        <h2 className="section-title">
          <Sparkles className="section-icon" />
          Compétences
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span key={skill} className="skill-badge">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="section-card">
        <h2 className="section-title">
          <Code2 className="section-icon" />
          Langages de Programmation
        </h2>
        <div className="flex flex-wrap gap-2">
          {programmingLanguages.map((lang) => (
            <span key={lang} className="skill-badge">
              {lang}
            </span>
          ))}
        </div>
      </div>

      <div className="section-card">
        <h2 className="section-title">
          <BookOpen className="section-icon" />
          En cours d'apprentissage
        </h2>
        <div className="flex flex-wrap gap-2">
          {learning.map((item) => (
            <span key={item} className="skill-badge">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
