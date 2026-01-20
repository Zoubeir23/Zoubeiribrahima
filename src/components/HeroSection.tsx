import { Github, Linkedin, MapPin } from "lucide-react";
import avatar from "@/assets/avatar.png";

const HeroSection = () => {
  return (
    <section className="flex flex-col items-center text-center py-12">
      <div className="avatar-ring mb-6">
        <img
          src={avatar}
          alt="Zoubeir Ibrahima"
          className="w-28 h-28 rounded-full object-cover"
        />
      </div>
      
      <h1 className="text-4xl font-bold text-foreground mb-2">
        Zoubeir Ibrahima
      </h1>
      
      <p className="text-lg text-muted-foreground mb-3">
        Développeur Logiciel
      </p>
      
      <div className="flex items-center gap-1.5 text-muted-foreground mb-4">
        <MapPin className="w-4 h-4" />
        <span className="text-sm">France</span>
      </div>
      
      <div className="flex items-center gap-4 mb-6">
        <a
          href="https://github.com/zoubeiribrahima"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="GitHub"
        >
          <Github className="w-5 h-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/zoubeir-ibrahima/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </a>
      </div>
      
      <p className="text-muted-foreground italic mb-6">
        Je crée des solutions numériques.
      </p>
      
      <a
        href="https://www.linkedin.com/in/zoubeir-ibrahima/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-secondary hover:bg-secondary/80 hover:border-primary/50 transition-all text-sm font-medium"
      >
        <Linkedin className="w-4 h-4" />
        Voir mon profil LinkedIn
      </a>
    </section>
  );
};

export default HeroSection;
