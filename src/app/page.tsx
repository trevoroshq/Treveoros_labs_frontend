'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import Roadmap from '@/components/Roadmap';
import Link from 'next/link';

const leaderboardData = [
  { rank: 1, name: 'Arjun Mehta', initials: 'AM', color: '#6366f1', track: 'BUILDER', score: 972 },
  { rank: 2, name: 'Priya Sharma', initials: 'PS', color: '#ec4899', track: 'BUILDER', score: 958 },
  { rank: 3, name: 'Karthik Raj', initials: 'KR', color: '#14b8a6', track: 'FOUNDATION', score: 941 },
  { rank: 4, name: 'Neha Gupta', initials: 'NG', color: '#f59e0b', track: 'BUILDER', score: 928 },
  { rank: 5, name: 'Rohan Patel', initials: 'RP', color: '#8b5cf6', track: 'FOUNDATION', score: 915 },
];

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

          <div className="hero__stats">
            <div>
              <div className="hero__stat-value">500+</div>
              <div className="hero__stat-label">Developers Trained</div>
            </div>
            <div>
              <div className="hero__stat-value">92%</div>
              <div className="hero__stat-label">Completion Rate</div>
            </div>
            <div>
              <div className="hero__stat-value">4.9</div>
              <div className="hero__stat-label">Avg Rating</div>
            </div>
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

      {/* ── Program Overview (Story 1) ── */}
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

          {/* Highlight Banners */}
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
            {/* Foundation Track Card */}
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

            {/* Builder Track Card */}
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

      {/* ── Visual Roadmap (Stories 2, 3, 4) ── */}
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
                  Your performance is tracked on the live leaderboard.
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

      {/* ── Certificates Preview ── */}
      <section id="certificates" className="section section--gray">
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
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'flex-start' }}>
            <ScrollReveal delay={1}>
              <div style={{ textAlign: 'center', background: 'var(--color-white)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--color-gray-200)', boxShadow: 'var(--shadow-sm)' }}>
                <img src="/Certificate_Exceptional.png" alt="Exceptional Certificate" style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
                <h3 style={{ margin: '1.25rem 0 0.5rem', color: 'var(--color-navy)', fontSize: '1.2rem' }}>Exceptional Rating</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-gray-500)', margin: '0' }}>Top 10% performance. Guaranteed interviews and placement support for Builder graduates.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={2}>
              <div style={{ textAlign: 'center', background: 'var(--color-white)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--color-gray-200)', boxShadow: 'var(--shadow-sm)' }}>
                <img src="/Certificate_strong.png" alt="Strong Certificate" style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
                <h3 style={{ margin: '1.25rem 0 0.5rem', color: 'var(--color-navy)', fontSize: '1.2rem' }}>Strong Rating</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-gray-500)', margin: '0' }}>Completed all advanced project requirements. Proves a strong technical foundation to employers.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={3}>
              <div style={{ textAlign: 'center', background: 'var(--color-white)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--color-gray-200)', boxShadow: 'var(--shadow-sm)' }}>
                <img src="/Certificate_Satisfactory.png" alt="Satisfactory Certificate" style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
                <h3 style={{ margin: '1.25rem 0 0.5rem', color: 'var(--color-navy)', fontSize: '1.2rem' }}>Satisfactory Rating</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-gray-500)', margin: '0' }}>Successfully shipped the minimum requirements. Demonstrates base level full-stack competence.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Leaderboard ── */}
      <section id="leaderboard" className="section leaderboard">
        <div className="container">
          <ScrollReveal>
            <div className="leaderboard__header">
              <div className="leaderboard__live">
                <span className="leaderboard__live-dot" />
                <span className="leaderboard__live-text">Live Rankings</span>
              </div>
              <h2>Top Performers</h2>
              <p>Real-time leaderboard tracking project scores, quizzes, and participation.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="leaderboard__table-wrap">
              <div className="leaderboard__table-header">
                <span>Rank</span>
                <span>Developer</span>
                <span>Track</span>
                <span>Score</span>
              </div>

              {leaderboardData.map((entry) => (
                <div key={entry.rank} className="leaderboard__row">
                  <span className={`leaderboard__rank ${
                    entry.rank === 1 ? 'leaderboard__rank--gold' :
                    entry.rank === 2 ? 'leaderboard__rank--silver' :
                    entry.rank === 3 ? 'leaderboard__rank--bronze' : ''
                  }`}>
                    #{String(entry.rank).padStart(2, '0')}
                  </span>
                  <div className="leaderboard__user">
                    <div
                      className="leaderboard__avatar"
                      style={{ backgroundColor: entry.color }}
                    >
                      {entry.initials}
                    </div>
                    <span className="leaderboard__name">{entry.name}</span>
                  </div>
                  <span className="leaderboard__track">{entry.track}</span>
                  <span className="leaderboard__score">{entry.score}</span>
                </div>
              ))}
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
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/apply" className="btn btn--sky btn--lg">
                  Apply Now <span className="btn-arrow">→</span>
                </Link>
                <Link href="/#tracks" className="btn btn--secondary btn--lg" style={{ borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}>
                  View Tracks
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
