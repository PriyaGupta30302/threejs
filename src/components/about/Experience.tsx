'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Main Heading
      gsap.fromTo('.exp-heading',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.exp-heading',
            start: 'top 85%',
          }
        }
      );

      // Timeline reveal
      gsap.fromTo('.exp-timeline',
        { scaleY: 0, transformOrigin: 'top' },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.exp-timeline-container',
            start: 'top 75%',
          }
        }
      );

      // Dot glow animation
      gsap.fromTo('.exp-dot',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: '.exp-timeline-container',
            start: 'top 75%',
          }
        }
      );

      // Content fade in
      gsap.fromTo('.exp-content > *',
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.exp-timeline-container',
            start: 'top 70%',
          }
        }
      );

      // Right text
      gsap.fromTo('.exp-right-text',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.exp-right-text',
            start: 'top 85%',
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-12 px-8 md:px-16 border-t border-white/10 relative">
      <div className="flex flex-col md:flex-row gap-12 md:gap-24">
        {/* Section Identifier */}
        <div className="w-full md:w-1/4">
          <h3 className="text-xs tracking-[0.2em] text-white/50 uppercase mb-2">02</h3>
          <h2 className="text-sm tracking-[0.2em] text-white/80 uppercase">Experience</h2>
        </div>

        {/* Content */}
        <div className="w-full md:w-2/4">
          <h2 className="exp-heading text-4xl md:text-5xl font-serif tracking-tight mb-16 leading-tight">
            2+ years of<br />
            building for the web.
          </h2>
          
          <div className="exp-timeline-container relative pl-8">
            {/* Timeline Line */}
            <div className="exp-timeline absolute left-0 top-2 bottom-0 w-[1px] bg-gradient-to-b from-[#3AA89B] to-transparent opacity-50"></div>
            
            {/* Timeline Dot */}
            <div className="exp-dot absolute w-3 h-3 bg-[#3AA89B] rounded-full left-[-5.5px] top-2 shadow-[0_0_15px_#3AA89B]">
              <div className="absolute inset-0 rounded-full bg-[#3AA89B] animate-ping opacity-50"></div>
            </div>
            
            <div className="exp-content">
              <div className="mb-2">
                <span className="text-xs tracking-[0.1em] text-white/50 uppercase">2024 — Present</span>
              </div>
              <h3 className="text-xl font-bold mb-1 group">
                <span className="group-hover:text-[#3AA89B] transition-colors">Indiefluence</span> 
                <span className="text-white/40 font-normal ml-2 text-sm">• Kurukshetra</span>
              </h3>
              <h4 className="text-lg text-white/80 font-medium mb-6">Frontend Developer</h4>
              
              <p className="text-base font-light text-white/60 leading-relaxed mb-4 hover:text-white/80 transition-colors duration-300">
                Worked on multiple client projects including business websites, educational platforms and eCommerce stores. Responsible for building responsive and interactive user interfaces using React.js, Next.js, Tailwind CSS and modern web technologies. Also involved in website maintenance, performance improvements and feature updates.
              </p>
            </div>
          </div>
        </div>

        {/* Right side floating text */}
        <div className="hidden md:flex flex-col justify-between w-full md:w-1/4 text-xs tracking-[0.2em] uppercase text-white/40 pl-8">
          <div className="exp-right-text leading-relaxed">
            My journey so far — from learning and exploring to working on real-world projects, collaborating with amazing people and growing as a developer.
          </div>
          <div className="exp-right-text mt-16">
            <span className="hover:text-white transition-colors">Real Projects</span><br/>
            <span className="hover:text-white transition-colors">Real Learning</span><br/>
            <span className="hover:text-white transition-colors">Real Growth</span><br/><br/>
            <span className="block mb-4 w-[1px] h-12 bg-white/20"></span>
            <span className="hover:text-white transition-colors">Still Exploring</span><br/>
            <span className="hover:text-white transition-colors">Still Learning</span><br/>
            <span className="hover:text-white transition-colors">Still Building</span> <span className="inline-block w-2 h-2 rounded-full bg-[#3AA89B] ml-2 animate-pulse"></span>
          </div>
        </div>
      </div>
    </section>
  );
}
