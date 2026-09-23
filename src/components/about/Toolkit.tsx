'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const tools = [
  { name: 'React.js', icon: '⚛️' },
  { name: 'Next.js', icon: 'N' },
  { name: 'JavaScript (ES6+)', icon: 'JS' },
  { name: 'GSAP', icon: '🟢' },
  { name: 'Three.js', icon: '🔺' },
  { name: 'Tailwind CSS', icon: '🌊' },
  { name: 'Shopify (Liquid)', icon: '🛍️' },
  { name: 'Git / GitHub', icon: '🐙' },
  { name: 'Figma', icon: '🎨' },
  { name: 'VS Code', icon: '💻' }
];

export default function Toolkit() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo('.toolkit-heading',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.toolkit-heading',
            start: 'top 85%',
          }
        }
      );

      // Grid items stagger
      gsap.fromTo('.toolkit-item',
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: '.toolkit-grid',
            start: 'top 80%',
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-12 px-8 md:px-16 border-t border-white/10 relative">
      <div className="flex flex-col md:flex-row gap-12 md:gap-24 mb-16">
        {/* Section Identifier */}
        <div className="w-full md:w-1/4">
          <h3 className="text-xs tracking-[0.2em] text-white/50 uppercase mb-2">03</h3>
          <h2 className="text-sm tracking-[0.2em] text-white/80 uppercase">My Toolkit</h2>
        </div>

        {/* Content */}
        <div className="w-full md:w-2/4 flex flex-col justify-center">
          <h2 className="toolkit-heading text-4xl md:text-5xl font-serif tracking-tight leading-tight">
            Tools I work with.
          </h2>
        </div>

        <div className="hidden md:flex flex-col justify-center w-full md:w-1/4 text-xs tracking-[0.1em] text-white/50">
          A mix of modern tools and technologies that help me bring ideas to life.
        </div>
      </div>

      {/* Grid */}
      <div className="toolkit-grid grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 max-w-6xl mx-auto">
        {tools.map((tool, idx) => (
          <div key={idx} className="toolkit-item flex items-center gap-4 py-4 px-6 border border-white/5 rounded-xl hover:border-[#3AA89B]/50 transition-all duration-300 bg-white/[0.01] hover:bg-[#3AA89B]/[0.02] hover:shadow-[0_0_20px_rgba(58,168,155,0.1)] group">
            <span className="text-2xl opacity-80 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-300">{tool.icon}</span>
            <span className="text-sm font-light text-white/80 group-hover:text-white transition-colors">{tool.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
