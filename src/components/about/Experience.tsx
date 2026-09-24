'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const timeline = [
  {
    year: "2024",
    role: "Frontend Developer (Intern to Full-Time)",
    company: "Indiefluence",
    description: "Started as an intern and transitioned into a permanent role within the exact same year. I built complete storefronts from scratch, transformed outdated interfaces into modern UIs, and established robust, reusable component systems for e-commerce and educational platforms.",
    tags: ["Internship", "Full-Time", "UI/UX"]
  },
  {
    year: "2025",
    role: "Senior Frontend Developer",
    company: "Indiefluence",
    description: "Promoted to a senior role. Alongside developing full-scale platforms, I took on the responsibility of guiding junior developers, solving their technical doubts, and efficiently distributing tasks to ensure smooth project delivery.",
    tags: ["Mentorship", "Architecture", "Delegation"]
  },
  {
    year: "2026",
    role: "Senior Frontend Developer",
    company: "Indiefluence",
    description: "Continuing to spearhead frontend builds, maintaining strict quality standards, and optimizing complex, animation-heavy applications to ensure flawless performance and zero bugs before client handoff.",
    tags: ["Optimization", "Quality Assurance"]
  },
  {
    year: "Freelance",
    role: "Independent Web Developer",
    company: "Creative Clients",
    description: "Collaborated directly with creatives to engineer custom digital experiences. Designed and developed 2 premium, highly interactive portfolio websites tailored to showcase client work with immersive scroll animations.",
    tags: ["Portfolios", "Creative Development"]
  }
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current) return;
    
    // Animate cards stacking
    const cards = gsap.utils.toArray('.stack-card');
    
    cards.forEach((card: any, i) => {
      gsap.fromTo(card, 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="py-16 md:py-32 w-full border-t border-[#3AA89B]/10 relative bg-gradient-to-b from-[#041514] to-black">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-8 md:gap-16">
        
        {/* Section Identifier - Sticky */}
        <div className="w-full md:w-1/4 shrink-0">
          <div className="sticky top-32">
            <h3 className="text-xs tracking-[0.2em] text-[#3AA89B] font-semibold uppercase mb-2">03</h3>
            <h2 className="text-3xl md:text-4xl font-serif tracking-tight text-white mb-6">Experience</h2>
            <p className="text-sm font-light text-white/60 leading-relaxed max-w-xs">
              My journey of building, guiding, and constantly learning.
            </p>
          </div>
        </div>

        {/* Stacking Cards Content */}
        <div className="w-full md:w-3/4 flex flex-col gap-8 pb-20">
          
          {timeline.map((item, idx) => (
            <div 
              key={idx} 
              className="stack-card sticky w-full p-8 md:p-10 rounded-[2rem] border border-[#3AA89B]/10 bg-[#061c1a] shadow-2xl flex flex-col md:flex-row gap-8 items-start"
              style={{ zIndex: idx, top: `calc(8rem + ${idx * 1.5}rem)` }}
            >
              <div className="md:w-1/4 shrink-0">
                <div className="text-4xl md:text-5xl font-serif text-[#3AA89B]">{item.year}</div>
              </div>
              
              <div className="md:w-3/4 flex flex-col">
                <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">{item.role}</h3>
                <h4 className="text-sm tracking-[0.1em] text-[#3AA89B] uppercase mb-6 font-medium">{item.company}</h4>
                
                <p className="text-base md:text-lg font-light text-white/90 leading-relaxed mb-8">
                  {item.description}
                </p>
                
                <div className="flex flex-wrap gap-3 mt-auto">
                  {item.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-4 py-2 rounded-full border border-[#3AA89B]/20 bg-[#3AA89B]/10 text-xs text-white/80">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
