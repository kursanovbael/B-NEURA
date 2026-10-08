"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { HELMET_STAGES } from "@/content/helmetStages";
import { phaseForProgress } from "./experience";
import { ALL_LAYERS_VISIBLE, type HelmetLayerVisibility } from "./helmet/types";
import { HELMET_LAYERS } from "./helmetLayers";
import { ScrollHelmetStage } from "./ScrollHelmetStage";
import type { HelmetLayerId } from "./types";

/**
 * DEVELOPMENT ONLY. Wraps the scroll stage with a small fixed review panel:
 * a progress scrubber that overrides scroll, and layer visibility toggles.
 * Not part of the final website UI; the page renders it only in development.
 */
export function HelmetInspector() {
  const [visible, setVisible] =
    useState<HelmetLayerVisibility>(ALL_LAYERS_VISIBLE);
  const [useScrubber, setUseScrubber] = useState(false);
  const [progress, setProgress] = useState(0);

  const toggle = (id: HelmetLayerId) =>
    setVisible((current) => ({ ...current, [id]: !current[id] }));

  const stage = HELMET_STAGES.find((s) => s.id === phaseForProgress(progress));

  return (
    <>
      <ScrollHelmetStage
        visibleLayers={visible}
        override={useScrubber ? progress : null}
      />
      <details className="border-border bg-surface fixed right-4 bottom-4 z-50 max-w-xs rounded-md border p-3 text-sm">
        <summary className="type-label cursor-pointer text-amber-300">
          Development only
        </summary>
        <div className="mt-3 flex flex-col gap-4">
          <Badge tone="warn" dashed className="self-start">
            Not final UI
          </Badge>

          <fieldset className="flex flex-col gap-2">
            <legend className="type-label text-muted mb-1">
              Progress scrubber
            </legend>
            <label className="type-meta flex items-center gap-2">
              <input
                type="checkbox"
                checked={useScrubber}
                onChange={(event) => setUseScrubber(event.target.checked)}
                className="accent-accent h-4 w-4"
              />
              Override scroll
            </label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.005}
              value={progress}
              disabled={!useScrubber}
              onChange={(event) => setProgress(Number(event.target.value))}
              aria-label="Experience progress"
              className="accent-accent w-full"
            />
            <p className="type-technical text-muted">
              {progress.toFixed(3)} {stage?.id}
            </p>
          </fieldset>

          <fieldset className="flex flex-col gap-1">
            <legend className="type-label text-muted mb-1">
              Layer visibility
            </legend>
            {HELMET_LAYERS.map((layer) => (
              <label
                key={layer.id}
                className="type-meta flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  checked={visible[layer.id]}
                  onChange={() => toggle(layer.id)}
                  className="accent-accent h-4 w-4"
                />
                {layer.name}
              </label>
            ))}
          </fieldset>
        </div>
      </details>
    </>
  );
}
