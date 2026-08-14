'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, Variants, useScroll, useMotionValueEvent } from 'framer-motion';

export default function NurturingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Trigger when 20% of the section is visible
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const { scrollY } = useScroll();
  const [isDark, setIsDark] = useState(false);

  useMotionValueEvent(scrollY, "change", () => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // If the top of the section is above 75% of the viewport height, turn dark.
      // This means it stays dark when scrolling down past it.
      if (rect.top <= windowHeight * 0.75) {
        setIsDark(true);
      } else {
        setIsDark(false);
      }
    }
  });

  // Animation variants (Time-based)
  const leftVariant: Variants = {
    hidden: { opacity: 0, x: "-50vw", transition: { duration: 0.6, ease: "easeIn" } },
    visible: (i: number) => ({
      opacity: 1, 
      x: 0,
      // SLOWED DOWN: Changed duration from 1s to 1.8s, and increased stagger delay
      transition: { duration: 1.8, delay: i * 0.3, ease: [0.16, 1, 0.3, 1] } // Using a very smooth custom easing
    })
  };

  const rightVariant: Variants = {
    hidden: { opacity: 0, x: "50vw", transition: { duration: 0.6, ease: "easeIn" } },
    visible: (i: number) => ({
      opacity: 1, 
      x: 0,
      // SLOWED DOWN
      transition: { duration: 1.8, delay: i * 0.3, ease: [0.16, 1, 0.3, 1] } 
    })
  };

  const fadeVariant: Variants = {
    hidden: { opacity: 0, y: 20, transition: { duration: 0.5 } },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
  };

  return (
    <motion.section 
      ref={sectionRef} 
      className="w-full py-20 md:py-20 flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      animate={{
        backgroundColor: isDark ? '#151515' : '#ffffff',
        color: isDark ? '#F7F7F7' : '#000000'
      }}
      transition={{ duration: 1 }}
    >
      <motion.p 
        className="font-['DM_Sans',_sans-serif] text-[16px] md:text-[20px] mb-6 md:mb-10"
        variants={fadeVariant}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        By nurturing
      </motion.p>
      
      <h2 className="w-full tracking-tight text-[40px] leading-[45px] md:text-[50px] md:leading-[60px] lg:text-[95px] lg:leading-[109px] font-[300] font-serif" style={{ fontFamily: '"Gestura Headline", sans-serif' }}>
        
        {/* Line 1 */}
        <div className="overflow-hidden mb-2 w-full flex justify-center">
          <motion.span custom={0} variants={leftVariant} initial="hidden" animate={isInView ? "visible" : "hidden"} className="inline-block whitespace-pre">
            Pattern{' '}
          </motion.span>
          <motion.span custom={0} variants={rightVariant} initial="hidden" animate={isInView ? "visible" : "hidden"} className="inline-block whitespace-pre">
            breakers,
          </motion.span>
        </div>

        {/* Line 2 */}
        <div className="overflow-hidden mb-2 w-full flex justify-center">
          <motion.span custom={1} variants={leftVariant} initial="hidden" animate={isInView ? "visible" : "hidden"} className="inline-block whitespace-pre">
            Builders of{' '}
          </motion.span>
          <motion.span custom={1} variants={rightVariant} initial="hidden" animate={isInView ? "visible" : "hidden"} className="inline-block whitespace-pre">
            brands,
          </motion.span>
        </div>

        {/* Line 3 */}
        <div className="overflow-hidden mb-2 w-full flex justify-center">
          <motion.span custom={2} variants={rightVariant} initial="hidden" animate={isInView ? "visible" : "hidden"} className="inline-block whitespace-pre">
            Strategic designers,
          </motion.span>
        </div>

        {/* Line 4 */}
        <div className="overflow-hidden mb-2 w-full flex justify-center">
          <motion.span custom={3} variants={leftVariant} initial="hidden" animate={isInView ? "visible" : "hidden"} className="inline-block whitespace-pre">
            Shapers of interfaces,
          </motion.span>
        </div>

        {/* Line 5 */}
        <div className="overflow-hidden w-full flex justify-center">
          <motion.span custom={4} variants={leftVariant} initial="hidden" animate={isInView ? "visible" : "hidden"} className="inline-block whitespace-pre">
            Coders with{' '}
          </motion.span>
          <motion.span custom={4} variants={rightVariant} initial="hidden" animate={isInView ? "visible" : "hidden"} className="inline-block whitespace-pre">
            taste.
          </motion.span>
        </div>

      </h2>
    </motion.section>
  );
}

