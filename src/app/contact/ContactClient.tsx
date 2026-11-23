'use client';

import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// --- 3D Particle Wave Component ---
function ParticleWave() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 120; // Balanced density
  const sep = 0.25; // Balanced spacing

  const positions = useMemo(() => {
    const pos = new Float32Array(count * count * 3);
    let i = 0;
    for (let ix = 0; ix < count; ix++) {
      for (let iy = 0; iy < count; iy++) {
        // Center the grid
        pos[i] = ix * sep - (count * sep) / 2;
        pos[i + 1] = 0; // Y axis will be animated
        pos[i + 2] = iy * sep - (count * sep) / 2;
        i += 3;
      }
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      let i = 0;
      const t = state.clock.elapsedTime * 0.6;

      for (let ix = 0; ix < count; ix++) {
        for (let iy = 0; iy < count; iy++) {
          // Elegant wave height
          positions[i + 1] =
            Math.sin((ix * 0.15) + t) * 1.2 +
            Math.sin((iy * 0.1) + t * 0.8) * 1.2;
          i += 3;
        }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    // Pushed back slightly and tilted down for a beautiful 'sea' perspective
    <points ref={pointsRef} position={[0, -3, -10]} rotation={[Math.PI / 2.5, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#33CC99"
        transparent
        opacity={0.55}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// --- Main Contact Component ---
export default function ContactClient() {
  return (
    <main className="relative min-h-screen w-full bg-black flex flex-col justify-center overflow-hidden">

      {/* Ambient Green/Black Gradient Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#33CC99] opacity-[0.25] blur-[100px]" />
        <div className="absolute top-[40%] right-[-20%] w-[40vw] h-[40vw] rounded-full bg-[#33CC99] opacity-[0.2] blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-[#33CC99] opacity-[0.2] blur-[150px]" />
      </div>

      {/* 3D Background - Particle Sea */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 2, 5], fov: 60 }} dpr={[1, 2]}>
          {/* Fog restored to gracefully fade the wave out into the background */}
          <fog attach="fog" args={['#030303', 6, 22]} />
          <ParticleWave />
        </Canvas>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24 min-h-screen flex flex-col justify-center">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-12">

          {/* LEFT SIDE: Heading & Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between"
          >
            <div>
              <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-serif tracking-tighter text-white mb-6 leading-[1.1] pb-2 pr-4">
                Ready to <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#33CC99] to-emerald-200 pr-4">Build?</span>
              </h1>
              <p className="text-white/50 text-lg md:text-xl max-w-md font-light leading-relaxed">
                I&apos;m always open to discussing new projects, creative ideas, or exciting career opportunities. Drop me a message and let&apos;s make something amazing together.
              </p>
            </div>

            <div className="mt-16 flex flex-col gap-10">
              <div className="group cursor-pointer inline-block">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-[#33CC99] font-bold mb-2">Email Me</span>
                <a href="mailto:priyagupta30302@gmail.com" className="text-2xl md:text-4xl text-white group-hover:text-white/70 font-light transition-colors duration-500">
                  priyagupta30302@gmail.com
                </a>
              </div>
              <div className="group cursor-pointer inline-block">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-[#33CC99] font-bold mb-2">Call Me</span>
                <a href="tel:+917056600842" className="text-2xl md:text-4xl text-white group-hover:text-white/70 font-light transition-colors duration-500">
                  +91 70566 00842
                </a>
              </div>

              {/* Elegant Social Links */}
              <div className="mt-4 flex gap-6">
                <a href="#" className="flex items-center gap-3 text-white/50 hover:text-[#33CC99] group transition-colors p-2 -ml-2 rounded-lg hover:bg-white/5">
                   <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                     <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                     <rect x="2" y="9" width="4" height="12"/>
                     <circle cx="4" cy="4" r="2"/>
                   </svg>
                   <span className="uppercase tracking-[0.15em] text-xs font-bold mt-1">LinkedIn</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-white/50 hover:text-[#33CC99] group transition-colors p-2 rounded-lg hover:bg-white/5">
                   <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                     <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                   </svg>
                   <span className="uppercase tracking-[0.15em] text-xs font-bold mt-1">GitHub</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Minimalist Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center lg:pl-16"
          >
            <form className="w-full flex flex-col gap-14">
              <div className="relative group">
                <label className="absolute -top-6 left-0 text-[10px] uppercase tracking-[0.2em] text-[#33CC99] font-bold opacity-0 group-focus-within:opacity-100 transition-opacity">What&apos;s your name?</label>
                <input type="text" placeholder="Your Name" className="w-full bg-transparent border-b border-white/20 pb-4 text-white focus:outline-none focus:border-[#33CC99] transition-colors placeholder:text-white/30 text-2xl font-light" />
              </div>

              <div className="relative group">
                <label className="absolute -top-6 left-0 text-[10px] uppercase tracking-[0.2em] text-[#33CC99] font-bold opacity-0 group-focus-within:opacity-100 transition-opacity">Where can I reach you?</label>
                <input type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-white/20 pb-4 text-white focus:outline-none focus:border-[#33CC99] transition-colors placeholder:text-white/30 text-2xl font-light" />
              </div>

              <div className="relative group pt-4">
                <label className="absolute -top-6 left-0 text-[10px] uppercase tracking-[0.2em] text-[#33CC99] font-bold opacity-0 group-focus-within:opacity-100 transition-opacity">How can I help?</label>
                <textarea placeholder="Tell me about your project..." rows={3} className="w-full bg-transparent border-b border-white/20 pb-4 text-white focus:outline-none focus:border-[#33CC99] transition-colors placeholder:text-white/30 text-2xl font-light resize-none" />
              </div>

              <button className="self-start group relative flex items-center gap-4 overflow-hidden rounded-full border border-white/20 hover:border-[#33CC99] bg-transparent text-white px-10 py-5 transition-all duration-500 mt-4">
                 <span className="relative z-10 font-bold uppercase tracking-[0.15em] text-xs transition-colors duration-300">Send Message</span>
                 <div className="absolute inset-0 bg-[#33CC99] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
