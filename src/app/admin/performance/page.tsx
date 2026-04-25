'use client';

import { useState, useEffect } from 'react';
import { performanceApi } from '@/lib/api';

interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  email?: string;
  track: string;
  totalScore: number;
}

export default function AdminPerformance() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await performanceApi.leaderboard() as { leaderboard: LeaderboardEntry[] };
        setEntries(data.leaderboard);
      } catch {
        console.error('Failed to fetch leaderboard');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 4 }}>Performance</h1>
        <p style={{ color: 'var(--color-gray-500)', fontSize: '0.9rem' }}>
          Track and manage student performance scores
        </p>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 40 }}><div className="loading-spinner" /></div>
      ) : entries.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 48 }}>
          <p style={{ color: 'var(--color-gray-400)' }}>No performance data yet</p>
        </div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Student</th>
              <th>Track</th>
              <th>Total Score</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.userId}>
                <td style={{
                  fontFamily: 'var(--font-mono)', fontWeight: 700,
                  color: entry.rank <= 3 ? 'var(--color-sky)' : 'var(--color-gray-400)'
                }}>
                  #{String(entry.rank).padStart(2, '0')}
                </td>
                <td>
                  <div style={{ fontWeight: 500, color: 'var(--color-navy)' }}>{entry.name}</div>
                  {entry.email && (
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-gray-400)' }}>{entry.email}</div>
                  )}
                </td>
                <td>
                  <span className="badge" style={{
                    background: entry.track === 'BUILDER' ? 'var(--color-navy)' : '#dbeafe',
                    color: entry.track === 'BUILDER' ? 'var(--color-sky)' : 'var(--color-sky-dark)',
                  }}>
                    {entry.track}
                  </span>
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-sky)' }}>
                  {entry.totalScore}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
