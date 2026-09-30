"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project } from "@/data/projects";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Props {
  project: Project;
  nextProject: Project;
}

export default function ProjectClient({ project, nextProject }: Props) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Setup GSAP Context
    const ctx = gsap.context(() => {
      // A. & B. Hero Reveal & Visual Unclip
      const heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-container",
          start: "top top",
          end: "+=100%",
          scrub: true,
          pin: true,
        },
      });

      heroTimeline
        .to(".hero-text", { y: -100, opacity: 0, duration: 1 }, 0)
        .to(
          ".hero-visual-wrapper",
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            borderRadius: "0px",
            duration: 1,
            ease: "power2.inOut",
          },
          0
        )
        .to(
          container.current,
          {
            backgroundColor: "#050505",
            duration: 1,
          },
          0
        );

      // C. Info Section Parallax
      gsap.from(".info-item", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".info-section",
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      });

      // D. Interactive Storytelling / Sequenced Text
      const storyTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".story-section",
          start: "top top",
          end: `+=${project.bullets.length * 100}%`,
          scrub: 1,
          pin: true,
        },
      });

      // Abstract orbit rotation for aesthetics
      storyTimeline.to(
        ".abstract-orbit",
        {
          rotation: 360,
          duration: project.bullets.length,
          ease: "none",
        },
        0
      );

      // Sequence the text items in the center
      const storyTexts = gsap.utils.toArray(".story-text") as HTMLElement[];
      storyTexts.forEach((text: HTMLElement, i) => {
        // Fade in
        storyTimeline.fromTo(
          text,
          { opacity: 0, y: 50, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5 },
          i
        );
        // Fade out
        storyTimeline.to(
          text,
          { opacity: 0, y: -50, scale: 1.05, duration: 0.5 },
          i + 0.8
        );
      });



      // F. Physical Card Dropping
      const physicalCards = gsap.utils.toArray(".physical-card") as HTMLElement[];
      physicalCards.forEach((card: HTMLElement) => {
        gsap.fromTo(
          card,
          {
            y: "100vh",
            rotation: gsap.utils.random(-15, 15),
            opacity: 0,
          },
          {
            y: 0,
            rotation: gsap.utils.random(-5, 5),
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".physical-section",
              start: "top 60%",
              end: "bottom bottom",
              scrub: 1,
            },
          }
        );
      });

      // G. Next Project Reveal
      gsap.fromTo(
        ".next-project-title",
        { y: 150, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: ".next-project-section",
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [project.bullets.length]);

  return (
    <div ref={container} className="bg-black text-white min-h-screen overflow-hidden">
      {/* A & B: HERO SECTION */}
      <section className="hero-container relative h-screen w-full bg-black">
        <div className="h-full w-full flex flex-col items-center justify-center px-4 md:px-10">
          <div className="hero-text text-center w-full z-10 flex flex-col items-center justify-center mix-blend-difference pointer-events-none mb-10">
            <p className="text-sm md:text-md uppercase tracking-[0.2em] mb-4 opacity-70">
              Project / {project.id < 10 ? `0${project.id}` : project.id}
            </p>
            <h1 className="font-serif tracking-tighter uppercase leading-[0.85]" style={{ fontSize: "clamp(4rem, 12vw, 12rem)" }}>
              {project.title}
            </h1>
          </div>

          <div className="hero-visual-wrapper absolute inset-0 z-0 flex items-center justify-center h-full w-full" style={{ clipPath: "inset(15% 0% 15% 0%)", scale: 1.05 }}>
            <Image
              src={project.heroImage || "/hero/hero-img.png"}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
          </div>
        </div>
      </section>

      {/* C: INFO SECTION */}
      <section className="info-section relative w-full py-32 px-6 md:px-16 bg-black z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 border-t border-white/20 pt-10">
          <div className="info-item flex flex-col">
            <span className="text-[10px] uppercase tracking-widest opacity-50 mb-2">Client</span>
            <span className="text-lg md:text-xl font-medium">{project.client || project.title}</span>
          </div>
          <div className="info-item flex flex-col">
            <span className="text-[10px] uppercase tracking-widest opacity-50 mb-2">Year</span>
            <span className="text-lg md:text-xl font-medium">{project.date}</span>
          </div>
          <div className="info-item flex flex-col">
            <span className="text-[10px] uppercase tracking-widest opacity-50 mb-2">Role</span>
            <span className="text-lg md:text-xl font-medium">{project.role || "Development"}</span>
          </div>
          <div className="info-item flex flex-col md:col-span-1">
            <span className="text-[10px] uppercase tracking-widest opacity-50 mb-2">Services</span>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="text-sm font-medium border border-white/20 rounded-full px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20">
          <h3 className="text-3xl md:text-5xl font-serif max-w-4xl leading-tight">
            {project.description}
          </h3>
        </div>
      </section>

      {/* D: INTERACTIVE STORYTELLING SECTION */}
      <section className="story-section h-screen w-full relative flex items-center justify-center bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_0%,_transparent_70%)] pointer-events-none" />
        
        {/* Abstract Orbiting Background Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 pb-20">
          <div className="abstract-orbit absolute w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] rounded-full border border-white/20">
            <div className="absolute top-0 left-1/2 w-3 h-3 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
            <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-[#3AA89B] rounded-full transform -translate-x-1/2 translate-y-1/2 shadow-[0_0_25px_rgba(58,168,155,0.8)]" />
          </div>
          <div className="abstract-orbit absolute w-[60vw] h-[60vw] md:w-[35vw] md:h-[35vw] rounded-full border border-white/10">
            <div className="absolute left-0 top-1/2 w-2 h-2 bg-white/70 rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
          </div>
        </div>

        {/* Sequenced Text Center */}
        <div className="relative z-20 w-full max-w-4xl px-6 md:px-16 flex items-center justify-center h-full">
          {project.bullets.map((bullet, i) => (
            <div key={i} className="story-text absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 pointer-events-none">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] opacity-50 mb-6">
                Insight {i + 1} / {project.bullets.length}
              </span>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif leading-tight">
                {bullet}
              </h2>
            </div>
          ))}
        </div>
      </section>



      {/* F: PHYSICAL CARDS */}
      <section className="physical-section relative w-full min-h-[150vh] bg-[#050505] py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-serif text-center mb-32">Visual Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {project.gallery?.map((img, i) => (
              <div
                key={`phys-${i}`}
                className={`physical-card relative w-full aspect-[4/5] rounded-xl overflow-hidden ${i % 2 === 0 ? "mt-0 md:-mt-32" : "mt-0 md:mt-32"}`}
              >
                <Image src={img} alt={`Detail ${i}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* G: NEXT PROJECT */}
      <section className="next-project-section h-screen w-full bg-black relative flex flex-col items-center justify-center overflow-hidden">
        <Link href={`/projects/${nextProject.slug}`} className="group relative z-10 text-center flex flex-col items-center">
          <span className="text-sm uppercase tracking-[0.3em] opacity-50 mb-6 group-hover:opacity-100 transition-opacity">Next Project</span>
          <div className="overflow-hidden">
            <h2 className="next-project-title text-[10vw] font-serif leading-none tracking-tighter group-hover:text-[#3AA89B] transition-colors duration-700">
              {nextProject.title}
            </h2>
          </div>
        </Link>
        
        {/* Background Reveal on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-1000 pointer-events-none scale-110 group-hover:scale-100 ease-out">
          {nextProject.heroImage && (
            <Image src={nextProject.heroImage} alt={nextProject.title} fill className="object-cover filter grayscale" />
          )}
        </div>
      </section>
    </div>
  );
}
