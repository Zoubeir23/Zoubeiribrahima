import type { BlogPost } from "@/data/blogPosts";
import type { ServiceSlug } from "@/lib/service-meta";

const MAXIMUM_RELATED_ARTICLES = 3;

// Blog categories each service page points to, most relevant first. It mirrors the
// article call to action, so a service and its articles link to each other.
const RELATED_ARTICLE_CATEGORIES_BY_SERVICE: Readonly<Record<ServiceSlug, readonly string[]>> = {
  saas: ["saas"],
  "web-applications": ["python", "devops"],
  "mobile-applications": [],
  "portfolio-websites": ["frontend"],
  "remote-it-services": ["devops"],
};

export const selectServiceRelatedArticles = (serviceSlug: ServiceSlug, posts: readonly BlogPost[]): BlogPost[] =>
  RELATED_ARTICLE_CATEGORIES_BY_SERVICE[serviceSlug]
    .flatMap((category) => posts.filter((post) => post.category === category))
    .slice(0, MAXIMUM_RELATED_ARTICLES);
