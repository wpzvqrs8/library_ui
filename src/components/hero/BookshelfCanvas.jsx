import { useRef, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import gsap from 'gsap';
import { BOOKS } from '../../data/books';
import ShelfGeometry from './ShelfGeometry';
import BookMesh from './BookMesh';
import AmbientLighting from './AmbientLighting';
import DustParticles from './DustParticles';

/* ── Camera parallax driven by mouse ── */
function CameraRig() {
  const { camera } = useThree();
  const mouse       = useRef({ x: 0, y: 0 });
  const target      = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const quickX = gsap.quickTo(target.current, 'x', { duration: 0.8, ease: 'power2.out' });
    const quickY = gsap.quickTo(target.current, 'y', { duration: 0.8, ease: 'power2.out' });

    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
      quickX(mouse.current.x);
      quickY(mouse.current.y);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(() => {
    // ±3deg parallax tilt
    camera.rotation.y = target.current.x * -0.052; // ~3deg
    camera.rotation.x = target.current.y *  0.035; // ~2deg
  });

  return null;
}

/* ── Book layout: 3 rows of 10 ── */
function BooksScene() {
  // Row 1 (top shelf)  
  // Row 2 (middle shelf)
  // Row 3 (bottom shelf)
  const rowY   = [1.28, -0.54, -2.34];
  const startX = -5.85;
  const spacingX = 1.3;

  return (
    <>
      {BOOKS.map((book, idx) => {
        const row  = Math.floor(idx / 10);
        const col  = idx % 10;
        const x    = startX + col * spacingX + (col * book.id * 0.004);
        const y    = rowY[row];
        return (
          <BookMesh
            key={book.id}
            book={book}
            position={[x, y, 0]}
          />
        );
      })}
    </>
  );
}

/* ── Main R3F Canvas ── */
export default function BookshelfCanvas() {
  return (
    <div
      id="bookshelf-canvas"
      aria-label="Interactive 3D bookshelf"
      role="img"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 58 }}
        shadows
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <CameraRig />
        <AmbientLighting />
        <ShelfGeometry />
        <BooksScene />
        <DustParticles />
        <Preload all />
      </Canvas>
    </div>
  );
}
