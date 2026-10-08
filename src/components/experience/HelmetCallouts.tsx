"use client";

import type { RefObject } from "react";
import type { CalloutElements } from "@/components/3d/ExperienceDriver";
import {
  HELMET_COMPONENTS,
  type HelmetComponentId,
} from "@/content/helmetComponents";
import { cn } from "@/lib/cn";

const ACCENT: Record<HelmetComponentId, string> = {
  "outer-shell": "border-foreground",
  "neural-signal-acquisition": "border-accent",
  "conceptual-ai-decoder": "border-violet",
  "feedback-interface": "border-accent",
  "internal-support": "border-foreground",
  "user-head-position": "border-foreground",
};

type HelmetCalloutsProps = {
  calloutEls: RefObject<CalloutElements>;
  selected: HelmetComponentId | null;
  onSelect: (id: HelmetComponentId | null) => void;
};

/**
 * A callout per component: a dot on the part, a thin leader line, its name and
 * a few words about its role. The frame loop moves each one to its part and
 * sets its visibility; in the exploded view they are buttons (hotspots).
 */
export function HelmetCallouts({
  calloutEls,
  selected,
  onSelect,
}: HelmetCalloutsProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-20">
      {HELMET_COMPONENTS.map((component) => {
        const isSelected = selected === component.id;
        return (
          <div
            key={component.id}
            ref={(el) => {
              calloutEls.current[component.id] = el;
            }}
            className="group/co absolute top-0 left-0 will-change-transform"
            style={{ visibility: "hidden", opacity: 0 }}
          >
            <button
              type="button"
              aria-label={`${component.name}: show details`}
              aria-pressed={isSelected}
              onClick={() => onSelect(isSelected ? null : component.id)}
              className="group pointer-events-auto relative block h-0 w-0"
            >
              <span className="absolute -top-5 -left-5 h-10 w-10" />
              <span
                className={cn(
                  "transition-ui absolute -top-[7px] -left-[7px] h-3.5 w-3.5 rounded-full border-2",
                  ACCENT[component.id],
                  isSelected
                    ? "bg-foreground"
                    : "bg-background group-hover:bg-foreground/60",
                )}
              />
              <span className="bg-border-strong absolute top-0 left-2.5 h-px w-8 group-data-[side=left]/co:right-2.5 group-data-[side=left]/co:left-auto md:w-12" />
              <span className="absolute top-0 left-12 -translate-y-1/2 text-left whitespace-nowrap group-data-[side=left]/co:right-12 group-data-[side=left]/co:left-auto group-data-[side=left]/co:text-right md:left-16 md:group-data-[side=left]/co:right-16 md:group-data-[side=left]/co:left-auto">
                <span
                  className={cn(
                    "bg-background/75 block rounded-sm px-1.5 py-0.5 text-xs font-medium md:text-sm",
                    isSelected ? "text-accent" : "text-foreground",
                  )}
                >
                  {component.shortName}
                </span>
                <span className="bg-background/75 text-muted mt-px hidden rounded-sm px-1.5 py-0.5 text-[0.6875rem] sm:block md:text-xs">
                  {component.calloutRole}
                </span>
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
