import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursor } from '../context/CursorContext';

/* ── Login / Auth Modal ── */
export default function LoginModal({ isOpen, onClose, onLogin }) {
  const [tab, setTab]           = useState('student');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const { setCursorHint }       = useCursor();

  const handleLogin = async () => {
    if (!email || !password) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    const initial = email.charAt(0).toUpperCase();
    setLoading(false);
    onLogin({ initial, email, role: tab });
    onClose();
    setEmail('');
    setPassword('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.75)',
              backdropFilter: 'blur(8px)',
              zIndex: 'calc(var(--z-modal) - 1)',
            }}
          />

          {/* Modal Panel */}
          <motion.div
            key="modal-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Login to ARCANA"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 'var(--z-modal)',
              width: 'min(420px, 92vw)',
              background: 'rgba(13, 10, 7, 0.97)',
              border: '1px solid rgba(200,151,63,0.25)',
              borderTop: '2px solid #C8973F',
              borderRadius: 4,
              padding: '36px 32px 32px',
              boxShadow: '0 40px 120px rgba(0,0,0,0.9), 0 0 60px rgba(200,151,63,0.08)',
            }}
          >
            {/* Close */}
            <button
              aria-label="Close login modal"
              onClick={onClose}
              onMouseEnter={() => setCursorHint('cta')}
              onMouseLeave={() => setCursorHint('default')}
              style={{
                position: 'absolute', top: 14, right: 16,
                background: 'none', border: 'none',
                color: 'var(--text-muted)', fontSize: '1.3rem',
                cursor: 'none', lineHeight: 1,
                transition: 'color 0.15s',
              }}
            >
              ×
            </button>

            {/* Heading */}
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: '1.6rem', letterSpacing: '0.05em', marginBottom: 6 }}>
                Welcome Back
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                Sign in to access the full ARCANA catalog
              </p>
            </div>

            {/* Tabs */}
            <div style={{
              display: 'flex',
              gap: 0,
              marginBottom: 24,
              borderBottom: '1px solid rgba(200,151,63,0.15)',
            }}>
              {['student', 'staff'].map(t => (
                <button
                  key={t}
                  aria-selected={tab === t}
                  onClick={() => setTab(t)}
                  onMouseEnter={() => setCursorHint('cta')}
                  onMouseLeave={() => setCursorHint('default')}
                  style={{
                    flex: 1,
                    background: 'none',
                    border: 'none',
                    borderBottom: tab === t ? '2px solid #C8973F' : '2px solid transparent',
                    padding: '10px 0',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.85rem',
                    letterSpacing: '0.08em',
                    textTransform: 'capitalize',
                    color: tab === t ? 'var(--gold)' : 'var(--text-muted)',
                    cursor: 'none',
                    transition: 'color 0.2s, border-color 0.2s',
                    marginBottom: -1,
                  }}
                >
                  {t === 'student' ? '🎓 Student' : '👨‍🏫 Staff'}
                </button>
              ))}
            </div>

            {/* Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: '0.78rem', letterSpacing: '0.08em', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-display)' }}>
                  College Email
                </span>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={tab === 'student' ? 'student@college.ac.in' : 'faculty@college.ac.in'}
                  style={inputStyle}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                />
              </label>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: '0.78rem', letterSpacing: '0.08em', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-display)' }}>
                  Password
                </span>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={inputStyle}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                />
              </label>
            </div>

            {/* Login Button */}
            <button
              id="login-submit-btn"
              className="btn-primary"
              onClick={handleLogin}
              disabled={loading}
              onMouseEnter={() => setCursorHint('cta')}
              onMouseLeave={() => setCursorHint('default')}
              style={{
                width: '100%',
                justifyContent: 'center',
                padding: '13px',
                fontSize: '0.85rem',
                opacity: loading ? 0.8 : 1,
              }}
            >
              {loading ? (
                <>
                  <span className="spinner" style={{ borderColor: 'rgba(0,0,0,0.2)', borderTopColor: '#0D0A07' }} />
                  Authenticating…
                </>
              ) : (
                'Enter the Library →'
              )}
            </button>

            {/* Forgot */}
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <a
                href="#"
                style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}
                onMouseEnter={() => setCursorHint('cta')}
                onMouseLeave={() => setCursorHint('default')}
              >
                Forgot password?
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

const inputStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(200,151,63,0.2)',
  borderRadius: 2,
  padding: '11px 14px',
  color: 'var(--text-primary)',
  fontFamily: 'var(--font-body)',
  fontSize: '0.95rem',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  width: '100%',
};
