import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogBreadcrumbProps {
  articleTitle: string;
}

const breadcrumbLinkClassName =
  "text-[var(--accent-orange)] transition-opacity hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent-violet)]";

const BlogBreadcrumb = ({ articleTitle }: BlogBreadcrumbProps) => (
  <nav aria-label="Fil d'Ariane">
    <ol className="flex flex-wrap items-center gap-2 font-display text-xs font-black uppercase tracking-[0.2em]">
      <li>
        <Link to="/" className={breadcrumbLinkClassName}>
          Accueil
        </Link>
      </li>
      <li aria-hidden="true">
        <ChevronRight className="h-3 w-3 text-white/40" />
      </li>
      <li>
        <Link to="/blog" className={breadcrumbLinkClassName}>
          Blog
        </Link>
      </li>
      <li aria-hidden="true">
        <ChevronRight className="h-3 w-3 text-white/40" />
      </li>
      <li className="max-w-full truncate text-white/70" aria-current="page">
        {articleTitle}
      </li>
    </ol>
  </nav>
);

export default BlogBreadcrumb;
