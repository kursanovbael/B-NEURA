"use client";

import type { RefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { DEFAULT_CAMERA_POSE } from "./CameraRig";
import type { CalloutElements, FlowLabelElements } from "./ExperienceDriver";
import type { FlowDriverState } from "./flowVisuals";
import type { Interaction } from "./interaction";
import { NeuroHelmetScene } from "./NeuroHelmetScene";
import type { JourneySource } from "./types";

type NeuroHelmetCanvasProps = {
  source: JourneySource;
  interaction: RefObject<Interaction>;
  calloutEls: RefObject<CalloutElements>;
  flow: RefObject<FlowDriverState>;
  flowLabelEls: RefObject<FlowLabelElements>;
  redrawKey: string;
  reducedMotion: boolean;
  /** When false, rendering is fully paused (no per-frame work). */
  active: boolean;
  onContextLost: () => void;
};

/** The single WebGL canvas. Loaded lazily by ExperienceCanvas. */
export default function NeuroHelmetCanvas({
  source,
  interaction,
  calloutEls,
  flow,
  flowLabelEls,
  redrawKey,
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
      <NeuroHelmetScene
        source={source}
        interaction={interaction}
        calloutEls={calloutEls}
        flow={flow}
        flowLabelEls={flowLabelEls}
        redrawKey={redrawKey}
      />
    </Canvas>
  );
}
