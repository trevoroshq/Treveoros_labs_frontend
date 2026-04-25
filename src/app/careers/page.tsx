import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Careers — TREVORORS LABS',
  description: 'Join the TREVORORS LABS team. We\'re building the future of developer education. See open positions and what it\'s like to work with us.',
  openGraph: {
    title: 'Careers at TREVORORS LABS',
    description: 'Join our team building the future of developer education.',
    type: 'website',
  },
};

const openings = [
  { role: 'Curriculum Engineer', type: 'Full-Time · Remote', dept: 'Education', desc: 'Design and iterate on project-based curriculum for our Foundation and Builder tracks. You\'ll work closely with cohort leads to build exercises that genuinely challenge and grow developers.' },
  { role: 'Full-Stack Engineer', type: 'Full-Time · Remote', dept: 'Engineering', desc: 'Build and scale the TREVORORS LABS platform. You\'ll work on everything from student dashboards to certificate verification systems and payment infrastructure.' },
  { role: 'Community Manager', type: 'Part-Time · Remote', dept: 'Community', desc: 'Nurture our growing alumni network, run cohort onboarding, and keep our WhatsApp and Discord communities thriving and engaged.' },
  { role: 'Growth & Partnerships', type: 'Full-Time · Remote', dept: 'Business', desc: 'Drive student acquisition, build employer partnerships, and own our go-to-market strategy across India and beyond.' },
];

export default function CareersPage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ padding: '96px 0 64px', textAlign: 'center', background: 'linear-gradient(135deg, var(--color-navy) 0%, #1e3a5f 100%)', color: '#fff' }}>
          <div className="container">
            <div className="section-tag" style={{ justifyContent: 'center', marginBottom: 24 }}>
              <span>We're Hiring</span>
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: 24, lineHeight: 1.15 }}>
              Help us build the future<br />of developer education
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.75)', maxWidth: 560, margin: '0 auto' }}>
              We're a small, high-conviction team working remotely across time zones. If you care deeply about developer growth and education, we'd love to talk.
            </p>
          </div>
        </section>

        {/* Perks */}
        <section style={{ padding: '80px 0', background: 'var(--color-bg-alt, #f8fafc)' }}>
          <div className="container">
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 40, color: 'var(--color-navy)', textAlign: 'center' }}>Why TREVORORS LABS?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
              {[
                { icon: '🌍', label: '100% Remote' },
                { icon: '💰', label: 'Competitive Pay' },
                { icon: '📚', label: 'Learning Budget' },
                { icon: '🕐', label: 'Flexible Hours' },
                { icon: '🚀', label: 'High Ownership' },
                { icon: '🤝', label: 'Equity Options' },
              ].map(p => (
                <div key={p.label} className="card" style={{ textAlign: 'center', padding: 28 }}>
                  <div style={{ fontSize: '2rem', marginBottom: 12 }}>{p.icon}</div>
                  <div style={{ fontWeight: 600, color: 'var(--color-navy)' }}>{p.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Roles */}
        <section style={{ padding: '80px 0' }}>
          <div className="container" style={{ maxWidth: 800 }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 40, color: 'var(--color-navy)' }}>Open Positions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {openings.map(job => (
                <div key={job.role} className="card card--featured" style={{ padding: 32 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: 4 }}>{job.role}</h3>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <span className="badge" style={{ background: '#dbeafe', color: '#2563eb' }}>{job.dept}</span>
                        <span className="badge" style={{ background: '#f1f5f9', color: '#475569' }}>{job.type}</span>
                      </div>
                    </div>
                    <a href={`mailto:careers@trevoros.com?subject=Application: ${job.role}`} className="btn btn--primary btn--sm">Apply</a>
                  </div>
                  <p style={{ color: 'var(--color-gray-500)', lineHeight: 1.7, fontSize: '0.95rem' }}>{job.desc}</p>
                </div>
              ))}
            </div>
            <div className="card" style={{ textAlign: 'center', padding: 40, marginTop: 32 }}>
              <p style={{ color: 'var(--color-gray-500)', marginBottom: 16 }}>Don't see your role? We're always open to extraordinary talent.</p>
              <a href="mailto:hello@trevoros.com" className="btn btn--secondary">Send us a note</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
