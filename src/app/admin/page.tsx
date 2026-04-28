'use client';

import { useState, useEffect } from 'react';
import { adminApi } from '@/lib/api';

interface AdminStats {
  totalApplications: number;
  pendingApplications: number;
  acceptedApplications: number;
  rejectedApplications: number;
  totalPayments: number;
  completedPayments: number;
  totalEnrollments: number;
  activeEnrollments: number;
  totalCertificates: number;
  totalUsers: number;
  totalRevenue: number;
  activities: { action: string; user: string; time: string; type: string }[];
}

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const diff = now - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminApi.stats() as AdminStats;
        setStats(data);
      } catch {
        // Fallback to empty stats on error
        setStats({
          totalApplications: 0, pendingApplications: 0, acceptedApplications: 0,
          rejectedApplications: 0, totalPayments: 0, completedPayments: 0,
          totalEnrollments: 0, activeEnrollments: 0, totalCertificates: 0,
          totalUsers: 0, totalRevenue: 0, activities: [],
        });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading || !stats) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 80 }}>
        <div className="loading-spinner" />
      </div>
    );
  }

  const formatCurrency = (paise: number) => `₹${(paise / 100).toLocaleString('en-IN')}`;
  const acceptanceRate = stats.totalApplications > 0
    ? ((stats.acceptedApplications / stats.totalApplications) * 100).toFixed(1)
    : '0';

  const statCards = [
    { label: 'Total Applications', value: stats.totalApplications, change: `${stats.pendingApplications} pending` },
    { label: 'Pending Review', value: stats.pendingApplications, change: 'Needs attention', warn: true },
    { label: 'Accepted', value: stats.acceptedApplications, change: `${acceptanceRate}% acceptance rate` },
    { label: 'Payments Received', value: stats.completedPayments, change: `${formatCurrency(stats.totalRevenue)} total` },
    { label: 'Active Enrollments', value: stats.activeEnrollments, change: `${stats.totalEnrollments} total` },
    { label: 'Certificates Issued', value: stats.totalCertificates, change: `${stats.totalUsers} total users` },
  ];

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 4 }}>Dashboard</h1>
        <p style={{ color: 'var(--color-gray-500)', fontSize: '0.9rem' }}>
          Overview of the TREVOROS LABS platform
        </p>
      </div>

      <div className="dashboard__grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {statCards.map((card) => (
          <div key={card.label} className="stat-card">
            <div className="stat-card__label">{card.label}</div>
            <div className="stat-card__value">{card.value}</div>
            <div className="stat-card__change" style={{
              color: card.warn ? 'var(--color-warning)' : 'var(--color-success)'
            }}>
              {card.change}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="card" style={{ marginTop: 24 }}>
        <h3 style={{ marginBottom: 16 }}>Recent Activity</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {stats.activities.length === 0 ? (
            <p style={{ color: 'var(--color-gray-400)', textAlign: 'center', padding: 24 }}>
              No recent activity
            </p>
          ) : (
            stats.activities.map((activity, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 0',
                borderBottom: i < stats.activities.length - 1 ? '1px solid var(--color-gray-100)' : 'none',
              }}>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--color-navy)' }}>
                    {activity.action}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-gray-400)' }}>
                    {activity.user}
                  </div>
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--color-gray-400)',
                }}>
                  {timeAgo(activity.time)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
