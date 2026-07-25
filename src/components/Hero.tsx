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

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=300%',
      pin: true,
      scrub: 1.5,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen w-full bg-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 w-full h-screen">
        <Image
          src="/hero/hero-img.png"
          alt="Hero Background"
          fill
          priority
          className="object-fill"
        />
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 2, 30], fov: 45 }}>
          <Particles progressRef={progressRef} />
        </Canvas>
      </div>

      {/* Text Element */}
      <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center pointer-events-none">
        <h1 
          className="text-6xl sm:text-8xl md:text-[10rem] font-medium tracking-[0.05em] text-white/90 drop-shadow-2xl"
          style={{ fontFamily: 'var(--font-heading, sans-serif)' }}
        >
          OFFGROUND
        </h1>
      </div>
    </div>
  );
}
