const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#143DFF] px-6">
      <div className="w-full max-w-xl border-4 border-[#FFFFFF] bg-[#FFFFFF] p-10 text-center">
        <p className="font-display font-bold text-xs uppercase tracking-[0.3em] text-[#143DFF]/60">Erreur de navigation</p>
        <h1 className="mt-3 font-display text-7xl font-black text-[#143DFF]">404</h1>
        <p className="mt-4 font-body text-base text-[#143DFF]/80">La page demandee est introuvable ou a ete deplacee.</p>
        <a href="/" className="mt-8 inline-flex border-4 border-[#143DFF] bg-[#143DFF] px-6 py-3 font-display text-xs font-black uppercase tracking-[0.2em] text-[#FFFFFF] transition-colors hover:bg-[#FFFFFF] hover:text-[#143DFF]">
          Retour a l'accueil
        </a>
      </div>
    </div>
  );
};

export default NotFound;
