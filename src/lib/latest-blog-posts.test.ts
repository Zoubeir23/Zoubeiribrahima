import { describe, expect, it } from "vitest";
import { blogPosts, type BlogPost } from "@/data/blogPosts";
import { selectLatestBlogPosts } from "@/lib/latest-blog-posts";

const buildPost = (slug: string, publishedIsoDate: string): BlogPost => ({
  ...blogPosts[0],
  slug,
  publishedIsoDate,
});

describe("selectLatestBlogPosts", () => {
  it("returns the newest posts first, limited to the requested count", () => {
    const posts = [buildPost("old", "2026-01-01"), buildPost("newest", "2026-06-01"), buildPost("middle", "2026-03-01")];
    expect(selectLatestBlogPosts(posts, 2).map((post) => post.slug)).toEqual(["newest", "middle"]);
  });

  it("keeps the original order between posts published on the same day", () => {
    const posts = [buildPost("first", "2026-05-01"), buildPost("second", "2026-05-01"), buildPost("third", "2026-05-01")];
    expect(selectLatestBlogPosts(posts, 3).map((post) => post.slug)).toEqual(["first", "second", "third"]);
  });

  it("does not mutate the list it receives", () => {
    const posts = [buildPost("old", "2026-01-01"), buildPost("new", "2026-06-01")];
    selectLatestBlogPosts(posts, 1);
    expect(posts.map((post) => post.slug)).toEqual(["old", "new"]);
  });

  it("returns every post when the limit exceeds the list length", () => {
    expect(selectLatestBlogPosts(blogPosts, blogPosts.length + 5)).toHaveLength(blogPosts.length);
  });
});
