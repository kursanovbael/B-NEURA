"use client";

import dynamic from "next/dynamic";
import { useId, useRef, useState, useSyncExternalStore } from "react";
import { Badge } from "@/components/ui/Badge";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { isWebGLAvailable } from "@/lib/webgl";
import { CanvasErrorBoundary } from "./CanvasErrorBoundary";
import type { CameraPoseId } from "./CameraRig";
import { ALL_LAYERS_VISIBLE, type HelmetLayerVisibility } from "./helmet";
import { HELMET_LAYERS } from "./helmetLayers";
import { NeuroHelmetFallback } from "./NeuroHelmetFallback";

const NeuroHelmetCanvas = dynamic(() => import("./NeuroHelmetCanvas"), {
  ssr: false,
  loading: () => <NeuroHelmetFallback status="loading" />,
});

const noopSubscribe = () => () => {};

type NeuroHelmetViewerProps = {
  visibleLayers?: HelmetLayerVisibility;
  cameraPose?: CameraPoseId;
};

/**
 * Accessible wrapper around the lazy 3D canvas: labeled image region, text
 * equivalent of the concept, and a static fallback when WebGL is unavailable.
 */
export function NeuroHelmetViewer({
  visibleLayers = ALL_LAYERS_VISIBLE,
  cameraPose = "default",
}: NeuroHelmetViewerProps) {
  const descriptionId = useId();
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef);
  const reducedMotion = useReducedMotion();
  const [contextLost, setContextLost] = useState(false);

  // null on the server and during hydration, then true/false on the client.
  const webgl = useSyncExternalStore(
    noopSubscribe,
    isWebGLAvailable,
    () => null,
  );

  const unavailable = webgl === false || contextLost;
  const fallback = <NeuroHelmetFallback status="unavailable" />;

  return (
    <figure className="flex flex-col gap-4">
      <div
        ref={stageRef}
        role="img"
        aria-label="3D concept view of the NeuroHelmet, a conceptual prototype. A translucent outer shell surrounds sensor, processing, feedback and support layers around an abstract head volume."
        aria-describedby={descriptionId}
        className="border-border bg-surface relative aspect-[4/3] w-full overflow-hidden rounded-lg border sm:aspect-video"
      >
        {unavailable ? (
          fallback
        ) : webgl === null ? (
          <NeuroHelmetFallback status="loading" />
        ) : (
          <CanvasErrorBoundary fallback={fallback}>
            <NeuroHelmetCanvas
              visibleLayers={visibleLayers}
              cameraPose={cameraPose}
              reducedMotion={reducedMotion}
              active={inView}
              onContextLost={() => setContextLost(true)}
            />
          </CanvasErrorBoundary>
        )}
        <Badge tone="violet" className="absolute top-3 left-3">
          Concept prototype
        </Badge>
      </div>
      <figcaption id={descriptionId} className="type-meta flex flex-col gap-3">
        <p>
          A conceptual NeuroHelmet shown as a procedural 3D model with a
          translucent outer shell and several inner layers around an abstract
          head volume. It illustrates a possible future concept, does not depict
          existing hardware, and its placement and proportions are illustrative
          only.
        </p>
        <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
          {HELMET_LAYERS.map((layer) => (
            <li key={layer.id}>
              <span className="text-foreground">{layer.name}</span>
              {" — "}
              {layer.description}
            </li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}
