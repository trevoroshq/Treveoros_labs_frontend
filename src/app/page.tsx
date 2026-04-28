'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import Roadmap from '@/components/Roadmap';
import FAQ from '@/components/FAQ';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section className="hero section">
        <div className="hero__grid" />
        <div className="container hero__content">
          <div className="hero__tag">
            <span className="hero__tag-dot" />
            <span className="hero__tag-text">Applications Open — Cohort 2026</span>
          </div>

          <h1>
            Build Real Skills.<br />
            <span className="hero__accent">Prove Your Ability.</span>
          </h1>

          <p className="hero__subtitle">
            Performance-based developer training that separates builders from bystanders.
            No degrees required — just code, commitment, and consistency.
          </p>

          <div className="hero__actions">
            <Link href="/apply" className="btn btn--primary btn--lg">
              Apply Now <span className="btn-arrow">→</span>
            </Link>
            <Link href="/#tracks" className="btn btn--secondary btn--lg">
              Explore Tracks
            </Link>
          </div>

          <div className="hero__trust">
            <span className="hero__trust-item">✓ Results reviewed in 48 hrs</span>
            <span className="hero__trust-sep">·</span>
            <span className="hero__trust-item">✓ No hidden fees</span>
          </div>
        </div>

        <div className="hero__decoration">
          <svg viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="300" cy="300" r="250" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="300" cy="300" r="200" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="300" cy="300" r="150" stroke="currentColor" strokeWidth="0.5" />
            <line x1="50" y1="300" x2="550" y2="300" stroke="currentColor" strokeWidth="0.5" />
            <line x1="300" y1="50" x2="300" y2="550" stroke="currentColor" strokeWidth="0.5" />
            <rect x="225" y="225" width="150" height="150" rx="8" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="300" cy="300" r="4" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* ── Trust Strip ── */}
      <div className="trust-strip">
        <div className="container">
          <div className="trust-strip__inner">
            <div className="trust-strip__item">
              <span className="trust-strip__icon">🎯</span>
              <span className="trust-strip__text">Performance-based scoring</span>
            </div>
            <span className="trust-strip__divider" />
            <div className="trust-strip__item">
              <span className="trust-strip__icon">👨‍💻</span>
              <span className="trust-strip__text">Industry practitioner mentors</span>
            </div>
            <span className="trust-strip__divider" />
            <div className="trust-strip__item">
              <span className="trust-strip__icon">🏆</span>
              <span className="trust-strip__text">Verifiable certificate</span>
            </div>
            <span className="trust-strip__divider" />
            <div className="trust-strip__item">
              <span className="trust-strip__icon">💼</span>
              <span className="trust-strip__text">Paid internship for top builders</span>
            </div>

          </div>
        </div>
      </div>

      {/* ── Program Overview ── */}
      <section id="tracks" className="section tracks">
        <div className="container">
          <ScrollReveal>
            <div className="tracks__header">
              <div className="section-tag">
                <span>Choose Your Track</span>
              </div>
              <h2>Two Paths. One Goal.</h2>
              <p>Select the track that matches your experience level and ambition.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="track-banners">
              <div className="track-banner track-banner--offer">
                <span className="track-banner__icon">🎉</span>
                <span className="track-banner__text">
                  <strong>50% OFF</strong> for Foundation → Builder upgrade — level up after completion
                </span>
              </div>
              <div className="track-banner track-banner--internship">
                <span className="track-banner__icon">💼</span>
                <span className="track-banner__text">
                  <strong>Paid Core Internship</strong> opportunity for top performers in Builder Track
                </span>
              </div>
            </div>
          </ScrollReveal>

          <div className="tracks__grid">
            <ScrollReveal delay={1}>
              <div className="track-card">
                <div className="track-card__head">
                  <div className="track-card__icon track-card__icon--foundation">◈</div>
                  <span className="track-card__tag track-card__tag--beginner">Beginner Friendly</span>
                </div>
                <div className="track-card__meta">
                  <span className="track-card__duration">⏱ 6 Weeks</span>
                </div>
                <h3 className="track-card__title">Foundation Track</h3>
                <p className="track-card__desc">
                  Master programming fundamentals, data structures, web basics, backend intro,
                  databases, and ship a full-stack final project. Perfect for beginners.
                </p>
                <div className="track-card__features">
                  <div className="track-card__feature">
                    <span className="track-card__feature-icon">◆</span>
                    6 weekly modules + 2 expert sessions
                  </div>
                  <div className="track-card__feature">
                    <span className="track-card__feature-icon">◆</span>
                    Live project builds every week
                  </div>
                  <div className="track-card__feature">
                    <span className="track-card__feature-icon">◆</span>
                    Career clarity expert session
                  </div>
                  <div className="track-card__feature">
                    <span className="track-card__feature-icon">◆</span>
                    Performance-based certificate
                  </div>
                </div>
                <div className="track-card__pricing">
                  <span className="track-card__price-old">₹3,000</span>
                  <span className="track-card__price-new">₹2,000</span>
                  <span className="track-card__price-save">Save ₹1,000</span>
                </div>
                <div className="track-card__actions">
                  <Link href="/apply?track=foundation" className="btn btn--primary" style={{ flex: 1 }}>
                    Apply Now <span className="btn-arrow">→</span>
                  </Link>
                  <Link href="/#roadmap" className="btn btn--secondary" style={{ flex: 1 }}>
                    View Roadmap
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={2}>
              <div className="track-card track-card--featured">
                <div className="track-card__head">
                  <div className="track-card__icon track-card__icon--builder">⚡</div>
                  <span className="track-card__tag track-card__tag--advanced">Advanced</span>
                </div>
                <div className="track-card__meta">
                  <span className="track-card__duration">⏱ 8 Weeks</span>
                </div>
                <h3 className="track-card__title">Builder Track</h3>
                <p className="track-card__desc">
                  Ship production-grade systems. From backend architecture to AI/ML integration,
                  real-world startup projects, and a paid internship opportunity.
                </p>
                <div className="track-card__features">
                  <div className="track-card__feature">
                    <span className="track-card__feature-icon">◆</span>
                    8 weekly modules + 2 expert sessions
                  </div>
                  <div className="track-card__feature">
                    <span className="track-card__feature-icon">◆</span>
                    AI/ML integration module
                  </div>
                  <div className="track-card__feature">
                    <span className="track-card__feature-icon">◆</span>
                    Founder session by industry leaders
                  </div>
                  <div className="track-card__feature">
                    <span className="track-card__feature-icon">◆</span>
                    Paid Core Internship for top performers
                  </div>
                </div>
                <div className="track-card__pricing">
                  <span className="track-card__price-old">₹5,000</span>
                  <span className="track-card__price-new">₹4,000</span>
                  <span className="track-card__price-save">Save ₹1,000</span>
                </div>
                <div className="track-card__actions">
                  <Link href="/apply?track=builder" className="btn btn--primary" style={{ flex: 1 }}>
                    Apply Now <span className="btn-arrow">→</span>
                  </Link>
                  <Link href="/#roadmap" className="btn btn--secondary" style={{ flex: 1 }}>
                    View Roadmap
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Visual Roadmap ── */}
      <section id="roadmap" className="section section--gray">
        <div className="container">
          <ScrollReveal>
            <div className="tracks__header">
              <div className="section-tag">
                <span>Curriculum Roadmap</span>
              </div>
              <h2>Your Learning Journey</h2>
              <p>Week-by-week curriculum with expert sessions at key milestones.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div style={{ maxWidth: '760px', margin: '0 auto' }}>
              <Roadmap />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="section">
        <div className="container">
          <ScrollReveal>
            <div className="how-it-works__header">
              <div className="section-tag">
                <span>How It Works</span>
              </div>
              <h2>Four Steps to Launch</h2>
              <p>A clear path from application to certification.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-card__number">Step 01</div>
                <h3 className="step-card__title">Apply</h3>
                <p className="step-card__desc">
                  Submit your application with your background, preferred track and batch date.
                  We review within 48 hours.
                </p>
                <div className="step-card__connector" />
              </div>

              <div className="step-card">
                <div className="step-card__number">Step 02</div>
                <h3 className="step-card__title">Get Accepted</h3>
                <p className="step-card__desc">
                  Receive your acceptance and complete payment to secure your seat
                  in the upcoming cohort.
                </p>
                <div className="step-card__connector" />
              </div>

              <div className="step-card">
                <div className="step-card__number">Step 03</div>
                <h3 className="step-card__title">Build &amp; Learn</h3>
                <p className="step-card__desc">
                  Dive into weekly projects, code reviews, and mentorship.
                </p>
                <div className="step-card__connector" />
              </div>

              <div className="step-card">
                <div className="step-card__number">Step 04</div>
                <h3 className="step-card__title">Get Certified</h3>
                <p className="step-card__desc">
                  Earn a verifiable performance certificate — Exceptional, Strong,
                  or Satisfactory — based on your scores.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Behind the Program ── */}
      <section className="section section--navy behind-program">
        <div className="container">
          <div className="behind-program__grid">
            <ScrollReveal>
              <div className="behind-program__text">
                <div className="section-tag section-tag--light">
                  <span>Behind the Program</span>
                </div>
                <h2 className="behind-program__title">Why We Built This</h2>
                <p className="behind-program__desc">
                  TREVOROS FINTECH PRIVATE LIMITED isn&apos;t just a company — it&apos;s a
                  conviction. We watched talented students graduate with degrees but
                  struggle to write a single working API, debug a real bug, or ship
                  anything production-ready.
                </p>
                <p className="behind-program__desc">
                  So we built TREVOROS LABS — a company initiative specifically
                  designed to bridge that gap. Two tracks, real projects, performance
                  scores that mean something, and mentors who&apos;ve actually shipped
                  things in the industry.
                </p>
                <p className="behind-program__desc">
                  No padding. No fluff. Just the skills and mindset the industry
                  actually demands.
                </p>
                <div className="behind-program__contact">
                  <a href="tel:+919128699369" className="behind-program__contact-item">
                    <span>📞</span>
                    <span>+91 91286 99369</span>
                  </a>
                  <a href="mailto:labs@trevoros.com" className="behind-program__contact-item">
                    <span>✉️</span>
                    <span>labs@trevoros.com</span>
                  </a>
                  <a
                    href="https://wa.me/919128699369?text=Hi%2C%20I%27m%20interested%20in%20TrevorOS%20Labs."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="behind-program__contact-item behind-program__contact-item--whatsapp"
                  >
                    <span>💬</span>
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={2}>
              <div className="behind-program__card">
                <div className="behind-program__card-tag">COMPANY INITIATIVE</div>
                <div className="behind-program__card-name">TREVOROS FINTECH<br />PRIVATE LIMITED</div>
                <div className="behind-program__card-divider" />
                <div className="behind-program__card-stat">
                  <span className="behind-program__card-stat-label">Mission</span>
                  <span className="behind-program__card-stat-value">Skills + Mindset</span>
                </div>
                <div className="behind-program__card-stat">
                  <span className="behind-program__card-stat-label">Tracks Launched</span>
                  <span className="behind-program__card-stat-value">Foundation + Builder</span>
                </div>
                <div className="behind-program__card-stat">
                  <span className="behind-program__card-stat-label">Outcome</span>
                  <span className="behind-program__card-stat-value">Job-Ready Developers</span>
                </div>
                <div className="behind-program__card-stat">
                  <span className="behind-program__card-stat-label">Commitment</span>
                  <span className="behind-program__card-stat-value">7-Day Money Back</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Who Is This For ── */}
      <section className="section section--gray">
        <div className="container">
          <ScrollReveal>
            <div className="tracks__header">
              <div className="section-tag"><span>Eligibility</span></div>
              <h2>Is This Program Right for You?</h2>
              <p>We&apos;re selective — not to gatekeep, but to protect your time and ours.</p>
            </div>
          </ScrollReveal>
          <div className="for-whom__grid">
            <ScrollReveal delay={1}>
              <div className="for-whom__col for-whom__col--yes">
                <div className="for-whom__col-header">
                  <span className="for-whom__badge for-whom__badge--yes">✓ Great Fit</span>
                  <h3>Apply if you are…</h3>
                </div>
                <ul className="for-whom__list">
                  <li className="for-whom__item for-whom__item--yes">A CS/IT student who wants real-world projects beyond college curriculum</li>
                  <li className="for-whom__item for-whom__item--yes">A self-taught developer looking for structured validation and a verifiable credential</li>
                  <li className="for-whom__item for-whom__item--yes">A career switcher committed to 15+ hrs/week consistently</li>
                  <li className="for-whom__item for-whom__item--yes">Someone who wants honest mentor-graded feedback — not just participation trophies</li>
                  <li className="for-whom__item for-whom__item--yes">Motivated by outcomes: you want to build and ship, not just watch videos</li>
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={2}>
              <div className="for-whom__col for-whom__col--no">
                <div className="for-whom__col-header">
                  <span className="for-whom__badge for-whom__badge--no">✕ Not a Match</span>
                  <h3>Skip if you…</h3>
                </div>
                <ul className="for-whom__list">
                  <li className="for-whom__item for-whom__item--no">Want a casual, low-effort certificate just to put on your LinkedIn</li>
                  <li className="for-whom__item for-whom__item--no">Can&apos;t commit time consistently — sessions are live and project-heavy</li>
                  <li className="for-whom__item for-whom__item--no">Expect guaranteed job placement regardless of performance</li>
                  <li className="for-whom__item for-whom__item--no">Are looking for a self-paced, go-at-your-own-speed course</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Certificates Preview ── */}
      <section id="certificates" className="section">
        <div className="container">
          <ScrollReveal>
            <div className="tracks__header" style={{ marginBottom: '3rem' }}>
              <div className="section-tag">
                <span>What You&apos;ll Earn</span>
              </div>
              <h2>Verifiable Performance Certificates</h2>
              <p>Your performance on weekly projects dictates your final grade. Stand out from the crowd with proof of what you can actually build.</p>
            </div>
          </ScrollReveal>

          <div className="certificates-grid">
            <ScrollReveal delay={1}>
              <div className="certificate-card">
                <img src="/Certificate_Exceptional.png" alt="Exceptional Certificate" />
                <h3>Exceptional Rating</h3>
                <p>Top 10% performance. Guaranteed interviews and placement support for Builder graduates.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={2}>
              <div className="certificate-card">
                <img src="/Certificate_strong.png" alt="Strong Certificate" />
                <h3>Strong Rating</h3>
                <p>Completed all advanced project requirements. Proves a strong technical foundation to employers.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={3}>
              <div className="certificate-card">
                <img src="/Certificate_Satisfactory.png" alt="Satisfactory Certificate" />
                <h3>Satisfactory Rating</h3>
                <p>Successfully shipped the minimum requirements. Demonstrates base level full-stack competence.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="section">
        <div className="container">
          <ScrollReveal>
            <div className="tracks__header">
              <div className="section-tag"><span>FAQ</span></div>
              <h2>Questions Before You Apply</h2>
              <p>The things students usually ask us before clicking &ldquo;Apply Now.&rdquo;</p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="faq-wrap">
              <FAQ />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="section cta-section">
        <div className="container">
          <ScrollReveal>
            <div className="cta-section__content">
              <div className="section-tag">
                <span>Ready to Start?</span>
              </div>
              <h2>Your Journey Begins Here</h2>
              <p>
                Join the next cohort of builders. Applications close when seats fill up —
                don&apos;t wait.
              </p>
              <div className="cta-actions">
                <Link href="/apply" className="btn btn--sky btn--lg">
                  Apply Now <span className="btn-arrow">→</span>
                </Link>
                <Link href="/#faq" className="btn btn--secondary btn--lg cta-btn--outline">
                  Read FAQ
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />

      {/* ── Floating WhatsApp Button ── */}
      <a
        href="https://wa.me/919128699369?text=Hi%2C%20I%27m%20interested%20in%20TrevorOS%20Labs."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12.004 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.977-1.404A9.953 9.953 0 0012.004 22C17.53 22 22 17.523 22 12S17.53 2 12.004 2zm0 18.18a8.164 8.164 0 01-4.162-1.138l-.299-.177-3.092.872.875-3.067-.194-.315A8.154 8.154 0 013.82 12c0-4.514 3.671-8.18 8.184-8.18 4.514 0 8.18 3.666 8.18 8.18 0 4.513-3.666 8.18-8.18 8.18z"/>
        </svg>
        <span className="whatsapp-float__label">Need help? Chat</span>
      </a>
    </>
  );
}
