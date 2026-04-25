'use client';

import { useState, useEffect } from 'react';
import { paymentsApi } from '@/lib/api';

interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  razorpayOrderId: string | null;
  razorpayPaymentId: string | null;
  createdAt: string;
  user: { id: string; name: string; email: string };
}

export default function AdminPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await paymentsApi.getAll() as { payments: Payment[] };
        setPayments(data.payments);
      } catch {
        console.error('Failed to fetch payments');
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const formatAmount = (paise: number) => `₹${(paise / 100).toLocaleString('en-IN')}`;

  const totalRevenue = payments
    .filter(p => p.status === 'COMPLETED')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: 4 }}>Payments</h1>
          <p style={{ color: 'var(--color-gray-500)', fontSize: '0.9rem' }}>
            Track all payment transactions
          </p>
        </div>
        {!loading && (
          <div className="stat-card" style={{ padding: '12px 20px', minWidth: 'auto' }}>
            <div className="stat-card__label">Total Revenue</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-success)' }}>
              {formatAmount(totalRevenue)}
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 40 }}>
          <div className="loading-spinner" />
        </div>
      ) : payments.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 48 }}>
          <p style={{ color: 'var(--color-gray-400)' }}>No payments found</p>
        </div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Razorpay ID</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>
                  <div style={{ fontWeight: 500, color: 'var(--color-navy)' }}>{payment.user.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-gray-400)' }}>{payment.user.email}</div>
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                  {formatAmount(payment.amount)}
                </td>
                <td>
                  <span className={`badge badge--${payment.status.toLowerCase()}`}>
                    {payment.status}
                  </span>
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-gray-400)' }}>
                  {payment.razorpayPaymentId || '—'}
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-gray-400)' }}>
                  {new Date(payment.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
