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
        color="#3AA89B" 
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
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#3AA89B] opacity-[0.25] blur-[100px]" />
        <div className="absolute top-[40%] right-[-20%] w-[40vw] h-[40vw] rounded-full bg-[#3AA89B] opacity-[0.2] blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-[#3AA89B] opacity-[0.2] blur-[150px]" />
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
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center pt-24 pb-12">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-serif tracking-tighter text-white mb-6 leading-[1.1] pb-2 pr-4">
            Get in <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#3AA89B] to-emerald-200 pr-4">Touch</span>
          </h1>
          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Whether you have a specific project in mind, need a creative developer, or just want to connect—I&apos;d love to hear from you.
          </p>
        </motion.div>

        {/* Floating Glassmorphic Form */}
        <motion.form 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full backdrop-blur-xl bg-white/[0.02] border border-white/10 p-8 md:p-14 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col gap-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col gap-2 relative group">
              <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 group-focus-within:text-[#3AA89B] transition-colors font-bold">Your Name</label>
              <input type="text" placeholder="John Doe" className="w-full bg-transparent border-b border-white/10 pb-3 text-white focus:outline-none focus:border-[#3AA89B] transition-colors placeholder:text-white/20 text-xl font-light" />
            </div>
            <div className="flex flex-col gap-2 relative group">
              <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 group-focus-within:text-[#3AA89B] transition-colors font-bold">Your Email</label>
              <input type="email" placeholder="john@example.com" className="w-full bg-transparent border-b border-white/10 pb-3 text-white focus:outline-none focus:border-[#3AA89B] transition-colors placeholder:text-white/20 text-xl font-light" />
            </div>
          </div>
          
          <div className="flex flex-col gap-2 relative group">
            <label className="text-[10px] uppercase tracking-[0.2em] text-white/40 group-focus-within:text-[#3AA89B] transition-colors font-bold">Message Details</label>
            <textarea placeholder="Tell me about your vision..." rows={3} className="w-full bg-transparent border-b border-white/10 pb-3 text-white focus:outline-none focus:border-[#3AA89B] transition-colors placeholder:text-white/20 text-xl font-light resize-none" />
          </div>

          <div className="mt-4 flex justify-center">
            <button className="group relative flex items-center justify-center overflow-hidden rounded-full bg-white text-black px-14 py-5 font-bold uppercase tracking-[0.2em] text-xs hover:scale-[1.02] transition-all duration-300">
               <span className="relative z-10 group-hover:text-white transition-colors duration-300">Send Message</span>
               <div className="absolute inset-0 bg-[#3AA89B] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </button>
          </div>
        </motion.form>

        {/* Footer Contact Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-20 flex flex-wrap justify-center gap-12 md:gap-24 text-center w-full"
        >
          <div className="flex flex-col items-center">
             <span className="uppercase tracking-widest text-[10px] text-white/30 font-bold mb-3">Direct Email</span>
             <a href="mailto:priyagupta30302@gmail.com" className="text-white/80 hover:text-[#3AA89B] text-lg font-light transition-all">priyagupta30302@gmail.com</a>
          </div>
          <div className="flex flex-col items-center">
             <span className="uppercase tracking-widest text-[10px] text-white/30 font-bold mb-3">Phone</span>
             <a href="tel:+917056600842" className="text-white/80 hover:text-[#3AA89B] text-lg font-light transition-all">+91 70566 00842</a>
          </div>
          <div className="flex flex-col items-center">
             <span className="uppercase tracking-widest text-[10px] text-white/30 font-bold mb-3">Socials</span>
             <div className="flex gap-6 text-white/80 text-lg font-light">
               <a href="#" className="hover:text-[#3AA89B] transition-all">LinkedIn</a>
               <a href="#" className="hover:text-[#3AA89B] transition-all">GitHub</a>
             </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
