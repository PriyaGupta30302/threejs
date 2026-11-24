'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { caveat, fraunces } from '@/components/human/fonts';
import { HAND, HandArrow, Marker, Squiggle, Tape, headingStyle } from '@/components/human/ui';

const EMAIL = 'priyagupta30302@gmail.com';
const PHONE_DISPLAY = '+91 70566 00842';
const PHONE_HREF = 'tel:+917056600842';

const TOPICS = ['a new website', 'a redesign', 'a job opportunity', 'just saying hi'];

const ELSEWHERE = [
  { name: 'GitHub', href: 'https://github.com/PriyaGupta30302' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/priyagupta30/' },
  { name: 'Resume', href: '/Priya_Gupta_Resume.pdf' },
];

// Inline "fill in the blank" field, typed in handwriting on the paper
const blank =
  `${HAND} min-w-[9rem] flex-1 bg-transparent border-b-2 border-[#ece5d6]/30 px-1 text-[1.75rem] leading-none text-[#8ce6c4] outline-none transition-colors placeholder:text-[#ece5d6]/30 focus:border-[#33CC99]`;

export default function ContactClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [topic, setTopic] = useState(TOPICS[0]);
  const [sent, setSent] = useState(false);
  const [mailtoHref, setMailtoHref] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.c-in', { y: 40, opacity: 0, stagger: 0.1, duration: 1, ease: 'power3.out', delay: 0.1 });
      gsap.from('.c-paper', { y: 80, opacity: 0, rotate: 5, duration: 1.2, ease: 'power3.out', delay: 0.3 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // No backend: opens the visitor's email app with the note already written
  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();

    const subject = `Hello from ${name} (${topic})`;
    const body = `${message}\n\n${name}\n${email}`;
    const href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setMailtoHref(href);
    setSent(true);
    window.location.href = href;
  };

  return (
    <main
      ref={containerRef}
      className={`${fraunces.variable} ${caveat.variable} relative bg-[#15130f] text-[#ece5d6] w-full overflow-x-clip selection:bg-[#33CC99] selection:text-[#15130f]`}
    >
      <div className="max-w-[1300px] mx-auto px-5 sm:px-6 md:px-10 lg:px-12 pt-28 sm:pt-32 md:pt-40 pb-16 md:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-16 items-start">
        {/* ───────── Words ───────── */}
        <div className="lg:col-span-6 flex flex-col gap-8 md:gap-10 lg:pt-6">
          <div className="flex flex-col gap-3 md:gap-5">
            <p className={`${HAND} c-in text-2xl sm:text-3xl md:text-4xl text-[#8ce6c4] -rotate-2 origin-left`}>
              hello, you!
            </p>
            <h1
              style={headingStyle}
              className="c-in text-[clamp(2.5rem,6.5vw,6rem)] leading-[1.03] tracking-tight"
            >
              Let&apos;s talk about <Marker>what you&apos;re building</Marker>.
            </h1>
            <p className="c-in text-[#ece5d6]/65 text-base md:text-lg leading-relaxed max-w-lg">
              Got a project, an idea or a job to talk about? Write me a little note, or just email or call me,
              whichever is easier for you.
            </p>
          </div>

          {/* Direct lines */}
          <div className="c-in flex flex-col gap-6 md:gap-7">
            <div className="flex flex-col gap-1">
              <span className={`${HAND} text-xl md:text-2xl text-[#8ce6c4]`}>write to me</span>
              <a
                href={`mailto:${EMAIL}`}
                className="group relative self-start inline-block pb-2 text-xl sm:text-2xl md:text-3xl break-all sm:break-normal"
                style={headingStyle}
              >
                {EMAIL}
                <Squiggle className="absolute left-0 bottom-0 w-full h-2 text-[#33CC99] transition-transform duration-500 origin-left group-hover:scale-x-105" />
              </a>
            </div>

            <div className="flex flex-col gap-1">
              <span className={`${HAND} text-xl md:text-2xl text-[#8ce6c4]`}>or give me a call</span>
              <a
                href={PHONE_HREF}
                className="group relative self-start inline-block pb-2 text-xl sm:text-2xl md:text-3xl"
                style={headingStyle}
              >
                {PHONE_DISPLAY}
                <Squiggle className="absolute left-0 bottom-0 w-full h-2 text-[#33CC99] transition-transform duration-500 origin-left group-hover:scale-x-105" />
              </a>
            </div>
          </div>

          {/* Elsewhere */}
          <div className="c-in flex flex-col gap-3 pt-6 border-t border-dashed border-[#ece5d6]/25 max-w-lg">
            <span className={`${HAND} text-xl md:text-2xl text-[#8ce6c4]`}>find me elsewhere</span>
            <ul className="flex flex-wrap gap-x-7 gap-y-2">
              {ELSEWHERE.map((l) => (
                <li key={l.name}>
                  <a
                    href={l.href}
                    target={l.href.startsWith('http') ? '_blank' : undefined}
                    rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group inline-flex items-center gap-1.5 text-lg text-[#ece5d6]/80 hover:text-[#8ce6c4] transition-colors"
                  >
                    {l.name}
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ───────── Paper note ───────── */}
        <div className="lg:col-span-6 relative">
          <div className="hidden lg:flex absolute -top-12 left-2 items-center gap-2 text-[#8ce6c4] -rotate-2">
            <span className={`${HAND} text-2xl`}>or fill in this little note</span>
            <HandArrow className="w-14 h-7 rotate-[100deg] -scale-x-100" />
          </div>

          <div className="c-paper relative bg-[#211e17] text-[#ece5d6] border border-[#ece5d6]/10 p-6 sm:p-8 md:p-10 lg:p-9 xl:p-12 shadow-[0_28px_60px_-18px_rgba(0,0,0,0.8),0_2px_6px_rgba(0,0,0,0.45)] rotate-[1deg]">
            <Tape className="-top-3 left-1/2 -translate-x-1/2 -rotate-2" />

            {sent ? (
              <div className="flex flex-col gap-5 py-6 md:py-10" role="status">
                <p className={`${HAND} text-3xl md:text-4xl text-[#8ce6c4] -rotate-1`}>thank you!</p>
                <p style={headingStyle} className="text-3xl md:text-4xl leading-tight">
                  Your email app should be opening with the note ready to send.
                </p>
                <p className="text-[#ece5d6]/70 leading-relaxed">
                  If nothing opened,{' '}
                  <a href={mailtoHref} className="underline decoration-[#33CC99] decoration-2 underline-offset-4">
                    click here
                  </a>{' '}
                  or write to me directly at <span className="font-medium break-all">{EMAIL}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="self-start mt-2 text-lg font-medium underline decoration-[#33CC99] decoration-2 underline-offset-4 hover:text-[#8ce6c4] transition-colors"
                >
                  Write another note
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-6 md:gap-7">
                <p style={headingStyle} className="text-3xl md:text-4xl leading-none">
                  Hi Priya,
                </p>

                <div className="flex flex-wrap items-end gap-x-3 gap-y-3 text-lg md:text-xl">
                  <label htmlFor="c-name">my name is</label>
                  <input id="c-name" name="name" type="text" required autoComplete="name" placeholder="your name" className={blank} />
                </div>

                <div className="flex flex-wrap items-end gap-x-3 gap-y-3 text-lg md:text-xl">
                  <label htmlFor="c-email">and you can reach me at</label>
                  <input id="c-email" name="email" type="email" required autoComplete="email" placeholder="you@email.com" className={blank} />
                </div>

                <div className="flex flex-col gap-3 text-lg md:text-xl">
                  <span id="c-topic">I&apos;m writing about</span>
                  <div role="radiogroup" aria-labelledby="c-topic" className="flex flex-wrap gap-x-5 gap-y-2">
                    {TOPICS.map((t) => {
                      const on = topic === t;
                      return (
                        <button
                          key={t}
                          type="button"
                          role="radio"
                          aria-checked={on}
                          onClick={() => setTopic(t)}
                          className={`${HAND} text-[1.7rem] leading-none px-1 pb-1 transition-all duration-300 ${
                            on
                              ? 'bg-gradient-to-t from-[#33CC99]/40 from-[45%] to-transparent to-[45%] text-[#8ce6c4]'
                              : 'text-[#ece5d6]/45 hover:text-[#ece5d6]/80'
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-1 text-lg md:text-xl">
                  <label htmlFor="c-message">Here&apos;s a bit more:</label>
                  <textarea
                    id="c-message"
                    name="message"
                    required
                    rows={4}
                    placeholder="tell me about it…"
                    className={`${HAND} w-full resize-none bg-transparent px-1 text-[1.75rem] text-[#8ce6c4] outline-none placeholder:text-[#ece5d6]/30`}
                    style={{
                      lineHeight: '2.4rem',
                      backgroundImage:
                        'repeating-linear-gradient(transparent, transparent calc(2.4rem - 2px), rgba(236,229,214,0.18) calc(2.4rem - 2px), rgba(236,229,214,0.18) 2.4rem)',
                    }}
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                  <p className={`${HAND} text-3xl text-[#ece5d6]/60 -rotate-2`}>thanks!</p>
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-3 bg-[#33CC99] text-[#15130f] px-7 py-3.5 text-lg font-semibold transition-colors duration-300 hover:bg-[#8ce6c4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8ce6c4]"
                  >
                    Send my note
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
