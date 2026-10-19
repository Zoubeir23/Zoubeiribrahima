import { useLocation } from "react-router-dom";
import { usePageMetadata } from "@/hooks/usePageMetadata";

const NotFound = () => {
  const { pathname } = useLocation();
  usePageMetadata({
    title: "Page introuvable | Zoubeir Ibrahima",
    description: "La page demandée est introuvable ou a été déplacée.",
    path: pathname,
    noindex: true,
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--surface-deepest)] px-6">
      <div className="w-full max-w-xl border border-[var(--surface-border)] bg-white p-10 text-center rounded-md">
        <p className="font-display font-bold text-xs uppercase tracking-[0.3em] text-[var(--surface-deepest)]/60">Erreur de navigation</p>
        <h1 className="mt-3 font-display text-7xl font-black text-[var(--surface-deepest)]">404</h1>
        <p className="mt-4 font-body text-base text-[var(--surface-deepest)]/80">La page demandee est introuvable ou a ete deplacee.</p>
        <a href="/" className="mt-8 inline-flex border border-[var(--surface-border)] bg-[var(--surface-deepest)] px-6 py-3 font-display text-xs font-black uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-[var(--surface-deepest)] rounded-md">
          Retour a l'accueil
        </a>
      </div>
    </div>
  );
};

export default NotFound;
