'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PaymentSuccessPage() {
  return (
    <>
      <Navbar />
      <div className="auth-page">
        <div className="auth-card" style={{ textAlign: 'center', maxWidth: 520 }}>
          {/* Success Icon */}
          <div style={{
            width: 88, height: 88, borderRadius: '50%',
            background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', margin: '0 auto 24px', fontSize: '2.2rem',
            animation: 'fadeInUp 0.5s var(--ease-out) both',
            boxShadow: '0 8px 24px rgba(22, 163, 74, 0.15)',
          }}>
            ✓
          </div>

          <h2 style={{ fontSize: '1.75rem', marginBottom: 8, color: 'var(--color-navy)' }}>
            Payment Successful!
          </h2>
          <p style={{ marginBottom: 8, color: 'var(--color-gray-600)' }}>
            Your payment has been confirmed and your enrollment is now active.
          </p>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            color: 'var(--color-gray-400)', marginBottom: 32,
            textTransform: 'uppercase', letterSpacing: '0.08em'
          }}>
            A confirmation email has been sent to your inbox
          </p>

          {/* Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Step 1 — WhatsApp */}
            <div style={{
              padding: '20px 24px', background: '#f0fdf4',
              borderRadius: 'var(--radius-sm)', border: '1px solid #bbf7d0',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{
                  width: 28, height: 28, borderRadius: '50%', background: '#25D366',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 700, fontSize: '0.75rem', flexShrink: 0
                }}>1</span>
                <div className="form-label" style={{ margin: 0, color: '#16a34a' }}>Join the Community</div>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-gray-600)', marginBottom: 12 }}>
                Connect with your cohort members and instructors on our official WhatsApp group.
              </div>
              <a
                href="https://chat.whatsapp.com/invite/DEMOURLHASH"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--sm"
                style={{
                  background: '#25D366', borderColor: '#25D366', color: '#fff',
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '10px 24px', fontWeight: 600,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Join WhatsApp Group
              </a>
            </div>

            {/* Step 2 — Email */}
            <div style={{
              padding: '20px 24px', background: 'var(--color-gray-50)',
              borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-gray-200)',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{
                  width: 28, height: 28, borderRadius: '50%', background: 'var(--color-sky)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 700, fontSize: '0.75rem', flexShrink: 0
                }}>2</span>
                <div className="form-label" style={{ margin: 0 }}>Check Your Email</div>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-gray-600)' }}>
                We&apos;ve sent you a welcome email with your enrollment details, program schedule, and all the resources you need to get started.
              </div>
            </div>

            {/* Step 3 — Dashboard */}
            <div style={{
              padding: '20px 24px', background: 'var(--color-gray-50)',
              borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-gray-200)',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{
                  width: 28, height: 28, borderRadius: '50%', background: 'var(--color-navy)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 700, fontSize: '0.75rem', flexShrink: 0
                }}>3</span>
                <div className="form-label" style={{ margin: 0 }}>Explore Your Dashboard</div>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-gray-600)' }}>
                Track your progress, view assignments, and access learning materials from your personal dashboard.
              </div>
            </div>

            {/* CTA */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 8 }}>
              <Link href="/dashboard" className="btn btn--primary">
                Go to Dashboard <span className="btn-arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
