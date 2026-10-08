"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { CAMERA_POSES, type CameraPoseId } from "./CameraRig";
import { ALL_LAYERS_VISIBLE, type HelmetLayerVisibility } from "./helmet";
import { HELMET_LAYERS } from "./helmetLayers";
import { NeuroHelmetViewer } from "./NeuroHelmetViewer";
import type { HelmetLayerId } from "./types";

const CAMERA_LABELS: Record<CameraPoseId, string> = {
  default: "Default view",
  inspection: "Closer inspection view",
};

/**
 * DEVELOPMENT ONLY. Review harness for the NeuroHelmet: toggles layer
 * visibility and switches between the two stable camera states. This is not
 * part of the final website UI.
 */
export function HelmetInspector() {
  const [visible, setVisible] =
    useState<HelmetLayerVisibility>(ALL_LAYERS_VISIBLE);
  const [pose, setPose] = useState<CameraPoseId>("default");

  const toggle = (id: HelmetLayerId) =>
    setVisible((current) => ({ ...current, [id]: !current[id] }));

  return (
    <div className="flex flex-col gap-6">
      <NeuroHelmetViewer visibleLayers={visible} cameraPose={pose} />

      <div className="border-border bg-surface flex flex-col gap-5 rounded-md border p-4">
        <Badge tone="warn" dashed className="self-start">
          Development only · not final UI
        </Badge>

        <fieldset className="flex flex-col gap-3">
          <legend className="type-label text-muted mb-2">
            Layer visibility
          </legend>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {HELMET_LAYERS.map((layer) => (
              <label
                key={layer.id}
                className="type-meta flex min-h-11 cursor-pointer items-center gap-3"
              >
                <input
                  type="checkbox"
                  checked={visible[layer.id]}
                  onChange={() => toggle(layer.id)}
                  className="accent-accent h-4 w-4"
                />
                <span className="text-foreground">{layer.name}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-3">
          <legend className="type-label text-muted mb-2">Camera state</legend>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {(Object.keys(CAMERA_POSES) as CameraPoseId[]).map((id) => (
              <label
                key={id}
                className="type-meta flex min-h-11 cursor-pointer items-center gap-3"
              >
                <input
                  type="radio"
                  name="camera-pose"
                  checked={pose === id}
                  onChange={() => setPose(id)}
                  className="accent-accent h-4 w-4"
                />
                <span className="text-foreground">{CAMERA_LABELS[id]}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
    </div>
  );
}
