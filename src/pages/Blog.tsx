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
    <main className="min-h-screen bg-[var(--surface-base)] text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--surface-border)] bg-[var(--surface-deepest)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.25),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent_28%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-20 sm:pb-24 lg:pt-32 lg:pb-28">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-8xl uppercase leading-[0.9]">
                Des articles
                <br />
                <span className="text-white/35">qui se lisent comme un système</span>
              </h1>
              <p className="mt-6 max-w-2xl font-body text-base sm:text-lg text-white/80 leading-relaxed">
                {totalArticles} articles organisés pour guider la lecture, faire émerger des idées et convertir les visiteurs en conversations.
              </p>
            </div>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 w-fit bg-white text-[var(--surface-deepest)] font-display font-black uppercase tracking-[0.18em] px-5 py-3 border border-[var(--surface-border)] hover:bg-[var(--surface-raised)] hover:text-[var(--accent-orange)] transition-all duration-150 rounded-full"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au portfolio
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {categoryCards.map((card) => (
              <div key={card.title} className="border border-[var(--surface-border)] bg-[var(--surface-base)] p-5 sm:p-6 rounded-md">
                <card.icon className="w-6 h-6 text-[var(--accent-orange)]" />
                <h2 className="mt-4 font-display font-black text-xl uppercase text-white">{card.title}</h2>
                <p className="mt-3 font-body text-sm sm:text-base text-white/82 leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-[var(--surface-border)] bg-[var(--surface-base)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-[var(--surface-border)] bg-[var(--surface-deepest)] p-5 rounded-md">
              <p className="font-display text-4xl font-black">{totalArticles}</p>
              <p className="mt-2 font-body text-xs uppercase tracking-[0.25em] text-white/70">Articles de départ</p>
            </div>
            <div className="border border-[var(--surface-border)] bg-[var(--surface-deepest)] p-5 rounded-md">
              <p className="font-display text-4xl font-black">{totalCategories}</p>
              <p className="mt-2 font-body text-xs uppercase tracking-[0.25em] text-white/70">Axes éditoriaux</p>
            </div>
            <div className="border border-[var(--surface-border)] bg-[var(--surface-deepest)] p-5 rounded-md">
              <p className="font-display text-4xl font-black">1</p>
              <p className="mt-2 font-body text-xs uppercase tracking-[0.25em] text-white/70">Parcours de lecture</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search + Category filters — sticky */}
      <div className="sticky top-14 sm:top-16 z-30 bg-[var(--surface-base)] border-b border-[var(--surface-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Search input */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
            <input
              type="text"
              placeholder="Rechercher un article..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[var(--surface-deepest)] border border-[var(--surface-border)] pl-9 pr-8 py-2.5 font-body text-sm text-white placeholder:text-white/35 outline-none focus:border-[var(--surface-border)] transition-colors rounded-md"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
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
                  aria-pressed={activeCategory === cat}
                  className={`inline-flex min-h-11 items-center rounded-full font-display font-black text-[10px] uppercase tracking-[0.2em] px-4 py-1.5 border transition-all duration-150 ${
                    activeCategory === cat
                      ? "bg-white text-[var(--surface-deepest)] border-[var(--surface-border)]"
                      : "bg-transparent text-white/65 border-[var(--surface-border)] hover:border-[var(--accent-violet)] hover:text-white"
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
      <section className="py-14 sm:py-18 md:py-24 px-4 sm:px-6 bg-[var(--surface-deepest)]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 sm:mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-display font-bold text-white/55 text-sm uppercase tracking-[0.3em] mb-3">
                — Parcours de lecture
              </p>
              <h2 className="font-display font-black text-3xl sm:text-5xl md:text-7xl uppercase leading-tight">
                Les articles
                <br />
                <span className="text-white/35">à lire en premier</span>
              </h2>
            </div>
            <div className="max-w-md border-l-0 md:border-l border-[var(--surface-border)] md:pl-6">
              <p className="font-body text-sm sm:text-base text-white/86 leading-relaxed">
                {filtered.length === 0
                  ? "Aucun article ne correspond à ta recherche."
                  : `${filtered.length} article${filtered.length > 1 ? "s" : ""} trouvé${filtered.length > 1 ? "s" : ""}.`}
              </p>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="border border-[var(--surface-border)] bg-[var(--surface-base)] p-12 text-center rounded-md">
              <p className="font-display font-black text-2xl uppercase text-white/40">Aucun résultat</p>
              <p className="mt-3 font-body text-sm text-white/55">Essaie un autre mot-clé ou une autre catégorie.</p>
              <button
                onClick={() => { setSearch(""); setActiveCategory("all"); }}
                className="mt-6 inline-flex items-center gap-2 bg-white text-[var(--surface-deepest)] font-display font-black uppercase tracking-[0.15em] px-5 py-3 text-xs hover:bg-[var(--surface-raised)] hover:text-[var(--accent-orange)] hover:border-[var(--accent-violet)] border border-[var(--surface-border)] transition-all duration-150 rounded-full"
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
                  className="group block border border-[var(--surface-border)] bg-[var(--surface-base)] overflow-hidden transition-all duration-200 hover:-translate-y-1 mb-5 sm:mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-violet)] rounded-md"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative aspect-[16/9] lg:aspect-auto border-b lg:border-b-0 lg:border-r border-[var(--surface-border)] min-h-[220px]">
                      <img
                        src={featured.coverImage}
                        alt={featured.coverAlt}
                        className="w-full h-full object-contain bg-[var(--surface-base)]"
                        loading="eager"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-deepest)]/85 via-transparent to-transparent" />
                      <div className="absolute left-4 right-4 bottom-4 flex items-center justify-between gap-2">
                        <span className="font-display font-black text-[10px] uppercase tracking-[0.2em] text-white bg-[var(--surface-base)]/90 border border-[var(--surface-border)] px-2 py-1 rounded-md">
                          {featured.category}
                        </span>
                        <span className="font-body font-bold text-[10px] uppercase tracking-[0.14em] text-white/90 bg-[var(--surface-base)]/90 border border-[var(--surface-border)] px-2 py-1 rounded-md">
                          {featured.readingTime}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                      <div>
                        <div className="inline-block bg-white text-[var(--surface-deepest)] font-display font-black text-[10px] uppercase tracking-[0.25em] px-3 py-1 mb-4 rounded-full">
                          Article vedette
                        </div>
                        <p className="font-body text-xs uppercase tracking-[0.2em] text-white/72">{featured.date}</p>
                        <h3 className="mt-3 font-display font-black text-2xl sm:text-3xl uppercase leading-tight text-white">
                          {featured.title}
                        </h3>
                        <p className="mt-4 font-body text-sm sm:text-base text-white/86 leading-relaxed">
                          {featured.excerpt}
                        </p>
                        <p className="mt-3 font-body text-sm text-white/65 leading-relaxed line-clamp-2">
                          {featured.intro}
                        </p>
                      </div>
                      <p className="mt-6 font-display font-black text-[10px] uppercase tracking-[0.2em] text-[var(--accent-orange)] group-hover:gap-3 transition-all">
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
                      className="group block border border-[var(--surface-border)] bg-[var(--surface-base)] overflow-hidden transition-all duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-violet)] rounded-md"
                    >
                      <div className="relative aspect-[16/9] border-b border-[var(--surface-border)]">
                        <img
                          src={post.coverImage}
                          alt={post.coverAlt}
                          className="w-full h-full object-contain bg-[var(--surface-base)]"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-deepest)]/85 via-transparent to-transparent" />
                        <div className="absolute left-4 right-4 bottom-4 flex items-center justify-between gap-2">
                          <span className="font-display font-black text-[10px] uppercase tracking-[0.2em] text-white bg-[var(--surface-base)]/90 border border-[var(--surface-border)] px-2 py-1 rounded-md">
                            {post.category}
                          </span>
                          <span className="font-body font-bold text-[10px] uppercase tracking-[0.14em] text-white/90 bg-[var(--surface-base)]/90 border border-[var(--surface-border)] px-2 py-1 rounded-md">
                            {post.readingTime}
                          </span>
                        </div>
                      </div>
                      <div className="p-5 sm:p-6">
                        <p className="font-body text-xs uppercase tracking-[0.2em] text-white/72">{post.date}</p>
                        <h3 className="mt-3 font-display font-black text-xl uppercase leading-tight text-white">
                          {post.title}
                        </h3>
                        <p className="mt-3 font-body text-sm sm:text-base text-white/86 leading-relaxed">
                          {post.excerpt}
                        </p>
                        <p className="mt-4 font-body text-sm text-white/65 leading-relaxed line-clamp-3">
                          {post.intro}
                        </p>
                        <p className="mt-5 font-display font-black text-[10px] uppercase tracking-[0.2em] text-[var(--accent-orange)]">
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
      <section className="border-t border-[var(--surface-border)] bg-[var(--surface-base)] py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display font-bold text-white/55 text-xs uppercase tracking-[0.3em] mb-3">
              — Et ensuite ?
            </p>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase leading-tight">
              Continue le parcours.
            </h2>
          </div>
          <div className="max-w-2xl">
            <p className="font-body text-sm sm:text-base text-white/78 leading-relaxed">
              Le blog est prêt à accueillir d'autres articles au même format : clairs, utiles et structurés.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Blog;
