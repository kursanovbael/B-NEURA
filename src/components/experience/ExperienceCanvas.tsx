"use client";

import dynamic from "next/dynamic";
import { useRef, type PointerEvent, type RefObject } from "react";
import type {
  CalloutElements,
  FlowLabelElements,
} from "@/components/3d/ExperienceDriver";
import type { FlowDriverState } from "@/components/3d/flowVisuals";
import { CanvasErrorBoundary } from "@/components/3d/CanvasErrorBoundary";
import {
  beginDrag,
  dragBy,
  endDrag,
  type Interaction,
} from "@/components/3d/interaction";
import { NeuroHelmetFallback } from "@/components/3d/NeuroHelmetFallback";
import type { JourneySource } from "@/components/3d/types";

const NeuroHelmetCanvas = dynamic(
  () => import("@/components/3d/NeuroHelmetCanvas"),
  { ssr: false, loading: () => <NeuroHelmetFallback status="loading" /> },
);

type ExperienceCanvasProps = {
  source: JourneySource;
  interaction: RefObject<Interaction>;
  calloutEls: RefObject<CalloutElements>;
  flow: RefObject<FlowDriverState>;
  flowLabelEls: RefObject<FlowLabelElements>;
  redrawKey: string;
  /** null while WebGL support is still being detected. */
  webgl: boolean | null;
  unavailable: boolean;
  active: boolean;
  reducedMotion: boolean;
  onContextLost: () => void;
  /** Called when the visitor turns the helmet (used to redraw on demand). */
  onInput: () => void;
};

/**
 * The single, persistent WebGL canvas, fixed behind the page. Dragging turns
 * the helmet; vertical swipes still scroll the page. Falls back to a static
 * illustration when WebGL is unavailable.
 */
export function ExperienceCanvas({
  source,
  interaction,
  calloutEls,
  flow,
  flowLabelEls,
  redrawKey,
  webgl,
  unavailable,
  active,
  reducedMotion,
  onContextLost,
  onInput,
}: ExperienceCanvasProps) {
  const last = useRef<{ x: number; y: number } | null>(null);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    last.current = { x: event.clientX, y: event.clientY };
    beginDrag(interaction.current);
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!last.current) return;
    dragBy(
      interaction.current,
      event.clientX - last.current.x,
      event.clientY - last.current.y,
    );
    last.current = { x: event.clientX, y: event.clientY };
    if (reducedMotion) onInput();
  };
  const onPointerEnd = () => {
    last.current = null;
    endDrag(interaction.current);
  };

  return (
    <div
      role="img"
      aria-label="3D concept view of the NeuroHelmet, a conceptual prototype. It changes as you move through the story. The same content is written out in the page."
      className="bg-background fixed inset-0 z-0 cursor-grab touch-pan-y active:cursor-grabbing"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
    >
      {unavailable ? (
        <div className="absolute top-0 right-0 h-[45%] w-full md:h-full md:w-1/2">
          <NeuroHelmetFallback status="unavailable" />
        </div>
      ) : webgl === null ? (
        <NeuroHelmetFallback status="loading" />
      ) : (
        <CanvasErrorBoundary
          fallback={<NeuroHelmetFallback status="unavailable" />}
        >
          <NeuroHelmetCanvas
            source={source}
            interaction={interaction}
            calloutEls={calloutEls}
            flow={flow}
            flowLabelEls={flowLabelEls}
            redrawKey={redrawKey}
            reducedMotion={reducedMotion}
            active={active}
            onContextLost={onContextLost}
          />
        </CanvasErrorBoundary>
      )}
    </div>
  );
}
