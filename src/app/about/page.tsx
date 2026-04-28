import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About Us — TREVOROS LABS',
  description: 'Learn about TREVOROS LABS — our mission to build the next generation of world-class developers through performance-based training and selection.',
  openGraph: {
    title: 'About TREVOROS LABS',
    description: 'Performance-based developer training and selection. Our mission, vision and the team behind it.',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{ padding: '96px 0 64px', textAlign: 'center', background: 'linear-gradient(135deg, var(--color-navy) 0%, #1e3a5f 100%)', color: '#fff' }}>
          <div className="container">
            <div className="section-tag" style={{ justifyContent: 'center', marginBottom: 24 }}>
              <span>Our Story</span>
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.15 }}>
              Building the next generation<br />of world-class developers
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.75)', maxWidth: 600, margin: '0 auto' }}>
              TREVOROS LABS is a performance-based developer training platform where your work speaks louder than your resume.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section style={{ padding: '80px 0' }}>
          <div className="container" style={{ maxWidth: 800 }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 24, color: 'var(--color-navy)' }}>Our Mission</h2>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--color-gray-600)', marginBottom: 24 }}>
              We believe that traditional hiring is broken. Technical talent isn't measured by a 45-minute whiteboard session or a polished LinkedIn profile — it's demonstrated through actual work, consistent execution, and the ability to solve real problems under real conditions.
            </p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--color-gray-600)', marginBottom: 24 }}>
              TREVOROS LABS was built to close that gap. We select cohorts of committed developers, put them through structured project-based learning across two tracks — <strong>Foundation</strong> and <strong>Builder</strong> — and surface the ones who genuinely perform.
            </p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--color-gray-600)' }}>
              The result: certified developers with portfolios that prove their skills, not just their interview polish.
            </p>
          </div>
        </section>

        {/* Values */}
        <section style={{ padding: '80px 0', background: 'var(--color-bg-alt, #f8fafc)' }}>
          <div className="container">
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 48, color: 'var(--color-navy)', textAlign: 'center' }}>What We Stand For</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 32 }}>
              {[
                { icon: '⚡', title: 'Performance First', desc: 'Every certificate we issue is backed by verifiable project scores, not just attendance.' },
                { icon: '🔍', title: 'Radical Transparency', desc: 'Weekly scores, public leaderboards, and honest feedback — no hidden evaluation criteria.' },
                { icon: '🌍', title: 'Accessible Excellence', desc: 'World-class training shouldn\'t require world-class geography or a wealthy institution.' },
                { icon: '🤝', title: 'Community Driven', desc: 'Our alumni network actively refers, mentors, and opens doors for the next cohort.' },
              ].map(v => (
                <div key={v.title} className="card" style={{ padding: 32 }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>{v.icon}</div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 12, color: 'var(--color-navy)' }}>{v.title}</h3>
                  <p style={{ color: 'var(--color-gray-500)', lineHeight: 1.7, fontSize: '0.95rem' }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '80px 0', textAlign: 'center' }}>
          <div className="container">
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 16, color: 'var(--color-navy)' }}>Ready to prove your skills?</h2>
            <p style={{ color: 'var(--color-gray-500)', marginBottom: 32 }}>Applications are open. Join a cohort and build something that matters.</p>
            <a href="/apply" className="btn btn--primary btn--lg">Apply Now <span className="btn-arrow">→</span></a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
