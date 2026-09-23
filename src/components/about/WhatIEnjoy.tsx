'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function WhatIEnjoy() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Top section reveal
      gsap.fromTo('.enjoy-top',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.enjoy-top',
            start: 'top 85%',
          }
        }
      );

      // Columns stagger
      gsap.fromTo('.enjoy-col',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.enjoy-col',
            start: 'top 80%',
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const enjoys = [
    { num: '01', title: 'INTERACTIVE UI', desc: 'Creating engaging and meaningful user experiences.' },
    { num: '02', title: 'CLEAN CODE', desc: 'Writing maintainable and scalable code.' },
    { num: '03', title: 'CONTINUOUS LEARNING', desc: 'Exploring new tools, techniques and better ways to build.' },
  ];

  return (
    <section ref={containerRef} className="py-12 px-8 md:px-16 border-t border-white/10 relative overflow-hidden">
      {/* Background ambient glow effect */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#3AA89B]/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

      <div className="flex flex-col md:flex-row gap-12 md:gap-24 mb-20 relative z-10">
        {/* Section Identifier */}
        <div className="enjoy-top w-full md:w-1/4">
          <h3 className="text-xs tracking-[0.2em] text-white/50 uppercase mb-2">05</h3>
          <h2 className="text-sm tracking-[0.2em] text-white/80 uppercase">What I Enjoy</h2>
        </div>

        {/* Content */}
        <div className="enjoy-top w-full md:w-2/4">
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight leading-tight">
            More than <span className="italic text-[#3AA89B] drop-shadow-[0_0_15px_rgba(58,168,155,0.3)]">just</span> code.
          </h2>
        </div>

        {/* Right text */}
        <div className="enjoy-top w-full md:w-1/4">
          <p className="text-sm font-light text-white/60 leading-relaxed border-l border-[#3AA89B]/30 pl-6 relative">
            <span className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#3AA89B] to-transparent"></span>
            I enjoy working on interactive UI, smooth animations and digital experiences that feel different. Whether it&apos;s a pixel-perfect layout, a scroll animation or a complex interaction — I love the process of making it all work.
          </p>
        </div>
      </div>

      {/* 3 Columns */}
      <div className="flex flex-col md:flex-row justify-between gap-12 border-t border-white/10 pt-16 mt-8 relative z-10">
        {enjoys.map((item, idx) => (
          <div key={idx} className="enjoy-col w-full md:w-1/3 group cursor-default">
            <h4 className="text-xs tracking-[0.2em] text-[#3AA89B]/60 mb-4 font-serif italic text-lg transition-colors group-hover:text-[#3AA89B]">{item.num}</h4>
            <h3 className="text-sm tracking-[0.1em] font-bold mb-4 uppercase group-hover:text-white transition-colors text-white/90">{item.title}</h3>
            <p className="text-sm font-light text-white/50 group-hover:text-white/80 transition-colors leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
