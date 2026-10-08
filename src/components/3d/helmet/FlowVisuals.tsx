import { useMemo } from "react";
import { Quaternion, TubeGeometry, Vector3 } from "three";
import { FLOW_ANCHORS, FLOW_CURVES, FLOW_PATH_KIND } from "../flowPaths";
import { ARROW_MATERIALS, FLOW_MATERIALS } from "./flowMaterials";
import { VirtualHand } from "./VirtualHand";

const TUBULAR_SEGMENTS = 64;
const RADIAL_SEGMENTS = 6;
/** Indices per tubular segment, used to draw a tube only part of the way. */
export const INDICES_PER_SEGMENT = RADIAL_SEGMENTS * 6;
export { TUBULAR_SEGMENTS };

const UP = new Vector3(0, 1, 0);

const ACTIVE_MATERIAL = {
  signal: FLOW_MATERIALS.signal,
  intention: FLOW_MATERIALS.intention,
  feedback: FLOW_MATERIALS.feedback,
} as const;
/**
 * The route of one simulated intention, drawn through the helmet's own parts:
 * a thin rail for each segment (so the direction is readable before anything
 * moves), a bright line that is drawn along it as the signal travels, an
 * arrowhead at the end of each segment, a small pulse, the virtual hand and a
 * ring that stands for the virtual target. Everything is hidden until the
 * flow chapter; the frame loop sets visibility, draw ranges and opacities.
 */
export function FlowVisuals() {
  const parts = useMemo(
    () =>
      FLOW_CURVES.map((curve) => {
        const end = curve.getPointAt(1);
        const tangent = curve.getTangentAt(1).normalize();
        return {
          rail: new TubeGeometry(
            curve,
            TUBULAR_SEGMENTS,
            0.004,
            RADIAL_SEGMENTS,
            false,
          ),
          active: new TubeGeometry(
            curve,
            TUBULAR_SEGMENTS,
            0.012,
            RADIAL_SEGMENTS,
            false,
          ),
          arrowAt: end.clone().addScaledVector(tangent, -0.04),
          arrowTurn: new Quaternion().setFromUnitVectors(UP, tangent),
        };
      }),
    [],
  );

  return (
    <group name="flow-visuals" visible={false}>
      {parts.map((part, i) => (
        <group key={i}>
          <mesh geometry={part.rail} material={FLOW_MATERIALS.rail} />
          <mesh
            name={`flow-active-${i}`}
            geometry={part.active}
            material={ACTIVE_MATERIAL[FLOW_PATH_KIND[i]]}
          />
          <mesh
            name={`flow-arrow-${i}`}
            position={part.arrowAt}
            quaternion={part.arrowTurn}
            material={ARROW_MATERIALS[i]}
          >
            <coneGeometry args={[0.035, 0.1, 10]} />
          </mesh>
        </group>
      ))}

      <mesh name="flow-pulse" material={FLOW_MATERIALS.pulse}>
        <sphereGeometry args={[0.05, 14, 10]} />
      </mesh>

      <mesh
        name="flow-target"
        position={FLOW_ANCHORS.target}
        material={FLOW_MATERIALS.target}
      >
        <torusGeometry args={[0.2, 0.008, 8, 48]} />
      </mesh>

      <mesh
        name="flow-decoder-ring"
        position={FLOW_ANCHORS.decoder}
        material={FLOW_MATERIALS.decoderRing}
      >
        <torusGeometry args={[0.17, 0.006, 8, 40]} />
      </mesh>

      <VirtualHand />
    </group>
  );
}
