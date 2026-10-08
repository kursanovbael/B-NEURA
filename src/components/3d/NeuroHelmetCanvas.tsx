"use client";

import { Canvas } from "@react-three/fiber";
import type { HelmetStageId } from "@/content/helmetStages";
import { DEFAULT_CAMERA_POSE } from "./CameraRig";
import type { HelmetLayerVisibility } from "./helmet";
import { NeuroHelmetScene } from "./NeuroHelmetScene";
import type { ProgressSource } from "./types";

type NeuroHelmetCanvasProps = {
  source: ProgressSource;
  visibleLayers: HelmetLayerVisibility;
  reducedMotion: boolean;
  /** When false, rendering is fully paused (no per-frame work). */
  active: boolean;
  onContextLost: () => void;
  onStageChange?: (stage: HelmetStageId) => void;
};

/** The single WebGL canvas. Loaded lazily by NeuroHelmetViewer. */
export default function NeuroHelmetCanvas({
  source,
  visibleLayers,
  reducedMotion,
  active,
  onContextLost,
  onStageChange,
}: NeuroHelmetCanvasProps) {
  return (
    <Canvas
      frameloop={!active ? "never" : reducedMotion ? "demand" : "always"}
      dpr={[1, 1.75]}
      camera={{
        position: [...DEFAULT_CAMERA_POSE.position],
        fov: DEFAULT_CAMERA_POSE.fov,
      }}
      gl={{ antialias: true, alpha: false }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", (event) => {
          event.preventDefault();
          onContextLost();
        });
      }}
    >
      <NeuroHelmetScene
        source={source}
        visibleLayers={visibleLayers}
        onStageChange={onStageChange}
      />
    </Canvas>
  );
}
