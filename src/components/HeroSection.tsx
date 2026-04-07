import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="min-h-screen bg-[#F5C400] pt-16 flex items-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 w-full py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left: Text content - 7 cols */}
          <div className="lg:col-span-7 space-y-8">

            {/* Location + Status badge */}
            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-2 border-2 border-[#FFFFFF] bg-[#FFFFFF] text-[#F5C400] px-4 py-1.5 font-display font-bold text-xs uppercase tracking-widest">
                <span className="w-2 h-2 bg-[#F5C400] animate-pulse inline-block" />
                Disponible pour missions
              </div>
              <div className="flex items-center gap-1.5 font-body text-sm font-semibold text-[#FFFFFF]">
                <MapPin className="w-4 h-4" />
                Sénégal
              </div>
            </motion.div>

            {/* MASSIVE Headline */}
            <div className="overflow-hidden">
              <motion.h1
                className="font-display font-black uppercase leading-[0.85] text-[#FFFFFF]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <motion.span
                  className="block text-[clamp(4rem,10vw,8rem)]"
                  initial={{ y: 120 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  ZOUBEIR
                </motion.span>
                <motion.span
                  className="block text-[clamp(2.5rem,6vw,5rem)]"
                  initial={{ y: 120 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  IBRAHIMA
                </motion.span>
                <motion.span
                  className="block text-[clamp(3rem,7vw,6rem)] bg-[#FFFFFF] text-[#F5C400] px-2 inline-block"
                  initial={{ y: 120 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  AMED
                </motion.span>
              </motion.h1>
            </div>

            {/* Scale avec Zoubeir branding */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
            >
              <img
                src="/Gemini_Generated_Image_s7afnts7afnts7af-removebg-preview.png"
                alt="Scale avec Zoubeir"
                className="h-16 md:h-20 w-auto object-contain"
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="font-body text-lg md:text-xl font-semibold text-[#FFFFFF] max-w-lg leading-relaxed border-l-8 border-[#FFFFFF] pl-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              Backend Developer & AI Enthusiast — je construis des systèmes backend robustes et des solutions IA à grande échelle.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.85 }}
            >
              <motion.a
                href="#projects"
                className="group flex items-center gap-3 px-8 py-4 bg-[#FFFFFF] text-[#F5C400] font-display font-black uppercase text-sm tracking-wider border-4 border-[#FFFFFF] hover:bg-[#F5C400] hover:text-[#FFFFFF] transition-all duration-150"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Voir mes Projets
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href="#contact"
                className="flex items-center gap-3 px-8 py-4 bg-transparent text-[#FFFFFF] font-display font-black uppercase text-sm tracking-wider border-4 border-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#F5C400] transition-all duration-150"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Me Contacter
              </motion.a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              className="flex flex-wrap gap-0 border-t-4 border-[#FFFFFF] pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              {[
                { number: "2+", label: "Ans d'expérience" },
                { number: "10+", label: "Certifications" },
                { number: "1", label: "SaaS fondé" },
              ].map((stat, i) => (
                <div key={i} className="pr-8 mr-8 border-r-4 border-[#FFFFFF] last:border-0 last:mr-0">
                  <p className="font-display font-black text-4xl text-[#FFFFFF]">{stat.number}</p>
                  <p className="font-body text-sm font-semibold text-[#FFFFFF]/70 uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Profile Image - 5 cols */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* AVAILABLE FOR HIRE badge - rotated */}
              <motion.div
                className="absolute -top-6 -right-6 z-20 bg-[#FFFFFF] text-[#F5C400] font-display font-black text-xs uppercase tracking-widest px-4 py-2 border-4 border-[#FFFFFF]"
                style={{ rotate: "12deg" }}
                animate={{ rotate: [12, 15, 12, 9, 12] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                ★ Available for Hire ★
              </motion.div>

              {/* Illustration container */}
              <div className="relative w-72 h-80 md:w-96 md:h-[28rem]">
                {/* Shadow/offset layer */}
                <div className="absolute inset-0 translate-x-4 translate-y-4 bg-[#FFFFFF]" />
                {/* Image frame - yellow bg shows through transparent illustration */}
                <div className="relative border-4 border-[#FFFFFF] overflow-hidden w-full h-full bg-[#F5C400] flex items-end justify-center">
                  <img
                    src="/Gemini_Generated_Image_5omzhk5omzhk5omz-removebg-preview.png"
                    alt="Zoubeir Ibrahima Amed"
                    className="w-full h-full object-contain object-bottom"
                  />
                </div>
              </div>

              {/* Tech label */}
              <div className="absolute -bottom-4 -left-4 bg-[#F5C400] border-4 border-[#FFFFFF] px-4 py-2 z-20">
                <p className="font-display font-black text-xs uppercase tracking-wider text-[#FFFFFF]">
                  Django · Python · AI
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
