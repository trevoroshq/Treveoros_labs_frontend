'use client';

import { useState, useEffect, useCallback } from 'react';
import { adminApi } from '@/lib/api';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  createdAt: string;
  applications: { status: string; track: string }[];
  payments: { status: string; amount: number }[];
  enrollments: { status: string; program: { name: string } }[];
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await adminApi.users() as User[];
      setUsers(data);
    } catch {
      console.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 4 }}>Users Database</h1>
          <p style={{ color: 'var(--color-gray-500)', fontSize: '0.9rem' }}>
            Comprehensive view of all registered student data
          </p>
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 40 }}>
          <div className="loading-spinner" />
        </div>
      ) : users.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 48 }}>
          <p style={{ color: 'var(--color-gray-400)' }}>No users found</p>
        </div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>User Details</th>
              <th>Role</th>
              <th>Application</th>
              <th>Payment</th>
              <th>Enrollment</th>
              <th>Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const latestApp = u.applications?.[0];
              const latestPayment = u.payments?.[0];
              const latestEnrollment = u.enrollments?.[0];

              return (
                <tr key={u.id}>
                  <td>
                    <div style={{ fontWeight: 500, color: 'var(--color-navy)' }}>{u.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-gray-400)' }}>{u.email}</div>
                    {u.phone && <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-300)' }}>{u.phone}</div>}
                  </td>
                  <td>
                    <span className="badge" style={{ background: u.role === 'ADMIN' ? '#fee2e2' : '#f1f5f9', color: u.role === 'ADMIN' ? '#991b1b' : '#334155' }}>
                      {u.role}
                    </span>
                  </td>
                  <td>
                    {latestApp ? (
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 500 }}>{latestApp.track}</div>
                        <span className={`badge badge--${latestApp.status.toLowerCase()}`} style={{ marginTop: 4 }}>
                          {latestApp.status}
                        </span>
                      </div>
                    ) : (
                      <span style={{ color: 'var(--color-gray-300)', fontSize: '0.8rem' }}>None</span>
                    )}
                  </td>
                  <td>
                    {latestPayment ? (
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 500 }}>₹{latestPayment.amount / 100}</div>
                        <span className={`badge badge--${latestPayment.status.toLowerCase()}`} style={{ marginTop: 4 }}>
                          {latestPayment.status}
                        </span>
                      </div>
                    ) : (
                      <span style={{ color: 'var(--color-gray-300)', fontSize: '0.8rem' }}>None</span>
                    )}
                  </td>
                  <td>
                    {latestEnrollment ? (
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 500 }}>{latestEnrollment.program?.name}</div>
                        <span className={`badge badge--${latestEnrollment.status.toLowerCase()}`} style={{ marginTop: 4 }}>
                          {latestEnrollment.status}
                        </span>
                      </div>
                    ) : (
                      <span style={{ color: 'var(--color-gray-300)', fontSize: '0.8rem' }}>None</span>
                    )}
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-gray-400)' }}>
                    {new Date(u.createdAt).toLocaleDateString()}
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
