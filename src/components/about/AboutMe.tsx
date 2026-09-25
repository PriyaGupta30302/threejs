'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function AboutMe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current || !textRef.current) return;

    // Split text into words for the Apple-style scroll reveal
    const words = textRef.current.querySelectorAll('.word');
    
    gsap.fromTo(words, 
      { opacity: 0.15, color: '#a0aec0' },
      {
        opacity: 1,
        color: '#ffffff',
        stagger: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          end: 'bottom 80%',
          scrub: 1,
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const text = "I am a frontend developer who loves turning complex designs into responsive, production-ready web applications. Over the past two years, I've built everything from full-scale e-commerce storefronts to high-traffic educational platforms. For me, the goal is simple: craft interfaces that don't just look beautiful, but perform flawlessly. Outside of my full-time work, I also collaborate with creatives to build custom portfolio experiences.";

  return (
    <section ref={containerRef} className="pt-16 pb-32 md:pt-24 md:pb-48 w-full overflow-hidden border-t border-[#3AA89B]/10 relative bg-gradient-to-b from-black via-[#020a09] to-[#041514]">
      
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#3AA89B]/10 rounded-full blur-[150px] pointer-events-none translate-x-1/3 -translate-y-1/4"></div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        
        <div className="w-full flex justify-between items-end mb-16 border-b border-[#3AA89B]/20 pb-6">
          <h2 className="text-sm tracking-[0.3em] text-[#3AA89B] uppercase font-semibold">01 / The Story</h2>
          <div className="w-2 h-2 rounded-full bg-[#3AA89B] animate-pulse shadow-[0_0_15px_#3AA89B]"></div>
        </div>

        <div ref={textRef} className="text-3xl md:text-5xl lg:text-6xl font-serif leading-[1.4] md:leading-[1.3] text-center max-w-5xl">
          {text.split(' ').map((word, i) => (
            <span key={i} className="word inline-block mr-[0.3em] transition-colors duration-150">
              {word}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
