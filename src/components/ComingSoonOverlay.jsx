import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ComingSoonOverlay() {
  const [visible, setVisible] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleShow = () => {
      setVisible(true);
    };
    window.addEventListener('showComingSoon', handleShow);
    return () => window.removeEventListener('showComingSoon', handleShow);
  }, []);

  useEffect(() => {
    if (visible && overlayRef.current) {
      gsap.fromTo(overlayRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }
      );
    }
  }, [visible]);

  if (!visible) return null;

  const handleClose = () => {
    gsap.to(overlayRef.current, {
      opacity: 0, scale: 1.05, duration: 0.3, ease: 'power2.in',
      onComplete: () => setVisible(false)
    });
  };

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(10, 7, 4, 0.96)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 40,
      }}
    >
      <div style={{
        width: 80, height: 80, borderRadius: '50%',
        background: 'rgba(200,151,63,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 24, border: '1px solid rgba(200,151,63,0.3)',
      }}>
        <span style={{ fontSize: '2rem' }}>✒️</span>
      </div>

      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(3rem, 6vw, 5rem)',
        fontWeight: 900,
        color: 'var(--gold)',
        marginBottom: 16,
        textShadow: '0 4px 30px rgba(200,151,63,0.2)',
      }}>
        Coming Soon
      </h1>

      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
        color: 'var(--text-muted)',
        fontStyle: 'italic',
        maxWidth: 600,
        lineHeight: 1.6,
        marginBottom: 40,
      }}>
        The archivist is still writing the pages for this feature. 
        Please return soon to explore the depths of Arcana's full catalog.
      </p>

      <button
        onClick={handleClose}
        style={{
          padding: '14px 36px',
          background: 'transparent',
          border: '1px solid rgba(200,151,63,0.4)',
          color: '#EDE8DC',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.9rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          borderRadius: 2,
          cursor: 'none',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(200,151,63,0.15)';
          e.currentTarget.style.borderColor = '#C8973F';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
          e.currentTarget.style.borderColor = 'rgba(200,151,63,0.4)';
        }}
      >
        Return to Library
      </button>
    </div>
  );
}
