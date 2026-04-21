import { useRef, useState } from 'react';
import { FEATURED } from '../data/books';
import { useCursor } from '../context/CursorContext';
import SectionHeader from './SectionHeader';

/* ── Horizontal drag-scroll featured book carousel ── */
export default function FeaturedBooks() {
  const trackRef   = useRef(null);
  const isDragging = useRef(false);
  const startX     = useRef(0);
  const scrollLeft = useRef(0);
  const { setCursorHint } = useCursor();

  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current     = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = 'grabbing';
  };
  const onMouseLeave = () => { isDragging.current = false; if (trackRef.current) trackRef.current.style.cursor = 'none'; };
  const onMouseUp    = () => { isDragging.current = false; if (trackRef.current) trackRef.current.style.cursor = 'none'; };
  const onMouseMove  = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x     = e.pageX - trackRef.current.offsetLeft;
    const walk  = (x - startX.current) * 1.4;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <section id="featured-books" className="section" aria-label="Featured Books">
      <div className="container">
        <SectionHeader
          title="Featured This Month"
          subtitle="Curated selections from across our departments"
        />
      </div>

      <div
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setCursorHint('cta')}
        style={{
          display: 'flex',
          gap: 24,
          overflowX: 'auto',
          padding: '0 clamp(20px, 5vw, 80px) 20px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          cursor: 'none',
          userSelect: 'none',
        }}
      >
        <style>{`.featured-track::-webkit-scrollbar { display: none; }`}</style>
        {FEATURED.map((book, i) => (
          <FeaturedCard key={i} book={book} setCursorHint={setCursorHint} />
        ))}
      </div>
    </section>
  );
}

function FeaturedCard({ book, setCursorHint }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => { setHovered(true);  setCursorHint('cta'); }}
      onMouseLeave={() => { setHovered(false); setCursorHint('default'); }}
      style={{
        flexShrink: 0,
        width: 220,
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? 'rgba(200,151,63,0.4)' : 'rgba(200,151,63,0.12)'}`,
        borderRadius: 4,
        overflow: 'hidden',
        transition: 'transform 0.28s ease, box-shadow 0.28s ease, border-color 0.2s',
        transform: hovered ? 'translateY(-10px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 24px 60px rgba(0,0,0,0.5), 0 0 30px rgba(200,151,63,0.12)'
          : '0 4px 20px rgba(0,0,0,0.3)',
        cursor: 'none',
      }}
    >
      {/* Cover */}
      <div style={{
        height: 160,
        background: `linear-gradient(135deg, ${book.color} 0%, ${lighten(book.color, 30)} 100%)`,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {/* Decorative lines on cover */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.15 }}>
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              top: `${i * 13}%`,
              left: 12, right: 12,
              height: 1,
              background: '#C8973F',
            }} />
          ))}
        </div>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.72rem',
          fontWeight: 700,
          color: 'rgba(237,232,220,0.9)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          textAlign: 'center',
          padding: '0 16px',
          position: 'relative',
          textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          lineHeight: 1.4,
        }}>
          {book.title}
        </span>

        {/* Status badge */}
        <span style={{
          position: 'absolute',
          top: 10, right: 10,
          background: book.available ? 'rgba(52,168,83,0.85)' : 'rgba(200,151,63,0.85)',
          color: '#fff',
          fontSize: '0.58rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          padding: '3px 8px',
          borderRadius: 12,
          fontFamily: 'var(--font-mono)',
          backdropFilter: 'blur(4px)',
        }}>
          {book.available ? `${book.copies} Available` : 'Checked Out'}
        </span>
      </div>

      {/* Info */}
      <div style={{ padding: 16 }}>
        <h3 style={{ fontSize: '0.88rem', marginBottom: 4, lineHeight: 1.3, letterSpacing: '0.01em' }}>
          {book.title}
        </h3>
        <p style={{ fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--text-muted)', marginBottom: 10 }}>
          {book.author}
        </p>
        <span className="pill" style={{ fontSize: '0.65rem', padding: '3px 10px' }}>
          {book.category}
        </span>
      </div>
    </article>
  );
}

function lighten(hex, amount) {
  const num = parseInt(hex.replace('#',''), 16);
  const r = Math.min(255, (num >> 16) + amount);
  const g = Math.min(255, ((num >> 8) & 0xff) + amount);
  const b = Math.min(255, (num & 0xff) + amount);
  return `#${((r<<16)|(g<<8)|b).toString(16).padStart(6,'0')}`;
}
