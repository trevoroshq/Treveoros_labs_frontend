import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Refund Policy — TREVOROS LABS',
  description: 'Refund Policy for TREVOROS LABS programs by TREVOROS FINTECH PRIVATE LIMITED.',
};

export default function RefundPolicy() {
  return (
    <>
      <Navbar />
      <main className="legal-page">
        <div className="container">
          <div className="legal-card">
            <div className="legal-header">
              <div className="legal-header__tag">Legal</div>
              <h1 className="legal-header__title">Refund Policy</h1>
              <p className="legal-header__meta">
                Last updated: April 28, 2025 &nbsp;·&nbsp; Effective: April 28, 2025
              </p>
            </div>

            <div className="legal-body">
              <section className="legal-section">
                <h2>1. Our Commitment</h2>
                <p>
                  At <strong>TREVOROS LABS</strong>, operated by{' '}
                  <strong>TREVOROS FINTECH PRIVATE LIMITED</strong>, we stand behind the quality of
                  our programs. We offer a transparent refund policy to ensure you can enrol with
                  confidence.
                </p>
              </section>

              <section className="legal-section">
                <h2>2. 7-Day Satisfaction Guarantee</h2>
                <div className="legal-highlight">
                  <p>
                    If you are not satisfied with the program for any reason, you may request a{' '}
                    <strong>full refund within 7 calendar days</strong> of your cohort&apos;s
                    official start date — no questions asked.
                  </p>
                </div>
                <p>To initiate a refund within this window:</p>
                <ul>
                  <li>Email <a href="mailto:labs@trevoros.com">labs@trevoros.com</a> with subject line: <em>&ldquo;Refund Request — [Your Full Name] — [Cohort Batch]&rdquo;</em></li>
                  <li>Include your registered email address and payment reference/transaction ID.</li>
                  <li>Refunds are processed within <strong>7–10 business days</strong> to the original payment method.</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2>3. Non-Refundable Circumstances</h2>
                <p>Refunds will <strong>not</strong> be issued in the following cases:</p>
                <ul>
                  <li>Requests made <strong>after 7 calendar days</strong> from the cohort start date.</li>
                  <li>Failure to attend sessions, submit projects, or engage with the program without prior notice.</li>
                  <li>Removal from the program due to violation of our <Link href="/terms">Terms of Service</Link> (including plagiarism, misconduct, or abusive behaviour).</li>
                  <li>Dissatisfaction with your own performance score or certificate grade — grades are determined objectively by mentors.</li>
                  <li>Change of personal circumstances (e.g., time constraints, change of mind) after the 7-day window.</li>
                  <li>Requests for partial refunds mid-program after the 7-day period has elapsed.</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2>4. Pre-Start Cancellations</h2>
                <p>
                  If you have been accepted and paid but wish to cancel <strong>before your cohort
                  officially starts</strong>, you are eligible for a full refund regardless of the
                  timing. Please notify us at least <strong>48 hours before</strong> the cohort
                  start date to allow us to offer your seat to a waitlisted applicant.
                </p>
              </section>

              <section className="legal-section">
                <h2>5. Program Cancellation by Us</h2>
                <p>
                  In the unlikely event that TREVOROS FINTECH PRIVATE LIMITED cancels a cohort
                  before it commences, all enrolled students will receive a{' '}
                  <strong>100% full refund</strong> within 5 business days, with the option to
                  transfer enrolment to the next available cohort.
                </p>
              </section>

              <section className="legal-section">
                <h2>6. Upgrade Payments (Foundation → Builder)</h2>
                <p>
                  The 50% upgrade discount is applied at the time of Builder Track enrolment for
                  verified Foundation Track graduates. Upgrade payments follow the same 7-day
                  refund policy. The original Foundation Track fee is not refundable once the
                  7-day window for that cohort has passed.
                </p>
              </section>

              <section className="legal-section">
                <h2>7. Payment Gateway Fees</h2>
                <p>
                  Razorpay (our payment processor) may charge non-refundable transaction fees on
                  the original payment. In such cases, we will refund the full program fee amount
                  and the transaction fee deduction (if any) will be borne by us — you will receive
                  the complete program fee back.
                </p>
              </section>

              <section className="legal-section">
                <h2>8. How to Contact Us</h2>
                <p>For any refund-related queries, reach us through:</p>
                <div className="legal-contact">
                  <p><strong>TREVOROS FINTECH PRIVATE LIMITED</strong></p>
                  <p>
                    Email:{' '}
                    <a href="mailto:labs@trevoros.com">labs@trevoros.com</a>{' '}
                    <span className="legal-contact__note">(responds within 24 business hours)</span>
                  </p>
                  <p>Phone: <a href="tel:+919128699369">+91 91286 99369</a></p>
                  <p>
                    WhatsApp:{' '}
                    <a
                      href="https://wa.me/919128699369?text=Hi%2C%20I%20have%20a%20refund%20query."
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Chat on WhatsApp
                    </a>
                  </p>
                </div>
              </section>
            </div>

            <div className="legal-footer">
              <Link href="/privacy">Privacy Policy</Link>
              <span>·</span>
              <Link href="/terms">Terms of Service</Link>
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
