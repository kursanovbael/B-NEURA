import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { TechnicalLabel } from "./TechnicalLabel";

type SectionHeadingProps = {
  title: ReactNode;
  eyebrow?: ReactNode;
  description?: ReactNode;
  /** Heading element level. Defaults to h2. */
  level?: 1 | 2 | 3;
  id?: string;
  className?: string;
};

/** Eyebrow label + heading + optional lead paragraph. */
export function SectionHeading({
  title,
  eyebrow,
  description,
  level = 2,
  id,
  className,
}: SectionHeadingProps) {
  const Tag = `h${level}` as const;
  return (
    <header className={cn("flex max-w-3xl flex-col gap-4", className)}>
      {eyebrow ? <TechnicalLabel>{eyebrow}</TechnicalLabel> : null}
      <Tag id={id} className={level === 1 ? "type-hero" : "type-section"}>
        {title}
      </Tag>
      {description ? (
        <p className="type-body-lg text-muted">{description}</p>
      ) : null}
    </header>
  );
}
