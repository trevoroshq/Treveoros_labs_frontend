'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/lib/auth-context';
import { paymentsApi } from '@/lib/api';

const TRACK_PRICES: Record<string, number> = {
  FOUNDATION: 2000,
  BUILDER: 4000,
};

const RAZORPAY_KEY = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '';

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();

  const track = searchParams.get('track')?.toUpperCase() || 'FOUNDATION';
  const batch = searchParams.get('batch') || '';
  const name = searchParams.get('name') || '';
  const email = searchParams.get('email') || '';

  const amount = TRACK_PRICES[track] || 2000; // in INR
  const amountPaise = amount * 100;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !user) router.push('/login');
  }, [user, authLoading, router]);



  useEffect(() => {
    if (RAZORPAY_KEY) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
      return () => { document.body.removeChild(script); };
    }
  }, []);

  if (authLoading || !user) return null;

  const handleQRClick = async () => {
    setLoading(true);
    setError('');

    try {
      const orderData = await paymentsApi.createOrder({ amount: amountPaise }) as {
        razorpayOrderId: string;
      };

      if (!RAZORPAY_KEY || !window.Razorpay) {
        setError('Payment gateway configuration is missing.');
        setLoading(false);
        return;
      }

      const options = {
        key: RAZORPAY_KEY,
        amount: amountPaise,
        currency: 'INR',
        name: 'TREVOROS LABS',
        description: `${track === 'FOUNDATION' ? 'Foundation' : 'Builder'} Track`,
        order_id: orderData.razorpayOrderId,
        prefill: {
          name: name || (user as { name?: string }).name || '',
          email: email || (user as { email?: string }).email || '',
        },
        notes: { track, batch },
        theme: { color: '#22c55e' },
        config: {
          display: {
            blocks: {
              upi: {
                name: 'Pay via UPI',
                instruments: [{ method: 'upi', flows: ['qr'] }],
              },
            },
            sequence: ['block.upi'],
            preferences: { show_default_blocks: false },
          },
        },
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          try {
            await paymentsApi.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            router.push('/payment/success?track=' + track);
          } catch {
            router.push('/payment/failure');
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            setError('Payment was cancelled.');
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      setLoading(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Payment failed. Please try again.';
      setError(msg);
      setLoading(false);
    }
  };

  const handleRazorpayClick = async () => {
    setLoading(true);
    setError('');
    
    try {
      const orderData = await paymentsApi.createOrder({ amount: amountPaise }) as {
        razorpayOrderId: string;
      };

      if (RAZORPAY_KEY && window.Razorpay) {
        const options = {
          key: RAZORPAY_KEY,
          amount: amountPaise,
          currency: 'INR',
          name: 'TREVOROS LABS',
          description: `${track === 'FOUNDATION' ? 'Foundation' : 'Builder'} Track`,
          order_id: orderData.razorpayOrderId,
          prefill: {
            name: name || (user as { name?: string }).name || '',
            email: email || (user as { email?: string }).email || '',
          },
          notes: { track, batch },
          theme: { color: '#38bdf8' },
          config: {
            display: {
              blocks: {
                paymentOptions: {
                  name: 'Cards & Netbanking',
                  instruments: [
                    { method: 'card' },
                    { method: 'netbanking' },
                  ],
                },
              },
              sequence: ['block.paymentOptions'],
              preferences: {
                show_default_blocks: false,
              },
            },
          },
          handler: async (response: {
            razorpay_payment_id: string;
            razorpay_order_id: string;
            razorpay_signature: string;
          }) => {
            try {
              await paymentsApi.verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });
              router.push('/payment/success?track=' + track);
            } catch {
              router.push('/payment/failure');
            }
          },
          modal: {
            ondismiss: () => {
              setLoading(false);
              setError('Payment was cancelled.');
            },
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
        setLoading(false);
      } else {
        setError('Payment gateway configuration is missing.');
        setLoading(false);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Payment gateway error.';
      setError(msg);
      setLoading(false);
    }
  };

  const batchLabel = batch === '2026-05-04' ? '4 May 2026' : batch === '2026-05-18' ? '18 May 2026' : batch;

  return (
    <>
      <Navbar />
      <div className="checkout-page">
        <div className="container">
          <div className="checkout-card">
            {/* Header */}
            <div className="checkout-card__header">
              <div className="section-tag" style={{ marginBottom: 8 }}>
                <span>Secure Checkout</span>
              </div>
              <h2 style={{ marginBottom: 4 }}>Complete Your Enrollment</h2>
              <p style={{ color: 'var(--color-gray-500)', fontSize: '0.9rem' }}>
                Payment is collected after your application is accepted.
              </p>
            </div>

            {/* Order Summary */}
            <div className="checkout-summary">
              <div className="checkout-summary__title">Order Summary</div>

              <div className="checkout-summary__row">
                <div className="checkout-summary__item">
                  <span className="checkout-summary__icon">
                    {track === 'FOUNDATION' ? '◈' : '⚡'}
                  </span>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--color-navy)' }}>
                      {track === 'FOUNDATION' ? 'Foundation Track' : 'Builder Track'}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-gray-400)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {track === 'FOUNDATION' ? '6 Weeks · Beginner Friendly' : '8 Weeks · Advanced'}
                    </div>
                  </div>
                </div>
                <div className="checkout-summary__amount">
                  <span className="checkout-summary__amount-old">
                    ₹{track === 'FOUNDATION' ? '3,000' : '5,000'}
                  </span>
                  <span className="checkout-summary__amount-new">
                    ₹{amount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {batchLabel && (
                <div className="checkout-summary__meta">
                  <span>📅 Batch Start</span>
                  <span>{batchLabel}</span>
                </div>
              )}

              <div className="checkout-summary__total">
                <span>Total</span>
                <span>₹{amount.toLocaleString('en-IN')}</span>
              </div>

              <div className="checkout-summary__saving">
                🎉 You save ₹{track === 'FOUNDATION' ? '1,000' : '1,000'} on this enrollment
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="apply-error">
                {error}
              </div>
            )}

            {/* Action Area */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button
                onClick={handleQRClick}
                className="btn btn--primary btn--lg"
                style={{ width: '100%', background: '#22c55e', borderColor: '#22c55e' }}
                disabled={loading}
                id="checkout-pay-qr-btn"
              >
                {loading ? (
                  <span className="loading-spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
                ) : (
                  <>Scan QR Code (UPI) <span className="btn-arrow">→</span></>
                )}
              </button>
              <button
                onClick={handleRazorpayClick}
                className="btn btn--secondary btn--lg"
                style={{ width: '100%' }}
                disabled={loading}
                id="checkout-pay-card-btn"
              >
                {loading ? (
                  <span className="loading-spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
                ) : (
                  <>Pay with Cards / Netbanking <span className="btn-arrow">→</span></>
                )}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="checkout-trust">
              <span className="checkout-trust__item">🔒 256-bit SSL</span>
              <span className="checkout-trust__item">✓ Razorpay Secured</span>
              <span className="checkout-trust__item">↩ Refund Policy</span>
            </div>

            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-gray-400)', marginTop: 16 }}>
              Payments are secured and verified by Razorpay.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="page-loading"><div className="loading-spinner" /></div>}>
      <CheckoutForm />
    </Suspense>
  );
}
