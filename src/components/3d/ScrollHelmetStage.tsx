"use client";

import { useId, useMemo, useRef, useState, type CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { HELMET_STAGES, type HelmetStageId } from "@/content/helmetStages";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useWebGLSupport } from "@/lib/useWebGLSupport";
import { ALL_LAYERS_VISIBLE, type HelmetLayerVisibility } from "./helmet/types";
import { HelmetStageText } from "./HelmetStageText";
import { NeuroHelmetViewer } from "./NeuroHelmetViewer";
import type { ProgressSource } from "./types";

/**
 * Length of the scroll track as a share of the viewport height. These are
 * tunable visual parameters, not final design values.
 */
export const HELMET_SCROLL = { desktopDvh: 560, mobileDvh: 400 } as const;

type ScrollHelmetStageProps = {
  visibleLayers?: HelmetLayerVisibility;
  /** Development scrubber: when set, overrides scroll and the stage stepper. */
  override?: number | null;
};

/**
 * Scroll-driven NeuroHelmet. A tall track holds a sticky full-viewport stage,
 * so scrolling is native and never intercepted. With reduced motion the track
 * collapses (CSS) and a stage stepper replaces scroll. Without WebGL the track
 * collapses and the text equivalent remains.
 */
export function ScrollHelmetStage({
  visibleLayers = ALL_LAYERS_VISIBLE,
  override = null,
}: ScrollHelmetStageProps) {
  const descriptionId = useId();
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const reducedMotion = useReducedMotion();
  const webgl = useWebGLSupport();
  const [contextLost, setContextLost] = useState(false);
  const [scrollStage, setScrollStage] = useState<HelmetStageId>("hero");
  const [stepIndex, setStepIndex] = useState(0);

  const unavailable = webgl === false || contextLost;

  const source = useMemo<ProgressSource>(() => {
    if (override !== null) return { mode: "fixed", value: override };
    if (reducedMotion || unavailable) {
      return { mode: "fixed", value: HELMET_STAGES[stepIndex].rest };
    }
    return { mode: "scroll", track: trackRef, stage: stageRef };
  }, [override, reducedMotion, unavailable, stepIndex]);

  const stage =
    reducedMotion && override === null
      ? HELMET_STAGES[stepIndex]
      : (HELMET_STAGES.find((s) => s.id === scrollStage) ?? HELMET_STAGES[0]);

  const trackStyle = {
    "--track-sm": `${HELMET_SCROLL.mobileDvh}dvh`,
    "--track-md": `${HELMET_SCROLL.desktopDvh}dvh`,
  } as CSSProperties;

  return (
    <>
      <section
        ref={trackRef}
        aria-label="NeuroHelmet concept, shown stage by stage"
        style={trackStyle}
        className={cn(
          !unavailable &&
            "h-[var(--track-sm)] md:h-[var(--track-md)] motion-reduce:h-auto md:motion-reduce:h-auto",
        )}
      >
        <div
          ref={stageRef}
          className={cn(
            "relative flex flex-col",
            // Not pinned (no WebGL) or pinned with a static fallback (reduced motion).
            unavailable
              ? "h-[min(80dvh,52rem)]"
              : "sticky top-0 h-dvh motion-reduce:static motion-reduce:h-[min(80dvh,52rem)]",
          )}
        >
          {/* Small screens: the caption sits below the canvas, never over the helmet. */}
          <div className="min-h-0 flex-1 md:absolute md:inset-0">
            <NeuroHelmetViewer
              source={source}
              webgl={webgl}
              unavailable={unavailable}
              onContextLost={() => setContextLost(true)}
              onStageChange={setScrollStage}
              visibleLayers={visibleLayers}
              describedBy={descriptionId}
            />
          </div>
          {!unavailable ? (
            <div
              aria-hidden="true"
              className="bg-background border-border flex h-36 shrink-0 flex-col gap-1 overflow-hidden border-t px-4 py-4 md:pointer-events-none md:absolute md:bottom-10 md:left-8 md:h-auto md:max-w-md md:overflow-visible md:border-t-0 md:bg-transparent md:p-0"
            >
              <p className="type-body text-foreground font-medium">
                {stage.name}
              </p>
              <p className="type-meta">{stage.description}</p>
            </div>
          ) : null}
        </div>

        {!unavailable ? (
          <div className="container-page hidden items-center gap-4 py-4 motion-reduce:flex">
            <Button
              variant="secondary"
              disabled={stepIndex === 0}
              onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
            >
              Previous stage
            </Button>
            <Button
              variant="secondary"
              disabled={stepIndex === HELMET_STAGES.length - 1}
              onClick={() =>
                setStepIndex((i) => Math.min(HELMET_STAGES.length - 1, i + 1))
              }
            >
              Next stage
            </Button>
            <p className="type-meta" aria-live="polite">
              {HELMET_STAGES[stepIndex].name}
            </p>
          </div>
        ) : null}
      </section>

      <div className="container-page py-12">
        <HelmetStageText id={descriptionId} />
      </div>
    </>
  );
}
