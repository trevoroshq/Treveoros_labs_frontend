import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <img src="/logo_.png" alt="TREVORORS LABS" style={{ height: '32px', width: 'auto' }} />
              <div className="footer__brand-name" style={{ margin: 0 }}>TREVORORS LABS</div>
            </div>
            <p className="footer__brand-desc">
              Performance-based developer training and selection. 
              Build real skills, prove your ability, get hired.
            </p>
          </div>

          <div className="footer__links">
            <div className="footer__column">
              <h4>Platform</h4>
              <Link href="/#tracks">Tracks</Link>
              <Link href="/#how-it-works">How It Works</Link>
              <Link href="/#leaderboard">Leaderboard</Link>
              <Link href="/apply">Apply</Link>
            </div>
            <div className="footer__column">
              <h4>Company</h4>
              <Link href="/about">About</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/careers">Careers</Link>
              <Link href="/contact">Contact</Link>
            </div>
            <div className="footer__column">
              <h4>Legal</h4>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
              <Link href="/refund">Refund Policy</Link>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span className="footer__copyright">
            © {currentYear} TREVOROS FINTECH PRIVATE LIMITED. All rights reserved.
          </span>
          <div className="footer__social">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Twitter">
              𝕏
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="GitHub">
              ⌘
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="LinkedIn">
              in
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
