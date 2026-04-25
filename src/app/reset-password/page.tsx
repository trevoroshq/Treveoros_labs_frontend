'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      setError('Invalid reset link. Please request a new one.');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_BASE}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Reset failed');
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
            <h2 className="auth-card__title">Reset Password</h2>
            <p className="auth-card__subtitle">Enter your new password below</p>
          </div>

          {done ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>✅</div>
              <h3 style={{ marginBottom: 8, color: 'var(--color-navy)' }}>Password updated!</h3>
              <p style={{ color: 'var(--color-gray-500)', marginBottom: 24 }}>
                You can now sign in with your new password.
              </p>
              <Link href="/login" className="btn btn--primary">Sign In Now</Link>
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
                  <label className="form-label" htmlFor="new-password">New Password</label>
                  <input
                    id="new-password"
                    type="password"
                    className="form-input"
                    placeholder="Min 8 characters"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    minLength={8}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="confirm-new-password">Confirm New Password</label>
                  <input
                    id="confirm-new-password"
                    type="password"
                    className="form-input"
                    placeholder="••••••••"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn--primary btn--lg"
                  style={{ width: '100%' }}
                  disabled={loading || !token}
                >
                  {loading ? <span className="loading-spinner" style={{ width: 18, height: 18, borderWidth: 2 }} /> : <>Set New Password <span className="btn-arrow">→</span></>}
                </button>
              </form>
              <div className="auth-card__footer">
                <Link href="/forgot-password">Request new link</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="page-loading"><div className="loading-spinner" /></div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
