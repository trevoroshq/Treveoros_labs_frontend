'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/lib/auth-context';




export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
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
            <h2 className="auth-card__title">Welcome Back</h2>
            <p className="auth-card__subtitle">Sign in to your TREVOROS LABS account</p>
          </div>



          {error && (
            <div style={{ padding: '12px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', color: '#dc2626', fontSize: '0.85rem', marginBottom: '24px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label className="form-label" htmlFor="password" style={{ marginBottom: 0 }}>Password</label>
                <Link href="/forgot-password" style={{ fontSize: '0.8rem', color: 'var(--color-sky)' }}>Forgot password?</Link>
              </div>
              <input
                id="password"
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn--primary btn--lg"
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? (
                <span className="loading-spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
              ) : (
                <>Sign In <span className="btn-arrow">→</span></>
              )}
            </button>
          </form>

          <div className="auth-card__footer">
            Don&apos;t have an account?{' '}
            <Link href="/register">Create one</Link>
          </div>
        </div>
      </div>
    </>
  );
}
