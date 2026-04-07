import { motion } from "framer-motion";
import { BookOpen, Award, Zap, Code, Shield } from "lucide-react";

const certifications = [
  {
    title: "CS50x & CS50P",
    issuer: "Harvard University",
    year: "2024",
    icon: BookOpen,
    category: "Programme",
  },
  {
    title: "Python Certificate",
    issuer: "HackerRank",
    year: "2026",
    icon: Award,
    category: "Certification",
  },
  {
    title: "Claude Code in Action",
    issuer: "Anthropic",
    year: "2025",
    icon: Zap,
    category: "Certification",
  },
  {
    title: "GitHub Copilot (×4)",
    issuer: "Microsoft",
    year: "2025",
    icon: Code,
    category: "Certification",
  },
  {
    title: "Python Essentials 1",
    issuer: "Cisco",
    year: "2025",
    icon: Shield,
    category: "Certification",
  },
  {
    title: "Intro to Cybersecurity",
    issuer: "Cisco",
    year: "2025",
    icon: Shield,
    category: "Certification",
  },
  {
    title: "Django & Algorithmes",
    issuer: "LinkedIn Learning",
    year: "2025",
    icon: Award,
    category: "Certification",
  },
  {
    title: "Python, Java Mastery",
    issuer: "Udemy",
    year: "2025",
    icon: Award,
    category: "Certification",
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-4 border-[#131313]">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              className="group border-r-4 border-b-4 border-[#131313] last-of-type:border-r-4 p-8 bg-[#F5C400] hover:bg-[#131313] transition-all duration-200 cursor-default flex flex-col gap-4"
              style={{
                // Remove right border for last in each row
                borderRight: (index + 1) % 4 === 0 ? "none" : undefined,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              {/* Icon */}
              <div className="w-12 h-12 border-4 border-[#131313] group-hover:border-[#F5C400] bg-[#131313] group-hover:bg-[#F5C400] flex items-center justify-center transition-all duration-200 shrink-0">
                <cert.icon className="w-5 h-5 text-[#F5C400] group-hover:text-[#131313] transition-colors duration-200" />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-1 flex-1">
                <span className="font-display font-bold text-[10px] uppercase tracking-[0.2em] text-[#131313]/40 group-hover:text-[#F5C400]/40 transition-colors duration-200">
                  {cert.category} · {cert.year}
                </span>
                <h3 className="font-display font-black text-base uppercase leading-tight text-[#131313] group-hover:text-[#FFFFFF] transition-colors duration-200">
                  {cert.title}
                </h3>
                <p className="font-body font-semibold text-xs text-[#131313]/60 group-hover:text-[#F5C400]/60 uppercase tracking-wider transition-colors duration-200">
                  {cert.issuer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Counter strip */}
        <motion.div
          className="mt-8 border-4 border-[#131313] p-6 flex flex-wrap gap-8 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div>
            <p className="font-display font-black text-5xl text-[#131313]">10+</p>
            <p className="font-body font-semibold text-xs uppercase tracking-[0.2em] text-[#131313]/50 mt-1">
              Certifications obtenues
            </p>
          </div>
          <div className="border-l-4 border-[#131313] pl-8">
            <p className="font-display font-black text-5xl text-[#131313]">5</p>
            <p className="font-body font-semibold text-xs uppercase tracking-[0.2em] text-[#131313]/50 mt-1">
              Organismes reconnus
            </p>
          </div>
          <div className="border-l-4 border-[#131313] pl-8">
            <p className="font-display font-black text-5xl text-[#131313]">2+</p>
            <p className="font-body font-semibold text-xs uppercase tracking-[0.2em] text-[#131313]/50 mt-1">
              Années de formation continue
            </p>
          </div>
          <div className="ml-auto">
            <p className="font-display font-black text-xs uppercase tracking-[0.2em] text-[#131313]/40">
              Harvard · Anthropic · Cisco
              <br />
              Microsoft · HackerRank · Udemy
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsWallOfFame;
