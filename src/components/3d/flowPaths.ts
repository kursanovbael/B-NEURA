import { CatmullRomCurve3, Vector3 } from "three";
import {
  FEEDBACK,
  PROCESSING_ORIGIN,
  placementAt,
} from "./helmet/HelmetGeometry";
import { FLOW_YAW } from "./journey";

/**
 * World-space route of the simulated intention, drawn through the helmet's own
 * parts. The helmet is held at FLOW_YAW in the flow chapter, so points that
 * belong to helmet parts are the parts' local positions turned by that yaw.
 * Every number is illustrative: it describes a concept prototype.
 */

const UP = new Vector3(0, 1, 0);
const toWorld = (local: Vector3) => local.clone().applyAxisAngle(UP, FLOW_YAW);
const deg = (d: number) => (d * Math.PI) / 180;

/** Radius of the virtual object. */
export const OBJECT_RADIUS = 0.1;

/** Resting and raised pose of the virtual hand, which pivots at the wrist. */
export const HAND = {
  pivot: new Vector3(1.45, -0.35, 0.2),
  length: 0.82,
  restAngle: -0.45,
  raisedAngle: 0.62,
} as const;

const head = new Vector3(0, 0.05, 0);
const sensorPad = toWorld(placementAt(deg(40), 0).position);
const decoder = toWorld(PROCESSING_ORIGIN);
const feedbackPad = toWorld(
  new Vector3(
    FEEDBACK.rx * Math.sin(deg(125)),
    FEEDBACK.y,
    FEEDBACK.rz * Math.cos(deg(125)),
  ),
);

/** Where the virtual hand's fingertips are when it is raised. */
const raisedTip = new Vector3(
  HAND.pivot.x + HAND.length * Math.cos(HAND.raisedAngle),
  HAND.pivot.y + HAND.length * Math.sin(HAND.raisedAngle),
  HAND.pivot.z,
);

/** The object sits just past the fingertips of the raised hand. */
const objectCenter = raisedTip
  .clone()
  .add(
    new Vector3(
      Math.cos(HAND.raisedAngle),
      Math.sin(HAND.raisedAngle),
      0,
    ).multiplyScalar(OBJECT_RADIUS * 0.45),
  );

export const FLOW_ANCHORS = {
  head,
  sensorPad,
  decoder,
  feedbackPad,
  /** Center of the virtual object the raised hand touches. */
  target: objectCenter,
  object: objectCenter,
  /** Elbow, shoulder and torso reference of the minimal virtual body. */
  shoulder: HAND.pivot.clone().add(new Vector3(0, -0.55, 0)),
  /** Hand near its middle when raised. */
  hand: new Vector3(
    HAND.pivot.x + 0.5 * Math.cos(HAND.raisedAngle),
    HAND.pivot.y + 0.5 * Math.sin(HAND.raisedAngle),
    HAND.pivot.z,
  ),
  crown: new Vector3(0, 0.95, 0),
};

/**
 * 1: head to a sensor. 2: sensor, over the head, to the decoder. 3: decoder
 * out to the virtual body. 4: virtual hand back toward the feedback interface.
 * 5: feedback interface back to the head.
 */
export const FLOW_CURVES: readonly CatmullRomCurve3[] = [
  new CatmullRomCurve3([head, new Vector3(-0.28, 0.3, 0), sensorPad]),
  new CatmullRomCurve3([
    sensorPad,
    new Vector3(-0.3, 0.76, 0),
    new Vector3(0.15, 0.8, 0),
    new Vector3(0.55, 0.52, 0),
    decoder.clone().add(new Vector3(0, 0.03, 0)),
  ]),
  new CatmullRomCurve3([
    decoder,
    new Vector3(1.05, 0.1, 0.1),
    HAND.pivot.clone(),
  ]),
  new CatmullRomCurve3([
    objectCenter.clone(),
    new Vector3(1.5, -0.55, 0.5),
    new Vector3(0.9, -0.65, 0.55),
    feedbackPad,
  ]),
  new CatmullRomCurve3([
    feedbackPad,
    new Vector3(0.2, -0.2, 0.25),
    new Vector3(0, -0.05, 0),
  ]),
];

/** Which kind of line each segment is, for colour. */
export const FLOW_PATH_KIND = [
  "signal",
  "signal",
  "intention",
  "feedback",
  "feedback",
] as const;

/** Where each numbered label points (world space). Keys match FlowLabelId. */
export const FLOW_LABEL_ANCHORS = {
  intention: head.clone().add(new Vector3(0, 0.3, 0)),
  sensors: sensorPad,
  decoder,
  represented: new Vector3(1.0, 0.8, 0.1),
  hand: FLOW_ANCHORS.hand,
  object: objectCenter.clone().add(new Vector3(0.05, 0.3, 0)),
  user: head.clone().add(new Vector3(0, -0.75, 0)),
  feedback: feedbackPad,
} as const;
