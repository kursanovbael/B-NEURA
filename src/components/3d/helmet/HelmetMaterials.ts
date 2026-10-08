import {
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  type Material,
} from "three";

/**
 * Shared material set. Restrained on purpose: dark satin surfaces, small cyan
 * and violet accents, no large emissive areas, no environment maps.
 * Materials that will later fade (shell, support, head) are already
 * `transparent` so opacity can be animated without recompiling shaders.
 */
export const HELMET_MATERIALS = {
  /**
   * Satin dark shell. Translucent for the Phase 2 inspection prototype so the
   * interior stays readable. This is an inspection state, not the final
   * look: later phases will transition solid -> translucent -> cutaway -> exploded.
   */
  shell: new MeshPhysicalMaterial({
    color: "#2f4153",
    roughness: 0.42,
    metalness: 0.3,
    clearcoat: 0.35,
    clearcoatRoughness: 0.35,
    transparent: true,
    opacity: 0.68,
    depthWrite: false,
  }),
  trim: new MeshStandardMaterial({
    color: "#18212c",
    roughness: 0.55,
    metalness: 0.5,
  }),
  /** Front display band: same family as the shell, slightly darker, so it reads as part of it. */
  visor: new MeshPhysicalMaterial({
    color: "#243241",
    roughness: 0.38,
    metalness: 0.3,
    clearcoat: 0.5,
    clearcoatRoughness: 0.3,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
  }),
  visorEdge: new MeshStandardMaterial({
    color: "#34465a",
    roughness: 0.5,
    metalness: 0.4,
  }),
  seam: new MeshStandardMaterial({ color: "#04070a", roughness: 1 }),

  sensorPad: new MeshStandardMaterial({
    color: "#17212c",
    roughness: 0.6,
    metalness: 0.4,
  }),
  sensorGlow: new MeshStandardMaterial({
    color: "#0a1a20",
    emissive: "#22d3ee",
    emissiveIntensity: 0.9,
  }),
  sensorMount: new MeshStandardMaterial({
    color: "#1a2430",
    roughness: 0.5,
    metalness: 0.55,
  }),

  processingBody: new MeshStandardMaterial({
    color: "#121a24",
    roughness: 0.45,
    metalness: 0.5,
  }),
  processingAccent: new MeshStandardMaterial({
    color: "#171226",
    emissive: "#a78bfa",
    emissiveIntensity: 0.8,
  }),
  connector: new MeshStandardMaterial({
    color: "#1b1630",
    emissive: "#a78bfa",
    emissiveIntensity: 0.25,
    roughness: 0.6,
  }),

  feedbackBand: new MeshStandardMaterial({
    color: "#0d1a20",
    emissive: "#22d3ee",
    emissiveIntensity: 0.5,
  }),
  feedbackPad: new MeshStandardMaterial({
    color: "#151b2a",
    emissive: "#a78bfa",
    emissiveIntensity: 0.55,
    roughness: 0.6,
  }),

  support: new MeshStandardMaterial({
    color: "#26323f",
    roughness: 0.5,
    metalness: 0.6,
    transparent: true,
  }),
  head: new MeshStandardMaterial({
    color: "#34455a",
    roughness: 0.9,
    transparent: true,
    opacity: 0.38,
    depthWrite: false,
  }),
  neck: new MeshStandardMaterial({
    color: "#34455a",
    roughness: 0.9,
    transparent: true,
    opacity: 0.18,
    depthWrite: false,
  }),
} as const satisfies Record<string, Material>;
