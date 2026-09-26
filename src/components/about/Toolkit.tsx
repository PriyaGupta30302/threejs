'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const skills = [
  {
    name: "React.js",
    color: "group-hover:shadow-[0_0_30px_rgba(97,218,251,0.2)] group-hover:border-[#61dafb]/50",
    icon: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" width="40" height="40" className="transition-transform duration-500 group-hover:scale-110">
        <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
        <g stroke="#61dafb" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    )
  },
  {
    name: "Next.js",
    color: "group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] group-hover:border-white/50",
    icon: (
      <svg viewBox="0 0 180 180" width="40" height="40" className="transition-transform duration-500 group-hover:scale-110">
        <mask id="mask0_408_134" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
          <circle cx="90" cy="90" r="90" fill="white"/>
        </mask>
        <g mask="url(#mask0_408_134)">
          <circle cx="90" cy="90" r="90" fill="white"/>
          <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="black"/>
          <path d="M115 54V126H127V54H115Z" fill="black"/>
        </g>
      </svg>
    )
  },
  {
    name: "JavaScript",
    color: "group-hover:shadow-[0_0_30px_rgba(247,223,30,0.2)] group-hover:border-[#F7DF1E]/50",
    icon: (
      <svg viewBox="0 0 24 24" width="40" height="40" className="transition-transform duration-500 group-hover:scale-110">
        <path fill="#F7DF1E" d="M3 3h18v18H3z"/>
        <path d="M11.754 16.518c-.378-.234-.73-.553-.946-.988l1.636-1.026c.15.305.378.53.642.7.27.164.596.257.946.257.432 0 .762-.095.987-.27.228-.175.342-.423.342-.72 0-.256-.096-.455-.262-.573-.186-.118-.563-.263-1.042-.397-.732-.2-1.32-.423-1.685-.643-.377-.21-.663-.52-.857-.887-.187-.367-.282-.82-.282-1.332 0-.663.21-1.213.626-1.638.406-.424.966-.632 1.66-.632.48 0 .914.095 1.282.282.385.187.69.455.93.816L14.15 10.51c-.16-.27-.376-.48-.63-.607-.265-.13-.574-.2-.93-.2-.39 0-.696.082-.916.246-.22.152-.335.362-.335.605 0 .235.084.423.25.564.15.14.542.295 1.155.457.778.188 1.4.422 1.83.69.444.256.784.606 1.01 1.032.227.427.34 1.033.34 1.796 0 .73-.238 1.326-.703 1.765-.453.44-1.077.663-1.854.663-.615 0-1.182-.128-1.67-.395m-6.425-2.227l1.696-1.018c.116.27.292.51.53.7.22.186.496.282.804.282.41 0 .717-.116.92-.352.193-.233.287-.597.287-1.075V8.125h2.01v4.717c0 1.053-.252 1.83-.755 2.33-.496.49-1.18.73-2.02.73-.616 0-1.16-.14-1.616-.41-.453-.282-.777-.677-.962-1.19" fill="#000"/>
      </svg>
    )
  },
  {
    name: "Tailwind CSS",
    color: "group-hover:shadow-[0_0_30px_rgba(56,189,248,0.2)] group-hover:border-[#38bdf8]/50",
    icon: (
      <svg viewBox="0 0 24 24" fill="#38bdf8" width="40" height="40" className="transition-transform duration-500 group-hover:scale-110">
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
      </svg>
    )
  },
  {
    name: "GSAP",
    color: "group-hover:shadow-[0_0_30px_rgba(136,206,2,0.2)] group-hover:border-[#88CE02]/50",
    icon: (
      <svg viewBox="0 0 100 100" width="40" height="40" className="transition-transform duration-500 group-hover:scale-110">
        <circle cx="50" cy="50" r="45" fill="#88CE02"/>
        <text x="50" y="58" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="24" fill="#000" textAnchor="middle">GSAP</text>
      </svg>
    )
  },
  {
    name: "Framer Motion",
    color: "group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] group-hover:border-white/50",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" width="40" height="40" className="transition-transform duration-500 group-hover:scale-110">
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z"/>
      </svg>
    )
  },
  {
    name: "HTML/CSS",
    color: "group-hover:shadow-[0_0_30px_rgba(227,79,38,0.2)] group-hover:border-[#E34F26]/50",
    icon: (
      <div className="flex gap-2 transition-transform duration-500 group-hover:scale-110">
        <svg viewBox="0 0 24 24" fill="#E34F26" width="30" height="30">
          <path d="M1.5 0h21l-1.9 21.5L12 24l-8.6-2.5L1.5 0zm9.6 10.9h6.3l-.3 3.8-5 1.4-5-1.4-.2-2.5H4l.4 5.3 7.6 2.1 7.6-2.1.8-9.4H6l.3 2.8z"/>
        </svg>
        <svg viewBox="0 0 24 24" fill="#1572B6" width="30" height="30">
          <path d="M1.5 0h21l-1.9 21.5L12 24l-8.6-2.5L1.5 0zm9.6 10.9h6.3l-.3 3.8-5 1.4-5-1.4-.2-2.5H4l.4 5.3 7.6 2.1 7.6-2.1.8-9.4H6l.3 2.8z"/>
        </svg>
      </div>
    )
  },
  {
    name: "Three.js",
    color: "group-hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] group-hover:border-white/50",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" width="40" height="40" className="transition-transform duration-500 group-hover:scale-110">
        <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13.5h-13L12 6.5z"/>
      </svg>
    )
  },
  {
    name: "Shopify",
    color: "group-hover:shadow-[0_0_30px_rgba(149,191,71,0.2)] group-hover:border-[#95BF47]/50",
    icon: (
      <svg viewBox="0 0 24 24" fill="#95BF47" width="40" height="40" className="transition-transform duration-500 group-hover:scale-110">
        <path d="M21.1 5.9l-2.7-4.2C18.1 1.1 17.5 1 17 1H7c-.5 0-1.1.1-1.4.7L2.9 5.9C2.4 6.7 2 7.7 2 8.8v10.4C2 21.3 3.7 23 5.8 23h12.4c2.1 0 3.8-1.7 3.8-3.8V8.8c0-1.1-.4-2.1-.9-2.9zM10.8 19c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm1-8.5V4h-1.6v6.5l-3.3-3.3-1.1 1.1 5.2 5.2 5.2-5.2-1.1-1.1-3.3 3.3z"/>
      </svg>
    )
  }
];

