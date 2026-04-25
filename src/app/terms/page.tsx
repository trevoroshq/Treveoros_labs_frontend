import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service — TREVORORS LABS',
  description: 'Read TREVORORS LABS Terms of Service — the rules and conditions governing use of our platform and programs.',
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: 48 }}>
    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-navy)', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--color-gray-100)' }}>{title}</h2>
    <div style={{ color: 'var(--color-gray-600)', lineHeight: 1.8, fontSize: '0.95rem' }}>{children}</div>
  </div>
);

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main>
        <section style={{ padding: '64px 0 40px', borderBottom: '1px solid var(--color-gray-100)' }}>
          <div className="container" style={{ maxWidth: 760 }}>
            <div className="section-tag" style={{ marginBottom: 16 }}><span>Legal</span></div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-navy)', marginBottom: 12 }}>Terms of Service</h1>
            <p style={{ color: 'var(--color-gray-400)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>Last updated: April 4, 2026</p>
          </div>
        </section>

        <section style={{ padding: '64px 0' }}>
          <div className="container" style={{ maxWidth: 760 }}>
            <Section title="1. Acceptance of Terms">
              <p>By registering for or accessing TREVORORS LABS, operated by TREVOROS FINTECH PRIVATE LIMITED ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Platform.</p>
            </Section>
            <Section title="2. Eligibility">
              <p>You must be at least 18 years old to register on the Platform. By creating an account, you represent that you meet this requirement and that all information you provide is accurate.</p>
            </Section>
            <Section title="3. Program Enrollment">
              <p>Enrollment in a cohort is contingent on: (a) completing the application, (b) receiving an acceptance decision from TREVORORS LABS, and (c) completing the required payment.</p>
              <p style={{ marginTop: 12 }}>Acceptance decisions are made solely at the discretion of TREVORORS LABS and are non-negotiable.</p>
            </Section>
            <Section title="4. Payments">
              <p>All program fees are listed at the time of enrollment and are payable via Razorpay. By completing payment, you agree to our Refund Policy. Fees are listed in Indian Rupees (INR) inclusive of applicable taxes.</p>
            </Section>
            <Section title="5. Certificates">
              <p>Certificates are issued based on verified performance scores. TREVORORS LABS reserves the right to revoke certificates if fraud, academic dishonesty, or misrepresentation is discovered. Certificate verification is accessible publicly at <strong>/verify</strong>.</p>
            </Section>
            <Section title="6. Code of Conduct">
              <p>You agree not to: plagiarize project submissions, share cohort materials publicly without permission, harass or abuse other students or staff, or attempt to circumvent platform security.</p>
              <p style={{ marginTop: 12 }}>Violation of the Code of Conduct may result in immediate removal from the cohort without refund.</p>
            </Section>
            <Section title="7. Intellectual Property">
              <p>All course materials, curriculum, and platform content are the intellectual property of TREVORORS LABS. Projects you create during cohorts remain yours; you grant TREVORORS LABS a non-exclusive licence to reference them for marketing purposes with attribution.</p>
            </Section>
            <Section title="8. Limitation of Liability">
              <p>TREVORORS LABS is not liable for indirect, incidental, or consequential damages arising from your use of the platform. Our total liability shall not exceed the fees you paid in the three months preceding the claim.</p>
            </Section>
            <Section title="9. Changes to Terms">
              <p>We may update these Terms at any time. Continued use of the Platform after changes constitutes acceptance. We will notify active students of material changes via email.</p>
            </Section>
            <Section title="10. Contact">
              <p>Questions? Reach us at <a href="mailto:legal@trevoros.com" style={{ color: 'var(--color-sky)' }}>legal@trevoros.com</a>.</p>
            </Section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
