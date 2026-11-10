import { Link } from "react-router-dom";
import SectionHeading from "@/components/SectionHeading";
import { blogPosts } from "@/data/blogPosts";
import { selectServiceRelatedArticles } from "@/data/serviceRelatedArticles";
import type { ServiceSlug } from "@/lib/service-meta";

interface ServiceRelatedArticlesProps {
  serviceSlug: ServiceSlug;
  eyebrow: string;
  title: string;
}

const ServiceRelatedArticles = ({ serviceSlug, eyebrow, title }: ServiceRelatedArticlesProps) => {
  const relatedArticles = selectServiceRelatedArticles(serviceSlug, blogPosts);

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <section aria-label={title} className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24">
      <SectionHeading emoji="📚" eyebrow={eyebrow} title={title} />
      <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {relatedArticles.map((post) => (
          <li key={post.slug}>
            <Link
              to={`/blog/${post.slug}`}
              className="flex h-full flex-col rounded-md border border-[var(--surface-border)] bg-[var(--surface-base)] p-5 transition-colors duration-300 hover:border-[var(--accent-violet)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-violet)]"
            >
              <span className="font-display text-base uppercase leading-tight text-white">{post.title}</span>
              <span className="mt-2 line-clamp-3 font-body text-sm text-white/70">{post.excerpt}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ServiceRelatedArticles;
