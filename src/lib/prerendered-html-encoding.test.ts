import { describe, expect, it } from "vitest";
import { renderRoute } from "@/entry-server";

const NULL_CHARACTER = "\u0000";

// These pages contain accented characters that land on a React stream chunk boundary.
const ROUTES_WITH_ACCENTS_ON_CHUNK_BOUNDARIES = ["/a-propos", "/services", "/experience"];

describe("prerendered HTML encoding", () => {
  it.each(ROUTES_WITH_ACCENTS_ON_CHUNK_BOUNDARIES)("contains no null character on %s", async (route) => {
    const { html } = await renderRoute(route);
    expect(html.includes(NULL_CHARACTER)).toBe(false);
  });

  it("keeps accented words intact on /a-propos", async () => {
    const { html } = await renderRoute("/a-propos");
    expect(html).toContain("clients au Sénégal");
  });
});
