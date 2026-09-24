'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const row1 = [
  { 
    name: "React.js", 
    desc: "Core Architecture",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/><line x1="3.95" y1="6.06" x2="8.54" y2="14"/><line x1="10.88" y1="21.94" x2="15.46" y2="14"/></svg>
  },
  { 
    name: "Next.js", 
    desc: "Server-Side Rendering",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
  },
  { 
    name: "TypeScript", 
    desc: "Type Safety",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>
  },
  { 
    name: "Tailwind CSS", 
    desc: "Utility Styling",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
  }
];

const row2 = [
  { 
    name: "GSAP", 
    desc: "Advanced Animation",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 12l-4-4-4 4M12 8v8"/></svg>
  },
  { 
    name: "Three.js", 
    desc: "3D Rendering / WebGL",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
  },
  { 
    name: "Shopify", 
    desc: "E-Commerce Systems",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
  },
  { 
    name: "Figma", 
    desc: "Design Handoff",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"/><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"/><path d="M12 9H8.5a3.5 3.5 0 1 0 0 7H12V9z"/><path d="M12 16H8.5a3.5 3.5 0 1 0 3.5 3.5V16z"/><path d="M12 9h3.5a3.5 3.5 0 1 1 0 7H12V9z"/></svg>
  }
];

export default function Toolkit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current || !scrollWrapperRef.current) return;

    const wrapper = scrollWrapperRef.current;
    
    const tween = gsap.to(wrapper, {
      x: () => -(wrapper.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${wrapper.scrollWidth - window.innerWidth}`,
        invalidateOnRefresh: true,
      }
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const renderModule = (tool: any, idx: number, rowId: string) => (
    <div key={`${rowId}-${idx}`} className="shrink-0 w-[280px] h-[160px] relative border border-[#3AA89B]/30 bg-black/40 backdrop-blur-md p-6 group hover:bg-[#3AA89B]/10 hover:border-[#3AA89B]/60 transition-all duration-300">
      {/* Sci-Fi Corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#3AA89B]"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#3AA89B]"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#3AA89B]"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#3AA89B]"></div>
      
      <div className="flex justify-between items-start mb-4">
        <div className="text-[#3AA89B] opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-300">
          {tool.icon}
        </div>
        <p className="text-[10px] font-mono text-[#3AA89B]/50 tracking-[0.2em] uppercase">SYS.{idx + 1}</p>
      </div>
      
      <div>
        <h3 className="text-xl font-serif text-white tracking-wide">{tool.name}</h3>
        <p className="text-[11px] font-mono text-white/40 tracking-wider mt-2 uppercase">{tool.desc}</p>
      </div>
    </div>
  );

  return (
    <section ref={containerRef} className="h-screen w-full relative bg-[#041514] overflow-hidden flex items-center border-t border-[#3AA89B]/10">
      
      {/* Sci-Fi Background Grid */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="absolute top-12 md:top-24 left-6 md:left-12 z-20">
        <h3 className="text-[10px] font-mono tracking-[0.3em] text-[#3AA89B] uppercase mb-2">02 // Systems</h3>
        <h2 className="text-2xl md:text-3xl font-serif tracking-tight text-white">The Toolkit</h2>
      </div>

      <div className="w-full h-full flex flex-col justify-center pt-10">
        
        <div ref={scrollWrapperRef} className="flex flex-nowrap w-max px-12 md:px-[20vw] items-center gap-16 md:gap-32">
          
          {/* Intro Text */}
          <div className="shrink-0 w-[300px] md:w-[400px]">
            <p className="text-sm font-mono text-[#3AA89B] tracking-[0.2em] mb-4 uppercase">Initializing...</p>
            <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-4">
              Core <br/><span className="italic text-[#3AA89B]">Technologies.</span>
            </h2>
            <p className="text-xs font-mono text-white/50 leading-relaxed max-w-xs">
              Scanning local environments for optimal performance frameworks and architectural structures.
            </p>
          </div>

          {/* Module Grids */}
          <div className="flex flex-col gap-6">
            <div className="flex gap-6">
              {row1.map((tool, idx) => renderModule(tool, idx, 'r1'))}
            </div>
            {/* Offset second row slightly for a complex dashboard look */}
            <div className="flex gap-6 ml-12">
              {row2.map((tool, idx) => renderModule(tool, idx, 'r2'))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
