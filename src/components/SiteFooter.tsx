import { useLandingContent } from "@/hooks/useLandingContent";

const footerLinks = [
  { label: "GitHub", href: "https://github.com/Zoubeir23" },
  { label: "LinkedIn", href: "https://linkedin.com/in/zoubeir-ibrahima" },
  { label: "Email", href: "mailto:Zoubeiribrahima@gmail.com" },
] as const;

const SiteFooter = () => {
  const { footer } = useLandingContent();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--surface-border)] bg-[var(--surface-base)] px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <img
          src="/logo-scale-avec-zoubeir-for-dark-background.png"
          alt="Scale avec Zoubeir"
          className="h-16 w-auto object-contain sm:h-20"
          width={420}
          height={96}
          loading="lazy"
        />
        <p className="text-center font-mono text-xs uppercase tracking-widest text-[var(--text-muted)]">
          © {currentYear} Zoubeir Ibrahima Amed — {footer.rights}
        </p>
        <ul className="flex flex-wrap justify-center gap-6">
          {footerLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] transition-colors duration-300 hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default SiteFooter;
