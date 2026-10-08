import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = {
  as?: "div" | "section" | "header" | "footer" | "article";
  className?: string;
  children: ReactNode;
};

/** Responsive page-width container with consistent gutters. */
export function Container({
  as: Tag = "div",
  className,
  children,
}: ContainerProps) {
  return <Tag className={cn("container-page", className)}>{children}</Tag>;
}
