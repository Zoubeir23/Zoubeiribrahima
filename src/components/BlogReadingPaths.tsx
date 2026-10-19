import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import { blogReadingPaths, resolveReadingPathPosts } from "@/data/blogReadingPaths";

const BlogReadingPaths = () => (
  <section aria-labelledby="blog-reading-paths-title" className="border-b border-[var(--surface-border)]">
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">Parcours de lecture</p>
      <h2 id="blog-reading-paths-title" className="mt-3 font-display text-3xl font-black uppercase sm:text-4xl">
        Suivez un parcours <span className="text-white/35">structuré</span>
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {blogReadingPaths.map((readingPath) => {
          const pathPosts = resolveReadingPathPosts(readingPath, blogPosts);
          return (
            <article
              key={readingPath.identifier}
              className="flex flex-col rounded-md border border-[var(--surface-border)] bg-[var(--surface-deepest)] p-5 sm:p-6"
            >
              <h3 className="font-display text-xl font-black uppercase">{readingPath.title}</h3>
              <p className="mt-2 font-body text-sm text-white/75">{readingPath.description}</p>
              <ol className="mt-5 flex-1 space-y-3">
                {pathPosts.map((post, index) => (
                  <li key={post.slug} className="flex items-start gap-3">
                    <span aria-hidden="true" className="font-mono text-sm text-[var(--accent-orange)]">
                      {index + 1}
                    </span>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="font-body text-sm text-white transition-colors hover:text-[var(--accent-orange)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent-violet)]"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ol>
              {pathPosts[0] ? (
                <Link
                  to={`/blog/${pathPosts[0].slug}`}
                  className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-white px-5 py-2 font-body text-sm font-semibold text-[var(--surface-deepest)] transition-colors duration-300 hover:bg-[var(--text-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-violet)]"
                >
                  Commencer le parcours
                </Link>
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

export default BlogReadingPaths;
