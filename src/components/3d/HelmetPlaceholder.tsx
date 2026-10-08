"use client";

import { useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { DoubleSide, type Group, type MeshStandardMaterial } from "three";
import { smoothstep } from "./experience";
import { HELMET_LAYERS } from "./helmetLayers";
import type { HelmetLayerId } from "./types";

type HelmetPlaceholderProps = {
  progress: number;
  reducedMotion: boolean;
};

const SENSOR_ANGLES = Array.from(
  { length: 12 },
  (_, i) => (i / 12) * Math.PI * 2,
);
const SUPPORT_ANGLES = [0, 1, 2].map((i) => (i / 3) * Math.PI * 2);
const AUTO_ROTATE_SPEED = 0.18; // rad/s

/**
 * Procedural placeholder built from simple geometry. Exists to prove the
 * 3D stack, transforms and progress mapping; it is not the final helmet.
 */
export function HelmetPlaceholder({
  progress,
  reducedMotion,
}: HelmetPlaceholderProps) {
  const root = useRef<Group>(null);
  const layerRefs: Record<HelmetLayerId, RefObject<Group | null>> = {
    "outer-shell": useRef<Group>(null),
    "neural-signal-acquisition": useRef<Group>(null),
    "conceptual-ai-decoder": useRef<Group>(null),
    "feedback-interface": useRef<Group>(null),
    "internal-support": useRef<Group>(null),
    "user-head-position": useRef<Group>(null),
  };
  const shellMaterial = useRef<MeshStandardMaterial>(null);

  useFrame((_, delta) => {
    const eased = smoothstep(progress);

    if (root.current && !reducedMotion) {
      root.current.rotation.y += delta * AUTO_ROTATE_SPEED;
    }

    for (const layer of HELMET_LAYERS) {
      layerRefs[layer.id].current?.position.set(
        layer.explodeOffset[0] * eased,
        layer.explodeOffset[1] * eased,
        layer.explodeOffset[2] * eased,
      );
    }

    // Shell becomes more transparent as progress increases.
    if (shellMaterial.current) {
      shellMaterial.current.opacity = 0.9 - 0.6 * eased;
    }
  });

  return (
    <group ref={root} position={[0, -0.1, 0]}>
      <group ref={layerRefs["outer-shell"]}>
        <mesh>
          <sphereGeometry
            args={[1, 40, 24, 0, Math.PI * 2, 0, Math.PI * 0.62]}
          />
          <meshStandardMaterial
            ref={shellMaterial}
            color="#2a3f55"
            metalness={0.35}
            roughness={0.4}
            transparent
            side={DoubleSide}
          />
        </mesh>
      </group>

      <group ref={layerRefs["neural-signal-acquisition"]}>
        {SENSOR_ANGLES.map((angle) => (
          <mesh
            key={angle}
            position={[Math.cos(angle) * 0.86, 0.35, Math.sin(angle) * 0.86]}
          >
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial
              color="#0b1017"
              emissive="#22d3ee"
              emissiveIntensity={0.9}
            />
          </mesh>
        ))}
      </group>

      <group ref={layerRefs["conceptual-ai-decoder"]}>
        <mesh position={[0, 0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.8, 0.03, 12, 64]} />
          <meshStandardMaterial
            color="#0b1017"
            emissive="#a78bfa"
            emissiveIntensity={0.7}
          />
        </mesh>
        {[-0.5, 0, 0.5].map((x) => (
          <mesh key={x} position={[x, 0.15, -0.76]}>
            <boxGeometry args={[0.28, 0.14, 0.08]} />
            <meshStandardMaterial
              color="#172230"
              metalness={0.5}
              roughness={0.5}
            />
          </mesh>
        ))}
      </group>

      <group ref={layerRefs["feedback-interface"]}>
        <mesh position={[0, -0.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.76, 0.025, 12, 64]} />
          <meshStandardMaterial
            color="#0b1017"
            emissive="#22d3ee"
            emissiveIntensity={0.35}
          />
        </mesh>
      </group>

      <group ref={layerRefs["internal-support"]}>
        {SUPPORT_ANGLES.map((angle) => (
          <mesh
            key={angle}
            position={[Math.cos(angle) * 0.68, 0.05, Math.sin(angle) * 0.68]}
          >
            <boxGeometry args={[0.04, 0.6, 0.04]} />
            <meshStandardMaterial
              color="#223142"
              metalness={0.5}
              roughness={0.5}
            />
          </mesh>
        ))}
      </group>

      <group ref={layerRefs["user-head-position"]}>
        <mesh position={[0, 0.05, 0]}>
          <sphereGeometry args={[0.58, 24, 16]} />
          <meshStandardMaterial
            color="#1a2433"
            roughness={0.9}
            transparent
            opacity={0.55}
          />
        </mesh>
      </group>
    </group>
  );
}
