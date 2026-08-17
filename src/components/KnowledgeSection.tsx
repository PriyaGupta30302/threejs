'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function KnowledgeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    let lastScrollY = window.scrollY;

    const updateParallax = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if section is in viewport
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const totalDistance = windowHeight + rect.height;
        const progress = 1 - ((rect.top + rect.height) / totalDistance);
        
        // yMovement mapped from -30 to 30 based on progress
        const yMovement1 = -30 + (progress * 60); 
        const yMovement2 = -15 + (progress * 30); 
        
        if (leftImageRef.current) {
          leftImageRef.current.style.transform = `translateY(${yMovement1}%)`;
        }
        if (rightImageRef.current) {
          rightImageRef.current.style.transform = `translateY(${yMovement2}%)`;
        }
      }
    };

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
    <section ref={containerRef} className="relative w-full py-10 md:py-0 bg-[#151515] text-white flex items-center overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:grid md:grid-cols-12 gap-10 md:gap-4 items-center">
        {/* Left Column - Text */}
        <div className="order-2 md:order-1 md:col-span-5 flex flex-col gap-6 md:gap-8 text-[24px] md:text-[22px] lg:text-[28px] leading-[30px] md:leading-[28px] lg:leading-[34px] font-medium font-['DM_Sans',_sans-serif]">
          <p>
            My portfolio is built on real-world projects.<br className="hidden lg:block" />
            And I&apos;ve shipped many.
          </p>
          <p>
            From Meiosis Publication to Rabbit Autocare,<br className="hidden lg:block" />
            I aim to bring premium quality to every build.
          </p>
          <p>
            Currently showcasing 2 featured projects,<br className="hidden lg:block" />
            with more to be added very soon.
          </p>
        </div>

        {/* Images Wrapper */}
        <div className="order-1 md:order-2 md:col-span-7 flex flex-row md:grid md:grid-cols-7 items-center justify-center gap-4 md:gap-0 w-full h-[300px] md:h-[400px] lg:h-auto">
          {/* Image 1 */}
          <div className="md:col-span-3 flex justify-end md:justify-center items-center relative h-full md:h-[400px] lg:h-[650px] w-1/3 md:w-auto">
            <div ref={leftImageRef} className="relative w-[90px] md:w-[90px] lg:w-[130px] h-[250px] md:h-[320px] lg:h-[450px] will-change-transform">
              <Image
                src="/knowledge/imgi_9_honorable_mention_awwwards-OffGROUND.png"
                alt="Honorable Mention Awwwards"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>

          {/* Image 2 */}
          <div className="md:col-span-4 flex justify-start md:justify-center items-center relative h-full md:h-[400px] lg:h-[450px] w-2/3 md:w-auto pl-4 md:pl-0">
            <div ref={rightImageRef} className="relative w-[190px] md:w-[220px] lg:w-[350px] h-[190px] md:h-[220px] lg:h-[350px] will-change-transform mt-12 md:mt-0">
              <Image
                src="/knowledge/imgi_10_german_web_awards-OffGROUND.png"
                alt="German Web Awards"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
