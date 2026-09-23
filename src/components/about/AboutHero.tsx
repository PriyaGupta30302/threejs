'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// The Cinematic 3D Core
function CinematicCore({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const coreGroup = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  
  useFrame((state, delta) => {
    if (coreGroup.current) {
      coreGroup.current.rotation.x += delta * 0.2;
      coreGroup.current.rotation.y += delta * 0.3;
      
      const p = progressRef.current;
      
      // Smoothly zoom in on scroll (scale up drastically)
      const scale = THREE.MathUtils.lerp(1, 15, p);
      coreGroup.current.scale.setScalar(scale);
      
      // Fade out as it gets massive so it doesn't block the screen entirely
      if (materialRef.current) {
        materialRef.current.opacity = THREE.MathUtils.lerp(0.8, 0.0, p * p); 
      }
    }
  });

  return (
    <group ref={coreGroup}>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
        {/* Subtle wireframe matching home page elegance */}
        <Icosahedron args={[1.8, 3]}>
          <meshStandardMaterial 
            ref={materialRef}
            color="#ffffff" 
            emissive="#3AA89B" 
            emissiveIntensity={0.5} 
            wireframe={true} 
            transparent 
            opacity={0.8} 
          />
        </Icosahedron>
        {/* Inner glow core */}
        <Icosahedron args={[1.2, 2]}>
          <meshBasicMaterial 
            color="#3AA89B" 
            transparent 
            opacity={0.1} 
          />
        </Icosahedron>
      </Float>
    </group>
  );
}

export default function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Entry Animation
      const tl = gsap.timeline();
      
      tl.fromTo('.cinematic-text',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", stagger: 0.1, delay: 0.2 }
      );
      
      tl.fromTo('.cinematic-sub',
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        "-=0.5"
      );

      // The Pinned Zoom-In Scroll
      if (containerRef.current) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%', 
          pin: true,
          scrub: 0.5,
          onUpdate: (self) => {
            progressRef.current = self.progress;
            
            // Fade out the text as we scroll down
            if (textRef.current) {
              const textOpacity = 1 - (self.progress * 3); 
              gsap.set(textRef.current, { opacity: Math.max(0, textOpacity), y: self.progress * -100 });
            }
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen w-full bg-black overflow-hidden flex flex-col">
      
      {/* Background Dark Vignette */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_transparent_10%,_rgba(0,0,0,1)_80%)] pointer-events-none"></div>

      {/* Top Text Content (No Overlap) */}
      <div ref={textRef} className="relative z-20 w-full pt-16 md:pt-24 flex flex-col items-center justify-center text-center pointer-events-none select-none">
        {/* <h2 className="cinematic-sub text-xs md:text-sm tracking-[0.5em] uppercase text-white/50 mb-4 font-mono font-bold">
          The Journey
        </h2> */}
        <div className="flex flex-col items-center justify-center leading-[0.9] pt-14">
          <h1 className="cinematic-text text-6xl md:text-8xl lg:text-[10vw] font-serif font-bold text-white tracking-tighter">
            ABOUT <span className="italic text-[#3AA89B] font-light">PRIYA</span>
          </h1>
        </div>
      </div>

      {/* 3D Canvas (Bottom Area) */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        {isMounted && (
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 1.5]}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#3AA89B" />
            <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
            <group position={[0, -1, 0]}>
              <CinematicCore progressRef={progressRef} />
            </group>
          </Canvas>
        )}
      </div>

      {/* Bottom Subtitle */}
      <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center pointer-events-none">
         <p className="cinematic-sub text-sm md:text-lg font-light text-white/60 max-w-lg px-4 text-center">
          Scroll to smoothly dive into the core.
        </p>
      </div>

    </div>
  );
}
