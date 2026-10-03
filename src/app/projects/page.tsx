"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { projects } from "@/data/projects";



export default function AllProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  
  // Trail Effect Refs
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trailIndex = useRef(0);
  const globalZ = useRef(100);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const activeImagesRef = useRef<string[]>([]);
  const trailActiveRef = useRef(false);

  const handleMouseEnter = (slug: string) => {
    setHoveredProject(slug);
    trailActiveRef.current = true;
    const proj = projects.find(p => p.slug === slug);
    if (proj) {
      activeImagesRef.current = Array.from(new Set([proj.heroImage, ...(proj.gallery || [])].filter(Boolean))) as string[];
    }
  };

  const handleMouseLeave = () => {
    setHoveredProject(null);
    trailActiveRef.current = false;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Entrance animation for titles
      if (!trailActiveRef.current || activeImagesRef.current.length === 0) return;

      const { clientX: x, clientY: y } = e;
      const dx = x - lastMousePos.current.x;
      const dy = y - lastMousePos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Distance threshold to spawn a new snapshot image in the trail
      if (distance > 80) { 
        lastMousePos.current = { x, y };
        
        const el = trailRefs.current[trailIndex.current];
        if (el) {
          const imgSrc = activeImagesRef.current[trailIndex.current % activeImagesRef.current.length];
          const img = el.querySelector("img");
          if (img) img.src = imgSrc;

          gsap.killTweensOf(el);
          gsap.set(el, { 
            zIndex: globalZ.current++,
            x: x, 
            y: y,
            xPercent: -50,
            yPercent: -50,
          });

          // Smooth fade-in, followed by smooth fade-out
          gsap.fromTo(el,
            {
              scale: 0.8,
              opacity: 0,
              rotation: Math.random() * 30 - 15,
            },
            {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              ease: "power2.out",
              onComplete: () => {
                gsap.to(el, {
                  scale: 0.95,
                  opacity: 0,
                  duration: 1.0,
                  delay: 0.1,
                  ease: "power2.inOut"
                });
              }
            }
          );
          
          trailIndex.current = (trailIndex.current + 1) % trailRefs.current.length;
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-row", {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#020202] min-h-screen w-full text-white relative overflow-hidden selection:bg-[#3AA89B] selection:text-white">
      
      {/* Soft Glowing Background Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#3AA89B] opacity-[0.1] blur-[120px]" />
        <div className="absolute top-[40%] right-[-20%] w-[40vw] h-[40vw] rounded-full bg-[#3AA89B] opacity-[0.08] blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-[#3AA89B] opacity-[0.1] blur-[130px]" />
      </div>


      {/* GSAP Overlapping Image Trail Pool */}
      <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => { trailRefs.current[i] = el; }}
            className="absolute top-0 left-0 w-[25vw] md:w-[14vw] aspect-[4/3] overflow-hidden shadow-2xl opacity-0"
          >
            {/* Using standard img for dynamic src switching without React lifecycle delays */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="" alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 pt-32 pb-32">
        <div className="flex flex-col border-t border-white/20">
          {projects.map((project, i) => (
            <Link 
              href={`/projects/${project.slug}`} 
              key={project.id}
              className="project-row group block w-full py-12 md:py-24 border-b border-white/20 relative cursor-pointer"
              onMouseEnter={() => handleMouseEnter(project.slug)}
              onMouseLeave={handleMouseLeave}
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
