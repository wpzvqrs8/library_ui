import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/* ── ARCANA headline overlaid on the 3D canvas ── */
export default function HeroText() {
  const titleRef    = useRef(null);
  const subRef      = useRef(null);
  const scrollRef   = useRef(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const letters = titleRef.current.querySelectorAll('.hero-letter');

    const tl = gsap.timeline({ delay: 0.6 });

    // Stagger each letter in
    tl.fromTo(
      letters,
      { opacity: 0, scale: 0.78, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08,
      }
    )
    .fromTo(
      subRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo(
      scrollRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.1'
    );
  }, []);

  const title = 'ARCANA';

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 'var(--z-hero-text)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        userSelect: 'none',
        paddingTop: 72, // navbar height
      }}
    >
      {/* Eyebrow */}
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.72rem',
        letterSpacing: '0.35em',
        color: 'var(--gold)',
        textTransform: 'uppercase',
        marginBottom: 16,
        opacity: 0.8,
      }}>
        College Digital Library
      </p>

      {/* ARCANA — letter-by-letter */}
      <h1
        ref={titleRef}
        aria-label="ARCANA"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(72px, 12vw, 128px)',
          fontWeight: 900,
          letterSpacing: '0.18em',
          color: 'var(--text-primary)',
          marginBottom: 20,
          lineHeight: 1,
          display: 'flex',
          gap: '0.01em',
          textShadow: '0 0 80px rgba(200,151,63,0.2), 0 4px 40px rgba(0,0,0,0.8)',
        }}
      >
        {title.split('').map((char, i) => (
          <span
            key={i}
            className="hero-letter"
            style={{
              display: 'inline-block',
              opacity: 0,
              background: i % 2 === 0
                ? 'linear-gradient(180deg, #EDE8DC 0%, #B8A98A 100%)'
                : 'linear-gradient(180deg, #F0C060 0%, #C8973F 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {char}
          </span>
        ))}
      </h1>

      {/* Sub-headline */}
      <p
        ref={subRef}
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1rem, 2vw, 1.4rem)',
          color: 'var(--text-secondary)',
          fontStyle: 'italic',
          opacity: 0,
          letterSpacing: '0.04em',
          textShadow: '0 2px 20px rgba(0,0,0,0.8)',
          textAlign: 'center',
          padding: '0 20px',
        }}
      >
        Step inside a living, breathing library. 12,400 titles. Infinite knowledge.
      </p>

      {/* Scroll cue */}
      <div
        ref={scrollRef}
        style={{
          position: 'absolute',
          bottom: 36,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          opacity: 0,
        }}
      >
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.62rem',
          letterSpacing: '0.3em',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
        }}>
          Scroll to explore
        </span>
        <ScrollChevron />
      </div>
    </div>
  );
}

function ScrollChevron() {
  return (
    <svg
      width="20" height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#C8973F"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ animation: 'floatChevron 2s ease-in-out infinite' }}
    >
      <polyline points="6 9 12 15 18 9"/>
      <style>{`
        @keyframes floatChevron {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(5px); opacity: 1; }
        }
      `}</style>
    </svg>
  );
}
