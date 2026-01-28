import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { useDarkMode } from "@/hooks/useDarkMode";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { isDark, toggleDarkMode } = useDarkMode();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en");
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <div className="fixed top-0 inset-x-0 z-50 px-4 pt-4 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`pointer-events-auto relative mx-auto w-full max-w-5xl rounded-2xl border backdrop-blur-xl transition-all duration-300 ${
          scrolled
            ? "bg-white/95 dark:bg-slate-900/95 border-slate-200/50 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "bg-white/90 dark:bg-slate-900/90 border-white/30 dark:border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
        }`}
      >
        {/* Container flex 3 colonnes : logo | liens | actions */}
        <div className="px-4 md:px-6 h-16 flex items-center justify-between gap-2">
          {/* Logo - Gauche */}
          <motion.a
            className="flex items-center gap-2 group cursor-pointer shrink-0"
            href="#home"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Accueil"
          >
            <div className="relative">
              <img
                src="/Zoubeiriprofile.jpeg"
                alt="Zoubeiri Ibrahima Amed"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover border-2 border-primary shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></div>
            </div>
            <span className="hidden sm:block text-lg md:text-xl font-display font-bold tracking-tighter bg-gradient-to-r from-slate-900 via-primary to-purple-600 dark:from-white dark:via-primary dark:to-purple-400 bg-clip-text text-transparent">
              Z.I.A
            </span>
          </motion.a>

          {/* Navigation Links - Centre (Desktop) */}
          <div className="hidden md:flex items-center justify-center gap-1 lg:gap-2 font-display text-xs uppercase tracking-wider font-semibold">
            {["home", "about", "projects", "contact"].map((item, index) => (
              <motion.a
                key={item}
                className="relative px-3 lg:px-4 py-2 rounded-xl border border-slate-200 dark:border-white/15 text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary hover:bg-slate-100 dark:hover:bg-white/10 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 group font-medium shadow-sm hover:shadow-md whitespace-nowrap"
                href={`#${item}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={t(`nav.${item}`)}
              >
                {t(`nav.${item}`)}
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-600 group-hover:w-3/4 transition-all duration-300 rounded-full"></span>
              </motion.a>
            ))}
          </div>

          {/* Actions - Droite (Desktop) */}
          <div className="hidden md:flex items-center justify-end gap-2 shrink-0">
            {/* Dark Mode Toggle */}
            <motion.button
              onClick={toggleDarkMode}
              className="relative p-2 rounded-xl border border-slate-200 dark:border-white/15 hover:border-primary/50 dark:hover:border-primary/50 bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 group shadow-sm hover:shadow-md"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Mode clair" : "Mode sombre"}
              whileHover={{ scale: 1.05, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              {isDark ? (
                <Sun className="w-4 h-4 lg:w-5 lg:h-5 relative z-10 text-yellow-500" />
              ) : (
                <Moon className="w-4 h-4 lg:w-5 lg:h-5 relative z-10 text-indigo-600" />
              )}
            </motion.button>

            {/* Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-white/15 hover:border-primary/50 dark:hover:border-primary/50 bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 text-sm font-semibold group shadow-sm hover:shadow-md"
              title={language === "en" ? "Switch to French" : "Switch to English"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={
                language === "en" ? "Switch to French" : "Switch to English"
              }
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              <span className="text-base relative z-10">
                {language === "en" ? "🇫🇷" : "🇺🇸"}
              </span>
              <span className="relative z-10 hidden lg:inline text-xs">
                {language === "en" ? "FR" : "EN"}
              </span>
            </motion.button>

            {/* CTA Button */}
            <motion.a
              href="#contact"
              className="relative px-4 py-2 rounded-xl bg-gradient-to-r from-primary via-blue-600 to-purple-600 text-white text-xs font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:shadow-xl transition-all duration-300 overflow-hidden group whitespace-nowrap"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Contactez-moi"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center gap-1.5">
                {t("nav.letsTalk")}
                <svg
                  className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden relative p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/15 shadow-md hover:shadow-lg transition-all duration-300 group shrink-0"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            {isMenuOpen ? (
              <X className="w-5 h-5 text-slate-800 dark:text-white relative z-10" />
            ) : (
              <Menu className="w-5 h-5 text-slate-800 dark:text-white relative z-10" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden border-t border-slate-200 dark:border-white/10 rounded-b-2xl overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              role="dialog"
              aria-modal="true"
            >
              <div className="flex flex-col space-y-3 p-4">
                {/* Navigation Links */}
                <div className="space-y-2">
                  {["home", "about", "projects", "contact"].map(
                    (item, index) => (
                      <motion.a
                        key={item}
                        className="block text-center px-4 py-3 rounded-xl border border-slate-200 dark:border-white/15 text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary hover:bg-slate-100 dark:hover:bg-white/10 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 font-display text-sm uppercase tracking-widest font-semibold shadow-sm hover:shadow-md"
                        href={`#${item}`}
                        onClick={() => setIsMenuOpen(false)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label={t(`nav.${item}`)}
                      >
                        {t(`nav.${item}`)}
                      </motion.a>
                    ),
                  )}
                </div>

                {/* Action Buttons */}
                <div className="border-t border-slate-200 dark:border-white/10 pt-3 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <motion.button
                      onClick={() => {
                        toggleDarkMode();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 font-medium text-sm shadow-sm hover:shadow-md"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: 0.2 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      aria-label={isDark ? "Mode clair" : "Mode sombre"}
                    >
                      {isDark ? (
                        <Sun className="w-4 h-4 text-yellow-500" />
                      ) : (
                        <Moon className="w-4 h-4 text-indigo-600" />
                      )}
                      <span className="text-slate-700 dark:text-slate-300">
                        {isDark ? "Clair" : "Sombre"}
                      </span>
                    </motion.button>

                    <motion.button
                      onClick={() => {
                        toggleLanguage();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 font-medium text-sm shadow-sm hover:shadow-md"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: 0.25 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      aria-label={language === "en" ? "Français" : "English"}
                    >
                      <Globe className="w-4 h-4 text-primary" />
                      <span className="text-slate-700 dark:text-slate-300">
                        {language === "en" ? "Français" : "English"}
                      </span>
                    </motion.button>
                  </div>

                  <motion.a
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-primary via-blue-600 to-purple-600 text-white font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300"
                    href="#contact"
                    onClick={() => setIsMenuOpen(false)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Contactez-moi"
                  >
                    {t("nav.letsTalk")}
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default Navbar;
