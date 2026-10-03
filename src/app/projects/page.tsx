"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";
import { projects } from "@/data/projects";

// 3D Liquid Background for the list page
function LiquidBg() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#3AA89B" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ffffff" />
      <mesh ref={meshRef} scale={4} position={[0, 0, -5]}>
        <sphereGeometry args={[1, 128, 128]} />
        <MeshDistortMaterial 
          color="#050505"
          envMapIntensity={1}
          metalness={0.9}
          roughness={0.2}
          distort={0.4}
          speed={1.5}
        />
      </mesh>
      <Environment preset="city" />
    </>
  );
}

export default function AllProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorImageRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for the titles
      gsap.from(".project-row", {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2
      });

      gsap.from(".page-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      // Cursor follower animation
      const updateCursor = (e: MouseEvent) => {
        gsap.to(cursorImageRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.8,
          ease: "power3.out",
        });
      };
      
      window.addEventListener("mousemove", updateCursor);
      return () => window.removeEventListener("mousemove", updateCursor);
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#020202] min-h-screen w-full text-white relative overflow-hidden selection:bg-[#3AA89B] selection:text-white">
      
      {/* 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <LiquidBg />
        </Canvas>
      </div>

      {/* Floating Image Cursor */}
      <div 
        ref={cursorImageRef} 
        className="fixed top-0 left-0 z-20 pointer-events-none -translate-x-1/2 -translate-y-1/2 w-[40vw] md:w-[25vw] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl transition-opacity duration-500 mix-blend-lighten"
        style={{ opacity: hoveredProject ? 1 : 0 }}
      >
        {projects.map((project) => (
          <Image
            key={project.id}
            src={project.heroImage || "/hero/hero-img.png"}
            alt={project.title}
            fill
            className={`object-cover transition-opacity duration-500 ${hoveredProject === project.slug ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 pt-40 pb-32">
        <h1 className="page-title text-sm md:text-md uppercase tracking-[0.4em] text-[#3AA89B] mb-20 font-semibold">
          Selected Works // {new Date().getFullYear()}
        </h1>

        <div className="flex flex-col border-t border-white/20">
          {projects.map((project, i) => (
            <Link 
              href={`/projects/${project.slug}`} 
              key={project.id}
              className="project-row group block w-full py-12 md:py-24 border-b border-white/20 relative cursor-pointer"
              onMouseEnter={() => setHoveredProject(project.slug)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Row Content */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mix-blend-difference">
                
                {/* Title */}
                <div className="flex items-start gap-4 md:gap-12">
                  <span className="text-sm md:text-2xl font-serif text-white/40 group-hover:text-white/80 transition-colors mt-2 md:mt-4">
                    0{i + 1}
                  </span>
                  <h2 className="text-[12vw] md:text-[7vw] font-serif uppercase tracking-tighter leading-none group-hover:text-[#3AA89B] group-hover:translate-x-8 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                    {project.title}
                  </h2>
                </div>

                {/* Meta */}
                <div className="hidden md:flex flex-col text-right gap-2 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-8 group-hover:translate-y-0 ease-[cubic-bezier(0.25,1,0.5,1)]">
                  <span className="text-xl font-medium">{project.client || "Self Initiated"}</span>
                  <span className="text-xs uppercase tracking-widest text-white/50">{project.tags.slice(0, 3).join(" • ")}</span>
                </div>

              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
