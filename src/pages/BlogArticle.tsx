import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import Navbar from "@/components/Navbar";
import { blogPosts } from "@/data/blogPosts";
import { ArrowLeft, ArrowUp, Check, Copy, List } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";

function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function nodeToText(node: unknown): string {
  if (typeof node === "string") {
    return node;
  }
  if (typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map((child) => nodeToText(child)).join("");
  }
  if (node && typeof node === "object" && "props" in node) {
    const maybeProps = node as { props?: { children?: unknown } };
    return nodeToText(maybeProps.props?.children);
  }
  return "";
}

// Parse markdown to extract h2 headings for TOC with stable ids.
function extractHeadingsFromMarkdown(markdown: string): { id: string; heading: string }[] {
  const lines = markdown.split("\n");
  const headings: { id: string; heading: string }[] = [];
  const idCounts = new Map<string, number>();
  let inCodeFence = false;
  let reachedPreface = false;

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      inCodeFence = !inCodeFence;
      return;
    }

    if (inCodeFence) {
      return;
    }

    if (!line.startsWith("## ")) {
      return;
    }

    const heading = line.replace("## ", "").trim();
    if (!heading) {
      return;
    }

    const normalizedHeading = slugifyHeading(heading);

    if (normalizedHeading === "preface") {
      reachedPreface = true;
    }

    if (!reachedPreface) {
      return;
    }

    if (normalizedHeading === "table-des-matieres" || normalizedHeading === "sommaire") {
      return;
    }

    const baseId = `md-${normalizedHeading || "section"}`;
    const currentCount = idCounts.get(baseId) ?? 0;
    idCounts.set(baseId, currentCount + 1);
    const id = currentCount === 0 ? baseId : `${baseId}-${currentCount + 1}`;

    headings.push({ id, heading });
  });

  return headings;
}

function useReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);

    const update = () => {
      const scrollTop = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        setProgress(100);
        return;
      }
      const current = (scrollTop / totalHeight) * 100;
      setProgress((prev) => Math.max(prev, current));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return progress;
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);
  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 flex items-center gap-1.5 bg-[#020285] border border-[#F5C518]/50 text-[#FFFFFF]/55 hover:text-[#F5C518] hover:border-[#F5C518] px-2 py-1 font-display font-black text-[9px] uppercase tracking-[0.2em] transition-all duration-150 z-10"
      aria-label="Copier le code"
    >
      {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
      {copied ? "Copié !" : "Copier"}
    </button>
  );
}

