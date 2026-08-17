'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function BridgeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    let lastScrollY = window.scrollY;

    const updateParallax = () => {
      if (!containerRef.current || !bgRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if section is in viewport
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        // Progress goes from 0 (just entering bottom of screen) to 1 (just leaving top of screen)
        const totalDistance = windowHeight + rect.height;
        // rect.top goes from `windowHeight` down to `-rect.height`
        const progress = 1 - ((rect.top + rect.height) / totalDistance);
        
        // Map progress (0 to 1) to yPercent movement (-20 to 20)
        // User wants: scroll down -> image moves down. 
        // Scroll down means progress increases. So if progress goes 0 -> 1, yPercent goes -20 -> 20.
        // This physically moves the image DOWN relative to the container as we scroll down.
        const yMovement = -20 + (progress * 40); 
        
        // Apply transform
        bgRef.current.style.transform = `translateY(${yMovement}%)`;
      }
    };

    // Use requestAnimationFrame for smooth performance
    const onScroll = () => {
      if (window.scrollY !== lastScrollY) {
        lastScrollY = window.scrollY;
        rafId = requestAnimationFrame(updateParallax);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Initial check
    updateParallax();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black flex items-center">
      {/* Background Parallax Image */}
      <div ref={bgRef} className="absolute z-0 w-full h-[150%] -top-[25%] left-0">
        <Image
          src="/bridge/imgi_17_bridge_up-Offground.jpg"
          alt="Bridge Background"
          fill
          className="object-cover object-center"
          style={{ transform: 'scale(1.1)' }}
          priority
          quality={100}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-12 h-full flex flex-col justify-end md:justify-center pb-32 md:pb-0">
        {/* Top small text */}
        <div className="mb-6 md:mb-8">
          <p className="text-black font-['DM_Sans',_sans-serif] text-[20px] md:text-[28px] leading-[26px] md:leading-[34px] lg:-mt-20">
            The Goal
          </p>
        </div>

        {/* 3:1 Grid Ratio for main text */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
          <div className="md:col-span-3">
            {/* Desktop / Tablet Heading */}
            <h2 className="hidden md:block font-serif text-[#1a1a1a] tracking-tight md:text-[110px] md:leading-[95px] lg:text-[100px] lg:leading-[105px] xl:text-[140px] xl:leading-[120px] lg:-mt-12">
              i translate figma<br />
              into pixel-perfect<br />
              cross-browser<br />
              UIs...
            </h2>
            {/* Mobile Heading */}
            <h2 className="block md:hidden font-serif text-[#1a1a1a] tracking-tight text-[55px] leading-[58px]">
              i translate figma<br />
              into pixel-perfect<br />
              cross-browser UIs...
            </h2>
          </div>
          <div className="hidden md:block md:col-span-1">
            {/* Empty space for 3:1 ratio as requested (desktop only) */}
          </div>
        </div>

        {/* Bottom Button */}
        <div className="absolute bottom-12 left-6 md:left-12">
          <button className="px-8 py-3 rounded-full border border-black text-black text-sm hover:bg-black hover:text-white transition-colors duration-300">
            View Experience
          </button>
        </div>
      </div>
    </section>
  );
}
