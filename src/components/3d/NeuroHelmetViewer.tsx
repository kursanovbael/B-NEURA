"use client";

import dynamic from "next/dynamic";
import { useId, useRef, useState, useSyncExternalStore } from "react";
import { Badge } from "@/components/ui/Badge";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { isWebGLAvailable } from "@/lib/webgl";
import { CanvasErrorBoundary } from "./CanvasErrorBoundary";
import { HELMET_LAYERS } from "./helmetLayers";
import { NeuroHelmetFallback } from "./NeuroHelmetFallback";
import type { ExperienceProgress } from "./types";

const NeuroHelmetCanvas = dynamic(() => import("./NeuroHelmetCanvas"), {
  ssr: false,
  loading: () => <NeuroHelmetFallback status="loading" />,
});

const noopSubscribe = () => () => {};

type NeuroHelmetViewerProps = {
  experience: ExperienceProgress;
};

/**
 * Accessible wrapper around the lazy 3D canvas: labeled image region, text
 * equivalent of the concept, and a static fallback when WebGL is unavailable.
 */
export function NeuroHelmetViewer({ experience }: NeuroHelmetViewerProps) {
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
        aria-label="3D concept view of the NeuroHelmet, a conceptual prototype shown as simple placeholder geometry."
        aria-describedby={descriptionId}
        className="border-border bg-surface relative aspect-video w-full overflow-hidden rounded-lg border"
      >
        {unavailable ? (
          fallback
        ) : webgl === null ? (
          <NeuroHelmetFallback status="loading" />
        ) : (
          <CanvasErrorBoundary fallback={fallback}>
            <NeuroHelmetCanvas
              experience={experience}
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
          A conceptual NeuroHelmet drawn as simple placeholder geometry,
          separated into layers. It does not depict existing hardware.
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
