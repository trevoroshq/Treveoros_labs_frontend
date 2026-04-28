import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <img src="/logo_.png" alt="TREVOROS LABS" style={{ height: '32px', width: 'auto' }} />
              <div className="footer__brand-name" style={{ margin: 0 }}>TREVOROS LABS</div>
            </div>
            <p className="footer__brand-desc">
              A TREVOROS FINTECH PRIVATE LIMITED initiative to make students ready
              with real skills and the right mindset — before they enter the industry.
            </p>
            <div className="footer__contact">
              <a href="tel:+919128699369" className="footer__contact-item">
                <span className="footer__contact-icon">📞</span>
                +91 91286 99369
              </a>
              <a href="mailto:labs@trevoros.com" className="footer__contact-item">
                <span className="footer__contact-icon">✉️</span>
                labs@trevoros.com
              </a>
            </div>
          </div>

          <div className="footer__links">
            <div className="footer__column">
              <h4>Platform</h4>
              <Link href="/#tracks">Tracks</Link>
              <Link href="/#how-it-works">How It Works</Link>
              <Link href="/#faq">FAQ</Link>
              <Link href="/apply">Apply</Link>
            </div>
            <div className="footer__column">
              <h4>Company</h4>
              <Link href="/about">About</Link>
              <Link href="/verify">Verify Certificate</Link>
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