export default function Toolkit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!gridRef.current) return;

    const cards = gsap.utils.toArray('.skill-card') as Element[];
    
    gsap.fromTo(cards, 
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-40 w-full relative bg-[#041514] overflow-hidden border-t border-[#3AA89B]/10">
      
      {/* Sci-Fi Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3AA89B]/5 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
        
        <div className="text-center mb-20">
          <h3 className="text-sm font-mono tracking-[0.3em] text-[#3AA89B] uppercase mb-4">02 // The Toolkit</h3>
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight text-white mb-6">Expertise.</h2>
          <p className="text-sm md:text-base font-light text-white/50 max-w-lg mx-auto leading-relaxed">
            These are the core technologies I use every day to build scalable, high-performance, and visually stunning web applications.
          </p>
        </div>

        {/* Bento Grid */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {skills.map((skill, idx) => (
            <div 
              key={idx} 
              className={`skill-card group flex flex-col items-center justify-center p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md cursor-default transition-all duration-500 hover:-translate-y-2 ${skill.color} ${idx === 8 ? 'lg:col-start-3' : ''}`}
            >
              <div className="mb-6 opacity-80 group-hover:opacity-100 transition-opacity duration-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                {skill.icon}
              </div>
              <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors duration-500 text-center tracking-wide">
                {skill.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
