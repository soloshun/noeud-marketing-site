import { cn } from "@/lib/utils";

/**
 * The logotype is the whole identity — no icon mark. The semicolon is the
 * brand's: a statement that continues rather than ends.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-display text-[1.35rem] font-black leading-none tracking-[-0.045em]",
        className,
      )}
    >
      noeud
      <span className="text-azure-500">;</span>
    </span>
  );
}
