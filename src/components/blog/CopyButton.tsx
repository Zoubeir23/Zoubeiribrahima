import { useCallback, useState } from "react";
import { AlertTriangle, Check, Copy } from "lucide-react";

type CopyStatus = "idle" | "copied" | "error";

interface CopyButtonProps {
  code: string;
}

const STATUS_LABELS: Record<CopyStatus, string> = {
  idle: "Copier",
  copied: "Copié !",
  error: "Échec de la copie",
};

export function CopyButton({ code }: CopyButtonProps) {
  const [status, setStatus] = useState<CopyStatus>("idle");

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setStatus("copied");
    } catch {
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 2000);
    }
  }, [code]);

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 flex items-center gap-1.5 bg-[#020285] border border-[#F5C518]/50 text-[#FFFFFF]/55 hover:text-[#F5C518] hover:border-[#F5C518] px-2 py-1 font-display font-black text-[9px] uppercase tracking-[0.2em] transition-all duration-150 z-10"
      aria-label="Copier le code"
    >
      {status === "copied" && <Check className="w-3 h-3 text-green-400" />}
      {status === "error" && <AlertTriangle className="w-3 h-3 text-red-400" />}
      {status === "idle" && <Copy className="w-3 h-3" />}
      {STATUS_LABELS[status]}
    </button>
  );
}
