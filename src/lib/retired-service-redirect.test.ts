import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// The remote IT services page is retired: its old address must send a permanent redirect to the
// services page, and a page that no longer exists must not stay in the sitemap or llms.txt.
const projectRoot = process.cwd();
const vercelConfiguration = JSON.parse(readFileSync(path.join(projectRoot, "vercel.json"), "utf8")) as {
  redirects?: Array<{ source: string; destination: string; statusCode?: number }>;
};

describe("retired remote IT services page", () => {
  it("redirects its old address permanently to the services page", () => {
    expect(vercelConfiguration.redirects).toContainEqual({
      source: "/services/remote-it-services",
      destination: "/services",
      statusCode: 301,
    });
  });

  it("is absent from the sitemap and llms.txt, so the redirect target is the only listed page", () => {
    for (const publicFile of ["sitemap.xml", "llms.txt"]) {
      expect(readFileSync(path.join(projectRoot, "public", publicFile), "utf8")).not.toContain("/services/remote-it-services");
    }
  });
});
