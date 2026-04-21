import { useEffect, useRef } from 'react';
import { useCursor } from '../context/CursorContext';

/* ── Custom golden-book cursor + trailing dot ── */
export default function CustomCursor() {
  const cursorRef  = useRef(null);
  const trailRef   = useRef(null);
  const posRef     = useRef({ x: -100, y: -100 });
  const trailPos   = useRef({ x: -100, y: -100 });
  const rafRef     = useRef(null);
  const { cursorHint } = useCursor();

  useEffect(() => {
    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', onMove);

    const tick = () => {
      const { x, y } = posRef.current;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }

      // Lerp trail toward cursor with ~120ms lag
      trailPos.current.x += (x - trailPos.current.x) * 0.12;
      trailPos.current.y += (y - trailPos.current.y) * 0.12;

      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trailPos.current.x}px, ${trailPos.current.y}px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const isBook = cursorHint === 'book';
  const isCta  = cursorHint === 'cta';

  const cursorSize = isBook ? 38 : 22;
  const glow = isBook ? '0 0 20px rgba(200,151,63,0.7), 0 0 40px rgba(200,151,63,0.4)' : 'none';

  return (
    <>
      {/* Main book cursor */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: cursorSize,
          height: cursorSize,
          marginLeft: -cursorSize / 2,
          marginTop: -cursorSize / 2,
          pointerEvents: 'none',
          zIndex: 999999,
          transition: 'width 0.2s ease, height 0.2s ease, filter 0.2s ease',
          filter: isBook ? 'drop-shadow(0 0 8px rgba(200,151,63,0.9))' : 'none',
          willChange: 'transform',
        }}
      >
        {isCta ? (
          /* Arrow for CTA buttons */
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
            <path d="M5 12h14M13 6l6 6-6 6" stroke="#C8973F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          /* Open book SVG — rotated 15deg */
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', height: '100%', transform: 'rotate(15deg)' }}
          >
            {/* Left page */}
            <path
              d="M16 8 C12 6 6 6 4 8 L4 24 C6 22 12 22 16 24 Z"
              fill="#C8973F"
              fillOpacity="0.9"
            />
            {/* Right page */}
            <path
              d="M16 8 C20 6 26 6 28 8 L28 24 C26 22 20 22 16 24 Z"
              fill="#F0C060"
              fillOpacity="0.9"
            />
            {/* Spine line */}
            <line x1="16" y1="8" x2="16" y2="24" stroke="#8A6020" strokeWidth="1" />
            {/* Lines on left page */}
            <line x1="7"  y1="13" x2="14" y2="12" stroke="#8A6020" strokeWidth="0.8" strokeOpacity="0.6"/>
            <line x1="7"  y1="16" x2="14" y2="15" stroke="#8A6020" strokeWidth="0.8" strokeOpacity="0.6"/>
            <line x1="7"  y1="19" x2="14" y2="18" stroke="#8A6020" strokeWidth="0.8" strokeOpacity="0.6"/>
            {/* Lines on right page */}
            <line x1="18" y1="12" x2="25" y2="13" stroke="#8A6020" strokeWidth="0.8" strokeOpacity="0.6"/>
            <line x1="18" y1="15" x2="25" y2="16" stroke="#8A6020" strokeWidth="0.8" strokeOpacity="0.6"/>
            <line x1="18" y1="18" x2="25" y2="19" stroke="#8A6020" strokeWidth="0.8" strokeOpacity="0.6"/>
          </svg>
        )}
      </div>

      {/* Trailing dot */}
      <div
        ref={trailRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          marginLeft: -4,
          marginTop: -4,
          borderRadius: '50%',
          background: 'rgba(200, 151, 63, 0.5)',
          pointerEvents: 'none',
          zIndex: 999998,
          willChange: 'transform',
          boxShadow: glow,
        }}
      />
    </>
  );
}
