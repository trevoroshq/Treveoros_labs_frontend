'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/lib/auth-context';
import { applicationsApi, batchesApi } from '@/lib/api';

/* ─── Data ─────────────────────────────────────────────────────── */
const DEGREES = ['B.Tech', 'M.Tech', 'BCA', 'MCA', 'BE', 'ME', 'B.Sc', 'M.Sc', 'Other'];
const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduated', 'Post Graduate'];
const TRACK_PRICES: Record<string, number> = {
  FOUNDATION: 2000,
  BUILDER: 4000,
};

/* ─── Step Indicator ────────────────────────────────────────────── */
function StepIndicator({ current, total }: { current: number; total: number }) {
  const steps = ['Basic Info', 'Education', 'Batch & Track'];
  return (
    <div className="apply-steps">
      {steps.map((label, i) => {
        const idx = i + 1;
        const done = idx < current;
        const active = idx === current;
        return (
          <div key={idx} className={`apply-step ${active ? 'apply-step--active' : ''} ${done ? 'apply-step--done' : ''}`}>
            <div className="apply-step__circle">
              {done ? '✓' : idx}
            </div>
            <span className="apply-step__label">{label}</span>
            {i < total - 1 && <div className="apply-step__line" />}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Validation helpers ─────────────────────────────────────────── */
function validateStep1(form: { name: string; email: string; phone: string }) {
  if (!form.name.trim() || form.name.trim().length < 2) return 'Full name must be at least 2 characters';
  if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return 'Please enter a valid email address';
  if (!form.phone.trim() || !form.phone.match(/^[+\d][\d\s\-()]{7,}$/)) return 'Please enter a valid phone number';
  return null;
}

function validateStep2(form: { college: string; degree: string; year: string }) {
  if (!form.college.trim() || form.college.trim().length < 3) return 'Please enter your college name';
  if (!form.degree) return 'Please select your degree';
  if (!form.year) return 'Please select your year of study';
  return null;
}

function validateStep3(form: { batch: string; track: string }) {
  if (!form.batch) return 'Please select a batch date';
  if (!form.track) return 'Please select a track';
  return null;
}

/* ─── Main Form ─────────────────────────────────────────────────── */
function ApplyForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const initialTrack = searchParams.get('track')?.toUpperCase() || '';

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    degree: '',
    year: '',
    batch: '',
    track: ['FOUNDATION', 'BUILDER'].includes(initialTrack) ? initialTrack : '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [batchesList, setBatchesList] = useState<{label: string, value: string, track: string}[]>([]);

  // Fetch active batches dynamically
  useEffect(() => {
    if (user) {
      batchesApi.list()
        .then((data: any) => {
          const activeBatches = data.filter((b: any) => b.isActive);
          const mapped = activeBatches.map((b: any) => {
            const date = new Date(b.startDate);
            const label = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
            const value = b.startDate.split('T')[0];
            return { label, value, track: b.track };
          });
          mapped.sort((a: any, b: any) => new Date(a.value).getTime() - new Date(b.value).getTime());
          setBatchesList(mapped);
        })
        .catch(console.error);
    }
  }, [user]);

  // Pre-fill name/email from auth user
  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        name: prev.name || (user as { name?: string }).name || '',
        email: prev.email || (user as { email?: string }).email || '',
      }));
    }
  }, [user]);

  const update = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  // ── Auth gate ──────────────────────────────────────────────────
  if (authLoading) {
    return (
      <div className="page-loading">
        <div className="loading-spinner" />
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="apply-page">
          <div className="container">
            <div className="apply-card" style={{ textAlign: 'center', padding: '64px 48px' }}>
              <div style={{ fontSize: '3rem', marginBottom: 24 }}>🔒</div>
              <h2 style={{ marginBottom: 8 }}>Account Required</h2>
              <p style={{ color: 'var(--color-gray-500)', marginBottom: 32, maxWidth: 400, margin: '0 auto 32px' }}>
                You need a TREVORORS LABS account to submit an application.
                Create one for free — it only takes a minute!
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={() => router.push('/register')} className="btn btn--primary btn--lg">
                  Create Account <span className="btn-arrow">→</span>
                </button>
                <button onClick={() => router.push('/login')} className="btn btn--ghost btn--lg">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── Submitted State ────────────────────────────────────────────
  if (submitted) {
    return (
      <>
        <Navbar />
        <div className="apply-page">
          <div className="container">
            <div className="apply-card" style={{ textAlign: 'center', padding: '64px 48px' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '2rem' }}>✓</div>
              <h2 style={{ marginBottom: 8 }}>Application Submitted!</h2>
              <p style={{ marginBottom: 8, color: 'var(--color-gray-500)' }}>
                We&apos;ll review your application within 48 hours.
              </p>
              <p style={{ marginBottom: 32, color: 'var(--color-gray-500)' }}>
                Selected: <strong>{form.track === 'FOUNDATION' ? 'Foundation Track' : 'Builder Track'}</strong> · Batch: <strong>{batchesList.find(b => b.value === form.batch)?.label || form.batch}</strong>
              </p>
              <button onClick={() => router.push('/dashboard')} className="btn btn--primary">
                Go to Dashboard <span className="btn-arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── Navigation ─────────────────────────────────────────────────
  const goNext = () => {
    let err: string | null = null;
    if (step === 1) err = validateStep1(form);
    if (step === 2) err = validateStep2(form);
    if (err) {
      setSubmitError(err);
      return;
    }
    setSubmitError('');
    setStep(s => s + 1);
  };

  const goBack = () => {
    setSubmitError('');
    setStep(s => s - 1);
  };

  // ── Submit ─────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateStep3(form);
    if (err) { setSubmitError(err); return; }

    setLoading(true);
    setSubmitError('');
    try {
      await applicationsApi.create({
        track: form.track as 'FOUNDATION' | 'BUILDER',
        motivation: `Applicant: ${form.name} | College: ${form.college} | Degree: ${form.degree} | Year: ${form.year} | Batch: ${form.batch} | Phone: ${form.phone}`,
        experience: `${form.degree} - ${form.year} at ${form.college}`,
        college: form.college,
        degree: form.degree,
        batchDate: form.batch,
        phone: form.phone,
      });
      // Show success screen — application is now PENDING review
      // Payment is only unlocked after admin accepts the application
      setSubmitted(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Application failed. Please try again.';
      setSubmitError(message);
    } finally {
      setLoading(false);
    }

  };

  const price = form.track ? TRACK_PRICES[form.track] : null;

  const availableBatches = form.track ? batchesList.filter(b => b.track === form.track) : [];
  const uniqueBatches = Array.from(new Map(availableBatches.map(item => [item.value, item])).values());

  return (
    <>
      <Navbar />
      <div className="apply-page">
        <div className="container">
          <div className="apply-card">
            {/* Header */}
            <div className="apply-card__header">
              <h2 className="apply-card__title">Apply to TREVORORS LABS</h2>
              <p className="apply-card__subtitle">Complete all 3 steps to submit your application</p>
            </div>

            {/* Step Indicator */}
            <StepIndicator current={step} total={3} />

            {/* Error Banner */}
            {submitError && (
              <div className="apply-error">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* ── Step 1: Basic Info ── */}
              {step === 1 && (
                <div className="apply-step-panel">
                  <div className="apply-step-panel__title">Step 1: Basic Information</div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="apply-name">Full Name</label>
                    <input
                      id="apply-name"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Arjun Mehta"
                      value={form.name}
                      onChange={e => update('name', e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="apply-email">Email Address</label>
                    <input
                      id="apply-email"
                      type="email"
                      className="form-input"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={e => update('email', e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="apply-phone">Phone Number</label>
                    <input
                      id="apply-phone"
                      type="tel"
                      className="form-input"
                      placeholder="+91 9876543210"
                      value={form.phone}
                      onChange={e => update('phone', e.target.value)}
                      required
                    />
                  </div>

                  <button type="button" className="btn btn--primary btn--lg" style={{ width: '100%' }} onClick={goNext}>
                    Continue <span className="btn-arrow">→</span>
                  </button>
                </div>
              )}

              {/* ── Step 2: Education ── */}
              {step === 2 && (
                <div className="apply-step-panel">
                  <div className="apply-step-panel__title">Step 2: Education Details</div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="apply-college">College / University Name</label>
                    <input
                      id="apply-college"
                      type="text"
                      className="form-input"
                      placeholder="e.g. IIT Bombay, VIT Vellore"
                      value={form.college}
                      onChange={e => update('college', e.target.value)}
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="apply-degree">Degree</label>
                      <select
                        id="apply-degree"
                        className="form-input form-select"
                        value={form.degree}
                        onChange={e => update('degree', e.target.value)}
                        required
                      >
                        <option value="">Select degree</option>
                        {DEGREES.map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="apply-year">Year of Study</label>
                      <select
                        id="apply-year"
                        className="form-input form-select"
                        value={form.year}
                        onChange={e => update('year', e.target.value)}
                        required
                      >
                        <option value="">Select year</option>
                        {YEARS.map(y => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="apply-step-panel__nav">
                    <button type="button" className="btn btn--secondary btn--lg" onClick={goBack}>
                      ← Back
                    </button>
                    <button type="button" className="btn btn--primary btn--lg" onClick={goNext}>
                      Continue <span className="btn-arrow">→</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ── Step 3: Batch & Track ── */}
              {step === 3 && (
                <div className="apply-step-panel">
                  <div className="apply-step-panel__title">Step 3: Batch &amp; Track Selection</div>

                  {/* Track Selection */}
                  <div className="form-group">
                    <label className="form-label">Select Your Track</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      {[
                        { value: 'FOUNDATION', icon: '◈', label: 'Foundation Track', subtitle: '6 Weeks · ₹2,000', tag: 'Beginner Friendly' },
                        { value: 'BUILDER', icon: '⚡', label: 'Builder Track', subtitle: '8 Weeks · ₹4,000', tag: 'Advanced' },
                      ].map(t => (
                        <button
                          key={t.value}
                          type="button"
                          className={`apply-track-option ${form.track === t.value ? 'apply-track-option--active' : ''}`}
                          onClick={() => update('track', t.value)}
                        >
                          <div style={{ fontSize: '1.5rem', marginBottom: 6 }}>{t.icon}</div>
                          <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-navy)', marginBottom: 2 }}>{t.label}</div>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-sky)' }}>{t.subtitle}</div>
                          <div className={`apply-track-option__tag ${t.value === 'FOUNDATION' ? 'apply-track-option__tag--beginner' : 'apply-track-option__tag--advanced'}`}>
                            {t.tag}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Batch Selection */}
                  <div className="form-group">
                    <label className="form-label">Select Batch Start Date</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      {uniqueBatches.length > 0 ? (
                        uniqueBatches.map(b => (
                          <button
                            key={b.value}
                            type="button"
                            className={`apply-batch-option ${form.batch === b.value ? 'apply-batch-option--active' : ''}`}
                            onClick={() => update('batch', b.value)}
                          >
                            <div style={{ fontSize: '1.25rem', marginBottom: 4 }}>📅</div>
                            <div style={{ fontWeight: 600, color: 'var(--color-navy)', fontSize: '0.95rem' }}>{b.label}</div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-gray-400)', marginTop: 2 }}>COHORT {b.label.split(' ').pop()}</div>
                          </button>
                        ))
                      ) : (
                        <div style={{ color: 'var(--color-gray-500)', fontSize: '0.9rem', gridColumn: '1 / -1', padding: '12px 0' }}>
                          {form.track ? 'No active batches available for this track right now.' : 'Please select a track first to view available batches.'}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Price Summary */}
                  {price && (
                    <div className="apply-price-summary">
                      <div className="apply-price-summary__label">Programme Fee</div>
                      <div className="apply-price-summary__price">₹{price.toLocaleString('en-IN')}</div>
                      <div className="apply-price-summary__note">Payment collected after acceptance</div>
                    </div>
                  )}

                  <div className="apply-step-panel__nav">
                    <button type="button" className="btn btn--secondary btn--lg" onClick={goBack}>
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="btn btn--primary btn--lg"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="loading-spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
                      ) : (
                        <>Submit Application <span className="btn-arrow">→</span></>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={
      <div className="page-loading"><div className="loading-spinner" /></div>
    }>
      <ApplyForm />
    </Suspense>
  );
}
