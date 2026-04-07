import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

interface Certification {
  title: string;
  issuer: string;
  date: string;
  skills?: string[];
  logo: string;
  certUrl?: string;
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
    logo: "A",
    certUrl: "https://verify.skilljar.com/c/b2gcc4ubkdsu",
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
    title: "Optimiser son profil LinkedIn",
    issuer: "LinkedIn",
    date: "avr. 2025",
    skills: ["LinkedIn"],
    logo: "in",
  },
  {
    title: "Préparer votre carrière dans le développement logiciel",
    issuer: "LinkedIn",
    date: "avr. 2025",
    skills: ["GitHub", "HTML5"],
    logo: "in",
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
    certUrl: "https://www.credly.com/badges/e9e20c3d-cc1f-4455-8696-1f5f29b6fb01",
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
    certUrl: "https://cs50.harvard.edu/certificates/0658cdae-622d-4ed8-a03e-2bd1b28f16a4",
  },
  {
    title: "CS50p - Python",
    issuer: "Harvard CS50",
    date: "nov. 2024",
    skills: ["Python"],
    logo: "H",
    certUrl: "https://cs50.harvard.edu/certificates/eaff62cf-6a2d-40c1-bd35-b591612d817d",
  },
  {
    title: "WordPress",
    issuer: "Coursera",
    date: "nov. 2024",
    skills: ["WordPress"],
    logo: "Co",
    certUrl: "https://coursera.org/verify/3CNOTP886NYH",
  },
  {
    title: "WordPress",
    issuer: "Cursa - Cursos Online",
    date: "nov. 2024",
    skills: ["WordPress"],
    logo: "Cu",
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
    <section className="bg-[#F5C400] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-5 h-5 text-[#FFFFFF]" />
            <p className="font-display font-bold text-[#FFFFFF]/60 text-xs uppercase tracking-[0.3em]">
              Liste complète
            </p>
          </div>
          <h3 className="font-display font-black text-[#FFFFFF] text-2xl uppercase">
            Toutes mes Certifications
            <span className="ml-3 text-sm font-bold text-[#FFFFFF]/40">
              ({certifications.length})
            </span>
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-4 border-[#FFFFFF]">
          {certifications.map((cert, index) => {
            const Card = cert.certUrl ? "a" : "div";
            const cardProps = cert.certUrl
              ? { href: cert.certUrl, target: "_blank", rel: "noopener noreferrer" }
              : {};

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
              >
                <Card
                  {...cardProps}
                  className={`group flex items-start gap-4 p-5 border-r-4 border-b-4 border-[#FFFFFF] bg-[#F5C400] transition-all duration-200 h-full ${
                    cert.certUrl
                      ? "hover:bg-[#FFFFFF] cursor-pointer"
                      : "hover:bg-[#FFFFFF]/10"
                  }`}
                >
                  {/* Logo badge */}
                  <div className="w-10 h-10 shrink-0 border-2 border-[#FFFFFF] bg-[#FFFFFF] flex items-center justify-center group-hover:bg-[#F5C400] group-hover:border-[#F5C400] transition-all duration-200">
                    <span className="font-display font-black text-[10px] text-[#F5C400] group-hover:text-[#FFFFFF]">
                      {cert.logo}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-black text-sm uppercase leading-tight text-[#FFFFFF] group-hover:text-[#F5C400] transition-colors duration-200 line-clamp-2">
                      {cert.title}
                    </h4>
                    <p className="font-body text-xs font-semibold text-[#FFFFFF]/60 group-hover:text-[#F5C400]/60 uppercase tracking-wider mt-1 transition-colors duration-200">
                      {cert.issuer} · {cert.date}
                    </p>
                    {cert.skills && cert.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {cert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-[10px] px-2 py-0.5 border border-[#FFFFFF]/30 group-hover:border-[#F5C400]/30 text-[#FFFFFF]/70 group-hover:text-[#F5C400]/70 uppercase tracking-wide transition-colors duration-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Link icon */}
                  {cert.certUrl && (
                    <ExternalLink className="w-4 h-4 shrink-0 text-[#FFFFFF]/40 group-hover:text-[#F5C400] opacity-0 group-hover:opacity-100 transition-all duration-200 mt-1" />
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
