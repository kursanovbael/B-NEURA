import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const BASE =
  "type-label transition-ui inline-flex items-center justify-center gap-2 rounded-md border " +
  "select-none disabled:pointer-events-none disabled:opacity-45";

const VARIANTS: Record<Variant, string> = {
  primary:
    "border-accent bg-accent text-background hover:shadow-glow-accent hover:brightness-110",
  secondary:
    "border-border-strong bg-surface text-foreground hover:border-accent hover:text-accent",
  ghost: "border-transparent text-muted hover:text-foreground",
};

const SIZES: Record<Size, string> = {
  md: "min-h-11 px-4 py-2",
  lg: "min-h-12 px-6 py-3",
};

type CommonProps = { variant?: Variant; size?: Size };

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/** Renders a <button>, or an <a> when `href` is given. */
export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, ...rest } = props;
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);

  if (props.href !== undefined) {
    const { href, ...anchorRest } =
      rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return <a href={href} className={classes} {...anchorRest} />;
  }
  const { type = "button", ...buttonRest } =
    rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return <button type={type} className={classes} {...buttonRest} />;
}
