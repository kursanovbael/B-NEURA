"use client";

import { Canvas } from "@react-three/fiber";
import { DEFAULT_CAMERA_POSE } from "./CameraRig";
import { NeuroHelmetScene } from "./NeuroHelmetScene";
import type { ExperienceProgress } from "./types";

type NeuroHelmetCanvasProps = {
  experience: ExperienceProgress;
  reducedMotion: boolean;
  /** When false, rendering is fully paused (no per-frame work). */
  active: boolean;
  onContextLost: () => void;
};

/** The single WebGL canvas. Loaded lazily by NeuroHelmetViewer. */
export default function NeuroHelmetCanvas({
  experience,
  reducedMotion,
  active,
  onContextLost,
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
      <NeuroHelmetScene experience={experience} reducedMotion={reducedMotion} />
    </Canvas>
  );
}
