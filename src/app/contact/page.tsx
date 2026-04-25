'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission — connect to backend or Formspree in production
    await new Promise(r => setTimeout(r, 1200));
    setSent(true);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <main>
        <section style={{ padding: '96px 0 64px', textAlign: 'center', background: 'linear-gradient(135deg, var(--color-navy) 0%, #1e3a5f 100%)', color: '#fff' }}>
          <div className="container">
            <div className="section-tag" style={{ justifyContent: 'center', marginBottom: 24 }}><span>Get In Touch</span></div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, marginBottom: 16 }}>Contact Us</h1>
            <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.75)', maxWidth: 480, margin: '0 auto' }}>
              Questions about admissions, programs, partnerships, or anything else? We're here.
            </p>
          </div>
        </section>

        <section style={{ padding: '80px 0' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, maxWidth: 960 }}>
            {/* Info */}
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: 32 }}>Reach us directly</h2>
              {[
                { icon: '📬', label: 'General Enquiries', value: 'hello@trevoros.com', href: 'mailto:hello@trevoros.com' },
                { icon: '🎓', label: 'Admissions', value: 'admissions@trevoros.com', href: 'mailto:admissions@trevoros.com' },
                { icon: '🤝', label: 'Partnerships', value: 'partnerships@trevoros.com', href: 'mailto:partnerships@trevoros.com' },
                { icon: '⚖️', label: 'Legal / Privacy', value: 'legal@trevoros.com', href: 'mailto:legal@trevoros.com' },
              ].map(c => (
                <div key={c.label} style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
                  <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--color-navy)', marginBottom: 4 }}>{c.label}</div>
                    <a href={c.href} style={{ color: 'var(--color-sky)', fontSize: '0.9rem' }}>{c.value}</a>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 16, padding: 20, background: '#f8fafc', borderRadius: 12 }}>
                <div style={{ fontWeight: 600, color: 'var(--color-navy)', marginBottom: 8 }}>⏱ Response Time</div>
                <p style={{ color: 'var(--color-gray-500)', fontSize: '0.9rem', lineHeight: 1.6 }}>We typically respond within 1–2 business days. For urgent admission queries, email admissions directly.</p>
              </div>
            </div>

            {/* Form */}
            <div className="card" style={{ padding: 36 }}>
              {sent ? (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <div style={{ fontSize: '3rem', marginBottom: 16 }}>✅</div>
                  <h3 style={{ color: 'var(--color-navy)', marginBottom: 8 }}>Message Sent!</h3>
                  <p style={{ color: 'var(--color-gray-500)' }}>We'll get back to you within 1–2 business days.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="contact-name">Your Name</label>
                    <input id="contact-name" className="form-input" placeholder="John Doe" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="contact-email">Email Address</label>
                    <input id="contact-email" type="email" className="form-input" placeholder="you@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="contact-subject">Subject</label>
                    <select id="contact-subject" className="form-input" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} required>
                      <option value="" disabled>Select a topic</option>
                      <option>Admissions Question</option>
                      <option>Program Information</option>
                      <option>Payment / Billing</option>
                      <option>Partnership Enquiry</option>
                      <option>Technical Support</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="contact-message">Message</label>
                    <textarea id="contact-message" className="form-input form-textarea" placeholder="Tell us how we can help..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required style={{ minHeight: 120 }} />
                  </div>
                  <button type="submit" className="btn btn--primary" disabled={loading}>
                    {loading ? <span className="loading-spinner" style={{ width: 16, height: 16 }} /> : <>Send Message <span className="btn-arrow">→</span></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
