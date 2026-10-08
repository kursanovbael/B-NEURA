"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { HelmetStageId } from "@/content/helmetStages";
import {
  applyHelmetState,
  findHelmetObjects,
  type HelmetObjects,
} from "./applyHelmetState";
import { applyCameraPose } from "./CameraRig";
import { phaseForProgress } from "./experience";
import { readProgress } from "./progress";
import { sampleTimeline } from "./timeline";
import type { ProgressSource } from "./types";

/** Rate (1/s) at which the shown progress eases toward the scroll position. */
const DAMPING = 7;
const SETTLE_EPSILON = 1e-4;

type ExperienceDriverProps = {
  source: ProgressSource;
  onStageChange?: (stage: HelmetStageId) => void;
};

/**
 * Drives the scene from a progress source once per frame: reads progress,
 * samples the deterministic timeline and applies it to the camera and helmet.
 * Scroll is only read, never intercepted, and no React state changes per frame.
 * Eased scroll progress settles on exactly the same state for the same position.
 */
export function ExperienceDriver({
  source,
  onStageChange,
}: ExperienceDriverProps) {
  const shown = useRef<number | null>(null);
  const lastStage = useRef<HelmetStageId | null>(null);
  const objects = useRef<HelmetObjects | null>(null);

  useFrame((state, delta) => {
    const target = readProgress(source);

    if (shown.current === null || source.mode === "fixed") {
      shown.current = target;
    } else {
      const next =
        shown.current +
        (target - shown.current) * (1 - Math.exp(-DAMPING * delta));
      shown.current = Math.abs(target - next) < SETTLE_EPSILON ? target : next;
    }

    const progress = shown.current;
    const aspect = state.size.width / state.size.height;
    const timeline = sampleTimeline(progress, aspect);

    // Groups mount after the first render; look them up once they exist.
    if (!objects.current?.root)
      objects.current = findHelmetObjects(state.scene);
    applyHelmetState(timeline, objects.current);
    applyCameraPose(state.camera, timeline.camera);

    const stage = phaseForProgress(progress);
    if (stage !== lastStage.current) {
      lastStage.current = stage;
      onStageChange?.(stage);
    }
  });

  return null;
}
