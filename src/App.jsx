import { useState, Suspense } from 'react';
import { CursorProvider } from './context/CursorContext';
import CustomCursor from './components/CustomCursor';
import SmoothScroll from './components/SmoothScroll';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import LoginModal from './components/LoginModal';
import BookshelfCanvas from './components/hero/BookshelfCanvas';
import HeroText from './components/hero/HeroText';
import SearchSection from './components/SearchSection';
import FeaturedBooks from './components/FeaturedBooks';
import CategoriesSection from './components/CategoriesSection';
import StatsBanner from './components/StatsBanner';
import HowItWorks from './components/HowItWorks';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';
import ComingSoonOverlay from './components/ComingSoonOverlay';

/* ── 3D Canvas load fallback ── */
function CanvasFallback() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(ellipse at center, rgba(200,151,63,0.06) 0%, transparent 70%)',
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.72rem',
        letterSpacing: '0.25em',
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
      }}>
        Loading library…
      </div>
    </div>
  );
}

export default function App() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser]           = useState(null);

  const handleLogin  = (u) => setUser(u);
  const handleLogout = () => setUser(null);

  return (
    <CursorProvider>
      <SmoothScroll>
        {/* ── Global overlays ── */}
        <div className="noise-overlay" aria-hidden="true" />
        <CustomCursor />
        <ScrollProgress />

        {/* ── Navigation ── */}
        <Navbar
          onLoginOpen={() => setLoginOpen(true)}
          user={user}
          onLogout={handleLogout}
        />

        {/* ── Auth Modal ── */}
        <LoginModal
          isOpen={loginOpen}
          onClose={() => setLoginOpen(false)}
          onLogin={handleLogin}
        />

        {/* ── Hero: 3D Bookshelf ── */}
        <section
          id="hero"
          aria-label="ARCANA 3D Bookshelf Hero"
          style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            minHeight: 600,
            overflow: 'hidden',
            background: 'radial-gradient(ellipse at 30% 60%, rgba(200,151,63,0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 40%, rgba(122,27,27,0.04) 0%, transparent 60%), var(--bg-base)',
          }}
        >
          {/* Radial ambient glow at shelf center */}
          <div aria-hidden="true" style={{
            position: 'absolute',
            bottom: '15%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            height: '40%',
            background: 'radial-gradient(ellipse, rgba(200,151,63,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* R3F Canvas */}
          <Suspense fallback={<CanvasFallback />}>
            <BookshelfCanvas />
          </Suspense>

          {/* ARCANA headline overlay */}
          <HeroText />
        </section>

        {/* ── Search + Filters ── */}
        <SearchSection />

        {/* ── Page sections ── */}
        <main id="main-content">
          <FeaturedBooks />
          <CategoriesSection />
          <StatsBanner />
          <HowItWorks />
          <TestimonialsSection />
        </main>

        {/* ── Footer ── */}
        <Footer />
        <ComingSoonOverlay />
      </SmoothScroll>
    </CursorProvider>
  );
}
