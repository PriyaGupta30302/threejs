'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import ParticleScene from './ParticleScene';
import Link from 'next/link';

import { globalScrollState } from './scrollState';

export default function About2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (!containerRef.current) return;

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        globalScrollState.progress = self.progress;
      },
    });

    sectionsRef.current.forEach((section, index) => {
      if (section) {
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => { globalScrollState.activeSection = index; },
          onEnterBack: () => { globalScrollState.activeSection = index; },
        });
      }
    });

    return () => {
      window.removeEventListener('resize', checkMobile);
      st.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const technologies = [
    'React.js', 'Next.js', 'JavaScript', 'HTML/CSS', 
    'Tailwind CSS', 'GSAP', 'Three.js', 'Framer Motion', 'Shopify'
  ];

  return (
    <main 
      ref={containerRef} 
      className="bg-black min-h-screen w-full text-white relative font-sans" 
      style={{ clipPath: 'inset(0)' }}
    >
      {/* 3D Canvas Background */}
      <div className="fixed top-0 left-0 w-full h-screen z-0">
        <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={isMobile ? [1, 1] : [1, 2]}>
          <color attach="background" args={['#000000']} />
          <ambientLight intensity={0.5} />
          <ParticleScene activeTech={activeTech} isMobile={isMobile} />
        </Canvas>
      </div>

      {/* HTML Content Overlay */}
      <div className="relative z-50 w-full pointer-events-none bg-black/40 md:bg-transparent">
        
        {/* HERO */}
        <section 
          ref={el => { sectionsRef.current[0] = el; }} 
          className="h-screen w-full flex flex-col justify-center px-[70px]"
        >
          <p className="text-[#34d399] tracking-widest uppercase text-xs font-bold mb-6">About</p>
          <h1 className="text-4xl md:text-8xl font-heading mb-8 max-w-3xl leading-[1.1]">
            Turning ideas into <br/><i className="text-white/60">real experiences.</i>
          </h1>
          <p className="max-w-md text-lg text-white/80 leading-relaxed font-light">
            I&apos;m Priya Gupta, a Frontend Developer focused on building modern, interactive and user-focused web experiences.
          </p>
        </section>

        {/* SECTION 01 — ABOUT ME */}
        <section 
          ref={el => { sectionsRef.current[1] = el; }} 
          className="h-screen w-full flex flex-col justify-center items-end px-[70px] text-right"
        >
          <p className="text-[#34d399] tracking-widest uppercase text-xs font-bold mb-6">A little about me</p>
          <h2 className="text-3xl md:text-5xl font-heading mb-6 max-w-2xl leading-[1.2]">
            I&apos;m a Frontend Developer with <span className="text-[#34d399]">2+ years</span> of experience building responsive and interactive websites.
          </h2>
          <p className="max-w-md text-base md:text-lg text-white/70 leading-relaxed font-light ml-auto">
            I enjoy turning designs into polished digital experiences and exploring motion, 3D and modern web technologies.
          </p>
        </section>

        {/* SECTION 02 — EXPERIENCE */}
        <section 
          ref={el => { sectionsRef.current[2] = el; }} 
          className="h-screen w-full flex flex-col justify-center px-[70px]"
        >
          <p className="text-[#34d399] tracking-widest uppercase text-xs font-bold mb-6">Experience</p>
          <h2 className="text-4xl md:text-6xl font-heading mb-12 max-w-xl">
            2+ years <br/>building for the web.
          </h2>
          
          <div className="max-w-2xl border-l border-white/20 pl-8 relative">
            <div className="absolute w-3 h-3 bg-[#34d399] rounded-full -left-[6.5px] top-2 shadow-[0_0_10px_#34d399]" />
            <p className="text-sm text-white/50 mb-2 tracking-widest uppercase">2024 — Present</p>
            <h3 className="text-xl md:text-2xl font-bold mb-4">Indiefluence <span className="block md:inline text-white/50 font-light text-base md:text-2xl mt-1 md:mt-0">· Frontend Developer</span></h3>
            <p className="text-white/70 leading-relaxed font-light text-sm md:text-base">
              Worked across real-world web projects including business websites, eCommerce and education platforms, building responsive and interactive interfaces using React.js, Next.js, JavaScript, Tailwind CSS and modern animation tools.
            </p>
          </div>
        </section>

        {/* SECTION 03 — TOOLKIT */}
        <section 
          ref={el => { sectionsRef.current[3] = el; }} 
          className="h-screen w-full flex flex-col justify-center items-center px-[70px] text-center pointer-events-auto"
        >
          <p className="text-[#34d399] tracking-widest uppercase text-xs font-bold mb-12">I work with</p>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 max-w-4xl">
            {technologies.map((tech) => (
              <span 
                key={tech}
                onMouseEnter={() => setActiveTech(tech)}
                onMouseLeave={() => setActiveTech(null)}
                className={`text-2xl md:text-4xl font-heading cursor-pointer transition-all duration-500 ${
                  activeTech === tech ? 'text-[#34d399] scale-110 drop-shadow-[0_0_15px_rgba(52,211,153,0.8)]' : (activeTech ? 'text-white/20 blur-[1px]' : 'text-white hover:text-[#34d399]')
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* SECTION 04 — CTA */}
        <section 
          ref={el => { sectionsRef.current[4] = el; }} 
          className="h-screen w-full flex flex-col justify-center items-center px-[70px] text-center"
        >
          <h2 className="text-4xl md:text-8xl font-heading mb-12">
            Have a project <br/>in mind?
          </h2>
          <Link href="/contact" className="pointer-events-auto group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-full border border-white/20 bg-transparent text-white transition-all duration-300 hover:border-[#34d399] hover:bg-[#34d399]/10">
            <span className="relative z-10 flex items-center gap-2 text-sm uppercase tracking-widest font-bold">
              Get in touch 
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </span>
          </Link>
        </section>

      </div>
    </main>
  );
}
