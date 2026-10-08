"use client";

import { useEffect, type RefObject } from "react";
import { useThree } from "@react-three/fiber";
import { CameraRig } from "./CameraRig";
import {
  ExperienceDriver,
  type CalloutElements,
  type FlowLabelElements,
} from "./ExperienceDriver";
import type { FlowDriverState } from "./flowVisuals";
import { FlowVisuals } from "./helmet/FlowVisuals";
import { ExplodeGuides } from "./helmet/ExplodeGuides";
import { NeuroHelmet } from "./helmet";
import { SignalPath } from "./helmet/SignalPath";
import type { Interaction } from "./interaction";
import { SceneEnvironment } from "./SceneEnvironment";
import type { JourneySource } from "./types";

type NeuroHelmetSceneProps = {
  source: JourneySource;
  interaction: RefObject<Interaction>;
  calloutEls: RefObject<CalloutElements>;
  flow: RefObject<FlowDriverState>;
  flowLabelEls: RefObject<FlowLabelElements>;
  /** Changes whenever the scene must be redrawn while rendering on demand. */
  redrawKey: string;
};

/** Composes camera, environment, helmet, guides, path and the journey driver. */
export function NeuroHelmetScene({
  source,
  interaction,
  calloutEls,
  flow,
  flowLabelEls,
  redrawKey,
}: NeuroHelmetSceneProps) {
  const invalidate = useThree((state) => state.invalidate);

  // With on-demand rendering (reduced motion), redraw whenever something changed.
  useEffect(() => {
    invalidate();
  }, [redrawKey, invalidate]);

  return (
    <>
      <CameraRig />
      <SceneEnvironment />
      <NeuroHelmet />
      <SignalPath />
      <ExplodeGuides />
      <FlowVisuals />
      <ExperienceDriver
        source={source}
        interaction={interaction}
        calloutEls={calloutEls}
        flow={flow}
        flowLabelEls={flowLabelEls}
      />
    </>
  );
}
