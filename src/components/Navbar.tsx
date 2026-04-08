import { motion, AnimatePresence } from "@/lib/static-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("#hero");
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const activeSectionLink = isHomePage ? activeLink : "";
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
    document.body.style.overflowX = "hidden";

    if (isMenuOpen) {
      document.body.style.overflowY = "hidden";
      const firstLink = mobileMenuRef.current?.querySelector<HTMLAnchorElement>("a");
      firstLink?.focus();
    } else {
      document.body.style.overflowY = "auto";
      menuButtonRef.current?.focus();
    }

    return () => {
      document.body.style.overflowY = "auto";
      document.body.style.overflowX = "hidden";
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

  useEffect(() => {
    const updateActiveLink = () => {
      setActiveLink(window.location.hash || "#hero");
    };

    updateActiveLink();
    window.addEventListener("hashchange", updateActiveLink);
    return () => window.removeEventListener("hashchange", updateActiveLink);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/" || !location.hash) {
      return;
    }

    const targetId = location.hash.slice(1);
    const targetElement = document.getElementById(targetId);

    if (!targetElement) {
      return;
    }

    const shouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animationFrame = window.requestAnimationFrame(() => {
      targetElement.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
        block: "start",
      });
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [location.hash, location.pathname]);

  const navLinks = [
    { label: "Accueil", href: "#hero" },
    { label: "Stack", href: "#skills" },
    { label: "Projets", href: "#projects" },
    { label: "Expérience", href: "#experience" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" },
  ];

  const isBlogActive = location.pathname.startsWith("/blog");

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0303AB]/95 backdrop-blur-md"
          : "bg-[#0303AB]/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Logo */}
        {isHomePage ? (
          <motion.a href="#hero" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <img
              src="/Gemini_Generated_Image_s7afnts7afnts7af-removebg-preview.png"
              alt="Scale avec Zoubeir"
              className="h-14 sm:h-16 md:h-20 w-auto object-contain"
              width={380}
              height={80}
            />
          </motion.a>
        ) : (
          <Link to="/#hero">
            <img
              src="/Gemini_Generated_Image_s7afnts7afnts7af-removebg-preview.png"
              alt="Scale avec Zoubeir"
              className="h-14 sm:h-16 md:h-20 w-auto object-contain"
              width={380}
              height={80}
            />
          </Link>
        )}

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1 font-body text-sm font-semibold uppercase tracking-wider">
          {navLinks.map((link, index) => (
            isHomePage ? (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setActiveLink(link.href)}
                className="relative px-4 py-2 text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#0303AB] transition-all duration-150 overflow-hidden"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {link.label}
                <span
                  className={`absolute left-4 right-4 bottom-0 h-1 bg-[#F5C518] transition-opacity duration-150 ${
                    activeSectionLink === link.href ? "opacity-100" : "opacity-0"
                  }`}
                />
              </motion.a>
            ) : (
              <Link
                key={link.href}
                to={`/${link.href}`}
                onClick={() => setActiveLink(link.href)}
                className="relative px-4 py-2 text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#0303AB] transition-all duration-150 overflow-hidden"
              >
                {link.label}
                <span
                  className={`absolute left-4 right-4 bottom-0 h-1 bg-[#F5C518] transition-opacity duration-150 ${
                    activeSectionLink === link.href ? "opacity-100" : "opacity-0"
                  }`}
                />
              </Link>
            )
          ))}
          <Link
            to="/blog"
            className={`relative px-4 py-2 transition-all duration-150 overflow-hidden ${
              isBlogActive
                ? "text-[#FFFFFF]"
                : "text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#0303AB]"
            }`}
          >
            Blog
            <span
              className={`absolute left-4 right-4 bottom-0 h-1 bg-[#F5C518] transition-opacity duration-150 ${
                isBlogActive ? "opacity-100" : "opacity-0"
              }`}
            />
          </Link>
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          {isHomePage ? (
            <motion.a
              href="#contact"
              className="hidden md:block px-5 py-2 bg-[#F5C518] text-[#020285] font-body font-semibold text-sm uppercase tracking-wider hover:bg-transparent hover:text-[#F5C518] transition-all duration-150"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Me Recruter
            </motion.a>
          ) : (
            <Link
              to="/#contact"
              className="hidden md:block px-5 py-2 bg-[#F5C518] text-[#020285] font-body font-semibold text-sm uppercase tracking-wider hover:bg-transparent hover:text-[#F5C518] transition-all duration-150"
            >
              Me Recruter
            </Link>
          )}

          <motion.button
            ref={menuButtonRef}
            className="md:hidden min-h-11 min-w-11 p-2.5 bg-[#F5C518] text-[#020285]"
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
            className="md:hidden bg-[#0303AB] max-h-[calc(100svh-3.5rem)] overflow-y-auto"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="flex flex-col p-4 sm:p-6 gap-2">
              {navLinks.map((link, index) => (
                isHomePage ? (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                      setActiveLink(link.href);
                      setIsMenuOpen(false);
                    }}
                    className="relative block py-3.5 px-4 font-body font-semibold text-base uppercase text-[#FFFFFF] text-center hover:bg-[#FFFFFF] hover:text-[#0303AB] transition-all duration-150 leading-tight overflow-hidden"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    {link.label}
                    <span
                      className={`absolute left-4 right-4 bottom-0 h-1 bg-[#F5C518] transition-opacity duration-150 ${
                        activeSectionLink === link.href ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </motion.a>
                ) : (
                  <Link
                    key={link.href}
                    to={`/${link.href}`}
                    onClick={() => {
                      setActiveLink(link.href);
                      setIsMenuOpen(false);
                    }}
                    className="relative block py-3.5 px-4 font-body font-semibold text-base uppercase text-[#FFFFFF] text-center hover:bg-[#FFFFFF] hover:text-[#0303AB] transition-all duration-150 leading-tight overflow-hidden"
                  >
                    {link.label}
                    <span
                      className={`absolute left-4 right-4 bottom-0 h-1 bg-[#F5C518] transition-opacity duration-150 ${
                        activeSectionLink === link.href ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </Link>
                )
              ))}
              {isHomePage ? (
                <motion.a
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-2 py-3.5 px-4 bg-[#F5C518] text-[#020285] font-body font-semibold text-base uppercase text-center leading-tight"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: navLinks.length * 0.05 }}
                >
                  Me Recruter
                </motion.a>
              ) : (
                <Link
                  to="/#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-2 py-3.5 px-4 bg-[#F5C518] text-[#020285] font-body font-semibold text-base uppercase text-center leading-tight"
                >
                  Me Recruter
                </Link>
              )}
              <Link
                to="/blog"
                onClick={() => setIsMenuOpen(false)}
                className={`mt-2 py-3.5 px-4 font-body font-semibold text-base uppercase text-center leading-tight transition-all duration-150 ${
                  isBlogActive
                    ? "text-[#FFFFFF]"
                    : "text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#0303AB]"
                }`}
              >
                Blog
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
