"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade up animations for project cards
      const cards = gsap.utils.toArray(".project-card") as HTMLElement[];
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 150 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
      
      // Title animation
      gsap.fromTo(
        ".page-title",
        { opacity: 0, y: 100, rotateX: -20 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1.5, ease: "power4.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-[#050505] min-h-screen w-full text-white pt-40 px-4 md:px-12 pb-32 overflow-hidden">
      <div className="max-w-[90vw] mx-auto">
        <div className="mb-32 md:mb-48 mt-10" style={{ perspective: "1000px" }}>
          <h1 className="page-title text-[14vw] md:text-[10vw] font-serif tracking-tighter leading-[0.85] uppercase z-10 relative">
            Selected <br /> Works <span className="text-[#3AA89B] text-4xl md:text-8xl align-top">©</span>
          </h1>
        </div>

        <div className="flex flex-col gap-32 md:gap-64">
          {projects.map((project, index) => (
            <Link
              href={`/projects/${project.slug}`}
              key={project.id}
              className="project-card group relative block w-full"
            >
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 md:mb-12 px-2">
                <h2 className="text-5xl md:text-8xl font-serif tracking-tighter uppercase group-hover:text-[#3AA89B] transition-colors duration-700 leading-none">
                  {project.title}
                </h2>
                <div className="text-sm md:text-lg opacity-50 uppercase tracking-widest mt-6 md:mt-0 font-medium flex flex-col md:text-right">
                  <span>{project.client || "Self Initiated"}</span>
                  <span>{project.date.split(" ")[0]}</span>
                </div>
              </div>

              <div className="relative w-full aspect-[4/5] md:aspect-[16/9] rounded-2xl overflow-hidden bg-[#111]">
                <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-1000" />
                <Image
                  src={project.heroImage || "/hero/hero-img.png"}
                  alt={project.title}
                  fill
                  className="object-cover scale-100 group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)]"
                  priority={index === 0}
                />
                
                {/* Floating Tags */}
                <div className="absolute bottom-6 left-6 z-20 flex flex-wrap gap-3">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-5 py-2 bg-black/40 backdrop-blur-md rounded-full text-xs uppercase tracking-widest text-white border border-white/10 group-hover:border-white/30 transition-colors duration-500">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View Project Badge */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-700 scale-75 group-hover:scale-100 pointer-events-none">
                  <div className="w-32 h-32 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-black font-semibold uppercase tracking-widest text-sm rotate-[-15deg] group-hover:rotate-0 transition-transform duration-700 shadow-2xl">
                    View
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
