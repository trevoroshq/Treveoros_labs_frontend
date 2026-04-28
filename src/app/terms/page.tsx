import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service — TrevorOS Labs',
  description: 'Terms of Service governing your use of TrevorOS Labs, a program by TREVOROS FINTECH PRIVATE LIMITED.',
};

export default function TermsOfService() {
  return (
    <>
      <Navbar />
      <main className="legal-page">
        <div className="container">
          <div className="legal-card">
            <div className="legal-header">
              <div className="legal-header__tag">Legal</div>
              <h1 className="legal-header__title">Terms of Service</h1>
              <p className="legal-header__meta">
                Last updated: April 28, 2025 &nbsp;·&nbsp; Effective: April 28, 2025
              </p>
            </div>

            <div className="legal-body">
              <section className="legal-section">
                <h2>1. Acceptance of Terms</h2>
                <p>
                  These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement
                  between you (&ldquo;Student,&rdquo; &ldquo;Applicant,&rdquo; or &ldquo;User&rdquo;)
                  and <strong>TREVOROS FINTECH PRIVATE LIMITED</strong>, a company incorporated
                  under the Companies Act, 2013, operating the <strong>TrevorOS Labs</strong>{' '}
                  platform (&ldquo;Platform&rdquo;).
                </p>
                <p>
                  By submitting an application, making a payment, or accessing any part of the
                  Platform, you confirm that you have read, understood, and agree to be bound by
                  these Terms. If you do not agree, do not use the Platform.
                </p>
              </section>

              <section className="legal-section">
                <h2>2. Program Overview</h2>
                <p>
                  TrevorOS Labs offers structured, performance-based developer training programs
                  (&ldquo;Programs&rdquo;) delivered in cohort batches:
                </p>
                <ul>
                  <li><strong>Foundation Track:</strong> 6-week beginner program (₹2,000 per cohort).</li>
                  <li><strong>Builder Track:</strong> 8-week advanced program (₹4,000 per cohort).</li>
                </ul>
                <p>
                  Program content, batch dates, curriculum, and pricing are subject to change at our
                  discretion. We will communicate material changes to enrolled students via email.
                </p>
              </section>

              <section className="legal-section">
                <h2>3. Eligibility</h2>
                <ul>
                  <li>You must be at least 16 years of age to apply.</li>
                  <li>If you are under 18, you confirm that you have obtained parental or guardian consent.</li>
                  <li>You must provide accurate, complete, and truthful information during the application process.</li>
                  <li>Submission of false information is grounds for immediate disqualification without refund.</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2>4. Application &amp; Admission</h2>
                <p>
                  Submitting an application does not guarantee admission. We review all applications
                  within 48 business hours and reserve the right to accept or decline any application
                  at our sole discretion without providing reasons.
                </p>
                <p>
                  An offer of admission is confirmed only upon receipt of full program payment. Seats
                  are not reserved until payment is completed.
                </p>
              </section>

              <section className="legal-section">
                <h2>5. Payment</h2>
                <ul>
                  <li>All payments are processed securely via <strong>Razorpay</strong>.</li>
                  <li>Program fees are quoted in Indian Rupees (INR) and are inclusive of all applicable taxes.</li>
                  <li>You are responsible for any bank charges, transaction fees, or currency conversion costs imposed by your payment provider.</li>
                  <li>Payment constitutes your agreement to these Terms.</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2>6. Student Obligations</h2>
                <p>As an enrolled student, you agree to:</p>
                <ul>
                  <li>Attend live sessions and complete project submissions in accordance with the program schedule.</li>
                  <li>Submit only your own original work. Plagiarism, copying, or misrepresentation of work is strictly prohibited and will result in disqualification.</li>
                  <li>Treat all mentors, staff, and fellow students with respect. Harassment, abuse, or disruptive behaviour is grounds for immediate removal without refund.</li>
                  <li>Not share, distribute, or reproduce program materials, recordings, or curriculum content without written permission.</li>
                  <li>Maintain the confidentiality of your account credentials.</li>
                </ul>
              </section>

              <section className="legal-section">
                <h2>7. Performance Assessment &amp; Certificates</h2>
                <p>
                  Your program performance is assessed on a weekly basis by program mentors. Final
                  certificate grades — <strong>Exceptional</strong>, <strong>Strong</strong>, or{' '}
                  <strong>Satisfactory</strong> — are determined solely at the discretion of the
                  assessment team based on objective scoring criteria.
                </p>
                <p>
                  Certificate grades are final and non-negotiable. Certificates are issued
                  electronically and carry a unique verification code. We do not guarantee employment
                  outcomes as a result of holding a TrevorOS Labs certificate.
                </p>
              </section>

              <section className="legal-section">
                <h2>8. Paid Internship Opportunity</h2>
                <p>
                  Top-performing Builder Track students may be offered a paid Core Internship at
                  TREVOROS FINTECH PRIVATE LIMITED. This opportunity is entirely at the Company&apos;s
                  discretion and is subject to availability, performance thresholds, and separate
                  employment terms to be agreed upon at the time of offer. No student is guaranteed
                  an internship by virtue of enrolment alone.
                </p>
              </section>

              <section className="legal-section">
                <h2>9. Intellectual Property</h2>
                <p>
                  All curriculum content, session recordings, slides, assessments, and materials
                  provided through the Platform are the exclusive intellectual property of
                  TREVOROS FINTECH PRIVATE LIMITED. You are granted a limited, non-transferable,
                  non-exclusive licence to access and use these materials solely for your personal
                  learning during the enrolled program period.
                </p>
                <p>
                  You retain full ownership of any original projects and code you create during the
                  program, provided they do not incorporate Company proprietary materials.
                </p>
              </section>

              <section className="legal-section">
                <h2>10. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by applicable law, TREVOROS FINTECH PRIVATE LIMITED
                  shall not be liable for any indirect, incidental, special, consequential, or
                  punitive damages, including loss of income, employment, or opportunity, arising
                  from your use of or inability to use the Platform or Programs.
                </p>
                <p>
                  Our total aggregate liability to you for any claim arising under these Terms shall
                  not exceed the program fee you paid for the relevant cohort.
                </p>
              </section>

              <section className="legal-section">
                <h2>11. Modifications &amp; Termination</h2>
                <p>
                  We reserve the right to modify, suspend, or discontinue any Program or the
                  Platform at any time. In the event of a Program cancellation by us prior to
                  commencement, enrolled students will receive a full refund. We may terminate your
                  access for violations of these Terms without notice.
                </p>
              </section>

              <section className="legal-section">
                <h2>12. Governing Law &amp; Dispute Resolution</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of
                  India. Any dispute arising out of or in connection with these Terms shall first be
                  attempted to be resolved through good-faith negotiation. If unresolved within 30
                  days, disputes shall be subject to the exclusive jurisdiction of the courts located
                  in <strong>India</strong>.
                </p>
              </section>

              <section className="legal-section">
                <h2>13. Contact</h2>
                <div className="legal-contact">
                  <p><strong>TREVOROS FINTECH PRIVATE LIMITED</strong></p>
                  <p>Email: <a href="mailto:labs@trevoros.com">labs@trevoros.com</a></p>
                  <p>Phone: <a href="tel:+919128699369">+91 91286 99369</a></p>
                </div>
              </section>
            </div>

            <div className="legal-footer">
              <Link href="/privacy">Privacy Policy</Link>
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
