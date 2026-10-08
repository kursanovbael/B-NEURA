import {
  MathUtils,
  Vector3,
  type Mesh,
  type Object3D,
  type Scene,
} from "three";
import { FLOW_CURVES, FLOW_PATH_KIND, HAND } from "./flowPaths";
import { FLOW_PATH_COUNT, type FlowVisuals } from "./flowVisuals";
import {
  ARROW_MATERIALS,
  FLOW_COLORS,
  FLOW_MATERIALS,
} from "./helmet/flowMaterials";
import { INDICES_PER_SEGMENT, TUBULAR_SEGMENTS } from "./helmet/FlowVisuals";
import { HELMET_MATERIALS as M } from "./helmet/HelmetMaterials";

export type FlowObjects = {
  group: Object3D | null;
  active: (Mesh | null)[];
  pulse: Mesh | null;
  hand: Object3D | null;
  fingers: Object3D[];
  tips: Object3D[];
  thumb: Object3D | null;
  target: Object3D | null;
};

/** Finds the flow drawing in the scene by name. */
export function findFlowObjects(scene: Scene): FlowObjects {
  const fingers: Object3D[] = [];
  const tips: Object3D[] = [];
  scene.traverse((object) => {
    if (object.name === "hand-finger") fingers.push(object);
    if (object.name === "hand-tip") tips.push(object);
  });
  return {
    group: scene.getObjectByName("flow-visuals") ?? null,
    active: Array.from(
      { length: FLOW_PATH_COUNT },
      (_, i) => (scene.getObjectByName(`flow-active-${i}`) as Mesh) ?? null,
    ),
    pulse: (scene.getObjectByName("flow-pulse") as Mesh) ?? null,
    hand: scene.getObjectByName("virtual-hand") ?? null,
    fingers,
    tips,
    thumb: scene.getObjectByName("hand-thumb") ?? null,
    target: scene.getObjectByName("flow-target") ?? null,
  };
}

/** Emissive strength of the helmet parts at rest; the flow adds to it. */
const REST = {
  sensors: 0.9,
  decoder: 0.8,
  connector: 0.25,
  feedbackBand: 0.5,
  feedbackPad: 0.55,
} as const;

const FINGER_CURL_REST = 0.7;
const FINGER_CURL_RAISED = 0.05;
const RAIL_OPACITY = 0.55;
const ARROW_DIM = 0.4;

const point = new Vector3();

/**
 * Applies the flow visuals: lines drawn along their route, the pulse, the
 * virtual hand, the target ring, and a restrained glow on the helmet parts
 * that are active. `weight` fades everything with the chapter. Plain function
 * for the frame loop; nothing here touches React state.
 */
export function applyFlow(
  visuals: FlowVisuals,
  weight: number,
  objects: FlowObjects,
) {
  if (objects.group) objects.group.visible = weight > 0.01;

  FLOW_MATERIALS.rail.opacity = RAIL_OPACITY * weight;
  FLOW_MATERIALS.signal.opacity = weight;
  FLOW_MATERIALS.intention.opacity = weight;
  FLOW_MATERIALS.feedback.opacity = weight;
  FLOW_MATERIALS.hand.opacity = weight;

  for (let i = 0; i < FLOW_PATH_COUNT; i++) {
    const frac = visuals.paths[i];
    objects.active[i]?.geometry.setDrawRange(
      0,
      Math.floor(frac * TUBULAR_SEGMENTS) * INDICES_PER_SEGMENT,
    );
    ARROW_MATERIALS[i].opacity = weight * (frac >= 0.999 ? 1 : ARROW_DIM);
  }

  const pulse = objects.pulse;
  if (pulse) {
    pulse.visible = visuals.pulsePath >= 0;
    if (visuals.pulsePath >= 0) {
      FLOW_CURVES[visuals.pulsePath].getPointAt(visuals.pulseAt, point);
      pulse.position.copy(point);
      FLOW_MATERIALS.pulse.color.copy(
        FLOW_COLORS[FLOW_PATH_KIND[visuals.pulsePath]],
      );
    }
    FLOW_MATERIALS.pulse.opacity = weight;
  }

  if (objects.hand) {
    objects.hand.rotation.z = MathUtils.lerp(
      HAND.restAngle,
      HAND.raisedAngle,
      visuals.handRaise,
    );
  }
  const curl = MathUtils.lerp(
    FINGER_CURL_REST,
    FINGER_CURL_RAISED,
    visuals.handRaise,
  );
  for (const finger of objects.fingers) finger.rotation.z = -curl;
  for (const tip of objects.tips) tip.rotation.z = -curl * 0.8;
  if (objects.thumb)
    objects.thumb.rotation.z = -0.5 * (curl / FINGER_CURL_REST);

  if (objects.target) {
    objects.target.scale.setScalar(1 + 0.15 * visuals.targetResponse);
  }
  FLOW_MATERIALS.target.opacity =
    weight * (0.25 + 0.65 * visuals.targetResponse);

  FLOW_MATERIALS.decoderRing.opacity =
    weight * (0.2 + 0.8 * visuals.decoderGlow);
  M.sensorGlow.emissiveIntensity =
    REST.sensors + 1.5 * visuals.sensorGlow * weight;
  M.processingAccent.emissiveIntensity =
    REST.decoder + 1.6 * visuals.decoderGlow * weight;
  M.connector.emissiveIntensity =
    REST.connector + 0.9 * visuals.decoderGlow * weight;
  M.feedbackBand.emissiveIntensity =
    REST.feedbackBand + 1.2 * visuals.feedbackGlow * weight;
  M.feedbackPad.emissiveIntensity =
    REST.feedbackPad + 1.4 * visuals.feedbackGlow * weight;
}
