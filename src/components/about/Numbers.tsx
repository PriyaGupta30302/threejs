'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Numbers() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Setup numbers array for animation
      const stats = [
        { end: 2, el: '.stat-0' },
        { end: 20, el: '.stat-1' },
        { end: 10, el: '.stat-2' }
      ];

      // Fade up container
      gsap.fromTo('.num-container',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );

      // Animate numbers
      stats.forEach((stat) => {
        const el = document.querySelector(stat.el);
        if (el) {
          gsap.fromTo(el,
            { innerHTML: 0 },
            {
              innerHTML: stat.end,
              duration: 2,
              ease: 'power2.out',
              snap: { innerHTML: 1 },
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
              }
            }
          );
        }
      });
      
      // Animate infinity symbol separately
      gsap.fromTo('.stat-3',
        { opacity: 0, scale: 0.5, rotation: -90 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.5,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: '2', suffix: '+', label: 'YEARS EXPERIENCE', class: 'stat-0' },
    { value: '20', suffix: '+', label: 'PROJECTS WORKED ON', class: 'stat-1' },
    { value: '10', suffix: '+', label: 'HAPPY CLIENTS', class: 'stat-2' },
    { value: '∞', suffix: '', label: 'IDEAS TO BUILD', class: 'stat-3' },
  ];

  return (
    <section ref={containerRef} className="py-12 px-8 md:px-16 border-t border-white/10 relative">
      <div className="flex flex-col md:flex-row items-start gap-12 md:gap-24">
        {/* Section Identifier */}
        <div className="w-full md:w-1/4">
          <h3 className="text-xs tracking-[0.2em] text-white/50 uppercase mb-2">04</h3>
          <h2 className="text-sm tracking-[0.2em] text-white/80 uppercase">A Few<br />Numbers</h2>
        </div>

        {/* Stats Row */}
        <div className="w-full md:w-3/4 flex flex-wrap md:flex-nowrap justify-between gap-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="num-container flex flex-col border-l border-[#3AA89B]/30 pl-6 w-[45%] md:w-1/4 relative">
              <div className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#3AA89B] to-transparent origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500"></div>
              
              <h4 className="text-5xl md:text-6xl font-light mb-4 flex items-center">
                <span className={stat.class}>{stat.value}</span>
                <span className="text-[#3AA89B] font-serif">{stat.suffix}</span>
              </h4>
              <p className="text-xs tracking-[0.1em] text-white/60 uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
