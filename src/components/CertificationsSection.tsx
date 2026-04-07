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
    certUrl: "https://www.hackerrank.com/certificates/78268c2cd679",
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
    certUrl: "https://learn.microsoft.com/api/achievements/share/fr-fr/ZoubeirIbrahima-6909/XQ8L8JNY?sharingId=F508886EEF61DEDF",
  },
  {
    title: "Développer des fonctionnalités de code avec GitHub Copilot",
    issuer: "Microsoft",
    date: "sept. 2025",
    skills: ["GitHub Copilot"],
    logo: "MS",
    certUrl: "https://learn.microsoft.com/api/achievements/share/fr-fr/ZoubeirIbrahima-6909/W2UTHXQN?sharingId=F508886EEF61DEDF",
  },
  {
    title: "Développer des tests unitaires avec GitHub Copilot",
    issuer: "Microsoft",
    date: "sept. 2025",
    skills: ["Tests unitaires"],
    logo: "MS",
    certUrl: "https://learn.microsoft.com/api/achievements/share/fr-fr/ZoubeirIbrahima-6909/D9PAK7PJ?sharingId=F508886EEF61DEDF",
  },
  {
    title: "Générer une documentation avec GitHub Copilot",
    issuer: "Microsoft",
    date: "sept. 2025",
    skills: ["Documentation"],
    logo: "MS",
    certUrl: "https://learn.microsoft.com/api/achievements/share/fr-fr/ZoubeirIbrahima-6909/7KX9YKHZ?sharingId=F508886EEF61DEDF",
  },
  {
    title: "Python Essentials 1",
    issuer: "Cisco Networking Academy",
    date: "août 2025",
    skills: ["Python"],
    logo: "C",
    certUrl: "https://www.credly.com/badges/c180d96a-ff75-4893-b020-56c8da6cf7a4/public_url",
  },
  {
    title: "Dépannage de Microsoft Teams",
    issuer: "Microsoft",
    date: "avr. 2025",
    skills: ["Microsoft Teams"],
    logo: "MS",
    certUrl: "https://learn.microsoft.com/api/achievements/share/fr-fr/IbrahimaZoubeir-1840/PLTV32Q4?sharingId=DB9CFDBAF590C1D5",
  },
  {
    title: "L'essentiel de Django",
    issuer: "LinkedIn",
    date: "avr. 2025",
    skills: ["Django"],
    logo: "in",
    certUrl: "https://www.linkedin.com/learning/certificates/239c191adba7873e208b1dcf52498d5b30f42cd1ae6d43cd07256f824cabc39e/",
  },
  {
    title: "Les fondements de la programmation",
    issuer: "LinkedIn",
    date: "avr. 2025",
    skills: ["GitHub", "HTML5", "Git"],
    logo: "in",
    certUrl: "https://www.linkedin.com/learning/certificates/e16c36c3b2b1911f030954d048ca1761e28aea204f582ee23b0286b780a3cc4a/",
  },
  {
    title: "Les fondements de la programmation : Les algorithmes",
    issuer: "LinkedIn",
    date: "avr. 2025",
    skills: ["Programmation"],
    logo: "in",
    certUrl: "https://www.linkedin.com/learning/certificates/fdd3e4275c89466c1c885e7bfc3d2cd056788960f136cbfebc30ed28783be918/",
  },
  {
    title: "Python : L'automatisation des tâches",
    issuer: "LinkedIn",
    date: "avr. 2025",
    skills: ["Automatisation"],
    logo: "in",
    certUrl: "https://www.linkedin.com/learning/certificates/f8a414fa3937fecc8d984eebcb0de5256b5eb9fe2afcda4d940e7f9afa780b76/",
  },
  {
    title: "Se préparer au métier de développeur",
    issuer: "Microsoft",
    date: "avr. 2025",
    skills: ["Développement logiciel", "HTML5"],
    logo: "MS",
    certUrl: "https://www.linkedin.com/learning/certificates/0ddcd541de053618b401e9d3b1c52f661196c42876a58a2988fc7ef1520f7929/",
  },
  {
    title: "Optimiser son profil LinkedIn",
    issuer: "LinkedIn",
    date: "avr. 2025",
    skills: ["LinkedIn"],
    logo: "in",
    certUrl: "https://www.linkedin.com/learning/certificates/d9783cc55bb8da4e309f10a7d614277df5eb34a67dd3d6aeafb1ad6b032451c2/",
  },
  {
    title: "Préparer votre carrière dans le développement logiciel",
    issuer: "LinkedIn",
    date: "avr. 2025",
    skills: ["GitHub", "HTML5"],
    logo: "in",
    certUrl: "https://www.linkedin.com/learning/certificates/6c0824d09c81697f6903962b7db9f5f57ec189f0f79221befb8650c7c14488ab/",
  },
  {
    title: "Java Fundamentals Pour les débutants",
    issuer: "Udemy",
    date: "mars 2025",
    logo: "U",
    certUrl: "http://ude.my/UC-f4f591ea-2f9e-48a1-84c8-2fd48ad00be0",
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
    certUrl: "http://ude.my/UC-06dba729-151d-40d1-96ce-161bafb952aa",
  },
  {
    title: "CS50x",
    issuer: "Harvard CS50",
    date: "déc. 2024",
    skills: ["Informatique", "HTML5"],
    logo: "H",
    certUrl: "https://certificates.cs50.io/0658cdae-622d-4ed8-a03e-2bd1b28f16a4.pdf?size=letter",
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
    certUrl: "https://cursa.app/fr/mon-certificat/cert3454340b35b1fe7caeacb426723f4127/ok",
  },
  {
    title: "Cours Python complet",
    issuer: "Udemy",
    date: "2024",
    skills: ["Python"],
    logo: "U",
    certUrl: "https://www.udemy.com/certificate/UC-54c4e7ae-d165-4ac1-b8ae-fc59bfefcda4/",
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
            <Award className="w-5 h-5 text-[#131313]" />
            <p className="font-display font-bold text-[#131313]/60 text-xs uppercase tracking-[0.3em]">
              Liste complète
            </p>
          </div>
          <h3 className="font-display font-black text-[#131313] text-2xl uppercase">
            Toutes mes Certifications
            <span className="ml-3 text-sm font-bold text-[#131313]/40">
              ({certifications.length})
            </span>
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
                  className={`flex items-start gap-4 p-5 border-2 border-[#131313]/20 bg-[#F5C400] h-full transition-all duration-200 ${
                    cert.certUrl
                      ? "cursor-pointer hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#131313]"
                      : ""
                  }`}
                >
                  {/* Logo badge */}
                  <div className="w-9 h-9 shrink-0 bg-[#131313] flex items-center justify-center">
                    <span className="font-display font-black text-[10px] text-[#F5C400]">
                      {cert.logo}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-black text-sm uppercase leading-tight text-[#131313] line-clamp-2">
                      {cert.title}
                    </h4>
                    <p className="font-body text-xs font-semibold text-[#131313]/50 uppercase tracking-wider mt-1">
                      {cert.issuer} · {cert.date}
                    </p>
                    {cert.skills && cert.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {cert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-[10px] px-2 py-0.5 border border-[#131313]/20 text-[#131313]/50 uppercase tracking-wide"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Link icon */}
                  {cert.certUrl && (
                    <ExternalLink className="w-3.5 h-3.5 shrink-0 text-[#131313]/30 mt-0.5" />
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
