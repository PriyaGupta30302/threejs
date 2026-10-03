"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import { Project } from "@/data/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function GlassParticles() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create 30 random glass shapes
  const shapes = React.useMemo(() => {
    const temp = [];
    for (let i = 0; i < 30; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10 - 5
        ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          0
        ] as [number, number, number],
        scale: Math.random() * 0.4 + 0.1,
      });
    }
    return temp;
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
      const scrollY = window.scrollY;
      groupRef.current.position.y = scrollY * 0.01; // Parallax effect against scroll
    }
  });

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <Float key={i} speed={1 + Math.random() * 2} rotationIntensity={2} floatIntensity={2}>
          <mesh position={shape.position} rotation={shape.rotation} scale={shape.scale}>
            <icosahedronGeometry args={[1, 0]} />
            <MeshTransmissionMaterial 
              backside 
              thickness={0.5} 
              roughness={0.1} 
              transmission={1} 
              ior={1.5} 
              chromaticAberration={0.4}
              color="#ffffff"
            />
          </mesh>
        </Float>
      ))}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#3AA89B" />
      <directionalLight position={[-5, -5, -5]} intensity={1} color="#ffffff" />
      <Environment preset="city" />
    </group>
  );
}

export default function ProjectClient({ project }: { project: Project }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Hero Entrance
      gsap.from(".hero-char", {
        y: 100,
        opacity: 0,
        stagger: 0.05,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.2
      });

      // Hero Parallax on Scroll (Removed to just rely on text parallax)

      gsap.to(".hero-text", {
        y: -150,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Gallery Items Staggered Fade Up
      const items = gsap.utils.toArray(".gallery-item") as HTMLElement[];
      items.forEach((item) => {
        gsap.fromTo(item, 
          { opacity: 0, y: 100, scale: 0.95 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  if (!project) return null;

  return (
    <div ref={containerRef} className="bg-[#050505] min-h-screen text-white relative selection:bg-[#3AA89B] selection:text-white">
      
      {/* Soft Glowing Background Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#3AA89B] opacity-[0.15] blur-[100px]" />
        <div className="absolute top-[40%] right-[-20%] w-[40vw] h-[40vw] rounded-full bg-[#3AA89B] opacity-[0.1] blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-[#3AA89B] opacity-[0.1] blur-[150px]" />
      </div>

      {/* Fixed 3D Particle Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <GlassParticles />
        </Canvas>
      </div>

      {/* Hero Section */}
      <section className="hero-section relative h-[80vh] md:h-screen w-full overflow-hidden z-10 flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(58,168,155,0.7)_0%,_rgba(58,168,155,0.1)_40%,_#050505_80%)]" />
        
        <div className="hero-text relative z-10 text-center flex flex-col items-center">
          <span className="text-sm md:text-md uppercase tracking-[0.4em] text-[#3AA89B] mb-6 font-semibold overflow-hidden">
            <span className="inline-block hero-char">Featured</span>
            <span className="inline-block hero-char">&nbsp;Project</span>
          </span>
          <h1 className="text-[14vw] md:text-[10vw] font-serif uppercase tracking-tighter leading-[0.85] overflow-hidden">
            {project.title.split("").map((char, i) => (
              <span key={i} className="inline-block hero-char">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
        </div>
      </section>

      {/* Content Section (Editorial Split) */}
      <section className="content-section relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-16 py-20 flex flex-col md:flex-row gap-12 md:gap-24">
        
        {/* Left Column: Sticky Metadata & Info */}
        <div className="w-full md:w-1/3 flex flex-col gap-12">
          {/* CSS Sticky positioning for smooth native sticky effect */}
          <div className="sticky top-32 flex flex-col gap-16">
            
            {/* Description */}
            <div>
              <h3 className="text-2xl md:text-3xl font-serif leading-relaxed text-white/90">
                {project.description}
              </h3>
            </div>

            {/* Meta Data Table */}
            <div className="flex flex-col gap-8 border-t border-white/20 pt-8">
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase tracking-widest text-white/40">Client</span>
                <span className="text-sm font-medium">{project.client}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase tracking-widest text-white/40">Year</span>
                <span className="text-sm font-medium">{project.date}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase tracking-widest text-white/40">Role</span>
                <span className="text-sm font-medium">{project.role}</span>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-xs uppercase tracking-widest text-white/40">Services</span>
                <div className="flex flex-wrap gap-2">
                  {project.tags?.map((tag, idx) => (
                    <span key={idx} className="text-xs font-medium px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Scrolling Gallery & Insights */}
        <div className="w-full md:w-2/3 flex flex-col gap-16 md:gap-32 mt-12 md:mt-0 pb-32">
          
          {/* First Insight Block */}
          {project.bullets && project.bullets.length > 0 && (
            <div className="gallery-item p-8 md:p-16 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
              <h4 className="text-xl md:text-4xl font-serif leading-tight italic">
                &quot;{project.bullets[0]}&quot;
              </h4>
            </div>
          )}

          {/* Gallery Images */}
          {project.gallery?.map((img, i) => (
            <div key={i} className="gallery-item relative w-full aspect-[4/5] md:aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl group">
              <Image src={img} alt={`Gallery ${i}`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" />
            </div>
          ))}

          {/* Second Insight Block (if available) */}
          {project.bullets && project.bullets.length > 1 && (
            <div className="gallery-item p-8 md:p-16 bg-[#3AA89B]/10 backdrop-blur-xl rounded-2xl border border-[#3AA89B]/30 shadow-2xl">
              <h4 className="text-xl md:text-4xl font-serif leading-tight italic text-[#3AA89B]">
                &quot;{project.bullets[1]}&quot;
              </h4>
            </div>
          )}

        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative z-10 w-full py-32 border-t border-white/10 bg-[#020202] flex items-center justify-center">
        <Link href="/" className="group flex flex-col items-center">
          <span className="text-xs uppercase tracking-widest text-white/40 mb-6 group-hover:text-white transition-colors duration-300">
            End of Showcase
          </span>
          <div className="overflow-hidden">
            <h2 className="text-6xl md:text-8xl font-serif uppercase tracking-tighter group-hover:text-[#3AA89B] group-hover:-translate-y-2 transition-all duration-500">
              Back to Home
            </h2>
          </div>
        </Link>
      </section>
    </div>
  );
}
