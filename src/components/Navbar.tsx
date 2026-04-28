'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar__inner">
          <Link href="/" className="navbar__brand" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/logo_.png" alt="TREVORORS LABS" style={{ height: '32px', width: 'auto' }} />
            <span className="navbar__brand-text">TREVORORS LABS</span>
          </Link>

          <div className="navbar__links">
            <Link href="/#tracks" className="navbar__link">Tracks</Link>
            <Link href="/#how-it-works" className="navbar__link">Process</Link>

            <Link href="/verify" className="navbar__link">Verify</Link>
          </div>

          <div className="navbar__actions">
            <Link href="/login" className="btn btn--ghost btn--sm">Sign In</Link>
            <Link href="/apply" className="btn btn--primary btn--sm">
              Apply Now <span className="btn-arrow">→</span>
            </Link>
            <button
              className="navbar__mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        <Link href="/#tracks" className="mobile-nav__link" onClick={() => setMobileOpen(false)}>Tracks</Link>
        <Link href="/#how-it-works" className="mobile-nav__link" onClick={() => setMobileOpen(false)}>Process</Link>

        <Link href="/verify" className="mobile-nav__link" onClick={() => setMobileOpen(false)}>Verify</Link>
        <Link href="/login" className="mobile-nav__link" onClick={() => setMobileOpen(false)}>Sign In</Link>
        <Link href="/apply" className="mobile-nav__link" onClick={() => setMobileOpen(false)}>Apply Now</Link>
      </div>
    </>
  );
}
