import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Blog — TREVOROS LABS',
  description: 'Insights on developer education, tech careers, and engineering excellence from the TREVOROS LABS team.',
  openGraph: {
    title: 'TREVOROS LABS Blog',
    description: 'Developer education, career insights, and engineering best practices.',
    type: 'website',
  },
};

const posts = [
  { slug: '#', tag: 'Education', date: 'Mar 28, 2026', title: 'Why we measure performance with projects, not tests', excerpt: 'Traditional coding assessments measure recall under pressure. Real engineering is about building things that work, iterating fast, and collaborating effectively. Here\'s how we redesigned our evaluation rubric.' },
  { slug: '#', tag: 'Career', date: 'Mar 15, 2026', title: 'What top engineering teams actually look for in junior developers', excerpt: 'We surveyed 40+ engineering managers across India and Southeast Asia. The answers were consistent, and they\'re not what most bootcamps teach.' },
  { slug: '#', tag: 'Platform', date: 'Mar 3, 2026', title: 'Introducing the Builder Track — for developers ready to ship', excerpt: 'The Foundation track teaches fundamentals. The Builder track is for those who\'ve got the basics and want to build production-ready systems. Here\'s how we designed it.' },
  { slug: '#', tag: 'Alumni', date: 'Feb 20, 2026', title: 'From cohort to full-time: Priya\'s story', excerpt: 'Priya completed Foundation Cohort 1 with an Exceptional rating. Three months later, she\'s a frontend engineer at a Series B startup. She shares what made the difference.' },
];

const tagColors: Record<string, { bg: string; color: string }> = {
  Education: { bg: '#dcfce7', color: '#16a34a' },
  Career: { bg: '#dbeafe', color: '#2563eb' },
  Platform: { bg: '#f5f3ff', color: '#7c3aed' },
  Alumni: { bg: '#fef3c7', color: '#d97706' },
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ padding: '96px 0 64px', textAlign: 'center', background: 'linear-gradient(135deg, var(--color-navy) 0%, #1e3a5f 100%)', color: '#fff' }}>
          <div className="container">
            <div className="section-tag" style={{ justifyContent: 'center', marginBottom: 24 }}><span>Insights</span></div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, marginBottom: 16 }}>TREVOROS LABS Blog</h1>
            <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.75)', maxWidth: 520, margin: '0 auto' }}>
              Practical insights on developer education, engineering careers, and building products that matter.
            </p>
          </div>
        </section>

        <section style={{ padding: '80px 0' }}>
          <div className="container" style={{ maxWidth: 820 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {posts.map(post => {
                const tc = tagColors[post.tag] || { bg: '#f1f5f9', color: '#475569' };
                return (
                  <a key={post.title} href={post.slug} className="card card--featured" style={{ display: 'block', padding: 36, textDecoration: 'none', transition: 'transform 0.2s' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                      <span className="badge" style={{ background: tc.bg, color: tc.color }}>{post.tag}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-gray-400)', fontFamily: 'var(--font-mono)' }}>{post.date}</span>
                    </div>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: 12, lineHeight: 1.4 }}>{post.title}</h2>
                    <p style={{ color: 'var(--color-gray-500)', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: 20 }}>{post.excerpt}</p>
                    <span style={{ color: 'var(--color-sky)', fontSize: '0.85rem', fontWeight: 600 }}>Read more →</span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
