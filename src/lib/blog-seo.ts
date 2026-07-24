import type { BlogPost } from "@/data/blogPosts";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

export function buildBlogArticleJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_URL}${post.coverImage}`,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Zoubeir Ibrahima",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };
}
