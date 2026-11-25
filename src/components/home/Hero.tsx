'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'framer-motion';
import { Particles } from '../ParticlesScene';
import Image from 'next/image';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "200px" });
  const progressRef = useRef(0);
  const titleWrapRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Fit the title to the full width of the screen on a single line
  useLayoutEffect(() => {
    const wrap = titleWrapRef.current;
    const title = titleRef.current;
    if (!wrap || !title) return;
    const fit = () => {
      title.style.fontSize = '100px';
      const natural = title.scrollWidth;
      if (natural > 0) title.style.fontSize = `${(wrap.clientWidth / natural) * 100}px`;
    };
    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    
    if (!containerRef.current) return;

    const mm = gsap.matchMedia();

    // Mobile: Requires much less physical scroll distance to form the circle
    mm.add("(max-width: 767px)", () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=100%', 
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          progressRef.current = self.progress;
        },
      });
    });

    // Desktop: Original longer scroll distance
    mm.add("(min-width: 768px)", () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          progressRef.current = self.progress;
        },
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen w-full bg-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 w-full h-screen bg-black">
        <Image
          src="/hero/hero-img.png"
          alt="Hero Background"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Vignette Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_10%,_rgba(0,0,0,0.8)_90%)] pointer-events-none"></div>
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-10">
        <Canvas frameloop={isInView ? 'always' : 'demand'} camera={{ position: [0, 2, 30], fov: 45 }} dpr={[1, 1.5]} performance={{ min: 0.5 }}>
          <Particles progressRef={progressRef} />
        </Canvas>
      </div>

      {/* Title */}
      <div className="absolute bottom-24 md:bottom-12 left-0 right-0 z-20 w-full px-4 md:px-8 pointer-events-none">
        <div ref={titleWrapRef} className="w-full">
          <h1
            ref={titleRef}
            className="inline-block whitespace-nowrap leading-none font-medium tracking-wide text-white opacity-60 mix-blend-overlay"
          >
            Frontend Developer
          </h1>
        </div>
      </div>
    </div>
  );
}
