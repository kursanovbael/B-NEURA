import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeTone = "neutral" | "accent" | "violet" | "ok" | "warn";

const TONES: Record<BadgeTone, string> = {
  neutral: "border-border-strong text-muted",
  accent: "border-accent-dim text-accent",
  violet: "border-violet-dim text-violet",
  ok: "border-status-ok/40 text-status-ok",
  warn: "border-status-warn/45 text-status-warn",
};

type BadgeProps = {
  tone?: BadgeTone;
  /** Dashed border, used for provisional states. */
  dashed?: boolean;
  children: ReactNode;
  className?: string;
};

/** Generic outlined label. Meaning is always carried by its text, not color. */
export function Badge({
  tone = "neutral",
  dashed = false,
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "type-label inline-flex items-center gap-2 rounded-sm border px-2 py-1",
        dashed ? "border-dashed" : "border-solid",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
