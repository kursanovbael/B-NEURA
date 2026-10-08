import { FLOW_ANCHORS, HAND } from "../flowPaths";
import { FLOW_MATERIALS } from "./flowMaterials";

/** Finger placement across the palm (local z) and the two segment lengths. */
const FINGERS = [
  { z: -0.075, near: 0.09, far: 0.065 },
  { z: -0.025, near: 0.105, far: 0.075 },
  { z: 0.025, near: 0.1, far: 0.07 },
  { z: 0.075, near: 0.08, far: 0.055 },
] as const;

const FOREARM = 0.45;
const PALM = 0.2;
const PALM_WIDTH = 0.2;
const FINGER_RADIUS = 0.019;
/** Rolls the hand so its palm faces the viewer and the fingers spread upward. */
const ROLL = -1.25;

/** A capsule lying along local +x, starting at x = 0. */
function Segment({ length, radius }: { length: number; radius: number }) {
  return (
    <mesh
      position={[length / 2, 0, 0]}
      rotation={[0, 0, Math.PI / 2]}
      material={FLOW_MATERIALS.hand}
    >
      <capsuleGeometry
        args={[radius, Math.max(length - 2 * radius, 0.001), 4, 10]}
      />
    </mesh>
  );
}

/**
 * A minimal virtual hand and forearm: tapered forearm, a flat palm, four
 * two-segment fingers and a two-segment thumb, in one neutral warm white.
 * It pivots at the wrist; the frame loop rotates the finger groups to curl
 * and open them. Neutral and technical: no skin, no avatar.
 */
export function VirtualHand() {
  return (
    <group
      name="virtual-hand"
      position={[HAND.pivot.x, HAND.pivot.y, HAND.pivot.z]}
      rotation={[0, 0, HAND.restAngle]}
    >
      <group rotation={[ROLL, 0, 0]}>
        <mesh
          position={[FOREARM / 2, 0, 0]}
          rotation={[0, 0, -Math.PI / 2]}
          material={FLOW_MATERIALS.hand}
        >
          <cylinderGeometry args={[0.04, 0.062, FOREARM, 20]} />
        </mesh>
        <mesh
          position={[FOREARM + PALM / 2, 0, 0]}
          material={FLOW_MATERIALS.hand}
        >
          <boxGeometry args={[PALM, 0.04, PALM_WIDTH]} />
        </mesh>
        {FINGERS.map((finger) => (
          <group
            key={finger.z}
            name="hand-finger"
            position={[FOREARM + PALM, 0, finger.z]}
          >
            <Segment length={finger.near} radius={FINGER_RADIUS} />
            <group name="hand-tip" position={[finger.near, 0, 0]}>
              <Segment length={finger.far} radius={FINGER_RADIUS * 0.9} />
            </group>
          </group>
        ))}
        <group
          name="hand-thumb"
          position={[FOREARM + 0.03, 0, 0.1]}
          rotation={[0, -0.7, 0]}
        >
          <Segment length={0.075} radius={0.022} />
          <group position={[0.075, 0, 0]}>
            <Segment length={0.06} radius={0.02} />
          </group>
        </group>
      </group>
    </group>
  );
}

/**
 * The minimal body reference behind the hand: elbow, upper arm, shoulder and a
 * thin torso plate. Static; only the forearm and hand move. It stands for a
 * body in the simulation and is deliberately plain.
 */
export function VirtualArm() {
  const pivot = HAND.pivot;
  const shoulder = FLOW_ANCHORS.shoulder;
  const length = pivot.y - shoulder.y;
  return (
    <group name="virtual-arm">
      <mesh
        position={[pivot.x, pivot.y, pivot.z]}
        material={FLOW_MATERIALS.body}
      >
        <sphereGeometry args={[0.065, 16, 12]} />
      </mesh>
      <mesh
        position={[pivot.x, pivot.y - length / 2, pivot.z]}
        material={FLOW_MATERIALS.body}
      >
        <cylinderGeometry args={[0.05, 0.062, length, 16]} />
      </mesh>
      <mesh
        position={[shoulder.x, shoulder.y, shoulder.z]}
        material={FLOW_MATERIALS.body}
      >
        <sphereGeometry args={[0.085, 16, 12]} />
      </mesh>
      <mesh
        position={[shoulder.x + 0.14, shoulder.y - 0.22, shoulder.z - 0.04]}
        material={FLOW_MATERIALS.body}
      >
        <boxGeometry args={[0.3, 0.6, 0.04]} />
      </mesh>
    </group>
  );
}