const BlogArticle = () => {
  const renderedHeadingIdCounts = new Map<string, number>();
  const articleRef = useRef<HTMLElement | null>(null);
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((item) => item.slug === slug);
  const progress = useReadingProgress();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const [activeTocId, setActiveTocId] = useState<string>("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const markdownHeadings = useMemo(
    () => (post?.contentMarkdown ? extractHeadingsFromMarkdown(post.contentMarkdown) : []),
    [post?.contentMarkdown]
  );

  const toc = useMemo(() => {
    let computed: { id: string; heading: string }[] = [];

    if (post?.sections && post.sections.length > 0) {
      computed = post.sections
        .map((s, i) => (s.heading ? { id: `manual-section-${i}`, heading: s.heading } : null))
        .filter((item): item is { id: string; heading: string } => Boolean(item));
    }

    if (computed.length === 0 && post?.contentMarkdown) {
      computed = markdownHeadings;
    }

    return computed;
  }, [post, markdownHeadings]);

  useEffect(() => {
    if (!post || toc.length === 0) {
      return;
    }

    const headingElements = toc
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (headingElements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleEntries.length > 0) {
          setActiveTocId(visibleEntries[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0, 0.2, 0.5, 1],
      }
    );

    headingElements.forEach((el) => observer.observe(el));
    setActiveTocId((previousId) => previousId || toc[0]?.id || "");

    return () => observer.disconnect();
  }, [post, slug, toc]);

  // Related articles: same category first, then others to fill up to 3
  const relatedArticles = useMemo(() => {
    if (!post) {
      return [];
    }

    const sameCategory = blogPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);
    const others = blogPosts
      .filter((p) => p.slug !== post.slug && p.category !== post.category)
      .slice(0, 3 - sameCategory.length);
    return [...sameCategory, ...others];
  }, [post]);

  if (!post) {
    return (
      <main className="min-h-screen bg-[#020285] text-[#FFFFFF]">
        <Navbar />
        <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-24">
          <h1 className="font-display font-black text-4xl uppercase">Article introuvable</h1>
          <p className="mt-4 font-body text-[#FFFFFF]/80">L'article demandé n'existe pas ou a été déplacé.</p>
          <Link
            to="/blog"
            className="mt-8 inline-flex items-center gap-2 border-4 border-[#F5C518] bg-[#F5C518] text-[#020285] px-4 py-2 font-display font-black uppercase tracking-[0.15em]"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#020285] text-[#FFFFFF]">
      {/* Reading progress bar — above navbar */}
      <div className="fixed top-0 left-0 right-0 z-[9999] h-[4px] bg-[#0303AB]">
        <div
          className="h-full bg-[#F5C518] transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-20">
        {/* Back */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-[#F5C518] font-display font-black text-xs uppercase tracking-[0.2em] hover:opacity-75 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au blog
        </Link>

        <div className="mt-6 lg:grid lg:grid-cols-[1fr_300px] lg:gap-12 xl:grid-cols-[1fr_330px] xl:gap-16 items-start">
          {/* Main article */}
          <article ref={articleRef}>
            {/* Cover + header */}
            <div className="border-4 border-[#F5C518] bg-[#0303AB] overflow-hidden">
              <div className="aspect-[16/9] border-b-4 border-[#F5C518]">
                <img
                  src={post.coverImage}
                  alt={post.coverAlt}
                  className="w-full h-full object-contain bg-[#020285]"
                />
              </div>
              <div className="p-6 sm:p-8 md:p-10">
                <p className="font-body text-xs uppercase tracking-[0.2em] text-[#FFFFFF]/72">
                  {post.category} · {post.readingTime} · {post.date}
                </p>
                <h1 className="mt-3 font-display font-black text-3xl sm:text-5xl uppercase leading-tight">
                  {post.title}
                </h1>
                <p className="mt-6 font-body text-base sm:text-lg text-[#FFFFFF]/88 leading-relaxed border-l-4 border-[#F5C518] pl-5">
                  {post.intro}
                </p>
              </div>
            </div>

            {/* Mobile TOC — collapsible Card */}
            {toc.length > 0 && (
              <Card className="lg:hidden mt-8 border-4 border-[#F5C518] bg-[#0303AB] overflow-hidden shadow-lg">
                <button
                  onClick={() => setTocOpen(!tocOpen)}
                  className="w-full flex items-center justify-between gap-3 p-5 font-display font-black text-sm uppercase tracking-[0.15em] hover:bg-[#020285] transition-colors duration-150 border-b-4 border-[#F5C518]"
                  aria-expanded={tocOpen}
                >
                  <span className="flex items-center gap-3">
                    <div className="p-1.5 bg-[#F5C518] rounded">
                      <List className="w-4 h-4 text-[#020285]" />
                    </div>
                    <div className="text-left">
                      <span className="block text-[#FFFFFF]">Table des matières</span>
                      <span className="block text-[9px] font-body font-normal text-[#FFFFFF]/60 mt-0.5">
                        {toc.length} sections
                      </span>
                    </div>
                  </span>
                  <span className="text-[#F5C518] text-2xl leading-none font-black">
                    {tocOpen ? "−" : "+"}
                  </span>
                </button>
                {tocOpen && (
                  <nav className="border-t-4 border-[#F5C518] p-5 space-y-2 bg-gradient-to-b from-[#0303AB] to-[#020285] max-h-[55vh] overflow-y-auto">
                    {toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={() => setTocOpen(false)}
                        className={`group flex items-start gap-2.5 font-body text-sm font-semibold leading-snug py-2.5 px-3 border-l-4 rounded transition-all duration-150 ${
                          activeTocId === item.id
                            ? "text-[#FFFFFF] border-[#F5C518] bg-[#020285]"
                            : "text-[#FFFFFF]/82 border-[#F5C518]/40 hover:border-[#F5C518] hover:bg-[#020285] hover:text-[#FFFFFF]"
                        }`}
                        title={item.heading}
                      >
                        <span className={`mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full transition-transform ${activeTocId === item.id ? "bg-[#F5C518] scale-125" : "bg-[#F5C518] group-hover:scale-125"}`} />
                        <span>{item.heading}</span>
                      </a>
                    ))}
                    
                    {/* Mobile progress info */}
                    <div className="border-t-2 border-[#F5C518]/30 mt-4 pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-display font-black text-[9px] uppercase tracking-[0.2em] text-[#FFFFFF]/80">
                          Progression
                        </p>
                        <p className="font-display font-black text-sm text-[#F5C518]">
                          {Math.round(progress)}%
                        </p>
                      </div>
                      <div className="h-1.5 bg-[#020285] w-full border border-[#F5C518]/30 rounded overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#F5C518] to-[#FFE64D] transition-[width] duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </nav>
                )}
              </Card>
            )}

            {/* Content sections */}
            <div className="mt-8 space-y-8">
              {post.contentMarkdown && (
                <section className="border-4 border-[#F5C518] bg-[#0303AB] p-6 sm:p-8">
                  <div className="font-body text-sm sm:text-base text-[#FFFFFF]/88 leading-relaxed">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h2: ({ children }) => {
                          const headingText = nodeToText(children).trim();
                          const headingSlug = slugifyHeading(headingText);
                          const shouldSkipTocId = headingSlug === "table-des-matieres" || headingSlug === "sommaire";
                          const baseId = `md-${headingSlug || "section"}`;
                          const count = renderedHeadingIdCounts.get(baseId) ?? 0;
                          renderedHeadingIdCounts.set(baseId, count + 1);
                          const currentId = shouldSkipTocId
                            ? `${baseId}-internal-${count + 1}`
                            : count === 0
                              ? baseId
                              : `${baseId}-${count + 1}`;
                          return (
                            <h2 
                              id={currentId}
                              className="mt-8 first:mt-0 font-display font-black text-xl sm:text-2xl uppercase text-[#FFFFFF] scroll-mt-28"
                            >
                              {children}
                            </h2>
                          );
                        },
                        h3: ({ children }) => (
                          <h3 className="mt-6 font-display font-black text-lg sm:text-xl uppercase text-[#FFFFFF]">
                            {children}
                          </h3>
                        ),
                        p: ({ children }) => <p className="mt-4">{children}</p>,
                        ul: ({ children }) => <ul className="mt-4 space-y-2 list-disc pl-5">{children}</ul>,
                        ol: ({ children }) => <ol className="mt-4 space-y-2 list-decimal pl-5">{children}</ol>,
                        hr: () => <hr className="my-8 border-[#F5C518]" />,
                        table: ({ children }) => (
                          <div className="mt-5 overflow-x-auto">
                            <table className="w-full border-collapse border-2 border-[#F5C518]">{children}</table>
                          </div>
                        ),
                        th: ({ children }) => <th className="border border-[#F5C518] p-2 text-left">{children}</th>,
                        td: ({ children }) => <td className="border border-[#F5C518] p-2">{children}</td>,
                        code: ({ className, children }) => {
                          const isBlock = className?.includes("language-");
                          if (isBlock) {
                            return (
                              <code className="block whitespace-pre overflow-x-auto border-4 border-[#F5C518] bg-[#020285] p-4 font-mono text-xs sm:text-sm text-[#FFFFFF]/90 leading-relaxed">
                                {children}
                              </code>
                            );
                          }
                          return <code className="bg-[#020285] px-1.5 py-0.5 text-[#F5C518] font-mono text-[0.85em]">{children}</code>;
                        },
                        pre: ({ children }) => <div className="mt-4 relative">{children}</div>,
                      }}
                    >
                      {post.contentMarkdown}
                    </ReactMarkdown>
                  </div>
                </section>
              )}

              {post.sections.map((section, sectionIndex) => (
                <section
                  key={`section-${sectionIndex}`}
                  id={`manual-section-${sectionIndex}`}
                  className="border-4 border-[#F5C518] bg-[#0303AB] p-6 sm:p-8 scroll-mt-28"
                >
                  <h2 className="font-display font-black text-xl sm:text-2xl uppercase">{section.heading}</h2>
                  <div className="mt-4 space-y-4">
                    {section.paragraphs.map((paragraph, pIdx) => (
                      <p
                        key={`p-${sectionIndex}-${pIdx}`}
                        className="font-body text-sm sm:text-base text-[#FFFFFF]/86 leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                    {section.bullets && section.bullets.length > 0 && (
                      <ul className="space-y-3 pl-5 font-body text-sm sm:text-base text-[#FFFFFF]/86 list-none">
                        {section.bullets.map((bullet, bIdx) => (
                          <li key={`b-${sectionIndex}-${bIdx}`} className="flex gap-3 leading-relaxed">
                            <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 bg-[#F5C518]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.codeBlocks && section.codeBlocks.length > 0 && (
                      <div className="space-y-4">
                        {section.codeBlocks.map((codeBlock, cbIdx) => (
                          <div key={`cb-${sectionIndex}-${cbIdx}`} className="relative">
                            <CopyButton code={codeBlock} />
                            <pre className="overflow-x-auto border-4 border-[#F5C518] bg-[#020285] p-4 pt-10 font-mono text-xs sm:text-sm text-[#FFFFFF]/90 leading-relaxed">
                              <code>{codeBlock}</code>
                            </pre>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              ))}
            </div>

            {/* Related articles */}
            {relatedArticles.length > 0 && (
              <div className="mt-16 pt-10 border-t-4 border-[#F5C518]">
                <h2 className="font-display font-black text-2xl sm:text-3xl uppercase mb-6">
                  Articles <span className="text-[#FFFFFF]/35">à lire ensuite</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {relatedArticles.map((rel) => (
                    <Link
                      key={rel.slug}
                      to={`/blog/${rel.slug}`}
                      className="group block border-4 border-[#F5C518] bg-[#020285] overflow-hidden hover:-translate-y-1 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C518]"
                    >
                      <div className="relative aspect-[16/9] border-b-4 border-[#F5C518]">
                        <img
                          src={rel.coverImage}
                          alt={rel.coverAlt}
                          className="w-full h-full object-contain bg-[#020285]"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020285]/85 via-transparent to-transparent" />
                        <span className="absolute left-3 bottom-3 font-display font-black text-[9px] uppercase tracking-[0.2em] text-[#FFFFFF] bg-[#020285]/90 border border-[#F5C518] px-2 py-1">
                          {rel.category}
                        </span>
                      </div>
                      <div className="p-4">
                        <h3 className="font-display font-black text-base uppercase leading-tight text-[#FFFFFF]">
                          {rel.title}
                        </h3>
                        <p className="mt-2 font-body text-xs text-[#FFFFFF]/65 line-clamp-2 leading-relaxed">
                          {rel.excerpt}
                        </p>
                        <p className="mt-3 font-display font-black text-[9px] uppercase tracking-[0.2em] text-[#F5C518]">
                          Lire {"->"}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sticky TOC sidebar — desktop only */}
          {toc.length > 0 && (
            <aside className="hidden lg:block">
              <Card className="sticky top-28 border-4 border-[#F5C518] bg-[#0303AB] overflow-hidden shadow-lg">
                {/* Header with icon */}
                <div className="border-b-4 border-[#F5C518] px-5 py-4 flex items-center gap-3 bg-gradient-to-r from-[#0303AB] to-[#020285]">
                  <div className="p-1.5 bg-[#F5C518] rounded">
                    <List className="w-4 h-4 text-[#020285]" />
                  </div>
                  <div>
                    <p className="font-display font-black text-[10px] uppercase tracking-[0.25em] text-[#FFFFFF]">
                      Table des matières
                    </p>
                    <p className="font-body text-[9px] text-[#FFFFFF]/60 mt-0.5">
                      {toc.length} sections
                    </p>
                  </div>
                </div>

                {/* TOC Navigation */}
                <nav className="p-5 space-y-2 max-h-[62vh] overflow-y-auto">
                  {toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`group flex items-start gap-2.5 font-body text-sm font-semibold leading-snug py-2 px-3 border-l-4 rounded transition-all duration-150 ${
                        activeTocId === item.id
                          ? "text-[#FFFFFF] border-[#F5C518] bg-[#020285]"
                          : "text-[#FFFFFF]/82 border-[#F5C518]/40 hover:border-[#F5C518] hover:bg-[#020285] hover:text-[#FFFFFF]"
                      }`}
                      title={item.heading}
                    >
                      <span className={`mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full transition-transform ${activeTocId === item.id ? "bg-[#F5C518] scale-125" : "bg-[#F5C518] group-hover:scale-125"}`} />
                      <span>{item.heading}</span>
                    </a>
                  ))}
                </nav>

                {/* Progress indicator */}
                <div className="border-t-4 border-[#F5C518] px-5 py-4 bg-gradient-to-r from-[#020285] to-[#0303AB]">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-display font-black text-[9px] uppercase tracking-[0.2em] text-[#FFFFFF]/80">
                      Progression de lecture
                    </p>
                    <p className="font-display font-black text-sm text-[#F5C518] bg-[#020285] px-2 py-1 rounded">
                      {Math.round(progress)}%
                    </p>
                  </div>
                  <div className="h-2 bg-[#020285] w-full border border-[#F5C518]/30 rounded overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#F5C518] to-[#FFE64D] transition-[width] duration-300 rounded"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="mt-2 font-body text-[9px] text-[#FFFFFF]/60 text-center">
                    {progress < 25 && "Ça commence bien !"}
                    {progress >= 25 && progress < 50 && "Vous êtes à mi-chemin !"}
                    {progress >= 50 && progress < 75 && "Continuez, vous y êtes presque !"}
                    {progress >= 75 && "Fantastique, presque fini !"}
                  </p>
                </div>
              </Card>
            </aside>
          )}
        </div>
      </div>

      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-[#F5C518] text-[#020285] border-4 border-[#F5C518] p-3 hover:bg-[#020285] hover:text-[#F5C518] transition-all duration-150"
          aria-label="Retour en haut de page"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </main>
  );
};

export default BlogArticle;
