import { motion } from "@/lib/static-motion";
import { Award, ExternalLink } from "lucide-react";
import { certifications } from "@/data/certifications";
import IssuerLogo from "@/components/IssuerLogo";

const CertificationsSection = () => {
  return (
    <section className="bg-[#020285] py-16 px-6">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-4 border-[#F5C518]">
          {certifications.map((cert, index) => {
            const Card = cert.certUrl ? "a" : "div";
            const cardProps = cert.certUrl
              ? { href: cert.certUrl, target: "_blank", rel: "noopener noreferrer" }
              : {};

            return (
              <motion.div
                key={cert.id || index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
              >
                <Card
                  {...cardProps}
                  className={`group flex items-start gap-4 p-6 md:p-7 border-r-4 border-b-4 border-[#F5C518] bg-[#020285] transition-all duration-200 h-full ${
                    cert.certUrl
                      ? "hover:bg-[#FFFFFF] cursor-pointer"
                      : "hover:bg-[#FFFFFF]/10"
                  }`}
                >
                  <div className="w-10 h-10 md:w-11 md:h-11 shrink-0 border-2 border-[#F5C518] bg-[#FFFFFF] flex items-center justify-center transition-all duration-200">
                    <IssuerLogo issuer={cert.issuer} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-black text-sm uppercase leading-tight text-[#FFFFFF] group-hover:text-[#020285] transition-colors duration-200 line-clamp-2">
                      {cert.title}
                    </h4>
                    <p className="font-body text-xs font-semibold text-[#FFFFFF]/60 group-hover:text-[#020285]/60 uppercase tracking-wider mt-1 transition-colors duration-200">
                      {cert.date}
                    </p>
                    {cert.skills && cert.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {cert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-[10px] px-2 py-0.5 border border-[#F5C518]/30 group-hover:border-[#020285]/30 text-[#FFFFFF]/70 group-hover:text-[#020285]/70 uppercase tracking-wide transition-colors duration-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Link icon */}
                  {cert.certUrl && (
                    <ExternalLink className="w-4 h-4 shrink-0 text-[#FFFFFF]/40 group-hover:text-[#020285] opacity-0 group-hover:opacity-100 transition-all duration-200 mt-1" />
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
