import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Emoji from "@/components/Emoji";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useLandingContent } from "@/hooks/useLandingContent";
import { useLanguage } from "@/hooks/useLanguage";

const NAV_EMOJIS: Record<string, string> = {
  "#hero": "🏠",
  "#services": "🛠️",
  "#skills": "⚙️",
  "#projects": "🚀",
  "#experience": "🎓",
  "#certifications": "🏆",
  "#contact": "✉️",
};
const BLOG_EMOJI = "📖";
const HIRE_EMOJI = "🚀";

const NAV_SECTION_IDS = ["hero", "services", "skills", "projects", "experience", "certifications", "contact"] as const;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const activeSectionId = useActiveSection(NAV_SECTION_IDS, isHomePage);
  const activeSectionLink = activeSectionId ? `#${activeSectionId}` : "";
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const { nav } = useLandingContent();
  const { language, setLanguage } = useLanguage();

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
    { label: nav.home, href: "#hero" },
    { label: nav.services, href: "#services" },
    { label: nav.stack, href: "#skills" },
    { label: nav.projects, href: "#projects" },
    { label: nav.experience, href: "#experience" },
    { label: nav.certifications, href: "#certifications" },
    { label: nav.contact, href: "#contact" },
  ];

  const isBlogActive = location.pathname.startsWith("/blog");
  const nextLanguage = language === "fr" ? "en" : "fr";

  const getDesktopLinkClassName = (isActive: boolean) =>
    `rounded-full px-4 py-2 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent-violet)] ${
      isActive
        ? "bg-white font-semibold text-[var(--surface-deepest)]"
        : "text-white hover:bg-[var(--surface-raised)]"
    }`;
  const mobileLinkClassName =
    "block rounded-[var(--radius-small)] px-4 py-3.5 text-center font-body text-base font-semibold text-[var(--text-secondary)] transition-colors duration-300 hover:bg-[var(--surface-raised)] hover:text-white";
  const primaryActionClassName =
    "inline-flex min-h-11 items-center justify-center rounded-full bg-white px-5 py-2 font-body text-sm font-semibold text-[var(--surface-deepest)] transition-colors duration-300 hover:bg-[var(--text-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-violet)]";

  const logoImage = (
    <img
      src="/logo-scale-avec-zoubeir-for-dark-background.png"
      alt="Scale avec Zoubeir"
      className="h-14 w-auto object-contain sm:h-16"
      width={380}
      height={80}
    />
  );

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b border-[var(--surface-border)] backdrop-blur-md transition-colors duration-300 ${
        scrolled ? "bg-[var(--surface-deepest)]/95 shadow-[0_8px_30px_rgba(0,0,0,0.6)]" : "bg-[var(--surface-deepest)]/85"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:px-6">
        {isHomePage ? <a href="#hero">{logoImage}</a> : <Link to="/#hero">{logoImage}</Link>}

        <div className="hidden items-center gap-1 rounded-full border border-[var(--surface-border)] bg-[var(--surface-base)] p-1 font-body text-sm font-medium xl:flex">
          {navLinks.map((link) =>
            isHomePage ? (
              <a
                key={link.href}
                href={link.href}
                aria-current={activeSectionLink === link.href ? "location" : undefined}
                className={getDesktopLinkClassName(activeSectionLink === link.href)}
              >
                <Emoji symbol={NAV_EMOJIS[link.href] ?? "•"} className="mr-1.5" />
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                to={`/${link.href}`}
                className={getDesktopLinkClassName(false)}
              >
                <Emoji symbol={NAV_EMOJIS[link.href] ?? "•"} className="mr-1.5" />
                {link.label}
              </Link>
            ),
          )}
          <Link
            to="/blog"
            aria-current={isBlogActive ? "page" : undefined}
            className={getDesktopLinkClassName(isBlogActive)}
          >
            <Emoji symbol={BLOG_EMOJI} className="mr-1.5" />
            {nav.blog}
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setLanguage(nextLanguage)}
            aria-label={nav.switchLanguage}
            className="min-h-11 min-w-11 rounded-full border border-[var(--surface-border)] px-3 font-mono text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] transition-colors duration-300 hover:border-white hover:text-white"
          >
            {nextLanguage}
          </button>

          {isHomePage ? (
            <a href="#contact" className={`hidden xl:inline-flex ${primaryActionClassName}`}>
              <Emoji symbol={HIRE_EMOJI} className="mr-2" />
              {nav.hire}
            </a>
          ) : (
            <Link to="/#contact" className={`hidden xl:inline-flex ${primaryActionClassName}`}>
              <Emoji symbol={HIRE_EMOJI} className="mr-2" />
              {nav.hire}
            </Link>
          )}

          <button
            ref={menuButtonRef}
            type="button"
            className="min-h-11 min-w-11 rounded-full border border-[var(--surface-border)] p-2.5 text-white xl:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={nav.toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-nav-menu"
          ref={mobileMenuRef}
          className="max-h-[calc(100svh-4.5rem)] overflow-y-auto border-t border-[var(--surface-border)] bg-[var(--surface-deepest)] xl:hidden"
        >
          <div className="flex flex-col gap-1 p-4 sm:p-6">
            {navLinks.map((link) =>
              isHomePage ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                  className={mobileLinkClassName}
                >
                  <Emoji symbol={NAV_EMOJIS[link.href] ?? "•"} className="mr-1.5" />
                {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={`/${link.href}`}
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                  className={mobileLinkClassName}
                >
                  <Emoji symbol={NAV_EMOJIS[link.href] ?? "•"} className="mr-1.5" />
                {link.label}
                </Link>
              ),
            )}
            <Link to="/blog" onClick={() => setIsMenuOpen(false)} className={mobileLinkClassName}>
              <Emoji symbol={BLOG_EMOJI} className="mr-1.5" />
            {nav.blog}
            </Link>
            {isHomePage ? (
              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className={`mt-2 ${primaryActionClassName}`}
              >
                <Emoji symbol={HIRE_EMOJI} className="mr-2" />
              {nav.hire}
              </a>
            ) : (
              <Link
                to="/#contact"
                onClick={() => setIsMenuOpen(false)}
                className={`mt-2 ${primaryActionClassName}`}
              >
                <Emoji symbol={HIRE_EMOJI} className="mr-2" />
              {nav.hire}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
