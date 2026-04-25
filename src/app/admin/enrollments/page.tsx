'use client';

import { useState, useEffect } from 'react';
import { enrollmentsApi } from '@/lib/api';

interface Enrollment {
  id: string;
  status: string;
  enrolledAt: string;
  user: { id: string; name: string; email: string };
  program: { id: string; name: string; track: string };
}

export default function AdminEnrollments() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const data = await enrollmentsApi.getAll() as { enrollments: Enrollment[] };
        setEnrollments(data.enrollments);
      } catch {
        console.error('Failed to fetch enrollments');
      } finally {
        setLoading(false);
      }
    };
    fetchEnrollments();
  }, []);

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await enrollmentsApi.updateStatus(id, { status });
      setEnrollments(prev =>
        prev.map(e => e.id === id ? { ...e, status } : e)
      );
    } catch {
      console.error('Failed to update enrollment status');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 4 }}>Enrollments</h1>
        <p style={{ color: 'var(--color-gray-500)', fontSize: '0.9rem' }}>
          Manage program enrollments
        </p>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 40 }}><div className="loading-spinner" /></div>
      ) : enrollments.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 48 }}>
          <p style={{ color: 'var(--color-gray-400)' }}>No enrollments found</p>
        </div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Program</th>
              <th>Track</th>
              <th>Status</th>
              <th>Enrolled</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((e) => (
              <tr key={e.id}>
                <td>
                  <div style={{ fontWeight: 500, color: 'var(--color-navy)' }}>{e.user.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-gray-400)' }}>{e.user.email}</div>
                </td>
                <td style={{ fontSize: '0.85rem' }}>{e.program.name}</td>
                <td>
                  <span className="badge" style={{
                    background: e.program.track === 'BUILDER' ? 'var(--color-navy)' : '#dbeafe',
                    color: e.program.track === 'BUILDER' ? 'var(--color-sky)' : 'var(--color-sky-dark)',
                  }}>
                    {e.program.track}
                  </span>
                </td>
                <td><span className={`badge badge--${e.status.toLowerCase()}`}>{e.status}</span></td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-gray-400)' }}>
                  {new Date(e.enrolledAt).toLocaleDateString()}
                </td>
                <td>
                  {e.status === 'ACTIVE' && (
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
                        className="btn btn--primary btn--sm"
                        style={{ padding: '6px 12px', fontSize: '0.65rem' }}
                        onClick={() => handleStatusUpdate(e.id, 'COMPLETED')}
                      >
                        Complete
                      </button>
                      <button
                        className="btn btn--secondary btn--sm"
                        style={{ padding: '6px 12px', fontSize: '0.65rem', borderColor: 'var(--color-error)', color: 'var(--color-error)' }}
                        onClick={() => handleStatusUpdate(e.id, 'DROPPED')}
                      >
                        Drop
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
