import { motion } from "framer-motion";
import { BookOpen, Award, Zap, Code, Shield, ExternalLink } from "lucide-react";

const certifications = [
  {
    title: "CS50x & CS50P",
    issuer: "Harvard University",
    year: "2024",
    icon: BookOpen,
    category: "Programme",
    certUrl: "https://certificates.cs50.io/0658cdae-622d-4ed8-a03e-2bd1b28f16a4.pdf?size=letter",
  },
  {
    title: "Python Certificate",
    issuer: "HackerRank",
    year: "2026",
    icon: Award,
    category: "Certification",
    certUrl: "https://www.hackerrank.com/certificates/78268c2cd679",
  },
  {
    title: "Claude Code in Action",
    issuer: "Anthropic",
    year: "2025",
    icon: Zap,
    category: "Certification",
    certUrl: "https://verify.skilljar.com/c/b2gcc4ubkdsu",
  },
  {
    title: "GitHub Copilot (×4)",
    issuer: "Microsoft",
    year: "2025",
    icon: Code,
    category: "Certification",
    certUrl: "https://learn.microsoft.com/api/achievements/share/fr-fr/ZoubeirIbrahima-6909/XQ8L8JNY?sharingId=F508886EEF61DEDF",
  },
  {
    title: "Python Essentials 1",
    issuer: "Cisco",
    year: "2025",
    icon: Shield,
    category: "Certification",
    certUrl: "https://www.credly.com/badges/c180d96a-ff75-4893-b020-56c8da6cf7a4/public_url",
  },
  {
    title: "Intro to Cybersecurity",
    issuer: "Cisco",
    year: "2025",
    icon: Shield,
    category: "Certification",
    certUrl: "https://www.credly.com/badges/e9e20c3d-cc1f-4455-8696-1f5f29b6fb01",
  },
  {
    title: "Django & Algorithmes",
    issuer: "LinkedIn Learning",
    year: "2025",
    icon: Award,
    category: "Certification",
    certUrl: "https://www.linkedin.com/learning/certificates/239c191adba7873e208b1dcf52498d5b30f42cd1ae6d43cd07256f824cabc39e/",
  },
  {
    title: "Python, Java Mastery",
    issuer: "Udemy",
    year: "2025",
    icon: Award,
    category: "Certification",
    certUrl: "http://ude.my/UC-06dba729-151d-40d1-96ce-161bafb952aa",
  },
];

const CertificationsWallOfFame = () => {
  return (
    <section id="certifications" className="bg-[#F5C400] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-display font-bold text-[#131313]/50 text-sm uppercase tracking-[0.3em] mb-3">
            — Reconnaissances
          </p>
          <h2 className="font-display font-black text-[#131313] text-5xl md:text-7xl uppercase leading-tight">
            Certifi
            <span className="bg-[#131313] text-[#F5C400] px-2">cations</span>
          </h2>
        </motion.div>

        {/* Grid 2x4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert, index) => {
            const Tag = cert.certUrl ? "a" : "div";
            const linkProps = cert.certUrl
              ? { href: cert.certUrl, target: "_blank", rel: "noopener noreferrer" }
              : {};

            return (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <Tag
                  {...linkProps}
                  className={`p-6 bg-[#F5C400] border-2 border-[#131313]/20 flex flex-col gap-4 h-full transition-all duration-200 ${
                    cert.certUrl
                      ? "cursor-pointer hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#131313]"
                      : "cursor-default"
                  }`}
                >
                  {/* Icon + ExternalLink */}
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 border-2 border-[#131313] bg-[#131313] flex items-center justify-center shrink-0">
                      <cert.icon className="w-4 h-4 text-[#F5C400]" />
                    </div>
                    {cert.certUrl && (
                      <ExternalLink className="w-3.5 h-3.5 text-[#131313]/30 mt-1" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-1 flex-1">
                    <span className="font-display font-bold text-[10px] uppercase tracking-[0.2em] text-[#131313]/40">
                      {cert.category} · {cert.year}
                    </span>
                    <h3 className="font-display font-black text-sm uppercase leading-tight text-[#131313]">
                      {cert.title}
                    </h3>
                    <p className="font-body font-semibold text-xs text-[#131313]/50 uppercase tracking-wider">
                      {cert.issuer}
                    </p>
                    {cert.certUrl && (
                      <span className="mt-auto pt-3 font-display font-bold text-[10px] uppercase tracking-widest text-[#131313]/30">
                        Voir le diplôme →
                      </span>
                    )}
                  </div>
                </Tag>
              </motion.div>
            );
          })}
        </div>

        {/* Counter strip */}
        <motion.div
          className="mt-8 border-t-2 border-[#131313]/20 pt-8 flex flex-wrap gap-12 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div>
            <p className="font-display font-black text-5xl text-[#131313]">23</p>
            <p className="font-body font-semibold text-xs uppercase tracking-[0.2em] text-[#131313]/50 mt-1">
              Certifications obtenues
            </p>
          </div>
          <div className="border-l-2 border-[#131313]/20 pl-12">
            <p className="font-display font-black text-5xl text-[#131313]">9</p>
            <p className="font-body font-semibold text-xs uppercase tracking-[0.2em] text-[#131313]/50 mt-1">
              Organismes reconnus
            </p>
          </div>
          <div className="border-l-2 border-[#131313]/20 pl-12">
            <p className="font-display font-black text-5xl text-[#131313]">2+</p>
            <p className="font-body font-semibold text-xs uppercase tracking-[0.2em] text-[#131313]/50 mt-1">
              Années de formation continue
            </p>
          </div>
          <div className="ml-auto">
            <p className="font-display font-bold text-xs uppercase tracking-[0.2em] text-[#131313]/40">
              Harvard · Anthropic · Cisco · Microsoft
              <br />
              HackerRank · Udemy · LinkedIn · Coursera
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsWallOfFame;
