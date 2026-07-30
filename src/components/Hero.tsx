'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Particles } from './ParticlesScene';
import Image from 'next/image';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current) return;

    let mm = gsap.matchMedia();

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
        <Canvas camera={{ position: [0, 2, 30], fov: 45 }}>
          <Particles progressRef={progressRef} />
        </Canvas>
      </div>

      {/* Logo Element */}
      <div className="absolute bottom-24 md:bottom-0 left-0 right-0 z-20 w-full px-4 md:px-6 pointer-events-none flex items-end">
        <Image
          src="/hero/hero-logo.svg"
          alt="Offground Logo"
          width={1920}
          height={400}
          className="w-full h-auto opacity-40 mix-blend-overlay object-contain"
          priority
        />
      </div>
    </div>
  );
}
