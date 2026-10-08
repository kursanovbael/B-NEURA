"use client";

import type { RefObject } from "react";
import type { FlowLabelElements } from "@/components/3d/ExperienceDriver";
import type { FlowLabelId } from "@/components/3d/flowVisuals";
import type { FeedbackKindId } from "@/content/feedbackKinds";
import { CONTEXT_LABELS } from "@/content/contextLabels";
import { DEFAULT_INTENTION, FLOW_EVENT_LABELS } from "@/content/systemFlow";
import { cn } from "@/lib/cn";

type LabelSpec = {
  id: FlowLabelId;
  /** Step number shown in the marker; empty for the represented-intention tag. */
  number: string;
  name: string;
  details?: readonly string[];
  /** Show the details only while this label is the active one. */
  detailsWhenActive?: boolean;
  /** Adds an amber line: the item is still pending verification. */
  pending?: boolean;
  tone: "signal" | "violet" | "intention" | "feedback" | "neutral";
};

const LABELS: readonly LabelSpec[] = [
  {
    id: "intention",
    number: "1",
    name: "Intention",
    details: [DEFAULT_INTENTION.label],
    tone: "intention",
  },
  { id: "sensors", number: "2", name: "Sensors", tone: "signal" },
  { id: "decoder", number: "3", name: "AI decoder", tone: "violet" },
  {
    id: "represented",
    number: "",
    name: DEFAULT_INTENTION.label,
    details: [CONTEXT_LABELS.virtualControlActive, CONTEXT_LABELS.simulation],
    tone: "intention",
  },
  { id: "hand", number: "4", name: "Virtual hand", tone: "intention" },
  {
    id: "object",
    number: "",
    name: "Virtual object",
    details: [FLOW_EVENT_LABELS.contact],
    detailsWhenActive: true,
    tone: "intention",
  },
  {
    id: "feedback",
    number: "5",
    name: "Feedback interface",
    details: [FLOW_EVENT_LABELS.feedbackEvent],
    detailsWhenActive: true,
    tone: "feedback",
  },
  {
    id: "user",
    number: "",
    name: "Back toward the user",
    tone: "feedback",
  },
  {
    id: "cue",
    number: "",
    name: "Visual interaction cue",
    details: [CONTEXT_LABELS.simulation],
    tone: "neutral",
  },
  // Filled in from the selected feedback kind.
  { id: "kind", number: "", name: "", tone: "neutral" },
  {
    id: "angle",
    number: "",
    name: "Arm angle",
    details: [CONTEXT_LABELS.simulation, "ILLUSTRATIVE"],
    pending: true,
    tone: "neutral",
  },
];

const PENDING_TEXT = "REQUIRES SOURCE VERIFICATION";

/** The label that follows the selected feedback kind (touch, pressure, temperature). */
function kindLabel(kind: FeedbackKindId | null): Partial<LabelSpec> {
  switch (kind) {
    case "touch":
      return {
        name: "Touch: contact ring",
        details: [CONTEXT_LABELS.simulation, "NOTHING IS FELT"],
        pending: true,
      };
    case "pressure":
      return {
        name: "Pressure: firmer ring",
        details: [CONTEXT_LABELS.simulation, "NOTHING IS FELT"],
        pending: true,
      };
    case "temperature":
      return { name: "Temperature", details: ["NOT SIMULATED"], pending: true };
    default:
      return {};
  }
}

const TONE: Record<LabelSpec["tone"], string> = {
  signal: "border-accent text-accent",
  violet: "border-violet text-violet",
  intention: "border-foreground text-foreground",
  feedback: "border-foreground/70 text-foreground",
  neutral: "border-muted text-muted",
};

type FlowLabelsProps = {
  flowLabelEls: RefObject<FlowLabelElements>;
  kind: FeedbackKindId | null;
};

/**
 * Numbered labels on the route: a small marker on the part, a thin leader and
 * the name. The frame loop moves each one to its point and sets its opacity
 * and data-active. They repeat text that is also in the panel, so they are
 * hidden from assistive technology.
 */
export function FlowLabels({ flowLabelEls, kind }: FlowLabelsProps) {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-20">
      {LABELS.map((base) => {
        const label =
          base.id === "kind" ? { ...base, ...kindLabel(kind) } : base;
        return (
          <div
            key={label.id}
            ref={(el) => {
              flowLabelEls.current[label.id] = el;
            }}
            className={cn(
              "group/co group/fl absolute top-0 left-0 will-change-transform",
              label.id === "user" && "max-md:!hidden",
            )}
            style={{ visibility: "hidden", opacity: 0 }}
          >
            {label.number ? (
              <span
                className={cn(
                  "bg-background absolute -top-2.5 -left-2.5 flex h-5 w-5 items-center justify-center rounded-full border text-[0.6875rem] font-semibold",
                  TONE[label.tone],
                )}
              >
                {label.number}
              </span>
            ) : (
              <span className="bg-foreground absolute -top-1 -left-1 h-2 w-2 rounded-full" />
            )}
            <span className="bg-border-strong absolute top-0 left-3 h-px w-6 group-data-[side=left]/co:right-3 group-data-[side=left]/co:left-auto md:w-10" />
            <span className="absolute top-0 left-10 -translate-y-1/2 text-left whitespace-nowrap group-data-[side=left]/co:right-10 group-data-[side=left]/co:left-auto group-data-[side=left]/co:text-right md:left-14 md:group-data-[side=left]/co:right-14 md:group-data-[side=left]/co:left-auto">
              <span
                className={cn(
                  "bg-background/80 text-muted group-data-[active=true]/fl:text-foreground max-md:hidden max-md:group-data-[active=true]/fl:block block rounded-sm px-1.5 py-0.5 text-xs font-medium md:text-sm",
                )}
              >
                {label.name}
              </span>
              {label.details?.map((line) => (
                <span
                  key={line}
                  className={cn(
                    "bg-background/80 mt-px rounded-sm px-1.5 py-0.5 text-[0.625rem] font-semibold tracking-wider md:text-[0.6875rem]",
                    label.detailsWhenActive
                      ? "hidden group-data-[active=true]/fl:block"
                      : "max-md:group-data-[active=true]/fl:block block max-md:hidden",
                    label.tone === "feedback"
                      ? "text-foreground"
                      : "text-accent",
                  )}
                >
                  {line}
                </span>
              ))}
              {label.pending ? (
                <span className="bg-background/80 text-status-warn mt-px block rounded-sm px-1.5 py-0.5 text-[0.625rem] font-semibold tracking-wider md:text-[0.6875rem]">
                  {PENDING_TEXT}
                </span>
              ) : null}
            </span>
          </div>
        );
      })}
    </div>
  );
}
