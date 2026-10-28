import { render, screen, within } from "@testing-library/react";
import type { ReactElement } from "react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import {
  CertificationsTeaser,
  ExperienceTeaser,
  FaqTeaser,
  LatestArticlesTeaser,
  ProjectsTeaser,
  SkillsTeaser,
} from "@/components/HomeTeasers";
import { blogPosts } from "@/data/blogPosts";
import { certificationIssuerCount, certifications } from "@/data/certifications";
import { LanguageProvider } from "@/hooks/useLanguage";
import { experienceContent } from "@/lib/experience-content";
import { landingContent } from "@/lib/landing-content";
import { selectLatestBlogPosts } from "@/lib/latest-blog-posts";
import { pageContent } from "@/lib/page-content";
import { projectsContent } from "@/lib/projects-content";

const teasers = pageContent.fr.teasers;

const renderTeaser = (element: ReactElement) =>
  render(
    <LanguageProvider>
      <MemoryRouter>{element}</MemoryRouter>
    </LanguageProvider>,
  );

describe("home teasers", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it.each([
    ["skills", <SkillsTeaser key="s" />, "/skills"],
    ["projects", <ProjectsTeaser key="p" />, "/projects"],
    ["experience", <ExperienceTeaser key="e" />, "/experience"],
    ["certifications", <CertificationsTeaser key="c" />, "/certifications"],
    ["faq", <FaqTeaser key="f" />, "/faq"],
    ["blog", <LatestArticlesTeaser key="b" />, "/blog"],
  ] as const)("%s teaser has a level two heading and a link to its page", (key, element, path) => {
    renderTeaser(element);
    expect(screen.getByRole("heading", { level: 2, name: teasers[key].title })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: teasers[key].linkLabel })).toHaveAttribute("href", path);
  });

  it("shows brand logos in the skills teaser", () => {
    const { container } = renderTeaser(<SkillsTeaser />);
    expect(container.querySelectorAll('img[src^="/logos/technologies/"]').length).toBeGreaterThanOrEqual(8);
  });

  it("highlights the featured project", () => {
    renderTeaser(<ProjectsTeaser />);
    expect(screen.getByRole("heading", { level: 3, name: projectsContent.fr.featured.title })).toBeInTheDocument();
    expect(screen.getByText(projectsContent.fr.featured.description)).toBeInTheDocument();
  });

  it("lists each professional experience with its role", () => {
    renderTeaser(<ExperienceTeaser />);
    for (const item of experienceContent.fr.experiences) {
      expect(screen.getByText(item.company)).toBeInTheDocument();
      expect(screen.getByText(item.role)).toBeInTheDocument();
    }
  });

  it("shows the certification and issuer counts", () => {
    renderTeaser(<CertificationsTeaser />);
    expect(screen.getByText(String(certifications.length))).toBeInTheDocument();
    expect(screen.getByText(String(certificationIssuerCount))).toBeInTheDocument();
  });

  it("previews the first three questions as links to the faq page", () => {
    renderTeaser(<FaqTeaser />);
    const questions = landingContent.fr.faq.items.slice(0, 3);
    const list = screen.getByRole("list");
    for (const item of questions) {
      expect(within(list).getByRole("link", { name: item.question })).toHaveAttribute("href", "/faq");
    }
    expect(within(list).queryByText(landingContent.fr.faq.items[3].question)).not.toBeInTheDocument();
  });

  it("links the three latest articles straight from the home page", () => {
    renderTeaser(<LatestArticlesTeaser />);
    const latestPosts = selectLatestBlogPosts(blogPosts, 3);
    const list = screen.getByRole("list");
    expect(within(list).getAllByRole("link")).toHaveLength(3);
    for (const post of latestPosts) {
      expect(within(list).getByRole("link", { name: post.title })).toHaveAttribute("href", `/blog/${post.slug}`);
    }
  });
});
