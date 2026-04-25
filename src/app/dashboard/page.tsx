'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/lib/auth-context';
import { applicationsApi, paymentsApi, enrollmentsApi, certificatesApi } from '@/lib/api';

interface Application {
  id: string;
  track: string;
  status: string;
  createdAt: string;
}

interface Payment {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
}

interface Enrollment {
  id: string;
  status: string;
  enrolledAt: string;
  program: { name: string; track: string };
}

interface Certificate {
  id: string;
  code: string;
  performance: string;
  programName: string;
  issuedAt: string;
}

function certPreviewPath(performance: string): string {
  if (performance === 'EXCEPTIONAL') return '/Certificate_Exceptional.png';
  if (performance === 'STRONG') return '/Certificate_strong.png';
  return '/Certificate_Satisfactory.png';
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading, logout } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const [appsRes, payRes, enrollRes, certRes] = await Promise.allSettled([
          applicationsApi.getMy().catch(() => ({ applications: [] })),
          paymentsApi.getByUser(user.id),
          enrollmentsApi.getByUser(user.id),
          certificatesApi.getByUser(user.id),
        ]);

        if (appsRes.status === 'fulfilled') {
          const data = appsRes.value as { applications?: Application[]; application?: Application };
          setApplications(data.applications || (data.application ? [data.application] : []));
        }
        if (payRes.status === 'fulfilled') {
          const data = payRes.value as { payments: Payment[] };
          setPayments(data.payments || []);
        }
        if (enrollRes.status === 'fulfilled') {
          const data = enrollRes.value as { enrollments: Enrollment[] };
          setEnrollments(data.enrollments || []);
        }
        if (certRes.status === 'fulfilled') {
          const data = certRes.value as { certificates: Certificate[] };
          setCertificates(data.certificates || []);
        }
      } catch {
        // Silently handle errors
      } finally {
        setDataLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (authLoading) {
    return (
      <div className="page-loading">
        <div className="loading-spinner" />
      </div>
    );
  }

  if (!user) return null;

  const latestApp = applications[0];
  const latestPayment = payments[0];
  const activeEnrollment = enrollments.find(e => e.status === 'ACTIVE');
  const latestCert = certificates[0];

  const statusColor = (status?: string) => {
    switch (status) {
      case 'ACCEPTED':
      case 'COMPLETED':
      case 'ACTIVE': return 'var(--color-success)';
      case 'PENDING': return 'var(--color-warning)';
      case 'REJECTED':
      case 'FAILED': return 'var(--color-error)';
      default: return 'var(--color-gray-400)';
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard__header">
          <div className="container">
            <p className="dashboard__welcome">Welcome back,</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h1 className="dashboard__title">{user.name}</h1>
              <button onClick={logout} className="btn btn--ghost btn--sm">Sign Out</button>
            </div>
          </div>
        </div>

        <div className="container">
          {dataLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 48 }}>
              <div className="loading-spinner" />
            </div>
          ) : (
            <>
              <div className="dashboard__grid">
                {/* Application Status */}
                <div className="stat-card">
                  <div className="stat-card__label">Application Status</div>
                  <div className="stat-card__value" style={{ fontSize: '1.25rem' }}>
                    {latestApp ? (
                      <span className={`badge badge--${latestApp.status.toLowerCase()}`}>
                        {latestApp.status}
                      </span>
                    ) : (
                      <span style={{ color: 'var(--color-gray-400)' }}>No Application</span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-gray-400)', marginTop: 12 }}>
                    {latestApp
                      ? `${latestApp.track} · Submitted ${new Date(latestApp.createdAt).toLocaleDateString()}`
                      : 'Submit an application to get started'}
                  </p>
                </div>

                {/* Payment Status */}
                <div className="stat-card">
                  <div className="stat-card__label">Payment</div>
                  <div className="stat-card__value" style={{ fontSize: '1.25rem' }}>
                    {latestPayment ? (
                      <span className={`badge badge--${latestPayment.status.toLowerCase()}`}>
                        {latestPayment.status}
                      </span>
                    ) : (
                      <span style={{ color: statusColor() }}>
                        {latestApp?.status === 'ACCEPTED' ? 'Payment Required' : 'Awaiting Acceptance'}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-gray-400)', marginTop: 12 }}>
                    {latestPayment
                      ? `₹${(latestPayment.amount / 100).toLocaleString('en-IN')} · ${new Date(latestPayment.createdAt).toLocaleDateString()}`
                      : 'Payment link available after acceptance'}
                  </p>
                  {latestApp?.status === 'ACCEPTED' && (!latestPayment || latestPayment.status !== 'COMPLETED') && (
                    <button 
                      onClick={() => router.push(`/payment?track=${latestApp.track}`)} 
                      className="btn btn--primary btn--sm" 
                      style={{ marginTop: 16, width: '100%', background: 'var(--color-success)', borderColor: 'var(--color-success)', display: 'flex', justifyContent: 'center' }}
                    >
                      Continue Payment <span className="btn-arrow">→</span>
                    </button>
                  )}
                </div>

                {/* Enrollment */}
                <div className="stat-card">
                  <div className="stat-card__label">Enrollment</div>
                  <div className="stat-card__value" style={{ fontSize: '1.25rem' }}>
                    {activeEnrollment ? (
                      <span className="badge badge--active">ACTIVE</span>
                    ) : enrollments.length > 0 ? (
                      <span className={`badge badge--${enrollments[0].status.toLowerCase()}`}>
                        {enrollments[0].status}
                      </span>
                    ) : (
                      <span style={{ color: 'var(--color-gray-400)' }}>Not Enrolled</span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-gray-400)', marginTop: 12 }}>
                    {activeEnrollment
                      ? `${activeEnrollment.program.name}`
                      : 'Enroll after completing payment'}
                  </p>
                </div>

                {/* Certificate */}
                <div className="stat-card">
                  <div className="stat-card__label">Certificate</div>
                  <div className="stat-card__value" style={{ fontSize: '1.25rem' }}>
                    {latestCert ? (
                      <span className="badge badge--completed">{latestCert.performance}</span>
                    ) : (
                      <span style={{ color: 'var(--color-gray-400)' }}>In Progress</span>
                    )}
                  </div>
                  {latestCert && (
                    <div style={{ marginTop: 14, borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.12)' }}>
                      <img
                        src={certPreviewPath(latestCert.performance)}
                        alt={`${latestCert.performance} Certificate`}
                        style={{ width: '100%', display: 'block', borderRadius: 8 }}
                      />
                    </div>
                  )}
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-gray-400)', marginTop: 12 }}>
                    {latestCert
                      ? `${latestCert.code} · ${latestCert.programName}`
                      : 'Complete the program to earn your certificate'}
                  </p>
                </div>
              </div>

              {/* Certificates List */}
              {certificates.length > 0 && (
                <div className="card" style={{ marginTop: 8 }}>
                  <h3 style={{ marginBottom: 20 }}>Your Certificates</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    {certificates.map((cert) => (
                      <div key={cert.id} style={{
                        display: 'grid',
                        gridTemplateColumns: '180px 1fr auto',
                        gap: 20,
                        alignItems: 'center',
                        paddingBottom: 24,
                        borderBottom: '1px solid var(--color-gray-100)',
                      }}>
                        {/* Preview image */}
                        <div style={{ borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.12)', flexShrink: 0 }}>
                          <img
                            src={certPreviewPath(cert.performance)}
                            alt={`${cert.performance} Certificate`}
                            style={{ width: '100%', display: 'block' }}
                          />
                        </div>
                        {/* Details */}
                        <div>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: 4, letterSpacing: '0.5px' }}>
                            {cert.code}
                          </div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-gray-600)', marginBottom: 4 }}>
                            {cert.programName}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-400)' }}>
                            Performance: <strong>{cert.performance}</strong> &nbsp;·&nbsp; Issued {new Date(cert.issuedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                          </div>
                        </div>
                        {/* Action */}
                        <Link href={`/verify?code=${cert.code}`} className="btn btn--secondary btn--sm" style={{ padding: '8px 16px', fontSize: '0.72rem', whiteSpace: 'nowrap' }}>
                          Verify →
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="card" style={{ marginTop: 8, marginBottom: 48 }}>
                <h3 style={{ marginBottom: 16 }}>Quick Actions</h3>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {!latestApp && (
                    <button onClick={() => router.push('/apply')} className="btn btn--primary btn--sm">
                      Submit Application <span className="btn-arrow">→</span>
                    </button>
                  )}
                  {latestApp && !latestApp.status.includes('REJECTED') && (
                    <button onClick={() => router.push('/apply')} className="btn btn--secondary btn--sm" disabled>
                      Application Submitted ✓
                    </button>
                  )}
                  {latestApp?.status === 'ACCEPTED' && (!latestPayment || latestPayment.status !== 'COMPLETED') && (
                    <button onClick={() => router.push(`/payment?track=${latestApp.track}`)} className="btn btn--primary btn--sm" style={{ background: 'var(--color-success)', borderColor: 'var(--color-success)' }}>
                      Pay Now <span className="btn-arrow">→</span>
                    </button>
                  )}
                  <button className="btn btn--secondary btn--sm" disabled={!latestPayment || latestPayment.status !== 'COMPLETED'}>
                    View Certificate
                  </button>
                  {user.role === 'ADMIN' && (
                    <button onClick={() => router.push('/admin')} className="btn btn--primary btn--sm">
                      Admin Panel <span className="btn-arrow">→</span>
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
