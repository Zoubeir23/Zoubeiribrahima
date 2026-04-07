import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      const firstLink = mobileMenuRef.current?.querySelector<HTMLAnchorElement>("a");
      firstLink?.focus();
    } else {
      document.body.style.overflow = "unset";
      menuButtonRef.current?.focus();
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  const navLinks = [
    { label: "Accueil", href: "#hero" },
    { label: "Stack", href: "#skills" },
    { label: "Projets", href: "#projects" },
    { label: "Expérience", href: "#experience" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#143DFF]/95 backdrop-blur-md border-b-4 border-[#FFFFFF]"
          : "bg-[#143DFF]/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#hero"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src="/Gemini_Generated_Image_s7afnts7afnts7af-removebg-preview.png"
            alt="Scale avec Zoubeir"
            className="h-12 sm:h-14 md:h-16 w-auto object-contain"
            width={320}
            height={64}
          />
        </motion.a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1 font-display text-sm font-bold uppercase tracking-wider">
          {navLinks.map((link, index) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#143DFF] transition-all duration-150 border-2 border-transparent hover:border-[#FFFFFF]"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <motion.a
            href="#contact"
            className="hidden md:block px-5 py-2 bg-[#FFFFFF] text-[#143DFF] font-display font-black text-sm uppercase tracking-wider border-2 border-[#FFFFFF] hover:bg-[#143DFF] hover:text-[#FFFFFF] transition-all duration-150"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Me Recruter
          </motion.a>

          <motion.button
            ref={menuButtonRef}
            className="md:hidden min-h-11 min-w-11 p-2.5 border-2 border-[#FFFFFF] bg-[#FFFFFF] text-[#143DFF]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-menu"
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-nav-menu"
            ref={mobileMenuRef}
            className="md:hidden bg-[#143DFF] border-t-4 border-[#FFFFFF] max-h-[calc(100svh-3.5rem)] overflow-y-auto"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="flex flex-col p-4 sm:p-6 gap-2">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-3.5 px-4 font-display font-black text-base uppercase text-[#FFFFFF] border-2 border-[#FFFFFF] text-center hover:bg-[#FFFFFF] hover:text-[#143DFF] transition-all duration-150 leading-tight"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 py-3.5 px-4 bg-[#FFFFFF] text-[#143DFF] font-display font-black text-base uppercase text-center border-2 border-[#FFFFFF] leading-tight"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: navLinks.length * 0.05 }}
              >
                Me Recruter
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
