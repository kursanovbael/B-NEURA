/**
 * Cinematic but restrained lighting: soft key, cool rim, violet fill and a low
 * hemisphere fill so dark surfaces stay readable against the dark background.
 * No HDR/environment files, so nothing is fetched at runtime.
 */
export function SceneEnvironment() {
  return (
    <>
      <color attach="background" args={["#05070a"]} />
      <hemisphereLight args={["#2d3f58", "#05070a", 0.9]} />
      <ambientLight intensity={0.25} />
      {/* key */}
      <directionalLight position={[3, 4, 4]} intensity={2.4} color="#f2f7ff" />
      {/* rim */}
      <directionalLight
        position={[-4, 2.5, -3.5]}
        intensity={3}
        color="#7fe9ff"
      />
      {/* fill */}
      <directionalLight
        position={[-3.5, -0.5, 2.5]}
        intensity={0.9}
        color="#a78bfa"
      />
    </>
  );
}
