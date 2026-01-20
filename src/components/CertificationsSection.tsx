import { Award, ExternalLink } from "lucide-react";

interface Certification {
  title: string;
  issuer: string;
  date: string;
  skills?: string[];
  logo: string;
  certId?: string;
}

const certifications: Certification[] = [
  {
    title: "Certificat Python (base)",
    issuer: "HackerRank",
    date: "janv. 2026",
    skills: ["Python"],
    logo: "HR",
  },
  {
    title: "Claude Code in Action",
    issuer: "Anthropic",
    date: "déc. 2025",
    certId: "b2gcc4ubkdsu",
    logo: "A",
  },
  {
    title: "Bien démarrer avec GitHub Copilot",
    issuer: "Microsoft",
    date: "sept. 2025",
    logo: "MS",
  },
  {
    title: "Développer des fonctionnalités de code avec GitHub Copilot",
    issuer: "Microsoft",
    date: "sept. 2025",
    skills: ["GitHub Copilot"],
    logo: "MS",
  },
  {
    title: "Développer des tests unitaires avec GitHub Copilot",
    issuer: "Microsoft",
    date: "sept. 2025",
    skills: ["Tests unitaires"],
    logo: "MS",
  },
  {
    title: "Générer une documentation avec GitHub Copilot",
    issuer: "Microsoft",
    date: "sept. 2025",
    skills: ["Documentation"],
    logo: "MS",
  },
  {
    title: "Python Essentials 1",
    issuer: "Cisco Networking Academy",
    date: "août 2025",
    skills: ["Python"],
    logo: "C",
  },
  {
    title: "Dépannage de Microsoft Teams",
    issuer: "Microsoft",
    date: "avr. 2025",
    skills: ["Microsoft Teams"],
    logo: "MS",
  },
  {
    title: "L'essentiel de Django",
    issuer: "LinkedIn",
    date: "avr. 2025",
    skills: ["Django"],
    logo: "in",
  },
  {
    title: "Les fondements de la programmation",
    issuer: "LinkedIn",
    date: "avr. 2025",
    skills: ["GitHub", "HTML5", "Git"],
    logo: "in",
  },
  {
    title: "Les fondements de la programmation : Les algorithmes",
    issuer: "LinkedIn",
    date: "avr. 2025",
    skills: ["Programmation"],
    logo: "in",
  },
  {
    title: "Python : L'automatisation des tâches",
    issuer: "LinkedIn",
    date: "avr. 2025",
    skills: ["Automatisation"],
    logo: "in",
  },
  {
    title: "Se préparer au métier de développeur",
    issuer: "Microsoft",
    date: "avr. 2025",
    skills: ["Développement logiciel", "HTML5"],
    logo: "MS",
  },
  {
    title: "Java Fundamentals Pour les débutants",
    issuer: "Udemy",
    date: "mars 2025",
    logo: "U",
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco",
    date: "mars 2025",
    skills: ["Cybersécurité"],
    logo: "C",
  },
  {
    title: "Maîtrise de la programmation Java et Python",
    issuer: "Udemy",
    date: "mars 2025",
    skills: ["Java", "Python"],
    logo: "U",
  },
  {
    title: "CS50x",
    issuer: "Harvard CS50",
    date: "déc. 2024",
    skills: ["Informatique", "HTML5"],
    logo: "H",
  },
  {
    title: "CS50p - Python",
    issuer: "Harvard CS50",
    date: "nov. 2024",
    skills: ["Python"],
    logo: "H",
  },
  {
    title: "WordPress",
    issuer: "Coursera",
    date: "nov. 2024",
    skills: ["WordPress"],
    logo: "Co",
  },
  {
    title: "Cours Python complet",
    issuer: "Udemy",
    date: "2024",
    skills: ["Python"],
    logo: "U",
  },
];

const CertificationsSection = () => {
  return (
    <div className="section-card">
      <h2 className="section-title">
        <Award className="section-icon" />
        Licences et Certifications
      </h2>
      
      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
        {certifications.map((cert, index) => (
          <div key={index} className="cert-card group">
            <div className="cert-logo">
              {cert.logo}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {cert.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {cert.issuer} • {cert.date}
              </p>
              {cert.skills && cert.skills.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {cert.certId && (
              <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationsSection;
