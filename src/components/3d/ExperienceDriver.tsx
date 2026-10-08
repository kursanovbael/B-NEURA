"use client";

import { useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import {
  applyHelmetState,
  findHelmetObjects,
  type HelmetObjects,
} from "./applyHelmetState";
import { applyFlow, findFlowObjects, type FlowObjects } from "./applyFlow";
import { applyCameraPose } from "./CameraRig";
import { FLOW_LABEL_ANCHORS } from "./flowPaths";
import {
  FLOW_LABEL_IDS,
  contactFocus,
  flowVisuals,
  stepFlow,
  type FlowDriverState,
  type FlowLabelId,
  type FlowVisuals,
} from "./flowVisuals";
import { HELMET_LAYERS } from "./helmetLayers";
import { markActive, placeCallout } from "./callouts";
import { stepInteraction, type Interaction } from "./interaction";
import { sampleJourney, withContactFocus } from "./journey";
import { readJourney } from "./journeyScroll";
import type { HelmetLayerId, JourneySource } from "./types";

/** Rate (1/s) at which the shown position eases toward the scroll position. */
const DAMPING = 8;
/** Opacity factor applied to the shell while another part is selected. */
const SHELL_SELECTION_DIM = 0.5;

/** A label needs about this much room to the right of its dot. */
const FLIP_MARGIN = 190;
/** The represented-intention tag is wider than the other labels. */
const WIDE_FLIP_MARGIN = 300;
/** Below this width the flow labels flip at the middle of the screen. */
const NARROW_WIDTH = 640;
/** On narrow screens a label flips once its dot is past this share of the width. */
const NARROW_FLIP = 0.5;

const point = new Vector3();

/**
 * How visible each flow label is, apart from the chapter itself. The story
 * labels step back in the chapters that explain what returns, and the labels
 * for the selected feedback kind show only while it is selected.
 */
function labelWeight(id: FlowLabelId, visuals: FlowVisuals): number {
  const { emphasis, paths } = visuals;
  const story = 1 - emphasis.focus;
  switch (id) {
    case "represented":
      return visuals.represented * story;
    case "intention":
    case "sensors":
    case "decoder":
      return story;
    case "feedback":
      return emphasis.focus > 0.5 ? (paths[3] > 0.05 ? 1 : 0) : 1;
    case "user":
      return emphasis.focus > 0.5 ? paths[4] : paths[4];
    case "cue":
      return emphasis.cue;
    case "kind":
      return Math.max(emphasis.touch, emphasis.pressure, emphasis.temperature);
    case "angle":
      return emphasis.arc;
    case "hand":
      return 1 - emphasis.arc;
    case "object":
      return (
        1 - Math.max(emphasis.touch, emphasis.pressure, emphasis.temperature)
      );
    default:
      return 1;
  }
}

export type CalloutElements = Partial<
  Record<HelmetLayerId, HTMLElement | null>
>;

export type FlowLabelElements = Partial<
  Record<FlowLabelId, HTMLElement | null>
>;

type ExperienceDriverProps = {
  source: JourneySource;
  interaction: RefObject<Interaction>;
  calloutEls: RefObject<CalloutElements>;
  flow: RefObject<FlowDriverState>;
  flowLabelEls: RefObject<FlowLabelElements>;
};

/**
 * Drives the scene once per frame: reads the position in the story, samples
 * the deterministic journey, adds the visitor's turning and selection, and
 * applies it to the camera, the helmet and the callout elements. Scroll is
 * only read, never intercepted, and no React state changes per frame.
 */
export function ExperienceDriver({
  source,
  interaction,
  calloutEls,
  flow,
  flowLabelEls,
}: ExperienceDriverProps) {
  const shown = useRef<number | null>(null);
  const objects = useRef<HelmetObjects | null>(null);
  const flowObjects = useRef<FlowObjects | null>(null);

  useFrame((state, delta) => {
    const target = readJourney(source);
    const instant = source.mode === "fixed";
    if (shown.current === null || instant) {
      shown.current = target;
    } else {
      shown.current +=
        (target - shown.current) * (1 - Math.exp(-DAMPING * delta));
      if (Math.abs(target - shown.current) < 1e-4) shown.current = target;
    }

    const { width, height } = state.size;
    const journey = sampleJourney(shown.current, width / height);

    const it = interaction.current;
    stepInteraction(it, delta, instant);

    // In the flow chapter the helmet holds the pose the route is drawn for.
    const turned = 1 - journey.flowWeight;

    // Selecting a part brings it to full strength and dims the rest.
    const focus = { ...journey.focus };
    for (const layer of HELMET_LAYERS) {
      const wanted = layer.id === it.selected ? 1 : 0;
      focus[layer.id] += (wanted - focus[layer.id]) * it.selectionWeight;
    }
    const shellDim =
      it.selected && it.selected !== "outer-shell"
        ? 1 - SHELL_SELECTION_DIM * it.selectionWeight
        : 1;

    if (!objects.current?.root)
      objects.current = findHelmetObjects(state.scene);
    const found = objects.current;
    applyHelmetState(
      {
        yaw: journey.yaw + it.yaw * turned,
        pitch: it.pitch * turned,
        shellOpacity: journey.shellOpacity * shellDim,
        focus,
        separation: journey.separation,
        guides: journey.guides,
        path: journey.path,
        bridge: journey.bridge,
      },
      found,
    );

    if (!flowObjects.current?.group)
      flowObjects.current = findFlowObjects(state.scene);
    stepFlow(flow.current, delta, instant);
    const visuals = flowVisuals(flow.current.shown, flow.current.emphasis);
    const portrait = width / height < 1.2;
    const close = portrait
      ? journey.flowWeight * contactFocus(flow.current.shown)
      : 0;
    applyFlow(visuals, journey.flowWeight, flowObjects.current, close);

    applyCameraPose(
      state.camera,
      close > 0 ? withContactFocus(journey.camera, close) : journey.camera,
      journey.shift,
      width,
      height,
    );
    found.root?.updateMatrixWorld(true);
    state.camera.matrixWorldInverse.copy(state.camera.matrixWorld).invert();

    // Callouts follow their parts in screen space.
    const interactive = journey.hotspots >= 0.9;
    for (const layer of HELMET_LAYERS) {
      const el = calloutEls.current[layer.id];
      const group = found.layers[layer.id];
      if (!el || !group) continue;
      point.set(layer.anchor[0], layer.anchor[1], layer.anchor[2]);
      group.localToWorld(point);
      point.project(state.camera);
      const visible = point.z < 1 ? journey.callouts[layer.id] : 0;
      placeCallout(
        el,
        (point.x * 0.5 + 0.5) * width,
        (-point.y * 0.5 + 0.5) * height,
        visible,
        interactive,
        (point.x * 0.5 + 0.5) * width > width - FLIP_MARGIN,
      );
    }

    // Numbered flow labels follow their points on the route.
    for (const id of FLOW_LABEL_IDS) {
      const el = flowLabelEls.current[id];
      if (!el) continue;
      point.copy(FLOW_LABEL_ANCHORS[id]).project(state.camera);
      const x = (point.x * 0.5 + 0.5) * width;
      const y = (-point.y * 0.5 + 0.5) * height;
      const own = labelWeight(id, visuals);
      const on = point.z < 1 ? journey.flowWeight * own : 0;
      const margin =
        width < NARROW_WIDTH
          ? width * NARROW_FLIP
          : id === "represented"
            ? WIDE_FLIP_MARGIN
            : FLIP_MARGIN;
      placeCallout(el, x, y, on, false, x > width - margin);
      markActive(el, visuals.active[id]);
    }
  });

  return null;
}
