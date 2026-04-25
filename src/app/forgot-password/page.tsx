'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Request failed');
      setDone(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-card__header">
            <h2 className="auth-card__title">Forgot Password</h2>
            <p className="auth-card__subtitle">
              Enter your email and we'll send you a reset link
            </p>
          </div>

          {done ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>📬</div>
              <h3 style={{ marginBottom: 8, color: 'var(--color-navy)' }}>Check your inbox</h3>
              <p style={{ color: 'var(--color-gray-500)', marginBottom: 24 }}>
                If this email is registered, you'll receive a reset link within a few minutes.
              </p>
              <Link href="/login" className="btn btn--primary">Back to Sign In</Link>
            </div>
          ) : (
            <>
              {error && (
                <div style={{ padding: '12px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', color: '#dc2626', fontSize: '0.85rem', marginBottom: '24px' }}>
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="forgot-email">Email Address</label>
                  <input
                    id="forgot-email"
                    type="email"
                    className="form-input"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn--primary btn--lg" style={{ width: '100%' }} disabled={loading}>
                  {loading ? <span className="loading-spinner" style={{ width: 18, height: 18, borderWidth: 2 }} /> : <>Send Reset Link <span className="btn-arrow">→</span></>}
                </button>
              </form>
              <div className="auth-card__footer">
                <Link href="/login">Back to Sign In</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="page-loading"><div className="loading-spinner" /></div>}>
      <ForgotPasswordForm />
    </Suspense>
  );
}
