import { HELMET_GEOMETRY as G } from "./HelmetGeometry";
import { HELMET_MATERIALS as M } from "./HelmetMaterials";
import type { HelmetLayerProps } from "./types";

/** Structural ring, crown arches and standoff posts holding the layers in place. */
export function InternalSupport({ visible = true, ref }: HelmetLayerProps) {
  return (
    <group name="internal-support" ref={ref} visible={visible}>
      <mesh geometry={G.supportRing} material={M.support} />
      <mesh geometry={G.supportArchX} material={M.support} />
      <mesh geometry={G.supportArchZ} material={M.support} />
      {G.supportPosts.map(({ position, quaternion, length }, i) => (
        <mesh
          key={i}
          geometry={G.supportPost}
          material={M.support}
          position={position}
          quaternion={quaternion}
          scale={[1, length, 1]}
        />
      ))}
    </group>
  );
}
