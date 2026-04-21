import { useState, useRef, useEffect } from 'react';
import { useCursor } from '../context/CursorContext';

const FILTERS = ['Fiction', 'Science', 'History', 'Law', 'Engineering', 'Arts', 'Computer Science'];

/* ── Hero search bar + filter pills ── */
export default function SearchSection() {
  const [query, setQuery]       = useState('');
  const [activeFilter, setFilter] = useState(null);
  const [focused, setFocused]   = useState(false);
  const { setCursorHint }       = useCursor();
  const sectionRef              = useRef(null);

  return (
    <section
      id="search-section"
      ref={sectionRef}
      aria-label="Search the library"
      style={{
        position: 'relative',
        zIndex: 'var(--z-search)',
        marginTop: '-64px',
        padding: '0 clamp(20px, 5vw, 80px) 0',
      }}
    >
      <div style={{
        maxWidth: 820,
        margin: '0 auto',
        background: 'rgba(13,10,7,0.88)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(200,151,63,0.2)',
        borderTop: '2px solid #C8973F',
        borderRadius: 4,
        padding: 'clamp(20px, 4vw, 36px)',
        boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
      }}>
        {/* Search input */}
        <div style={{ position: 'relative', marginBottom: 20 }}>
          <span style={{
            position: 'absolute',
            left: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            color: focused ? '#C8973F' : '#8A7B65',
            transition: 'color 0.2s',
            display: 'flex',
            alignItems: 'center',
          }}>
            <MagnifyIcon />
          </span>
          <input
            id="search-input"
            type="search"
            aria-label="Search by title, author, or subject"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search by title, author, subject…"
            style={{
              width: '100%',
              background: 'rgba(237, 232, 220, 0.06)',
              border: `1px solid ${focused ? 'rgba(200,151,63,0.6)' : 'rgba(200,151,63,0.15)'}`,
              borderRadius: 2,
              padding: '14px 16px 14px 48px',
              fontFamily: 'var(--font-body)',
              fontStyle: 'italic',
              fontSize: '1.05rem',
              color: 'var(--text-primary)',
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              boxShadow: focused
                ? '0 0 0 3px rgba(200,151,63,0.15), 0 8px 30px rgba(200,151,63,0.1)'
                : 'none',
            }}
          />
          {query && (
            <button
              aria-label="Clear search"
              onClick={() => setQuery('')}
              style={{
                position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', color: 'var(--text-muted)',
                cursor: 'none', fontSize: '1rem', lineHeight: 1,
              }}
              onMouseEnter={() => setCursorHint('cta')}
              onMouseLeave={() => setCursorHint('default')}
            >
              ×
            </button>
          )}
        </div>

        {/* Filter pills */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          alignItems: 'center',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            letterSpacing: '0.12em',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            marginRight: 4,
            flexShrink: 0,
          }}>
            Browse:
          </span>
          {FILTERS.map(f => (
            <button
              key={f}
              aria-pressed={activeFilter === f}
              className={`pill${activeFilter === f ? ' active' : ''}`}
              onClick={() => setFilter(activeFilter === f ? null : f)}
              onMouseEnter={() => setCursorHint('cta')}
              onMouseLeave={() => setCursorHint('default')}
              style={{ cursor: 'none' }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function MagnifyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7"/>
      <path d="M21 21l-4.35-4.35"/>
    </svg>
  );
}
