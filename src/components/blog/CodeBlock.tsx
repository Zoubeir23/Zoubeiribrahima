import { Highlight, Prism, themes, type Language } from "prism-react-renderer";
import { cn } from "@/lib/utils";

const LANGUAGE_ALIASES: Record<string, string> = {
  py: "python",
  js: "javascript",
  ts: "typescript",
  sh: "plaintext",
  bash: "plaintext",
  shell: "plaintext",
  zsh: "plaintext",
  console: "plaintext",
  txt: "plaintext",
  html: "markup",
  yml: "yaml",
};

function resolveHighlightLanguage(language?: string): Language {
  if (!language) {
    return "plaintext" as Language;
  }
  const normalized = language.toLowerCase();
  const resolved = LANGUAGE_ALIASES[normalized] ?? normalized;
  return (resolved in Prism.languages ? resolved : "plaintext") as Language;
}

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language, className }: CodeBlockProps) {
  return (
    <Highlight theme={themes.nightOwl} code={code.trim()} language={resolveHighlightLanguage(language)}>
      {({ tokens, getLineProps, getTokenProps }) => (
        <pre
          className={cn(
            "overflow-x-auto border-4 border-[#F5C518] bg-[#020285] p-4 font-mono text-xs sm:text-sm leading-relaxed",
            className
          )}
        >
          <code>
            {tokens.map((line, lineIndex) => (
              <div key={lineIndex} {...getLineProps({ line })}>
                {line.map((token, tokenIndex) => (
                  <span key={tokenIndex} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  );
}
