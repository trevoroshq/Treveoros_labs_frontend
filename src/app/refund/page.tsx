import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Refund Policy — TREVORORS LABS',
  description: 'TREVORORS LABS Refund Policy. Understand when and how refunds are issued for program enrollment fees.',
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 48 }}>
    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--color-gray-100)' }}>{title}</h2>
    <div style={{ color: 'var(--color-gray-600)', lineHeight: 1.8, fontSize: '0.95rem' }}>{children}</div>
  </div>
);

export default function RefundPage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ padding: '64px 0 40px', borderBottom: '1px solid var(--color-gray-100)' }}>
          <div className="container" style={{ maxWidth: 760 }}>
            <div className="section-tag" style={{ marginBottom: 16 }}><span>Legal</span></div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-navy)', marginBottom: 12 }}>Refund Policy</h1>
            <p style={{ color: 'var(--color-gray-400)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>Last updated: April 4, 2026</p>
          </div>
        </section>

        <section style={{ padding: '64px 0' }}>
          <div className="container" style={{ maxWidth: 760 }}>
            {/* Summary table */}
            <div className="card card--featured" style={{ padding: 32, marginBottom: 48 }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: 20 }}>Refund Summary</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--color-gray-100)' }}>
                    <th style={{ textAlign: 'left', padding: '10px 0', color: 'var(--color-navy)' }}>Situation</th>
                    <th style={{ textAlign: 'right', padding: '10px 0', color: 'var(--color-navy)' }}>Refund</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { s: 'Withdrawal within 7 days of payment, before cohort starts', r: '100%' },
                    { s: 'Withdrawal 8–14 days after payment, before cohort starts', r: '50%' },
                    { s: 'Withdrawal after cohort has started', r: 'No refund' },
                    { s: 'Program cancelled by TREVOROS FINTECH PRIVATE LIMITED', r: '100%' },
                    { s: 'Technical failure preventing access (verified)', r: 'Pro-rated' },
                    { s: 'Duplicate / accidental payment', r: '100%' },
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--color-gray-100)' }}>
                      <td style={{ padding: '12px 0', color: 'var(--color-gray-600)' }}>{row.s}</td>
                      <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 600, color: row.r === 'No refund' ? '#dc2626' : row.r === '100%' ? '#16a34a' : '#d97706' }}>{row.r}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Section title="1. Eligibility">
              <p>To be eligible for a refund, you must submit a request via email to <a href="mailto:admissions@trevoros.com" style={{ color: 'var(--color-sky)' }}>admissions@trevoros.com</a> with your registered email address and order ID.</p>
            </Section>
            <Section title="2. Process & Timeline">
              <p>Approved refunds are processed within <strong>7–10 business days</strong> to the original payment method. Razorpay processing timelines may add an additional 2–5 days depending on your bank.</p>
            </Section>
            <Section title="3. Non-Refundable Items">
              <p>The following are <strong>not refundable</strong> under any circumstances: cohort fees after the cohort start date, certificate re-issuance fees, any administrative charges.</p>
            </Section>
            <Section title="4. Cohort Deferral">
              <p>As an alternative to a refund, you may request a deferral to the next available cohort (subject to availability) within 30 days of your original enrollment. Deferrals are offered once per enrollment.</p>
            </Section>
            <Section title="5. Contact">
              <p>To initiate a refund, email <a href="mailto:admissions@trevoros.com" style={{ color: 'var(--color-sky)' }}>admissions@trevoros.com</a> with subject line: <strong>"Refund Request – [Your Name]"</strong>.</p>
            </Section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
