import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';

const COUNT = 200;
const noise3D = createNoise3D();

/* ── 200 gold dust motes drifting upward with simplex noise ── */
export default function DustParticles() {
  const meshRef = useRef();
  const dummy   = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() =>
    Array.from({ length: COUNT }, () => ({
      x:       (Math.random() - 0.5) * 14,
      baseY:   (Math.random() - 0.5) * 5,
      z:       (Math.random() - 0.5) * 3,
      speed:   0.0006 + Math.random() * 0.0012,
      offset:  Math.random() * 1000,
      scale:   0.5 + Math.random() * 1.0,
    })), []
  );

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    particles.forEach((p, i) => {
      const nx = noise3D(p.x * 0.08, p.baseY * 0.08, t * 0.08 + p.offset) * 0.6;
      const ny = noise3D(p.x * 0.08 + 50, p.baseY * 0.08, t * 0.06 + p.offset) * 0.3;

      // Drift upward, wrap at top
      const drift = ((t * p.speed * 60 + p.offset * 0.01) % 5) - 2.5;

      dummy.position.set(p.x + nx, p.baseY + drift + ny, p.z);
      dummy.scale.setScalar(p.scale * 0.008);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshStandardMaterial
        color="#C8973F"
        emissive="#C8973F"
        emissiveIntensity={1.2}
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </instancedMesh>
  );
}
