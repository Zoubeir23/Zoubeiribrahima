const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0303AB] px-6">
      <div className="w-full max-w-xl border-4 border-[#F5C518] bg-[#FFFFFF] p-10 text-center">
        <p className="font-display font-bold text-xs uppercase tracking-[0.3em] text-[#0303AB]/60">Erreur de navigation</p>
        <h1 className="mt-3 font-display text-7xl font-black text-[#0303AB]">404</h1>
        <p className="mt-4 font-body text-base text-[#0303AB]/80">La page demandee est introuvable ou a ete deplacee.</p>
        <a href="/" className="mt-8 inline-flex border-4 border-[#0303AB] bg-[#0303AB] px-6 py-3 font-display text-xs font-black uppercase tracking-[0.2em] text-[#FFFFFF] transition-colors hover:bg-[#FFFFFF] hover:text-[#0303AB]">
          Retour a l'accueil
        </a>
      </div>
    </div>
  );
};

export default NotFound;
