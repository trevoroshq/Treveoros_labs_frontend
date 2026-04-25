import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy — TREVORORS LABS',
  description: 'How TREVORORS LABS collects, uses, and protects your personal data. Read our full privacy policy.',
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 48 }}>
    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--color-gray-100)' }}>{title}</h2>
    <div style={{ color: 'var(--color-gray-600)', lineHeight: 1.8, fontSize: '0.95rem' }}>{children}</div>
  </div>
);

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ padding: '64px 0 40px', borderBottom: '1px solid var(--color-gray-100)' }}>
          <div className="container" style={{ maxWidth: 760 }}>
            <div className="section-tag" style={{ marginBottom: 16 }}><span>Legal</span></div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-navy)', marginBottom: 12 }}>Privacy Policy</h1>
            <p style={{ color: 'var(--color-gray-400)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>Last updated: April 4, 2026</p>
          </div>
        </section>

        <section style={{ padding: '64px 0' }}>
          <div className="container" style={{ maxWidth: 760 }}>
            <Section title="1. Information We Collect">
              <p>TREVOROS FINTECH PRIVATE LIMITED collects information you provide directly to us, including your name, email address, phone number, GitHub profile, portfolio URL, and payment details when you register or apply.</p>
              <p style={{ marginTop: 12 }}>We also automatically collect usage data such as pages visited, time spent, and device information to improve the platform experience.</p>
            </Section>
            <Section title="2. How We Use Your Information">
              <p>We use your data to: deliver the TREVORORS LABS program, process payments, send transactional emails (application status, payment confirmations), issue certificates, and improve our platform.</p>
              <p style={{ marginTop: 12 }}>We do not sell, rent, or trade your personal information to third parties for marketing purposes.</p>
            </Section>
            <Section title="3. Cookies and Tracking">
              <p>We use strictly necessary cookies for authentication (JWT tokens stored as httpOnly cookies). We do not use third-party advertising trackers. You can disable cookies in your browser settings, but some platform features will not function without them.</p>
            </Section>
            <Section title="4. Data Retention">
              <p>We retain your account data for as long as your account is active, or as needed to provide services. Certificate records are retained indefinitely to support verification. You may request deletion of your personal data by emailing <a href="mailto:legal@trevoros.com" style={{ color: 'var(--color-sky)' }}>legal@trevoros.com</a>.</p>
            </Section>
            <Section title="5. Third-Party Services">
              <p>We use Razorpay for payment processing, Neon (PostgreSQL) for database hosting, and Google / GitHub OAuth for optional social login. Each of these services has their own privacy policies that govern their handling of your data.</p>
            </Section>
            <Section title="6. Your Rights">
              <p>You have the right to access, correct, or delete your personal information. To exercise these rights, contact us at <a href="mailto:legal@trevoros.com" style={{ color: 'var(--color-sky)' }}>legal@trevoros.com</a>. We will respond within 30 days.</p>
            </Section>
            <Section title="7. Contact">
              <p>For any privacy-related enquiries, contact us at <a href="mailto:legal@trevoros.com" style={{ color: 'var(--color-sky)' }}>legal@trevoros.com</a>.</p>
            </Section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
