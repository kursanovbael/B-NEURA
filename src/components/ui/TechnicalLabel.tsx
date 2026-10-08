import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type TechnicalLabelProps = {
  children: ReactNode;
  className?: string;
};

/** Small monospaced uppercase label for technical/system text. */
export function TechnicalLabel({ children, className }: TechnicalLabelProps) {
  return (
    <span className={cn("type-label text-muted", className)}>{children}</span>
  );
}
