import { describe, expect, it } from "vitest";
import { getSubheadingTag } from "@/lib/heading-levels";

describe("getSubheadingTag", () => {
  it("goes one level below a level two section heading by default", () => {
    expect(getSubheadingTag(undefined, 1)).toBe("h3");
    expect(getSubheadingTag("h2", 1)).toBe("h3");
  });

  it("goes one level below a page level heading", () => {
    expect(getSubheadingTag("h1", 1)).toBe("h2");
  });

  it("supports a second level of nesting", () => {
    expect(getSubheadingTag("h2", 2)).toBe("h4");
    expect(getSubheadingTag("h1", 2)).toBe("h3");
  });
});
