"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Citations } from "@/components/science/Citations";
import { Button } from "@/components/ui/Button";
import { MaturityBadge } from "@/components/ui/MaturityBadge";
import {
  FINAL_MESSAGE,
  FUTURE_STAGE_VIEWS,
  ROADMAP_NOTE,
} from "@/content/future";
import { cn } from "@/lib/cn";

const STAGES = FUTURE_STAGE_VIEWS;
const LAST = STAGES.length - 1;
const PANEL_ID = "future-stage-panel";
/** Diameter of a stage marker; the track runs through its centre. */
const NODE = 15;

/** Restrained, token-based motion: zero under prefers-reduced-motion. */
const PROGRESS_MOTION = {
  transitionDuration: "var(--duration-slow)",
  transitionTimingFunction: "var(--ease-standard)",
};

const tabId = (id: string) => `future-tab-${id}`;

/**
 * The conceptual roadmap from today's VR to the B-NEURA concept. A tab list of
 * stages (horizontal from md, vertical below) with one panel for the selected
 * stage. Arrow keys, Home and End move between stages; the previous and next
 * buttons do the same. Maturity and evidence come from the claims register.
 */
export function FutureRoadmap() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = STAGES[selected];
  const progress = selected / LAST;

  const select = (index: number, focus = false) => {
    const next = Math.min(LAST, Math.max(0, index));
    setSelected(next);
    if (focus) tabs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, number> = {
      ArrowRight: selected + 1,
      ArrowDown: selected + 1,
      ArrowLeft: selected - 1,
      ArrowUp: selected - 1,
      Home: 0,
      End: LAST,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    select(moves[event.key], true);
  };

  return (
    <div className="flex flex-col gap-8">
      <p className="text-foreground border-border max-w-3xl border-l-2 pl-3 text-sm">
        <span className="type-label text-muted block">CONCEPTUAL ROADMAP</span>
        {ROADMAP_NOTE}
      </p>

      <div className="relative">
        {/* Track and progress: vertical below md, horizontal from md. */}
        <div
          aria-hidden="true"
          className="bg-border-strong absolute top-2 bottom-2 w-px md:top-[7px] md:right-0 md:bottom-auto md:left-0 md:h-px md:w-auto"
          style={{ left: NODE / 2 }}
        />
        <div
          aria-hidden="true"
          className="bg-accent absolute top-2 bottom-2 w-px origin-top transition-transform md:hidden"
          style={{
            left: NODE / 2,
            transform: `scaleY(${progress})`,
            ...PROGRESS_MOTION,
          }}
        />
        <div
          aria-hidden="true"
          className="bg-accent absolute top-[7px] left-0 hidden h-px w-full origin-left transition-transform md:block"
          style={{ transform: `scaleX(${progress})`, ...PROGRESS_MOTION }}
        />

        <div
          role="tablist"
          aria-label="Roadmap stages"
          onKeyDown={onKeyDown}
          className="relative flex flex-col gap-4 md:grid md:grid-cols-6 md:gap-3"
        >
          {STAGES.map((entry, i) => {
            const on = i === selected;
            const reached = i <= selected;
            return (
              <button
                key={entry.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={tabId(entry.id)}
                aria-selected={on}
                aria-controls={PANEL_ID}
                tabIndex={on ? 0 : -1}
                onClick={() => select(i)}
                className="group flex items-start gap-3 rounded-sm text-left md:flex-col md:gap-2"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "bg-background transition-ui shrink-0 rounded-full border-2",
                    // The concept stage is drawn dashed; its badge says why.
                    entry.maturity === "future-concept" && "border-dashed",
                    on
                      ? "border-accent scale-125"
                      : reached
                        ? "border-accent-dim"
                        : "border-border-strong",
                  )}
                  style={{ width: NODE, height: NODE }}
                />
                <span className="flex flex-col gap-0.5">
                  <span className="type-label text-muted">{entry.number}</span>
                  <span
                    className={cn(
                      "transition-ui text-sm leading-snug",
                      on
                        ? "text-foreground font-semibold"
                        : "text-muted group-hover:text-foreground",
                    )}
                  >
                    {entry.name}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        role="tabpanel"
        id={PANEL_ID}
        aria-labelledby={tabId(stage.id)}
        className="border-border grid gap-8 border-t pt-6 md:grid-cols-2"
      >
        <div className="flex flex-col gap-4">
          <p className="type-label text-muted">
            STAGE {stage.number} OF {STAGES[LAST].number}
          </p>
          <h4 className="text-2xl leading-tight font-semibold">
            {stage.title}
          </h4>
          {stage.maturity ? (
            <MaturityBadge
              classification={stage.maturity}
              className="self-start"
            />
          ) : null}
          <p className="type-body">{stage.meaning}</p>
          <p className="text-sm">
            <span className="type-label text-muted block">
              {stage.connects ? "LEADS TO" : "END OF THIS ROADMAP"}
            </span>
            {stage.connects ??
              "This is where the roadmap stops: a design goal, not a forecast."}
          </p>
          <p className="text-foreground border-border border-l-2 pl-3 text-sm">
            <span className="type-label text-muted block">OPEN QUESTION</span>
            {stage.openQuestion}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <Button
              variant="secondary"
              onClick={() => select(selected - 1)}
              aria-disabled={selected === 0}
              className="aria-disabled:opacity-45"
            >
              Previous stage
            </Button>
            <Button
              variant="secondary"
              onClick={() => select(selected + 1)}
              aria-disabled={selected === LAST}
              className="aria-disabled:opacity-45"
            >
              Next stage
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="type-label text-muted">WHERE THE RESEARCH STANDS</p>
          <ul className="flex flex-col gap-5">
            {stage.evidence.map((evidence) => (
              <li key={evidence.claimId} className="flex flex-col gap-1.5">
                {evidence.maturity ? (
                  <MaturityBadge
                    classification={evidence.maturity}
                    className="self-start"
                  />
                ) : null}
                <p className="text-foreground text-sm">{evidence.wording}</p>
                <Citations citations={evidence.citations} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <figure className="border-border flex flex-col gap-4 border-t pt-8">
        <figcaption className="type-label text-accent">
          {FINAL_MESSAGE.title}
        </figcaption>
        <blockquote className="flex max-w-3xl flex-col gap-3">
          {FINAL_MESSAGE.lines.map((line) => (
            <p
              key={line}
              className="text-[clamp(1.25rem,2.4vw,1.75rem)] leading-snug font-semibold"
            >
              {line}
            </p>
          ))}
        </blockquote>
      </figure>
    </div>
  );
}
