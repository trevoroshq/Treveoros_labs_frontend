import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy — TREVOROS LABS',
  description: 'Privacy Policy of TREVOROS LABS, a program by TREVOROS FINTECH PRIVATE LIMITED.',
};

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main className="legal-page">
        <div className="container">
          <div className="legal-card">
            <div className="legal-header">
              <div className="legal-header__tag">Legal</div>
              <h1 className="legal-header__title">Privacy Policy</h1>
              <p className="legal-header__meta">
                Last updated: April 28, 2025 &nbsp;·&nbsp; Effective: April 28, 2025
              </p>
            </div>

            <div className="legal-body">
              <section className="legal-section">
                <h2>1. About This Policy</h2>
                <p>
                  This Privacy Policy describes how <strong>TREVOROS FINTECH PRIVATE LIMITED</strong>{' '}
                  (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;),
                  operating the <strong>TREVOROS LABS</strong> platform at{' '}
                  <a href="https://labs.trevoros.com">labs.trevoros.com</a>, collects, uses, stores,
                  and discloses personal information when you visit our website, apply to a program,
                  or enrol as a student.
                </p>
                <p>
                  By using our platform, you agree to the collection and use of information in
                  accordance with this policy. This policy is compliant with the{' '}
                  <strong>Information Technology Act, 2000</strong> and the{' '}
                  <strong>Information Technology (Reasonable Security Practices and Procedures and
                  Sensitive Personal Data or Information) Rules, 2011</strong>.
                </p>
              </section>

              <section className="legal-section">
                <h2>2. Information We Collect</h2>
                <h3>2.1 Information You Provide</h3>
                <ul>
                  <li><strong>Account &amp; Application Data:</strong> Name, email address, phone number, educational background, GitHub/portfolio links, and preferred program track.</li>
                  <li><strong>Payment Data:</strong> Transaction reference IDs processed via Razorpay. We do not store card numbers, UPI IDs, or bank credentials on our servers.</li>
                  <li><strong>Communication Data:</strong> Messages, queries, and feedback you send us via email or WhatsApp.</li>
                </ul>
                <h3>2.2 Automatically Collected Information</h3>
                <ul>
                  <li>IP address, browser type, operating system, and device identifiers.</li>
                  <li>Pages visited, time spent, and navigation patterns (via server logs).</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2>3. How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul>
                  <li>Process and evaluate your program application.</li>
                  <li>Communicate your acceptance, cohort details, and program updates.</li>
                  <li>Process payments and issue receipts.</li>
                  <li>Generate and issue verifiable performance certificates.</li>
                  <li>Evaluate student performance and provide mentor feedback.</li>
                  <li>Improve the platform, curriculum, and user experience.</li>
                  <li>Respond to your enquiries and support requests.</li>
                  <li>Comply with applicable legal obligations.</li>
                </ul>
                <p>
                  We do <strong>not</strong> sell, rent, or trade your personal information to third
                  parties for marketing purposes.
                </p>
              </section>

              <section className="legal-section">
                <h2>4. Data Sharing</h2>
                <p>We may share your information with:</p>
                <ul>
                  <li><strong>Razorpay:</strong> Our payment gateway partner, solely for processing transactions. Razorpay&apos;s privacy policy governs their data use.</li>
                  <li><strong>Internal Mentors:</strong> Program mentors may access your name, submitted projects, and performance scores for evaluation purposes.</li>
                  <li><strong>Legal Authorities:</strong> Where required by law, court order, or governmental regulation.</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2>5. Data Retention</h2>
                <p>
                  We retain your personal data for as long as your account is active or as needed to
                  provide services. Performance records and certificate data are retained indefinitely
                  to support future verification requests. You may request deletion of your account
                  data by contacting us at{' '}
                  <a href="mailto:labs@trevoros.com">labs@trevoros.com</a>, subject to our legal
                  retention obligations.
                </p>
              </section>

              <section className="legal-section">
                <h2>6. Data Security</h2>
                <p>
                  We implement industry-standard security measures including HTTPS encryption,
                  hashed passwords, and access-controlled infrastructure. However, no method of
                  transmission over the internet is 100% secure. We cannot guarantee absolute
                  security and disclaim liability for unauthorised access beyond our reasonable
                  control.
                </p>
              </section>

              <section className="legal-section">
                <h2>7. Your Rights</h2>
                <p>You have the right to:</p>
                <ul>
                  <li>Access the personal data we hold about you.</li>
                  <li>Correct inaccurate or incomplete data.</li>
                  <li>Request deletion of your personal data (subject to legal requirements).</li>
                  <li>Withdraw consent for marketing communications at any time.</li>
                </ul>
                <p>
                  To exercise any of these rights, email us at{' '}
                  <a href="mailto:labs@trevoros.com">labs@trevoros.com</a>.
                </p>
              </section>

              <section className="legal-section">
                <h2>8. Cookies</h2>
                <p>
                  We use session cookies solely for authentication purposes (keeping you logged in).
                  We do not use third-party advertising or tracking cookies. You may disable cookies
                  in your browser settings, but this may affect platform functionality.
                </p>
              </section>

              <section className="legal-section">
                <h2>9. Children&apos;s Privacy</h2>
                <p>
                  Our platform is not directed at children under 13 years of age. We do not
                  knowingly collect personal data from anyone under 13. If you believe a child has
                  provided us data, please contact us immediately.
                </p>
              </section>

              <section className="legal-section">
                <h2>10. Changes to This Policy</h2>
                <p>
                  We may update this policy periodically. We will notify enrolled students of
                  material changes via email. Continued use of the platform after changes constitutes
                  acceptance of the revised policy.
                </p>
              </section>

              <section className="legal-section">
                <h2>11. Contact</h2>
                <div className="legal-contact">
                  <p><strong>TREVOROS FINTECH PRIVATE LIMITED</strong></p>
                  <p>Email: <a href="mailto:labs@trevoros.com">labs@trevoros.com</a></p>
                  <p>Phone: <a href="tel:+919128699369">+91 91286 99369</a></p>
                </div>
              </section>
            </div>

            <div className="legal-footer">
              <Link href="/terms">Terms of Service</Link>
              <span>·</span>
              <Link href="/refund">Refund Policy</Link>
              <span>·</span>
              <Link href="/">Back to Home</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
