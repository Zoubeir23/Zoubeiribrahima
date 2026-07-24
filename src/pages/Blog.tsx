import { useState, useMemo } from "react";
import { ArrowLeft, BookOpen, Bot, Rocket, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import Navbar from "@/components/Navbar";

const CATEGORY_LABELS: Record<string, string> = {
  all: "Tous",
  outils: "Outils",
  python: "Python",
  frontend: "Frontend",
  devops: "DevOps",
  ai: "IA & Agents",
};

const categoryCards = [
  {
    title: "Fondations éditoriales",
    description: "Des articles pour clarifier le message, structurer le blog et créer une lecture logique.",
    icon: BookOpen,
  },
  {
    title: "Croissance & acquisition",
    description: "Des contenus pour attirer des visiteurs, générer des conversations et valider des offres.",
    icon: Rocket,
  },
  {
    title: "IA & agents",
    description: "Des billets sur OpenClaw, Claude Code et les nouveaux workflows qui accélèrent l'exécution.",
    icon: Bot,
  },
];

const Blog = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(blogPosts.map((p) => p.category)))],
    []
  );

  const filtered = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchCat = activeCategory === "all" || post.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  const featured = filtered[0] ?? null;
  const rest = filtered.slice(1);
  const totalArticles = blogPosts.length;
  const totalCategories = new Set(blogPosts.map((p) => p.category)).size;

  return (
    <main className="min-h-screen bg-[#020285] text-[#FFFFFF]">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b-8 border-[#F5C518] bg-[#0303AB]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,197,24,0.25),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent_28%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-20 sm:pb-24 lg:pt-32 lg:pb-28">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-8xl uppercase leading-[0.9]">
                Des articles
                <br />
                <span className="text-[#FFFFFF]/35">qui se lisent comme un système</span>
              </h1>
              <p className="mt-6 max-w-2xl font-body text-base sm:text-lg text-[#FFFFFF]/80 leading-relaxed">
                {totalArticles} articles organisés pour guider la lecture, faire émerger des idées et convertir les visiteurs en conversations.
              </p>
            </div>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 w-fit bg-[#F5C518] text-[#020285] font-display font-black uppercase tracking-[0.18em] px-5 py-3 border-4 border-[#F5C518] hover:bg-[#020285] hover:text-[#F5C518] transition-all duration-150"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au portfolio
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {categoryCards.map((card) => (
              <div key={card.title} className="border-4 border-[#F5C518] bg-[#020285] p-5 sm:p-6">
                <card.icon className="w-6 h-6 text-[#F5C518]" />
                <h2 className="mt-4 font-display font-black text-xl uppercase text-[#FFFFFF]">{card.title}</h2>
                <p className="mt-3 font-body text-sm sm:text-base text-[#FFFFFF]/82 leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b-8 border-[#F5C518] bg-[#020285]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border-4 border-[#F5C518] bg-[#0303AB] p-5">
              <p className="font-display text-4xl font-black">{totalArticles}</p>
              <p className="mt-2 font-body text-xs uppercase tracking-[0.25em] text-[#FFFFFF]/70">Articles de départ</p>
            </div>
            <div className="border-4 border-[#F5C518] bg-[#0303AB] p-5">
              <p className="font-display text-4xl font-black">{totalCategories}</p>
              <p className="mt-2 font-body text-xs uppercase tracking-[0.25em] text-[#FFFFFF]/70">Axes éditoriaux</p>
            </div>
            <div className="border-4 border-[#F5C518] bg-[#0303AB] p-5">
              <p className="font-display text-4xl font-black">1</p>
              <p className="mt-2 font-body text-xs uppercase tracking-[0.25em] text-[#FFFFFF]/70">Parcours de lecture</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search + Category filters — sticky */}
      <div className="sticky top-14 sm:top-16 z-30 bg-[#020285] border-b-4 border-[#F5C518]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Search input */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FFFFFF]/40 pointer-events-none" />
            <input
              type="text"
              placeholder="Rechercher un article..."
              aria-label="Rechercher un article"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0303AB] border-4 border-[#F5C518] pl-9 pr-8 py-2.5 font-body text-sm text-[#FFFFFF] placeholder:text-[#FFFFFF]/35 outline-none focus:border-[#FFFFFF] transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#FFFFFF]/50 hover:text-[#FFFFFF] transition-colors"
                aria-label="Effacer la recherche"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const count = cat === "all" ? blogPosts.length : blogPosts.filter((p) => p.category === cat).length;
              const label = CATEGORY_LABELS[cat] ?? cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`font-display font-black text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 border-2 transition-all duration-150 ${
                    activeCategory === cat
                      ? "bg-[#F5C518] text-[#020285] border-[#F5C518]"
                      : "bg-transparent text-[#FFFFFF]/65 border-[#FFFFFF]/25 hover:border-[#F5C518] hover:text-[#FFFFFF]"
                  }`}
                >
                  {label} <span className="opacity-55">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Articles */}
      <section className="py-14 sm:py-18 md:py-24 px-4 sm:px-6 bg-[#0303AB]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 sm:mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-display font-bold text-[#FFFFFF]/55 text-sm uppercase tracking-[0.3em] mb-3">
                — Parcours de lecture
              </p>
              <h2 className="font-display font-black text-3xl sm:text-5xl md:text-7xl uppercase leading-tight">
                Les articles
                <br />
                <span className="text-[#FFFFFF]/35">à lire en premier</span>
              </h2>
            </div>
            <div className="max-w-md border-l-0 md:border-l-4 border-[#F5C518] md:pl-6">
              <p className="font-body text-sm sm:text-base text-[#FFFFFF]/86 leading-relaxed">
                {filtered.length === 0
                  ? "Aucun article ne correspond à ta recherche."
                  : `${filtered.length} article${filtered.length > 1 ? "s" : ""} trouvé${filtered.length > 1 ? "s" : ""}.`}
              </p>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="border-4 border-[#F5C518] bg-[#020285] p-12 text-center">
              <p className="font-display font-black text-2xl uppercase text-[#FFFFFF]/40">Aucun résultat</p>
              <p className="mt-3 font-body text-sm text-[#FFFFFF]/55">Essaie un autre mot-clé ou une autre catégorie.</p>
              <button
                onClick={() => { setSearch(""); setActiveCategory("all"); }}
                className="mt-6 inline-flex items-center gap-2 bg-[#F5C518] text-[#020285] font-display font-black uppercase tracking-[0.15em] px-5 py-3 text-xs hover:bg-[#0303AB] hover:text-[#F5C518] hover:border-[#F5C518] border-4 border-[#F5C518] transition-all duration-150"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <>
              {/* Featured article — large horizontal card */}
              {featured && (
                <Link
                  to={`/blog/${featured.slug}`}
                  className="group block border-4 border-[#F5C518] bg-[#020285] overflow-hidden transition-all duration-200 hover:-translate-y-1 mb-5 sm:mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C518]"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative aspect-[16/9] lg:aspect-auto border-b-4 lg:border-b-0 lg:border-r-4 border-[#F5C518] min-h-[220px]">
                      <img
                        src={featured.coverImage}
                        alt={featured.coverAlt}
                        className="w-full h-full object-contain bg-[#020285]"
                        loading="eager"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020285]/85 via-transparent to-transparent" />
                      <div className="absolute left-4 right-4 bottom-4 flex items-center justify-between gap-2">
                        <span className="font-display font-black text-[10px] uppercase tracking-[0.2em] text-[#FFFFFF] bg-[#020285]/90 border border-[#F5C518] px-2 py-1">
                          {featured.category}
                        </span>
                        <span className="font-body font-bold text-[10px] uppercase tracking-[0.14em] text-[#FFFFFF]/90 bg-[#020285]/90 border border-[#F5C518]/60 px-2 py-1">
                          {featured.readingTime}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                      <div>
                        <div className="inline-block bg-[#F5C518] text-[#020285] font-display font-black text-[10px] uppercase tracking-[0.25em] px-3 py-1 mb-4">
                          Article vedette
                        </div>
                        <p className="font-body text-xs uppercase tracking-[0.2em] text-[#FFFFFF]/72">{featured.date}</p>
                        <h3 className="mt-3 font-display font-black text-2xl sm:text-3xl uppercase leading-tight text-[#FFFFFF]">
                          {featured.title}
                        </h3>
                        <p className="mt-4 font-body text-sm sm:text-base text-[#FFFFFF]/86 leading-relaxed">
                          {featured.excerpt}
                        </p>
                        <p className="mt-3 font-body text-sm text-[#FFFFFF]/65 leading-relaxed line-clamp-2">
                          {featured.intro}
                        </p>
                      </div>
                      <p className="mt-6 font-display font-black text-[10px] uppercase tracking-[0.2em] text-[#F5C518] group-hover:gap-3 transition-all">
                        Lire l'article {"->"}
                      </p>
                    </div>
                  </div>
                </Link>
              )}

              {/* Remaining articles grid */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
                  {rest.map((post) => (
                    <Link
                      key={post.slug}
                      to={`/blog/${post.slug}`}
                      className="group block border-4 border-[#F5C518] bg-[#020285] overflow-hidden transition-all duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C518]"
                    >
                      <div className="relative aspect-[16/9] border-b-4 border-[#F5C518]">
                        <img
                          src={post.coverImage}
                          alt={post.coverAlt}
                          className="w-full h-full object-contain bg-[#020285]"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020285]/85 via-transparent to-transparent" />
                        <div className="absolute left-4 right-4 bottom-4 flex items-center justify-between gap-2">
                          <span className="font-display font-black text-[10px] uppercase tracking-[0.2em] text-[#FFFFFF] bg-[#020285]/90 border border-[#F5C518] px-2 py-1">
                            {post.category}
                          </span>
                          <span className="font-body font-bold text-[10px] uppercase tracking-[0.14em] text-[#FFFFFF]/90 bg-[#020285]/90 border border-[#F5C518]/60 px-2 py-1">
                            {post.readingTime}
                          </span>
                        </div>
                      </div>
                      <div className="p-5 sm:p-6">
                        <p className="font-body text-xs uppercase tracking-[0.2em] text-[#FFFFFF]/72">{post.date}</p>
                        <h3 className="mt-3 font-display font-black text-xl uppercase leading-tight text-[#FFFFFF]">
                          {post.title}
                        </h3>
                        <p className="mt-3 font-body text-sm sm:text-base text-[#FFFFFF]/86 leading-relaxed">
                          {post.excerpt}
                        </p>
                        <p className="mt-4 font-body text-sm text-[#FFFFFF]/65 leading-relaxed line-clamp-3">
                          {post.intro}
                        </p>
                        <p className="mt-5 font-display font-black text-[10px] uppercase tracking-[0.2em] text-[#F5C518]">
                          Lire l'article {"->"}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-t-8 border-[#F5C518] bg-[#020285] py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display font-bold text-[#FFFFFF]/55 text-xs uppercase tracking-[0.3em] mb-3">
              — Et ensuite ?
            </p>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase leading-tight">
              Continue le parcours.
            </h2>
          </div>
          <div className="max-w-2xl">
            <p className="font-body text-sm sm:text-base text-[#FFFFFF]/78 leading-relaxed">
              Le blog est prêt à accueillir d'autres articles au même format : clairs, utiles et structurés.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Blog;
