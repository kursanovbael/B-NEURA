import {
  Color,
  MeshBasicMaterial,
  MeshStandardMaterial,
  type Material,
} from "three";

/**
 * Restrained colour language of the flow: cyan for the simulated signal, warm
 * white for the intention, restrained cyan-white for simulated feedback (amber stays reserved for uncertainty). Neutral
 * gray for the route before anything travels it. Opacities are set per frame.
 */
const basic = (color: string) =>
  new MeshBasicMaterial({ color, transparent: true, opacity: 0 });

export const FLOW_COLORS = {
  signal: new Color("#22d3ee"),
  intention: new Color("#f4efe6"),
  feedback: new Color("#a8e4f0"),
  cue: new Color("#9aa6b2"),
} as const;

/** One arrowhead material per route segment, so each can brighten on its own. */
export const ARROW_MATERIALS = [
  basic("#22d3ee"),
  basic("#22d3ee"),
  basic("#f4efe6"),
  basic("#a8e4f0"),
  basic("#a8e4f0"),
  basic("#9aa6b2"),
] as const;

export const FLOW_MATERIALS = {
  rail: basic("#5b6b7c"),
  signal: basic("#22d3ee"),
  intention: basic("#f4efe6"),
  feedback: basic("#a8e4f0"),
  pulse: basic("#22d3ee"),
  target: basic("#f4efe6"),
  decoderRing: basic("#a78bfa"),
  cue: basic("#9aa6b2"),
  angle: basic("#b8c2cc"),
  object: new MeshStandardMaterial({
    color: "#8d96a3",
    emissive: "#a8e4f0",
    emissiveIntensity: 0,
    roughness: 0.6,
    metalness: 0.1,
    transparent: true,
    opacity: 0,
  }),
  body: new MeshStandardMaterial({
    color: "#cfc8bc",
    roughness: 0.7,
    metalness: 0.05,
    transparent: true,
    opacity: 0,
  }),
  hand: new MeshStandardMaterial({
    color: "#e9e4da",
    roughness: 0.55,
    metalness: 0.05,
    transparent: true,
    opacity: 0,
  }),
} as const satisfies Record<string, Material>;
