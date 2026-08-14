'use client';

import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

export default function NurturingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Trigger when 20% of the section is visible
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

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
      className="w-full py-10 md:py-20 flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      animate={{
        backgroundColor: isInView ? '#000000' : '#ffffff',
        color: isInView ? '#F7F7F7' : '#000000'
      }}
      transition={{ duration: 1 }}
    >
      <motion.p 
        className="font-['DM_Sans',_sans-serif] text-[16px] md:text-[20px] mb-12 md:mb-16"
        variants={fadeVariant}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        By nurturing
      </motion.p>
      
      <h2 className="w-full tracking-tight text-[40px] leading-[45px] md:text-[70px] md:leading-[80px] lg:text-[95px] lg:leading-[109px] font-[300] font-serif" style={{ fontFamily: '"Gestura Headline", sans-serif' }}>
        
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

