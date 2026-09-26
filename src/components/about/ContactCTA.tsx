'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ContactCTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Content reveal
      gsap.fromTo('.cta-item',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          }
        }
      );

      // Button magnetic hover effect simulation
      const btn = document.querySelector('.cta-btn') as HTMLElement;
      if (btn) {
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          gsap.to(btn, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
        
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)'
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-12 px-8 md:px-16 border-t border-white/10 relative mb-12 overflow-hidden">
      {/* Background ambient glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#3AA89B]/10 rounded-[100%] blur-[120px] pointer-events-none"></div>

      <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-center md:items-end relative z-10">
        {/* Left Side */}
        <div className="w-full md:w-1/2">
          <h3 className="cta-item text-xs tracking-[0.2em] text-white/50 uppercase mb-6">Let&apos;s Connect</h3>
          <h2 className="cta-item text-5xl md:text-7xl font-serif tracking-tight leading-tight">
            Have a <span className="italic text-[#3AA89B] drop-shadow-[0_0_15px_rgba(58,168,155,0.4)]">project</span><br />
            in mind?
          </h2>
        </div>

        {/* Right side */}
        <div className="w-full md:w-1/2 md:pl-24">
          <p className="cta-item text-sm font-light text-white/80 leading-relaxed mb-8 max-w-sm">
            I&apos;m always open to exciting opportunities, collaborations or just a friendly chat about technology, design or new ideas.
          </p>
          <div className="cta-item">
            <a href="mailto:hello@example.com" className="cta-btn inline-flex items-center gap-4 border border-white/30 rounded-full px-8 py-3 text-sm hover:bg-white hover:text-black hover:border-white transition-all duration-300 shadow-[0_0_0_rgba(58,168,155,0)] hover:shadow-[0_0_20px_rgba(58,168,155,0.4)] relative">
              Get in Touch
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
