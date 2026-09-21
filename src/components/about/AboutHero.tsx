'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Torus } from '@react-three/drei';
import * as THREE from 'three';

function RotatingRings() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.1;
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer rings */}
      {[...Array(5)].map((_, i) => (
        <Torus
          key={i}
          args={[2 + i * 0.2, 0.01, 16, 100]}
          rotation={[Math.PI / 4 * i, Math.PI / 3 * i, 0]}
        >
          <meshBasicMaterial color="#3AA89B" wireframe transparent opacity={0.3 + (i * 0.1)} />
        </Torus>
      ))}
      {/* Inner sphere outline representation */}
      <Torus args={[1.5, 0.01, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
         <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.2} />
      </Torus>
      <Torus args={[1.5, 0.01, 16, 100]} rotation={[0, Math.PI / 2, 0]}>
         <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.2} />
      </Torus>
    </group>
  );
}

export default function AboutHero() {
  return (
    <section className="relative min-h-[80vh] flex flex-col md:flex-row items-center pt-32 pb-16 px-8 md:px-16 overflow-hidden">
      {/* Text Content */}
      <div className="w-full md:w-1/2 z-10 relative">
        <h2 className="text-sm tracking-[0.2em] uppercase text-white/50 mb-8 flex items-center gap-4">
          About <span className="w-12 h-[1px] bg-white/20"></span>
        </h2>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif tracking-tighter mb-8 leading-[1.1]">
          Turning<br />
          ideas into<br />
          <span className="italic text-[#3AA89B]">real</span> experiences.
        </h1>
        <p className="text-lg md:text-xl font-light text-white/80 max-w-md leading-relaxed mb-12">
          I'm Priya Gupta, a Frontend Developer based in India, focused on building modern, interactive and user-centric web experiences.
        </p>
        
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center relative">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <svg className="absolute -inset-4 w-20 h-20 animate-[spin_10s_linear_infinite] opacity-50" viewBox="0 0 100 100">
              <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
              <text fontSize="10">
                <textPath href="#circlePath" startOffset="0%">SCROLL TO KNOW MORE • </textPath>
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* 3D Element Area */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-[80vh] absolute md:relative right-0 opacity-40 md:opacity-100 pointer-events-none md:pointer-events-auto">
        <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <RotatingRings />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>
        
        {/* Right side floating text */}
        <div className="hidden md:flex flex-col gap-12 absolute right-0 top-1/2 -translate-y-1/2 text-right text-xs tracking-[0.2em] uppercase text-white/40">
          <div>
            Code<br/>Design<br/>Animate<br/>Repeat
          </div>
          <div className="w-[1px] h-12 bg-white/20 ml-auto"></div>
          <div>
            Ideas<br/>Into<br/>Interaction
          </div>
        </div>
      </div>
    </section>
  );
}
