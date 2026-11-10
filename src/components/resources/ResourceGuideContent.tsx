import { Check, Copy } from "lucide-react";
import { useState, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Text of a resource guide. Every command and prompt sits in a code block with a copy button.

const COPY_CONFIRMATION_DELAY_IN_MILLISECONDS = 2000;
const headingClassName = "font-display font-black uppercase text-white";

function readText(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(readText).join("");
  if (children && typeof children === "object" && "props" in children) {
    return readText((children as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

const CodeBlock = ({ children }: { children?: ReactNode }) => {
  const [isCopied, setIsCopied] = useState(false);
  const code = readText(children).replace(/\n$/, "");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), COPY_CONFIRMATION_DELAY_IN_MILLISECONDS);
    } catch {
      setIsCopied(false);
    }
  };

  return (
    <div className="relative mt-4">
      <pre className="overflow-x-auto rounded-md border border-[var(--surface-border)] bg-black/40 p-4 pr-24 font-mono text-sm leading-relaxed text-white">
        <code>{code}</code>
      </pre>
      <button
        type="button"
        onClick={copy}
        className="absolute right-2 top-2 inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--surface-border)] bg-[var(--surface-deepest)] px-3 font-mono text-xs uppercase tracking-widest text-white transition-colors duration-300 hover:border-white"
      >
        {isCopied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
        {isCopied ? "Copié" : "Copier"}
      </button>
    </div>
  );
};

const ResourceGuideContent = ({ markdown }: { markdown: string }) => (
  <div className="font-body text-sm leading-relaxed text-white/88 sm:text-base">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => <h2 className={`mt-10 text-xl first:mt-0 sm:text-2xl ${headingClassName}`}>{children}</h2>,
        h3: ({ children }) => <h3 className={`mt-6 text-lg sm:text-xl ${headingClassName}`}>{children}</h3>,
        p: ({ children }) => <p className="mt-4">{children}</p>,
        ul: ({ children }) => <ul className="mt-4 list-disc space-y-2 pl-5">{children}</ul>,
        ol: ({ children }) => <ol className="mt-4 list-decimal space-y-2 pl-5">{children}</ol>,
        pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
        code: ({ children }) => (
          <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.9em] text-white">{children}</code>
        ),
        a: ({ children, href }) => (
          <a href={href} className="underline underline-offset-4 hover:text-white" target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  </div>
);

export default ResourceGuideContent;
