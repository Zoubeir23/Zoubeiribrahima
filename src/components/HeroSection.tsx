import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";

const HeroSection = () => {
  const [currentWord, setCurrentWord] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const { t } = useLanguage();

  const words = t("hero.words") as unknown as string[];

  useEffect(() => {
    const currentWordText = words[wordIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentWord.length < currentWordText.length) {
            setCurrentWord(currentWordText.substring(0, currentWord.length + 1));
          } else {
            setIsDeleting(true);
          }
        } else {
          if (currentWord.length > 0) {
            setCurrentWord(currentWordText.substring(0, currentWord.length - 1));
          } else {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? 50 : 100,
    );

    return () => clearTimeout(timeout);
  }, [currentWord, isDeleting, wordIndex, words]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Enhanced Mesh Blobs Background with Gradient Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <motion.div
          className="absolute w-[600px] h-[600px] top-[-100px] left-[-100px] bg-gradient-to-br from-blue-500 via-cyan-400 to-primary rounded-full blur-[120px] opacity-40"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[700px] h-[700px] bottom-[-150px] right-[-150px] bg-gradient-to-tl from-purple-600 via-pink-500 to-violet-600 rounded-full blur-[140px] opacity-30"
          animate={{
            y: [0, -40, 0],
            x: [0, -30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] top-[40%] left-[60%] bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 rounded-full blur-[100px] opacity-20"
          animate={{
            y: [0, -25, 0],
            x: [0, 15, 0],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background-light/50 dark:to-background-dark/50"></div>
      </div>

      {/* Floating Tech Icons - Using SVG icons from svgl.app */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        <motion.div
          className="absolute top-[25%] left-[15%] p-4 bg-slate-100 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-white/10 shadow-xl backdrop-blur-sm"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              fill="#61DAFB"
              fillOpacity="0.1"
            />
            <path
              d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20Z"
              fill="#61DAFB"
            />
            <path
              d="M12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6ZM12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16Z"
              fill="#61DAFB"
            />
          </svg>
        </motion.div>
        <motion.div
          className="absolute bottom-[30%] right-[15%] p-4 bg-slate-100 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-white/10 shadow-xl backdrop-blur-sm"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              fill="#339933"
              fillOpacity="0.1"
            />
            <path
              d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20Z"
              fill="#339933"
            />
            <path
              d="M12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6ZM12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16Z"
              fill="#339933"
            />
          </svg>
        </motion.div>
        <motion.div
          className="absolute top-[20%] right-[20%] p-4 bg-slate-100 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-white/10 shadow-xl backdrop-blur-sm"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              fill="#3776AB"
              fillOpacity="0.1"
            />
            <path
              d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20Z"
              fill="#3776AB"
            />
            <path
              d="M12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6ZM12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16Z"
              fill="#3776AB"
            />
          </svg>
        </motion.div>
        <motion.div
          className="absolute bottom-[20%] left-[20%] p-4 bg-slate-100 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-white/10 shadow-xl backdrop-blur-sm"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              fill="#3B82F6"
              fillOpacity="0.1"
            />
            <path
              d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20Z"
              fill="#3B82F6"
            />
            <path
              d="M12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6ZM12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16Z"
              fill="#3B82F6"
            />
          </svg>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center">
        {/* Enhanced Profile Image with Glow Effect */}
        <motion.div
          className="mb-8 relative group"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-600 to-pink-600 rounded-full blur-2xl opacity-0 group-hover:opacity-60 animate-pulse transition-opacity duration-700"></div>
          <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-gradient-to-br from-primary via-purple-600 to-pink-600 shadow-2xl shadow-primary/30 group-hover:shadow-primary/50 transition-all duration-500 group-hover:scale-105">
            <img
              src="/Zoubeiriprofile.jpeg"
              alt="Zoubeiri Ibrahima Amed"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent"></div>
            <div className="absolute inset-0 ring-2 ring-white/20 rounded-full"></div>
          </div>
          <motion.div
            className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center shadow-xl shadow-primary/50 border-4 border-white dark:border-slate-900"
            animate={{
              scale: [1, 1.15, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-white text-2xl">👋</span>
          </motion.div>
        </motion.div>

        {/* Enhanced Location Badge */}
        <motion.div
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl mb-8 shadow-xl hover:shadow-2xl hover:border-primary/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 cursor-default group"
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 120 }}
          whileHover={{ scale: 1.05 }}
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 group-hover:bg-primary group-hover:opacity-100"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 group-hover:bg-primary transition-colors"></span>
          </span>
          <span className="text-xs font-display font-bold tracking-widest uppercase text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">
            {t("hero.location")}{" "}
            <span className="ml-1 inline-block group-hover:animate-bounce">🇸🇳</span>
          </span>
        </motion.div>

        {/* Enhanced Main Heading with Animated Gradient */}
        <motion.h1
          className="font-display font-black text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.9] mb-6 select-none"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, type: "spring", stiffness: 80 }}
        >
          <motion.span
            className="inline-block text-slate-900 dark:text-white"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              textShadow: "0 2px 20px rgba(59, 130, 246, 0.3)",
            }}
          >
            ZOUBEIR
          </motion.span>
          <br />
          <motion.span
            className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-600 to-pink-600 animate-gradient"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            style={{
              backgroundSize: "200% 200%",
              animation: "gradient 3s ease infinite",
            }}
          >
            IBRAHIMA
          </motion.span>
          <br />
          <motion.span
            className="inline-block text-slate-900 dark:text-white"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {t("hero.initials")}
          </motion.span>
        </motion.h1>

        {/* Typewriter Effect */}
        <motion.div
          className="h-10 text-xl md:text-2xl font-mono text-slate-600 dark:text-slate-300 mb-6 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <span className="text-primary mr-3">{">"}</span>
          <span>{currentWord}</span>
          <motion.span
            className="w-3 h-6 ml-1 bg-primary inline-block"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-2xl mx-auto mb-12 px-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {t("hero.tagline")}
        </motion.p>

        {/* Enhanced CTA Buttons with Gradient Effects */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <motion.a
            href="#projects"
            className="group relative px-8 py-4 bg-gradient-to-r from-primary via-blue-600 to-purple-600 text-white rounded-full font-display font-bold tracking-wide shadow-[0_10px_40px_rgba(59,130,246,0.4)] hover:shadow-[0_15px_50px_rgba(59,130,246,0.6)] transition-all duration-300 overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center justify-center gap-2">
              {t("hero.viewProjects")}
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.a>
          <motion.a
            href="#contact"
            className="group relative px-8 py-4 bg-white/80 dark:bg-slate-800/80 border-2 border-slate-200 dark:border-white/20 text-slate-900 dark:text-white rounded-full font-display font-bold tracking-wide hover:border-primary dark:hover:border-primary backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10">{t("hero.contactMe")}</span>
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.a
          href="#about"
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-primary transition-colors group cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <span className="text-xs uppercase tracking-[0.3em]">{t("hero.scrollToExplore")}</span>
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center p-1 opacity-70 group-hover:opacity-100">
            <motion.div
              className="w-1 h-2 bg-current rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;
