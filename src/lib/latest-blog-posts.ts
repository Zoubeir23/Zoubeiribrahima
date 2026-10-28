import type { BlogPost } from "@/data/blogPosts";

/** Newest posts first; posts published the same day keep their declared order. */
export const selectLatestBlogPosts = (posts: readonly BlogPost[], limit: number): BlogPost[] =>
  [...posts].sort((first, second) => second.publishedIsoDate.localeCompare(first.publishedIsoDate)).slice(0, limit);
