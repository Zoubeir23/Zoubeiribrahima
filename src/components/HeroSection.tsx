import { motion, useReducedMotion } from "@/lib/static-motion";
import { ArrowRight, MapPin } from "lucide-react";

const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="min-h-[100svh] bg-[#0303AB] pt-20 sm:pt-16 flex items-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">

          {/* Left: Text content - 7 cols */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">

            {/* Location + Status badge */}
            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-2 border-2 border-[#F5C518] bg-[#FFFFFF] text-[#0303AB] px-4 py-1.5 font-display font-bold text-xs uppercase tracking-widest">
                <span className="w-2 h-2 bg-[#0303AB] animate-pulse inline-block" />
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
                  className="block text-[clamp(2.25rem,12vw,5.5rem)]"
                  initial={shouldReduceMotion ? false : { y: 120 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  ZOUBEIR
                </motion.span>
                <motion.span
                  className="block text-[clamp(1.75rem,8vw,3.75rem)]"
                  initial={shouldReduceMotion ? false : { y: 120 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  IBRAHIMA
                </motion.span>
                <motion.span
                  className="block text-[clamp(2rem,9vw,4.5rem)] bg-[#FFFFFF] text-[#0303AB] px-2 inline-block"
                  initial={shouldReduceMotion ? false : { y: 120 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  AMED
                </motion.span>
              </motion.h1>
            </div>

            {/* Tagline */}
            <motion.p
              className="font-body text-base sm:text-lg md:text-xl font-semibold text-[#FFFFFF] max-w-lg leading-relaxed border-l-8 border-[#F5C518] pl-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              Backend Developer & AI Enthusiast — je construis des systèmes backend robustes et des solutions IA à grande échelle.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.85 }}
            >
              <motion.a
                href="#projects"
                className="group flex items-center justify-center gap-3 w-full sm:w-auto px-5 sm:px-8 py-3.5 sm:py-4 bg-[#F5C518] text-[#020285] font-display font-black uppercase text-xs sm:text-sm tracking-wide border-4 border-[#F5C518] hover:bg-[#F5C518] hover:text-[#020285] transition-all duration-150 min-h-11"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Voir mes Projets
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href="#contact"
                className="flex items-center justify-center gap-3 w-full sm:w-auto px-5 sm:px-8 py-3.5 sm:py-4 bg-[#F5C518] text-[#020285] font-display font-black uppercase text-xs sm:text-sm tracking-wide border-4 border-[#F5C518] hover:bg-[#F5C518] hover:text-[#020285] transition-all duration-150 min-h-11"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Me Contacter
              </motion.a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t-4 border-[#F5C518] pt-6 sm:pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              {[
                { number: "2+", label: "Ans d'expérience" },
                { number: "10+", label: "Certifications" },
                { number: "1", label: "SaaS fondé" },
              ].map((stat, i) => (
                <div key={i} className="pr-0 sm:pr-8 sm:mr-8 border-r-0 sm:border-r-4 border-[#F5C518] last:border-0 last:mr-0">
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
                className="absolute -top-6 -right-6 z-20 bg-[#FFFFFF] text-[#0303AB] font-display font-black text-xs uppercase tracking-widest px-4 py-2 border-4 border-[#F5C518]"
                style={{ rotate: "12deg" }}
                animate={shouldReduceMotion ? { rotate: 12 } : { rotate: [12, 15, 12, 9, 12] }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                ★ Available for Hire ★
              </motion.div>

              {/* Illustration container */}
              <div className="relative w-64 h-72 sm:w-72 sm:h-80 md:w-96 md:h-[28rem]">
                {/* Shadow/offset layer */}
                <div className="absolute inset-0 translate-x-4 translate-y-4 bg-[#FFFFFF]" />
                {/* Image frame - yellow bg shows through transparent illustration */}
                <div className="relative border-4 border-[#F5C518] overflow-hidden w-full h-full bg-[#0303AB] flex items-end justify-center">
                  <img
                    src="/Gemini_Generated_Image_5omzhk5omzhk5omz-removebg-preview.png"
                    alt="Zoubeir Ibrahima Amed"
                    className="w-full h-full object-contain object-bottom"
                    width={768}
                    height={896}
                    fetchPriority="high"
                  />
                </div>
              </div>

              {/* Tech label */}
              <div className="absolute -bottom-4 -left-4 bg-[#0303AB] border-4 border-[#F5C518] px-4 py-2 z-20">
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
