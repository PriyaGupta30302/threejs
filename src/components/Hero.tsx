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
      scrub: 0.5, // Reduced from 1.5 for faster, immediate response
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
      <div className="absolute inset-0 z-0 w-full h-screen bg-black">
        <Image
          src="/hero/hero-img.png"
          alt="Hero Background"
          fill
          priority
          className="object-fill"
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
      <div className="absolute bottom-0 left-0 right-0 z-20 w-full pointer-events-none flex items-end">
        <Image
          src="/hero/hero-logo.svg"
          alt="Offground Logo"
          width={1920}
          height={400}
          className="w-full h-auto opacity-20 mix-blend-overlay"
          priority
        />
      </div>
    </div>
  );
}
