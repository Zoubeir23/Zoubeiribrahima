export function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function nodeToText(node: unknown): string {
  if (typeof node === "string") {
    return node;
  }
  if (typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map((child) => nodeToText(child)).join("");
  }
  if (node && typeof node === "object" && "props" in node) {
    const maybeProps = node as { props?: { children?: unknown } };
    return nodeToText(maybeProps.props?.children);
  }
  return "";
}

export interface MarkdownHeading {
  id: string;
  heading: string;
}

// Parse markdown to extract h2 headings for TOC with stable ids.
export function extractHeadingsFromMarkdown(markdown: string): MarkdownHeading[] {
  const lines = markdown.split("\n");
  const headings: MarkdownHeading[] = [];
  const idCounts = new Map<string, number>();
  let inCodeFence = false;
  let reachedPreface = false;

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      inCodeFence = !inCodeFence;
      return;
    }

    if (inCodeFence) {
      return;
    }

    if (!line.startsWith("## ")) {
      return;
    }

    const heading = line.replace("## ", "").trim();
    if (!heading) {
      return;
    }

    const normalizedHeading = slugifyHeading(heading);

    if (normalizedHeading === "preface") {
      reachedPreface = true;
    }

    if (!reachedPreface) {
      return;
    }

    if (normalizedHeading === "table-des-matieres" || normalizedHeading === "sommaire") {
      return;
    }

    const baseId = `md-${normalizedHeading || "section"}`;
    const currentCount = idCounts.get(baseId) ?? 0;
    idCounts.set(baseId, currentCount + 1);
    const id = currentCount === 0 ? baseId : `${baseId}-${currentCount + 1}`;

    headings.push({ id, heading });
  });

  return headings;
}
