'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/lib/auth-context';


const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" style={{ marginRight: 8 }}>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);



export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone || undefined,
      });
      router.push('/dashboard');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const oauthLogin = (provider: 'google') => {
    window.location.href = `/api/auth/${provider}`;
  };

  return (
    <>
      <Navbar />
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-card__header">
            <h2 className="auth-card__title">Create Account</h2>
            <p className="auth-card__subtitle">Join TREVORORS LABS and start building</p>
          </div>

          {/* OAuth Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            <button
              onClick={() => oauthLogin('google')}
              className="btn btn--secondary btn--lg"
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <GoogleIcon /> Continue with Google
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ flex: 1, height: 1, background: 'var(--color-gray-200)' }} />
            <span style={{ color: 'var(--color-gray-400)', fontSize: '0.8rem' }}>or register with email</span>
            <div style={{ flex: 1, height: 1, background: 'var(--color-gray-200)' }} />
          </div>

          {error && (
            <div style={{ padding: '12px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', color: '#dc2626', fontSize: '0.85rem', marginBottom: '24px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Full Name</label>
              <input id="name" type="text" className="form-input" placeholder="John Doe" value={form.name} onChange={(e) => updateField('name', e.target.value)} required />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-email">Email Address</label>
              <input id="reg-email" type="email" className="form-input" placeholder="you@example.com" value={form.email} onChange={(e) => updateField('email', e.target.value)} required />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="phone">Phone Number <span style={{ color: 'var(--color-gray-400)', textTransform: 'lowercase', letterSpacing: 'normal' }}>(optional)</span></label>
              <input id="phone" type="tel" className="form-input" placeholder="+91 9876543210" value={form.phone} onChange={(e) => updateField('phone', e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-password">Password</label>
              <input id="reg-password" type="password" className="form-input" placeholder="Min 8 characters" value={form.password} onChange={(e) => updateField('password', e.target.value)} required minLength={8} />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="confirm-password">Confirm Password</label>
              <input id="confirm-password" type="password" className="form-input" placeholder="••••••••" value={form.confirmPassword} onChange={(e) => updateField('confirmPassword', e.target.value)} required />
            </div>

            <button type="submit" className="btn btn--primary btn--lg" style={{ width: '100%' }} disabled={loading}>
              {loading ? (
                <span className="loading-spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
              ) : (
                <>Create Account <span className="btn-arrow">→</span></>
              )}
            </button>
          </form>

          <div className="auth-card__footer">
            Already have an account?{' '}
            <Link href="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </>
  );
}
