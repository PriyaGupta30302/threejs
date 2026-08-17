'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useTransform, useSpring } from 'framer-motion';

export default function NurturingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  // Background color logic
  const { scrollY } = useScroll();
  const [isDark, setIsDark] = useState(false);

  useMotionValueEvent(scrollY, "change", () => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // When the section is roughly 30% visible from the bottom (top reaches 70% of viewport)
      if (rect.top <= windowHeight * 0.70) {
        setIsDark(true);
      } else {
        setIsDark(false);
      }
    }
  });

  // Scroll Progress for text animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    // Tracks from when the top of the section enters the bottom of viewport
    // until the bottom of the section leaves the top of the viewport
    offset: ["start end", "end start"]
  });

  // Apply a spring to smooth out the raw scroll value
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 25,
    restDelta: 0.001
  });

  // Intro Text ("By nurturing") - Now it only fades in, doesn't fade out
  const opacityIntro = useTransform(smoothProgress, [0, 0.2], [0, 1]);
  const yIntro = useTransform(smoothProgress, [0, 0.2], [20, 0]);

  // Text sliding mappings: [IN_START, IN_END]
  // The mapping stops halfway, so it stays centered when scrolling down to KnowledgeSection.
  // It will only slide back out when scrolling UP (reverse).

  // Line 0
  const xLeft0 = useTransform(smoothProgress, [0.0, 0.55], ["-50vw", "0vw"]);
  const xRight0 = useTransform(smoothProgress, [0.0, 0.55], ["50vw", "0vw"]);
  const opacity0 = useTransform(smoothProgress, [0.0, 0.25], [0, 1]);

  // Line 1
  const xLeft1 = useTransform(smoothProgress, [0.05, 0.6], ["-50vw", "0vw"]);
  const xRight1 = useTransform(smoothProgress, [0.05, 0.6], ["50vw", "0vw"]);
  const opacity1 = useTransform(smoothProgress, [0.05, 0.3], [0, 1]);

  // Line 2
  const xRight2 = useTransform(smoothProgress, [0.1, 0.65], ["50vw", "0vw"]);
  const opacity2 = useTransform(smoothProgress, [0.1, 0.35], [0, 1]);

  // Line 3
  const xLeft3 = useTransform(smoothProgress, [0.15, 0.7], ["-50vw", "0vw"]);
  const opacity3 = useTransform(smoothProgress, [0.15, 0.4], [0, 1]);

  // Line 4
  const xLeft4 = useTransform(smoothProgress, [0.2, 0.75], ["-50vw", "0vw"]);
  const xRight4 = useTransform(smoothProgress, [0.2, 0.75], ["50vw", "0vw"]);
  const opacity4 = useTransform(smoothProgress, [0.2, 0.45], [0, 1]);


  return (
    <motion.section 
      ref={sectionRef} 
      className="w-full py-20 md:py-20 flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      animate={{
        backgroundColor: isDark ? '#151515' : '#ffffff',
        color: isDark ? '#F7F7F7' : '#000000'
      }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      <motion.p 
        className="font-['DM_Sans',_sans-serif] text-[16px] md:text-[20px] mb-6 md:mb-10"
        style={{ opacity: opacityIntro, y: yIntro }}
      >
        By nurturing
      </motion.p>
      
      <h2 className="w-full tracking-tight text-[40px] leading-[45px] md:text-[50px] md:leading-[60px] lg:text-[95px] lg:leading-[109px] font-[300] font-serif" style={{ fontFamily: '"Gestura Headline", sans-serif' }}>
        
        {/* Line 1 */}
        <div className="overflow-hidden mb-2 w-full flex justify-center">
          <motion.span style={{ x: xLeft0, opacity: opacity0 }} className="inline-block whitespace-pre">
            Pattern{' '}
          </motion.span>
          <motion.span style={{ x: xRight0, opacity: opacity0 }} className="inline-block whitespace-pre">
            breakers,
          </motion.span>
        </div>

        {/* Line 2 */}
        <div className="overflow-hidden mb-2 w-full flex justify-center">
          <motion.span style={{ x: xLeft1, opacity: opacity1 }} className="inline-block whitespace-pre">
            Builders of{' '}
          </motion.span>
          <motion.span style={{ x: xRight1, opacity: opacity1 }} className="inline-block whitespace-pre">
            brands,
          </motion.span>
        </div>

        {/* Line 3 */}
        <div className="overflow-hidden mb-2 w-full flex justify-center">
          <motion.span style={{ x: xRight2, opacity: opacity2 }} className="inline-block whitespace-pre">
            Strategic designers,
          </motion.span>
        </div>

        {/* Line 4 */}
        <div className="overflow-hidden mb-2 w-full flex justify-center">
          <motion.span style={{ x: xLeft3, opacity: opacity3 }} className="inline-block whitespace-pre">
            Shapers of interfaces,
          </motion.span>
        </div>

        {/* Line 5 */}
        <div className="overflow-hidden w-full flex justify-center">
          <motion.span style={{ x: xLeft4, opacity: opacity4 }} className="inline-block whitespace-pre">
            Coders with{' '}
          </motion.span>
          <motion.span style={{ x: xRight4, opacity: opacity4 }} className="inline-block whitespace-pre">
            taste.
          </motion.span>
        </div>

      </h2>
    </motion.section>
  );
}

