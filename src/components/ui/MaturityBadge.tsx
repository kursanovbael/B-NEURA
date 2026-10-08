import { MATURITY_LABELS, type Classification } from "@/content/maturity";
import { Badge, type BadgeTone } from "./Badge";

const PRESENTATION: Record<
  Classification,
  { tone: BadgeTone; dashed: boolean; glyph: string }
> = {
  "available-today": { tone: "ok", dashed: false, glyph: "●" },
  experimental: { tone: "warn", dashed: false, glyph: "◐" },
  "future-concept": { tone: "violet", dashed: false, glyph: "○" },
  // Temporary verification state, not a maturity level.
  "requires-source-verification": { tone: "neutral", dashed: true, glyph: "?" },
};

type MaturityBadgeProps = {
  classification: Classification;
  className?: string;
};

/** The only component that renders technology maturity. */
export function MaturityBadge({
  classification,
  className,
}: MaturityBadgeProps) {
  const { tone, dashed, glyph } = PRESENTATION[classification];
  return (
    <Badge tone={tone} dashed={dashed} className={className}>
      <span aria-hidden="true">{glyph}</span>
      {MATURITY_LABELS[classification]}
    </Badge>
  );
}
