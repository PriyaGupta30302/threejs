'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function NurturingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  
  const textRef1L = useRef<HTMLSpanElement>(null);
  const textRef1R = useRef<HTMLSpanElement>(null);
  const textRef2L = useRef<HTMLSpanElement>(null);
  const textRef2R = useRef<HTMLSpanElement>(null);
  const textRef3R = useRef<HTMLSpanElement>(null);
  const textRef4L = useRef<HTMLSpanElement>(null);
  const textRef5L = useRef<HTMLSpanElement>(null);
  const textRef5R = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%', // Triggers when top of section hits 70% of viewport
          toggleActions: 'play none none reverse',
        },
      });

      // Animate the 'By nurturing' text first
      tl.fromTo(pRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0);
        
      const staggerTime = 0.15;

      // Line 1
      tl.fromTo(textRef1L.current, { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 0.2)
        .fromTo(textRef1R.current, { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 0.2)
      // Line 2
        .fromTo(textRef2L.current, { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 0.2 + staggerTime)
        .fromTo(textRef2R.current, { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 0.2 + staggerTime)
      // Line 3
        .fromTo(textRef3R.current, { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 0.2 + staggerTime * 2)
      // Line 4
        .fromTo(textRef4L.current, { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 0.2 + staggerTime * 3)
      // Line 5
        .fromTo(textRef5L.current, { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 0.2 + staggerTime * 4)
        .fromTo(textRef5R.current, { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, 0.2 + staggerTime * 4);


    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#222222] py-24 md:py-40 flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <p ref={pRef} className="text-white font-['DM_Sans',_sans-serif] text-[16px] md:text-[20px] mb-12 md:mb-16">
        By nurturing
      </p>
      
      <h2 className="font-serif text-[#f4f4f4] tracking-tight text-[40px] leading-[1.1] md:text-[70px] md:leading-[1.1] lg:text-[90px] lg:leading-[1.1]">
        <span ref={textRef1L} className="inline-block">Pattern</span> <span ref={textRef1R} className="inline-block">breakers,</span><br />
        <span ref={textRef2L} className="inline-block">Builders of</span> <span ref={textRef2R} className="inline-block">brands,</span><br />
        <span ref={textRef3R} className="inline-block">Strategic designers,</span><br />
        <span ref={textRef4L} className="inline-block">Shapers of interfaces,</span><br />
        <span ref={textRef5L} className="inline-block">Coders with</span> <span ref={textRef5R} className="inline-block">&nbsp;&nbsp;&nbsp;taste.</span>
      </h2>
    </section>
  );
}
