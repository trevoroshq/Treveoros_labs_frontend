'use client';

import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { certificatesApi } from '@/lib/api';

interface CertificateData {
  code: string;
  performance: string;
  programName: string;
  issuedAt: string;
  user: { name: string };
}

export default function VerifyPage() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState<{ valid: boolean; certificate?: CertificateData } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const verifyCode = useCallback(async (c: string) => {
    if (!c) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await certificatesApi.verify(c.trim()) as { valid: boolean; certificate: CertificateData };
      setResult(data);
    } catch {
      setResult({ valid: false });
      setError('Certificate not found or invalid code');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    verifyCode(code);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const codeParam = params.get('code');
    if (codeParam) {
      setCode(codeParam);
      verifyCode(codeParam);
    }
  }, [verifyCode]);

  const perfColor = (p: string) => {
    switch (p) {
      case 'EXCEPTIONAL': return { bg: '#dcfce7', color: '#16a34a', label: '★ Exceptional' };
      case 'STRONG': return { bg: '#dbeafe', color: '#2563eb', label: '◆ Strong' };
      default: return { bg: '#fef3c7', color: '#d97706', label: '● Satisfactory' };
    }
  };

  return (
    <>
      <Navbar />
      <div className="verify-page">
        <div className="container">
          <div className="verify-card">
            <div className="section-tag" style={{ justifyContent: 'center' }}>
              <span>Certificate Verification</span>
            </div>
            <h1 style={{ fontSize: '2rem', marginBottom: 8 }}>Verify a Certificate</h1>
            <p style={{ marginBottom: 32, color: 'var(--color-gray-500)' }}>
              Enter a certificate code to verify its authenticity
            </p>

            <form onSubmit={handleVerify} style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
              <input
                type="text"
                className="form-input"
                placeholder="TL-BLD-2026-0001"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                style={{ fontFamily: 'var(--font-mono)', textAlign: 'center', letterSpacing: '0.05em' }}
              />
              <button type="submit" className="btn btn--primary" disabled={loading} style={{ flexShrink: 0 }}>
                {loading ? <span className="loading-spinner" style={{ width: 16, height: 16 }} /> : 'Verify'}
              </button>
            </form>

            {error && (
              <div className="card" style={{ borderColor: 'var(--color-error)', background: '#fef2f2' }}>
                <div className="verify-card__badge verify-card__badge--invalid">✗ Invalid</div>
                <p style={{ color: 'var(--color-error)' }}>{error}</p>
              </div>
            )}

            {result?.valid && result.certificate && (
              <div className="card card--featured" style={{ textAlign: 'left', padding: 32 }}>
                <div className="verify-card__badge verify-card__badge--valid" style={{ marginBottom: 16 }}>
                  ✓ Verified Certificate
                </div>
                <div style={{ display: 'grid', gap: 16 }}>
                  <div>
                    <div className="form-label">Certificate Holder</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-navy)' }}>
                      {result.certificate.user.name}
                    </div>
                  </div>
                  <div>
                    <div className="form-label">Program</div>
                    <div style={{ color: 'var(--color-navy)' }}>{result.certificate.programName}</div>
                  </div>
                  <div>
                    <div className="form-label">Performance</div>
                    <span className="badge" style={{
                      background: perfColor(result.certificate.performance).bg,
                      color: perfColor(result.certificate.performance).color,
                      fontSize: '0.75rem',
                    }}>
                      {perfColor(result.certificate.performance).label}
                    </span>
                  </div>
                  <div>
                    <div className="form-label">Certificate Code</div>
                    <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-navy)' }}>
                      {result.certificate.code}
                    </div>
                  </div>
                  <div>
                    <div className="form-label">Issued On</div>
                    <div style={{ color: 'var(--color-gray-600)' }}>
                      {new Date(result.certificate.issuedAt).toLocaleDateString('en-IN', {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
