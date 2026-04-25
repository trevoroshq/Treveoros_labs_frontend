'use client';

import { useState, useEffect, useCallback } from 'react';
import { certificatesApi, adminApi, programsApi } from '@/lib/api';
import { QRCodeCanvas } from 'qrcode.react';

interface Certificate {
  id: string;
  code: string;
  performance: string;
  programName: string;
  issuedAt: string;
  user: { id: string; name: string; email?: string };
}

export default function AdminCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [users, setUsers] = useState<{ id: string; name: string; email: string }[]>([]);
  const [programs, setPrograms] = useState<{ id: string; name: string; track: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [showGenerate, setShowGenerate] = useState(false);
  const [genForm, setGenForm] = useState({ userId: '', performance: 'STRONG', programName: '' });
  const [genLoading, setGenLoading] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [filterTrack, setFilterTrack] = useState<string>('ALL');

  const fetchCertificatesAndUsers = useCallback(async () => {
    try {
      const [certData, usersData, programsData] = await Promise.all([
        certificatesApi.getAll(),
        adminApi.users(),
        programsApi.list()
      ]);
      setCertificates((certData as { certificates: Certificate[] }).certificates);
      setUsers(usersData as { id: string; name: string; email: string }[]);
      setPrograms((programsData as { programs: { id: string; name: string; track: string }[] }).programs);
    } catch {
      console.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCertificatesAndUsers(); }, [fetchCertificatesAndUsers]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenLoading(true);
    try {
      await certificatesApi.generate(genForm);
      setShowGenerate(false);
      setGenForm({ userId: '', performance: 'STRONG', programName: '' });
      fetchCertificatesAndUsers();
    } catch (err: any) {
      console.error('Failed to generate certificate', err);
      alert(err.message || 'Failed to generate certificate. Please ensure the User ID is a valid CUID from the Users database.');
    } finally {
      setGenLoading(false);
    }
  };

  const perfColor = (p: string) => {
    switch (p) {
      case 'EXCEPTIONAL': return { bg: '#dcfce7', color: '#16a34a' };
      case 'STRONG': return { bg: '#dbeafe', color: '#2563eb' };
      default: return { bg: '#fef3c7', color: '#d97706' };
    }
  };

  const downloadQR = () => {
    const canvas = document.getElementById('certificate-qr-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `certificate-qr-${qrCode}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 4 }}>Certificates</h1>
          <p style={{ color: 'var(--color-gray-500)', fontSize: '0.9rem', marginBottom: 16 }}>
            Generate and manage certificates
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className={`btn btn--sm ${filterTrack === 'ALL' ? 'btn--primary' : 'btn--ghost'}`} onClick={() => setFilterTrack('ALL')}>All Tracks</button>
            <button className={`btn btn--sm ${filterTrack === 'FOUNDATION' ? 'btn--primary' : 'btn--ghost'}`} onClick={() => setFilterTrack('FOUNDATION')}>Foundation</button>
            <button className={`btn btn--sm ${filterTrack === 'BUILDER' ? 'btn--primary' : 'btn--ghost'}`} onClick={() => setFilterTrack('BUILDER')}>Builder</button>
          </div>
        </div>
        <button className="btn btn--primary btn--sm" onClick={() => setShowGenerate(!showGenerate)}>
          {showGenerate ? 'Cancel' : 'Generate Certificate'}
        </button>
      </div>

      {qrCode && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }} onClick={() => setQrCode(null)}>
          <div style={{ background: '#fff', padding: 48, borderRadius: 16, textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ marginBottom: 32, fontSize: '1.25rem', color: 'var(--color-navy)' }}>Verification QR Code</h3>
            <div style={{ padding: 16, background: '#fff', display: 'inline-block', borderRadius: 8 }}>
              <QRCodeCanvas id="certificate-qr-canvas" value={`${window.location.origin}/verify?code=${qrCode}`} size={256} />
            </div>
            <div>
              <p style={{ marginTop: 24, padding: '8px 16px', background: '#f8fafc', borderRadius: 8, fontFamily: 'var(--font-mono)', color: 'var(--color-gray-600)', display: 'inline-block' }}>
                {qrCode}
              </p>
            </div>
            <div style={{ marginTop: 32, display: 'flex', gap: 16, justifyContent: 'center' }}>
              <button className="btn btn--primary" onClick={downloadQR}>Download</button>
              <button className="btn btn--secondary" onClick={() => setQrCode(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {showGenerate && (
        <div className="card" style={{ marginBottom: 24, padding: 24 }}>
          <h3 style={{ marginBottom: 16, fontSize: '1rem' }}>Generate New Certificate</h3>
          <form onSubmit={handleGenerate} style={{ display: 'grid', gap: 16 }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="gen-userId">Student</label>
              <select
                id="gen-userId"
                className="form-input"
                value={genForm.userId}
                onChange={(e) => setGenForm(f => ({ ...f, userId: e.target.value }))}
                required
              >
                <option value="" disabled>Select a student</option>
                {users.map(u => (
                  <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                ))}
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="gen-program">Program</label>
              <select
                id="gen-program"
                className="form-input"
                value={genForm.programName}
                onChange={(e) => setGenForm(f => ({ ...f, programName: e.target.value }))}
                required
              >
                <option value="" disabled>Select a program</option>
                {programs.map(p => (
                  <option key={p.id} value={p.name}>[{p.track}] {p.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor="gen-perf">Performance Level</label>
              <select
                id="gen-perf"
                className="form-input"
                value={genForm.performance}
                onChange={(e) => setGenForm(f => ({ ...f, performance: e.target.value }))}
              >
                <option value="EXCEPTIONAL">Exceptional</option>
                <option value="STRONG">Strong</option>
                <option value="SATISFACTORY">Satisfactory</option>
              </select>
            </div>
            <button type="submit" className="btn btn--primary btn--sm" disabled={genLoading}>
              {genLoading ? <span className="loading-spinner" style={{ width: 14, height: 14 }} /> : 'Generate'}
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 40 }}><div className="loading-spinner" /></div>
      ) : certificates.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 48 }}>
          <p style={{ color: 'var(--color-gray-400)' }}>No certificates issued yet</p>
        </div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Student</th>
              <th>Program</th>
              <th>Performance</th>
              <th>Issued</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {certificates.filter(c => filterTrack === 'ALL' || (filterTrack === 'BUILDER' ? c.programName.includes('Builder') : c.programName.includes('Foundation'))).map((cert) => {
              const pc = perfColor(cert.performance);
              return (
                <tr key={cert.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-navy)' }}>
                    {cert.code}
                  </td>
                  <td>
                    <div style={{ fontWeight: 500, color: 'var(--color-navy)' }}>{cert.user.name}</div>
                    {cert.user.email && (
                      <div style={{ fontSize: '0.8rem', color: 'var(--color-gray-400)' }}>{cert.user.email}</div>
                    )}
                  </td>
                  <td style={{ fontSize: '0.85rem' }}>{cert.programName}</td>
                  <td>
                    <span className="badge" style={{ background: pc.bg, color: pc.color }}>
                      {cert.performance}
                    </span>
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-gray-400)' }}>
                    {new Date(cert.issuedAt).toLocaleDateString()}
                  </td>
                  <td>
                    <button 
                      className="btn btn--secondary btn--sm" 
                      style={{ padding: '4px 8px', fontSize: '0.7rem' }}
                      onClick={() => setQrCode(cert.code)}
                    >
                      Show QR
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
