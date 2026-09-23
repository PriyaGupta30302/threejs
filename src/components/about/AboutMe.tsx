'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function AboutMe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo('.about-heading span',
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.1, 
          ease: 'power4.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );

      // Paragraph fade up
      gsap.fromTo('.about-p',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-p',
            start: 'top 85%',
          }
        }
      );

      // Float items in right side
      gsap.fromTo('.about-float',
        { opacity: 0, x: 20 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-float',
            start: 'top 90%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-12 px-8 md:px-16 border-t border-white/10 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3AA89B]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="flex flex-col md:flex-row gap-12 md:gap-24 relative z-10">
        {/* Section Identifier */}
        <div className="w-full md:w-1/4">
          <h3 className="text-xs tracking-[0.2em] text-white/50 uppercase mb-2">01</h3>
          <h2 className="text-sm tracking-[0.2em] text-white/80 uppercase">A Little<br />About Me</h2>
        </div>

        {/* Content */}
        <div className="w-full md:w-2/4">
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-8 leading-tight">
            <span className="block overflow-hidden pb-2">
              <span className="about-heading inline-block">Curious mind.</span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span className="about-heading inline-block italic text-[#3AA89B] drop-shadow-[0_0_15px_rgba(58,168,155,0.3)]">Creative</span>
              <span className="about-heading inline-block ml-3">by nature.</span>
            </span>
          </h2>
          
          <div className="space-y-6 text-lg font-light text-white/70">
            <p className="about-p">
              I'm a Frontend Developer who enjoys turning ideas into clean, functional and visually engaging websites. I love working at the intersection of design and technology, where creativity meets logic.
            </p>
            <p className="about-p">
              Over the past 2+ years, I've worked on a variety of projects — from business websites and educational platforms to eCommerce stores — helping brands bring their ideas to life on the web.
            </p>
          </div>
        </div>

        {/* Right side floating text */}
        <div className="hidden md:flex flex-col justify-between w-full md:w-1/4 text-xs tracking-[0.2em] uppercase text-white/40 border-l border-white/10 pl-8">
          <div className="about-float hover:text-white transition-colors">
            Better<br/>Websites<br/>Brighter<br/>Ideas
          </div>
          <div className="about-float">
            <span className="block mb-4 w-[1px] h-12 bg-gradient-to-b from-[#3AA89B] to-transparent"></span>
            Based in India<br/>
            Open to<br/>
            Opportunities <span className="inline-block w-2 h-2 rounded-full bg-[#3AA89B] ml-2 animate-pulse shadow-[0_0_10px_rgba(58,168,155,0.8)]"></span>
          </div>
        </div>
      </div>
    </section>
  );
}
