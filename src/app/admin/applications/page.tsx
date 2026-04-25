'use client';

import { useState, useEffect, useCallback } from 'react';
import { applicationsApi } from '@/lib/api';

interface Application {
  id: string;
  track: string;
  motivation: string;
  status: string;
  createdAt: string;
  user: { id: string; name: string; email: string; phone?: string };
}

export default function AdminApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ status: '', track: '' });

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const params: Record<string, string> = {};
      if (filter.status) params.status = filter.status;
      if (filter.track) params.track = filter.track;
      const data = await applicationsApi.list(params) as { applications: Application[] };
      setApplications(data.applications);
    } catch {
      console.error('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => { fetchApplications(); }, [fetchApplications]);

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await applicationsApi.updateStatus(id, { status });
      fetchApplications();
    } catch {
      console.error('Failed to update status');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 4 }}>Applications</h1>
          <p style={{ color: 'var(--color-gray-500)', fontSize: '0.9rem' }}>
            Review and manage student applications
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <select
            className="form-input"
            style={{ width: 'auto', padding: '8px 12px', fontSize: '0.8rem' }}
            value={filter.status}
            onChange={(e) => setFilter(f => ({ ...f, status: e.target.value }))}
          >
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="REJECTED">Rejected</option>
          </select>
          <select
            className="form-input"
            style={{ width: 'auto', padding: '8px 12px', fontSize: '0.8rem' }}
            value={filter.track}
            onChange={(e) => setFilter(f => ({ ...f, track: e.target.value }))}
          >
            <option value="">All Tracks</option>
            <option value="FOUNDATION">Foundation</option>
            <option value="BUILDER">Builder</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 40 }}>
          <div className="loading-spinner" />
        </div>
      ) : applications.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 48 }}>
          <p style={{ color: 'var(--color-gray-400)' }}>No applications found</p>
        </div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Applicant</th>
              <th>Track</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>
                  <div style={{ fontWeight: 500, color: 'var(--color-navy)' }}>{app.user.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-gray-400)' }}>{app.user.email}</div>
                </td>
                <td>
                  <span className="badge" style={{
                    background: app.track === 'BUILDER' ? 'var(--color-navy)' : '#dbeafe',
                    color: app.track === 'BUILDER' ? 'var(--color-sky)' : 'var(--color-sky-dark)',
                  }}>
                    {app.track}
                  </span>
                </td>
                <td>
                  <span className={`badge badge--${app.status.toLowerCase()}`}>
                    {app.status}
                  </span>
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-gray-400)' }}>
                  {new Date(app.createdAt).toLocaleDateString()}
                </td>
                <td>
                  {app.status === 'PENDING' && (
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
                        className="btn btn--primary btn--sm"
                        style={{ padding: '6px 12px', fontSize: '0.65rem' }}
                        onClick={() => handleStatusUpdate(app.id, 'ACCEPTED')}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn--secondary btn--sm"
                        style={{ padding: '6px 12px', fontSize: '0.65rem', borderColor: 'var(--color-error)', color: 'var(--color-error)' }}
                        onClick={() => handleStatusUpdate(app.id, 'REJECTED')}
                      >
                        Reject
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
