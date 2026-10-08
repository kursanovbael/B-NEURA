"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { Badge } from "@/components/ui/Badge";
import type { HelmetStageId } from "@/content/helmetStages";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { CanvasErrorBoundary } from "./CanvasErrorBoundary";
import { ALL_LAYERS_VISIBLE, type HelmetLayerVisibility } from "./helmet/types";
import { NeuroHelmetFallback } from "./NeuroHelmetFallback";
import type { ProgressSource } from "./types";

const NeuroHelmetCanvas = dynamic(() => import("./NeuroHelmetCanvas"), {
  ssr: false,
  loading: () => <NeuroHelmetFallback status="loading" />,
});

type NeuroHelmetViewerProps = {
  source: ProgressSource;
  /** null while WebGL support is still being detected (server and hydration). */
  webgl: boolean | null;
  /** True when WebGL is unavailable or the context was lost. */
  unavailable: boolean;
  onContextLost: () => void;
  onStageChange?: (stage: HelmetStageId) => void;
  visibleLayers?: HelmetLayerVisibility;
  /** Id of the element that describes the concept in text. */
  describedBy: string;
};

/**
 * Accessible wrapper around the lazy 3D canvas: a labeled image region that
 * fills its parent, pauses rendering when off-screen, and shows a static
 * fallback when WebGL is unavailable. Its text equivalent lives in the page.
 */
export function NeuroHelmetViewer({
  source,
  webgl,
  unavailable,
  onContextLost,
  onStageChange,
  visibleLayers = ALL_LAYERS_VISIBLE,
  describedBy,
}: NeuroHelmetViewerProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef);
  const reducedMotion = useReducedMotion();

  const fallback = <NeuroHelmetFallback status="unavailable" />;

  return (
    <div
      ref={stageRef}
      role="img"
      aria-label="3D concept view of the NeuroHelmet, a conceptual prototype. The view changes as you scroll, from the whole helmet to its separated inner layers."
      aria-describedby={describedBy}
      className="bg-surface relative h-full w-full overflow-hidden"
    >
      {unavailable ? (
        fallback
      ) : webgl === null ? (
        <NeuroHelmetFallback status="loading" />
      ) : (
        <CanvasErrorBoundary fallback={fallback}>
          <NeuroHelmetCanvas
            source={source}
            visibleLayers={visibleLayers}
            reducedMotion={reducedMotion}
            active={inView}
            onContextLost={onContextLost}
            onStageChange={onStageChange}
          />
        </CanvasErrorBoundary>
      )}
      <Badge tone="violet" className="absolute top-4 left-4">
        Concept prototype
      </Badge>
    </div>
  );
}
