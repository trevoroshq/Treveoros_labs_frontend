'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function PaymentFailurePage() {
  return (
    <>
      <Navbar />
      <div className="auth-page">
        <div className="auth-card" style={{ textAlign: 'center', maxWidth: 480 }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: '#fce7e7', display: 'flex', alignItems: 'center',
            justifyContent: 'center', margin: '0 auto 24px', fontSize: '2rem',
            animation: 'fadeInUp 0.5s var(--ease-out) both'
          }}>
            ✗
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: 8 }}>Payment Failed</h2>
          <p style={{ marginBottom: 32 }}>
            Something went wrong with your payment. Don&apos;t worry — no amount has been charged.
          </p>

          <div style={{
            padding: '16px 20px', background: 'var(--color-gray-50)',
            borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-gray-200)',
            textAlign: 'left', marginBottom: 24
          }}>
            <div className="form-label" style={{ marginBottom: 4 }}>Common Reasons</div>
            <ul style={{ fontSize: '0.85rem', color: 'var(--color-gray-600)', paddingLeft: 16 }}>
              <li style={{ listStyle: 'disc', marginBottom: 4 }}>Insufficient funds</li>
              <li style={{ listStyle: 'disc', marginBottom: 4 }}>Bank declined the transaction</li>
              <li style={{ listStyle: 'disc', marginBottom: 4 }}>Session timed out</li>
            </ul>
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <Link href="/dashboard" className="btn btn--primary btn--sm">
              Try Again <span className="btn-arrow">→</span>
            </Link>
            <Link href="/" className="btn btn--secondary btn--sm">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
