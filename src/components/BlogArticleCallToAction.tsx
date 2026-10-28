import { Link } from "react-router-dom";
import type { BlogPost } from "@/data/blogPosts";

interface BlogArticleCallToActionProps {
  /** Category of the article; a SaaS article points to the SaaS offer. */
  category?: BlogPost["category"];
}

const secondaryLinkClassName =
  "inline-flex min-h-11 items-center rounded-full border border-[var(--surface-border)] px-6 py-3 font-body text-sm font-semibold text-white transition-colors duration-300 hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-violet)]";

const BlogArticleCallToAction = ({
  category,
}: BlogArticleCallToActionProps) => (
  <aside
    aria-labelledby="blog-article-call-to-action-title"
    className="mt-12 rounded-md border border-[var(--surface-border)] bg-[var(--surface-deepest)] p-6 sm:p-8"
  >
    <h2
      id="blog-article-call-to-action-title"
      className="font-display text-2xl font-black uppercase sm:text-3xl"
    >
      Un projet <span className="text-white/35">en tête ?</span>
    </h2>
    <p className="mt-3 max-w-2xl font-body text-white/80">
      SaaS, application web ou mobile, site portfolio : je vous aide à passer de
      l'idée à une première version en ligne.
    </p>
    <div className="mt-6 flex flex-wrap gap-3">
      <Link
        to="/contact"
        className="inline-flex min-h-11 items-center rounded-full bg-white px-6 py-3 font-body text-sm font-semibold text-[var(--surface-deepest)] transition-colors duration-300 hover:bg-[var(--text-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-violet)]"
      >
        Discuter de votre projet
      </Link>
      {category === "saas" ? (
        <Link to="/services/saas" className={secondaryLinkClassName}>
          Découvrir mon offre de développement SaaS
        </Link>
      ) : null}
    </div>
  </aside>
);

export default BlogArticleCallToAction;
