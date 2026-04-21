/* ── Warm candle-tone lighting for the bookshelf scene ── */
export default function AmbientLighting() {
  return (
    <>
      {/* Soft dark ambient so nothing is pitch black */}
      <ambientLight color="#3A2A10" intensity={0.6} />

      {/* Main hanging lamp — warm, casts shadows */}
      <pointLight
        position={[-3, 5, 5]}
        color="#FFA040"
        intensity={2.5}
        distance={20}
        decay={2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.001}
      />

      {/* Secondary fill from front-right, cooler */}
      <pointLight
        position={[4, 2, 7]}
        color="#FFD080"
        intensity={1.0}
        distance={15}
        decay={2}
      />

      {/* Subtle blue-cool rim from far right — creates depth on spines */}
      <directionalLight
        position={[8, 3, -2]}
        color="#A0B0C0"
        intensity={0.25}
      />

      {/* Very soft ground bounce — warms the shelf bottom */}
      <pointLight
        position={[0, -4, 3]}
        color="#C8973F"
        intensity={0.4}
        distance={10}
        decay={2}
      />
    </>
  );
}
