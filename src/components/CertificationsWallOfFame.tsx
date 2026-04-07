import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { getIssuerLogoUrl } from "@/lib/brandLogos";
import { certificationIssuerCount, certifications, featuredCertifications } from "@/data/certifications";

const certificationsForWall = featuredCertifications.slice(0, 8);

const getYear = (date: string) => {
  const match = date.match(/\d{4}/);
  return match ? match[0] : "-";
};

const CertificationsWallOfFame = () => {
  return (
    <section id="certifications" className="bg-[#143DFF] py-14 sm:py-18 md:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-display font-bold text-[#FFFFFF]/50 text-sm uppercase tracking-[0.3em] mb-3">
            — Reconnaissances
          </p>
          <h2 className="font-display font-black text-[#FFFFFF] text-3xl sm:text-5xl md:text-7xl uppercase leading-tight">
            Certifi
            <span className="bg-[#FFFFFF] text-[#143DFF] px-2">cations</span>
          </h2>
        </motion.div>

        {/* Grid 2x4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-4 border-[#FFFFFF]">
          {certificationsForWall.map((cert, index) => {
            const lastRowStart = Math.floor((certificationsForWall.length - 1) / 4) * 4;
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
                className="border-r-4 border-b-4 border-[#FFFFFF]"
              >
                <Tag
                  {...linkProps}
                  className={`group p-5 sm:p-6 md:p-7 bg-[#143DFF] hover:bg-[#FFFFFF] transition-all duration-200 flex flex-col gap-4 h-full ${cert.certUrl ? "cursor-pointer" : "cursor-default"}`}
                >
                  {/* Icon + ExternalLink row */}
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 md:w-11 md:h-11 border-4 border-[#FFFFFF] bg-[#FFFFFF] flex items-center justify-center transition-all duration-200 shrink-0 p-1.5">
                      <img
                        src={getIssuerLogoUrl(cert.issuer)}
                        alt={`Logo ${cert.issuer}`}
                        className="w-5 h-5 md:w-6 md:h-6 object-contain"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src = "/logos/cert-default.svg";
                        }}
                      />
                    </div>
                    {cert.certUrl && (
                      <ExternalLink className="w-4 h-4 text-[#FFFFFF]/30 group-hover:text-[#143DFF] opacity-0 group-hover:opacity-100 transition-all duration-200 mt-1" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-1 flex-1">
                    <span className="font-display font-bold text-[10px] uppercase tracking-[0.2em] text-[#FFFFFF]/40 group-hover:text-[#143DFF]/50 transition-colors duration-200">
                      {(cert.category ?? "Certification")} · {getYear(cert.date)}
                    </span>
                    <h3 className="font-display font-black text-sm sm:text-base uppercase leading-tight text-[#FFFFFF] group-hover:text-[#143DFF] transition-colors duration-200">
                      {cert.featuredTitle ?? cert.title}
                    </h3>
                    <p className="font-body font-semibold text-xs text-[#FFFFFF]/60 group-hover:text-[#143DFF]/60 uppercase tracking-wider transition-colors duration-200">
                      {cert.issuer}
                    </p>
                    {cert.certUrl && (
                      <span className="mt-2 font-display font-bold text-[10px] uppercase tracking-widest text-[#FFFFFF]/30 group-hover:text-[#143DFF]/60 transition-colors duration-200">
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
          className="mt-8 border-4 border-[#FFFFFF] p-5 sm:p-6 md:p-7 flex flex-wrap gap-5 sm:gap-8 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div>
            <p className="font-display font-black text-5xl text-[#FFFFFF]">{certifications.length}</p>
            <p className="font-body font-semibold text-xs uppercase tracking-[0.2em] text-[#FFFFFF]/50 mt-1">
              Certifications obtenues
            </p>
          </div>
          <div className="border-t-4 sm:border-t-0 sm:border-l-4 border-[#FFFFFF] pt-5 sm:pt-0 sm:pl-8 w-full sm:w-auto">
            <p className="font-display font-black text-4xl sm:text-5xl text-[#FFFFFF]">{certificationIssuerCount}</p>
            <p className="font-body font-semibold text-xs uppercase tracking-[0.2em] text-[#FFFFFF]/50 mt-1">
              Organismes reconnus
            </p>
          </div>
          <div className="border-t-4 sm:border-t-0 sm:border-l-4 border-[#FFFFFF] pt-5 sm:pt-0 sm:pl-8 w-full sm:w-auto">
            <p className="font-display font-black text-4xl sm:text-5xl text-[#FFFFFF]">2+</p>
            <p className="font-body font-semibold text-xs uppercase tracking-[0.2em] text-[#FFFFFF]/50 mt-1">
              Années de formation continue
            </p>
          </div>
          <div className="sm:ml-auto w-full sm:w-auto border-t-4 sm:border-t-0 border-[#FFFFFF] pt-5 sm:pt-0">
            <p className="font-display font-black text-[10px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.2em] text-[#FFFFFF]/40">
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
