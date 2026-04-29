'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/lib/auth-context';




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



  return (
    <>
      <Navbar />
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-card__header">
            <h2 className="auth-card__title">Create Account</h2>
            <p className="auth-card__subtitle">Join TREVOROS LABS and start building</p>
          </div>



          {error && (
            <div style={{ padding: '12px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', color: '#dc2626', fontSize: '0.85rem', marginBottom: '24px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Full Name</label>
              <input id="name" type="text" className="form-input" placeholder="Your Name" value={form.name} onChange={(e) => updateField('name', e.target.value)} required />
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
