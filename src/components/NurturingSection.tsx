'use client';

import React, { useRef } from 'react';
import { useInView } from 'framer-motion';

export default function NurturingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Trigger when 15% of the section is visible
  const isInView = useInView(sectionRef, { once: false, amount: 0.15 });

  return (
    <section 
      ref={sectionRef} 
      className={`w-full py-24 md:py-20 flex flex-col items-center justify-center text-center px-6 overflow-hidden transition-colors duration-1000 ease-in-out ${isInView ? 'bg-black text-[#F7F7F7]' : 'bg-white text-black'}`}
    >
      <p 
        className={`font-['DM_Sans',_sans-serif] text-[16px] md:text-[20px] mb-12 md:mb-16 transition-all duration-1000 delay-100 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
      >
        By nurturing
      </p>
      
      <h2 className="w-full tracking-tight text-[40px] leading-[45px] md:text-[70px] md:leading-[80px] lg:text-[95px] lg:leading-[109px] font-[300] font-serif" style={{ fontFamily: '"Gestura Headline", sans-serif' }}>
        
        {/* Line 1 */}
        <div className="overflow-hidden mb-2 w-full">
          <span 
            className={`inline-block transition-all duration-1000 delay-[200ms] ease-out ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[50vw]'}`}
          >
            Pattern
          </span>{' '}
          <span 
            className={`inline-block transition-all duration-1000 delay-[200ms] ease-out ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[50vw]'}`}
          >
            breakers,
          </span>
        </div>

        {/* Line 2 */}
        <div className="overflow-hidden mb-2 w-full">
          <span 
            className={`inline-block transition-all duration-1000 delay-[350ms] ease-out ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[50vw]'}`}
          >
            Builders of
          </span>{' '}
          <span 
            className={`inline-block transition-all duration-1000 delay-[350ms] ease-out ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[50vw]'}`}
          >
            brands,
          </span>
        </div>

        {/* Line 3 */}
        <div className="overflow-hidden mb-2 w-full">
          <span 
            className={`inline-block transition-all duration-1000 delay-[500ms] ease-out ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[50vw]'}`}
          >
            Strategic designers,
          </span>
        </div>

        {/* Line 4 */}
        <div className="overflow-hidden mb-2 w-full">
          <span 
            className={`inline-block transition-all duration-1000 delay-[650ms] ease-out ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[50vw]'}`}
          >
            Shapers of interfaces,
          </span>
        </div>

        {/* Line 5 */}
        <div className="overflow-hidden w-full">
          <span 
            className={`inline-block transition-all duration-1000 delay-[800ms] ease-out ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[50vw]'}`}
          >
            Coders with
          </span>{' '}
          <span 
            className={`inline-block transition-all duration-1000 delay-[800ms] ease-out ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[50vw]'}`}
          >
            taste.
          </span>
        </div>

      </h2>
    </section>
  );
}

