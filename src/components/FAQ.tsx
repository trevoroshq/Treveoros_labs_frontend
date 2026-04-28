'use client';

import { useState } from 'react';

const faqs = [
  {
    q: 'Do I need prior coding experience?',
    a: "Foundation Track is designed for absolute beginners — no prior experience required. Builder Track requires basic programming knowledge (variables, loops, functions). If you're unsure, start with Foundation and upgrade later at 50% off.",
  },
  {
    q: 'How much time do I need per week?',
    a: 'Plan for 15–20 hours per week: 2–3 hours of live sessions plus 10–12 hours of project work and self-study. The program is intensive by design — real skills require real effort.',
  },
  {
    q: 'Are sessions live or recorded?',
    a: "Sessions are live. Weekly classes, code reviews, and expert sessions all happen in real time. Recordings are shared after, but attending live is strongly encouraged — that's where the mentor feedback happens.",
  },
  {
    q: 'What is the refund policy?',
    a: "Full refund within 7 days of your cohort start date — no questions asked. After 7 days, seats are non-refundable as mentor time and resources are pre-allocated to your cohort.",
  },
  {
    q: 'What tools and languages will I learn?',
    a: 'Foundation: JavaScript, HTML/CSS, SQL, REST APIs, Git. Builder: TypeScript, React, Node.js, PostgreSQL, Docker, AI/ML integration, and cloud deployment. All industry-standard, production-relevant tools.',
  },
  {
    q: 'How does the performance certificate work?',
    a: 'Mentors score your weekly projects. Your cumulative score at cohort end determines your tier: Exceptional (top 10%), Strong (top 40%), or Satisfactory (completed). Each certificate has a unique verification code employers can check with a QR scan.',
  },
  {
    q: 'What is the paid internship opportunity?',
    a: "Top performers in Builder Track (typically top 15%) are offered a paid Core Internship at TrevorOS. This is a real, compensated engineering role — not a 'letter of appreciation.'",
  },
  {
    q: 'Can I upgrade from Foundation to Builder?',
    a: 'Yes. Foundation graduates get 50% off the Builder Track. Many students use Foundation to solidify fundamentals and then tackle Builder with much greater confidence and speed.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="faq">
      {faqs.map((item, i) => (
        <div key={i} className={`faq__item${open === i ? ' faq__item--open' : ''}`}>
          <button
            className="faq__question"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span>{item.q}</span>
            <span className="faq__chevron">{open === i ? '−' : '+'}</span>
          </button>
          <div className={`faq__answer${open === i ? ' faq__answer--open' : ''}`}>
            <p>{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
