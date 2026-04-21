import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursor } from '../context/CursorContext';

/* ── Floating glass navigation bar ── */
export default function Navbar({ onLoginOpen, user, onLogout }) {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const { setCursorHint }           = useCursor();
  const navRef                      = useRef(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = ['Browse', 'Reading Room', 'My Shelf', 'About'];

  return (
    <motion.nav
      ref={navRef}
      aria-label="Main navigation"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 'var(--z-nav)',
        height: 72,
        display: 'flex',
        alignItems: 'center',
        padding: '0 clamp(20px, 5vw, 60px)',
        background: scrolled
          ? 'rgba(13, 10, 7, 0.92)'
          : 'rgba(13, 10, 7, 0.6)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: scrolled
          ? '1px solid rgba(200, 151, 63, 0.3)'
          : '1px solid transparent',
        transition: 'background 0.4s ease, border-color 0.4s ease',
      }}
    >
      {/* Logo */}
      <a
        href="#"
        aria-label="ARCANA home"
        style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}
        onMouseEnter={() => setCursorHint('cta')}
        onMouseLeave={() => setCursorHint('default')}
      >
        <BookSVG />
        <span style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '1.15rem',
          letterSpacing: '0.22em',
          color: 'var(--text-primary)',
          textTransform: 'uppercase',
        }}>
          Arcana
        </span>
      </a>

      {/* Center Links — desktop */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(20px, 3vw, 40px)',
        margin: '0 auto',
      }}
        className="nav-links-desktop"
      >
        {links.map((link) => (
          <NavLink key={link} label={link} setCursorHint={setCursorHint} />
        ))}
      </div>

      {/* Right — search + avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Search icon */}
        <button
          aria-label="Search library"
          onClick={() => document.getElementById('search-input')?.focus()}
          onMouseEnter={() => setCursorHint('cta')}
          onMouseLeave={() => setCursorHint('default')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            fontSize: '1.1rem',
            padding: 6,
            cursor: 'none',
            transition: 'color 0.15s',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <SearchIcon />
        </button>

        {/* Avatar / Login */}
        {user ? (
          <button
            aria-label="Account menu — click to logout"
            onClick={onLogout}
            onMouseEnter={() => setCursorHint('cta')}
            onMouseLeave={() => setCursorHint('default')}
            title="Click to logout"
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'var(--gold)',
              color: 'var(--bg-base)',
              border: 'none',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.15s, box-shadow 0.15s',
              boxShadow: '0 0 16px rgba(200,151,63,0.4)',
            }}
          >
            {user.initial}
          </button>
        ) : (
          <button
            id="nav-login-btn"
            aria-label="Login to your account"
            className="btn-primary"
            onClick={onLoginOpen}
            onMouseEnter={() => setCursorHint('cta')}
            onMouseLeave={() => setCursorHint('default')}
            style={{ padding: '8px 20px', fontSize: '0.78rem' }}
          >
            Login
          </button>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
        }
      `}</style>
    </motion.nav>
  );
}

function NavLink({ label, setCursorHint }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="#"
      onMouseEnter={() => { setHovered(true);  setCursorHint('cta'); }}
      onMouseLeave={() => { setHovered(false); setCursorHint('default'); }}
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: '0.82rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: hovered ? 'var(--gold-light)' : 'var(--text-secondary)',
        textDecoration: 'none',
        transition: 'color 0.15s',
        position: 'relative',
        paddingBottom: 2,
      }}
    >
      {label}
      <span style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: hovered ? '100%' : '0%',
        height: 1,
        background: 'var(--gold)',
        transition: 'width 0.25s ease',
        display: 'block',
      }} />
    </a>
  );
}

function BookSVG() {
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 6 C12 4 6 4 4 6 L4 26 C6 24 12 24 16 26 Z" fill="#C8973F" fillOpacity="0.85"/>
      <path d="M16 6 C20 4 26 4 28 6 L28 26 C26 24 20 24 16 26 Z" fill="#F0C060" fillOpacity="0.85"/>
      <line x1="16" y1="6" x2="16" y2="26" stroke="#8A6020" strokeWidth="1"/>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7"/>
      <path d="M21 21l-4.35-4.35"/>
    </svg>
  );
}
