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
          <p className="font-display font-bold text-[#E5E5E5]/50 text-sm uppercase tracking-[0.3em] mb-3">
            — Reconnaissances
          </p>
          <h2 className="font-display font-black text-[#E5E5E5] text-5xl md:text-7xl uppercase leading-tight">
            Certifi
            <span className="bg-[#E5E5E5] text-[#F5C400] px-2">cations</span>
          </h2>
        </motion.div>

        {/* Grid 2x4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-4 border-[#E5E5E5]">
          {certifications.map((cert, index) => {
            const lastRowStart = Math.floor((certifications.length - 1) / 4) * 4;
            const Tag = cert.certUrl ? "a" : "div";
            const linkProps = cert.certUrl
              ? { href: cert.certUrl, target: "_blank", rel: "noopener noreferrer" }
              : {};

            return (
              <motion.div
                key={cert.title}
                style={{
                  borderRight: (index + 1) % 4 === 0 ? "none" : undefined,
                  borderBottom: index >= lastRowStart ? "none" : undefined,
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="border-r-4 border-b-4 border-[#E5E5E5]"
              >
                <Tag
                  {...linkProps}
                  className={`group p-8 bg-[#F5C400] hover:bg-[#E5E5E5] transition-all duration-200 flex flex-col gap-4 h-full ${cert.certUrl ? "cursor-pointer" : "cursor-default"}`}
                >
                  {/* Icon + ExternalLink row */}
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 border-4 border-[#E5E5E5] group-hover:border-[#F5C400] bg-[#E5E5E5] group-hover:bg-[#F5C400] flex items-center justify-center transition-all duration-200 shrink-0">
                      <cert.icon className="w-5 h-5 text-[#F5C400] group-hover:text-[#E5E5E5] transition-colors duration-200" />
                    </div>
                    {cert.certUrl && (
                      <ExternalLink className="w-4 h-4 text-[#E5E5E5]/30 group-hover:text-[#F5C400] opacity-0 group-hover:opacity-100 transition-all duration-200 mt-1" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-1 flex-1">
                    <span className="font-display font-bold text-[10px] uppercase tracking-[0.2em] text-[#E5E5E5]/40 group-hover:text-[#F5C400]/50 transition-colors duration-200">
                      {cert.category} · {cert.year}
                    </span>
                    <h3 className="font-display font-black text-base uppercase leading-tight text-[#E5E5E5] group-hover:text-[#F5C400] transition-colors duration-200">
                      {cert.title}
                    </h3>
                    <p className="font-body font-semibold text-xs text-[#E5E5E5]/60 group-hover:text-[#F5C400]/60 uppercase tracking-wider transition-colors duration-200">
                      {cert.issuer}
                    </p>
                    {cert.certUrl && (
                      <span className="mt-2 font-display font-bold text-[10px] uppercase tracking-widest text-[#E5E5E5]/30 group-hover:text-[#F5C400]/60 transition-colors duration-200">
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
          className="mt-8 border-4 border-[#E5E5E5] p-6 flex flex-wrap gap-8 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div>
            <p className="font-display font-black text-5xl text-[#E5E5E5]">23</p>
            <p className="font-body font-semibold text-xs uppercase tracking-[0.2em] text-[#E5E5E5]/50 mt-1">
              Certifications obtenues
            </p>
          </div>
          <div className="border-l-4 border-[#E5E5E5] pl-8">
            <p className="font-display font-black text-5xl text-[#E5E5E5]">9</p>
            <p className="font-body font-semibold text-xs uppercase tracking-[0.2em] text-[#E5E5E5]/50 mt-1">
              Organismes reconnus
            </p>
          </div>
          <div className="border-l-4 border-[#E5E5E5] pl-8">
            <p className="font-display font-black text-5xl text-[#E5E5E5]">2+</p>
            <p className="font-body font-semibold text-xs uppercase tracking-[0.2em] text-[#E5E5E5]/50 mt-1">
              Années de formation continue
            </p>
          </div>
          <div className="ml-auto">
            <p className="font-display font-black text-xs uppercase tracking-[0.2em] text-[#E5E5E5]/40">
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
