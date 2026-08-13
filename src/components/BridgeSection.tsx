'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function BridgeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !bgRef.current) return;

    // Parallax effect: Start with image shifted UP by ~16.66% of its own height
    // (which equals 20% of the section height, aligning bottoms).
    // End with image at 0 (so top aligns with section top).
    gsap.fromTo(
      bgRef.current,
      { yPercent: -16.666 },
      {
        yPercent: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black flex items-center">
      {/* Background Parallax Image */}
      <div ref={bgRef} className="absolute z-0 w-full h-[120%] top-0 left-0">
        <Image
          src="/bridge/imgi_17_bridge_up-Offground.jpg"
          alt="Bridge Background"
          fill
          className="object-cover object-center"
          style={{ transform: 'scale(1.2)' }}
          priority
          quality={100}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-12 h-full flex flex-col justify-end md:justify-center pb-32 md:pb-0">
        {/* Top small text */}
        <div className="mb-6 md:mb-8">
          <p className="text-black font-['DM_Sans',_sans-serif] text-[20px] md:text-[28px] leading-[26px] md:leading-[34px]">
            To say it simply
          </p>
        </div>

        {/* 3:1 Grid Ratio for main text */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
          <div className="md:col-span-3">
            {/* Desktop Heading */}
            <h2 className="hidden md:block font-serif text-[#1a1a1a] tracking-tight text-[150px] leading-[135px]">
              we fast forward<br />
              companies to<br />
              their best future<br />
              selves...
            </h2>
            {/* Mobile Heading */}
            <h2 className="block md:hidden font-serif text-[#1a1a1a] tracking-tight text-[55px] leading-[58px]">
              we fast forward<br />
              companies to their<br />
              best future selves...
            </h2>
          </div>
          <div className="hidden md:block md:col-span-1">
            {/* Empty space for 3:1 ratio as requested (desktop only) */}
          </div>
        </div>

        {/* Bottom Button */}
        <div className="absolute bottom-12 left-6 md:left-12">
          <button className="px-8 py-3 rounded-full border border-black text-black text-sm hover:bg-black hover:text-white transition-colors duration-300">
            Who are we?
          </button>
        </div>
      </div>
    </section>
  );
}
