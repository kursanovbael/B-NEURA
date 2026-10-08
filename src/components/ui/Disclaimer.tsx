import { DISCLAIMER } from "@/content/disclaimer";
import { cn } from "@/lib/cn";

type DisclaimerProps = {
  className?: string;
};

/** Renders the canonical project disclaimer. Never pass alternate text. */
export function Disclaimer({ className }: DisclaimerProps) {
  return (
    <aside
      aria-label="Disclaimer"
      className={cn(
        "border-border bg-surface type-meta rounded-md border p-4",
        className,
      )}
    >
      <p>{DISCLAIMER}</p>
    </aside>
  );
}
