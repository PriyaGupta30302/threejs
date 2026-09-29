'use client';

import React, { useRef, useEffect, useState, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import dynamic from 'next/dynamic';

const ParticleScene = dynamic(() => import('./ParticleScene'), { ssr: false });
import Link from 'next/link';

import { globalScrollState } from './scrollState';

export default function About2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (!containerRef.current) return;

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        // Prevent glitch: during refresh, progress may temporarily drop to 0
        // @ts-expect-error: isRefreshing is missing from GSAP TypeScript definitions
        if (!ScrollTrigger.isRefreshing) {
          globalScrollState.progress = self.progress;
        }
      },
      onRefresh: (self) => {
        // Ensure progress is synced accurately after the refresh is complete
        globalScrollState.progress = self.progress;
      }
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
    'React.js', 'Next.js', 'TypeScript', 'JavaScript', 
    'Tailwind CSS', 'GSAP', 'Framer Motion', 'Three.js', 'Shopify', 'Liquid'
  ];

  return (
    <main 
      ref={containerRef} 
      className="bg-black min-h-screen w-full text-white relative font-sans" 
      style={{ clipPath: 'inset(0)' }}
    >
      {/* 3D Canvas Background */}
      <div className="fixed top-0 left-0 w-full h-screen z-0">
        <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 2]}>
          <color attach="background" args={['#000000']} />
          <ambientLight intensity={0.5} />
          <Suspense fallback={null}>
            <ParticleScene activeTech={activeTech} isMobile={isMobile} isTablet={isTablet} />
          </Suspense>
        </Canvas>
        <Loader 
          dataInterpolation={(p) => `Loading Universe ${p.toFixed(0)}%`}
          initialState={(active) => active}
        />
      </div>

      {/* HTML Content Overlay */}
      <div className="relative z-50 w-full pointer-events-none bg-black/40 md:bg-transparent">
        
        {/* HERO */}
        <section 
          ref={el => { sectionsRef.current[0] = el; }} 
          className="min-h-[85vh] lg:h-screen py-12 lg:py-0 w-full flex flex-col justify-center px-[30px] md:px-[70px]"
        >
          <p className="text-[#34d399] tracking-widest uppercase text-xs font-bold mb-6">About</p>
          <h1 className="text-4xl md:text-8xl font-heading mb-8 max-w-3xl leading-[1.1]">
            Turning ideas into <br/><i className="text-white/60">real experiences.</i>
          </h1>
          <p className="max-w-md text-lg md:text-xl text-white/80 leading-relaxed font-light">
            I&apos;m Priya Gupta, a Frontend Developer who thrives on translating complex concepts into seamless, pixel-perfect, and highly engaging web experiences.
          </p>
        </section>

        {/* SECTION 01 — ABOUT ME */}
        <section 
          ref={el => { sectionsRef.current[1] = el; }} 
          className="min-h-[85vh] lg:h-screen py-12 lg:py-0 w-full flex flex-col justify-center items-end px-[30px] md:px-[70px] text-right"
        >
          <p className="text-[#34d399] tracking-widest uppercase text-xs font-bold mb-6">A little about me</p>
          <h2 className="text-3xl md:text-5xl font-heading mb-6 max-w-3xl leading-[1.2]">
            I build modern web experiences with <span className="text-[#34d399]">performance</span> and <span className="text-[#34d399]">design</span> in mind.
          </h2>
          <div className="max-w-lg text-base md:text-lg text-white/70 leading-relaxed font-light ml-auto flex flex-col gap-4">
            <p>
              With 2+ years of hands-on experience, I specialize in turning complex requirements into intuitive, highly responsive user interfaces. I believe that a great website isn&apos;t just about looking good—it&apos;s about feeling seamless.
            </p>
            <p>
              From architecting scalable component systems in React to adding that extra layer of polish with smooth GSAP animations, my goal is always to deliver pixel-perfect, production-grade applications that users love to interact with.
            </p>
          </div>
        </section>

        {/* SECTION 02 — TRANSITION GALAXY GAP */}
        <section 
          ref={el => { sectionsRef.current[2] = el; }} 
          className="h-screen w-full pointer-events-none"
        />

        {/* SECTION 03 — EXPERIENCE */}
        <section 
          ref={el => { sectionsRef.current[3] = el; }} 
          className="min-h-[85vh] lg:h-screen py-12 lg:py-0 w-full flex flex-col justify-center px-[30px] md:px-[70px]"
        >
          <p className="text-[#34d399] tracking-widest uppercase text-xs font-bold mb-6">Experience & Education</p>
          <h2 className="text-4xl md:text-6xl font-heading mb-12 max-w-xl">
            2+ years of <br/>building the web.
          </h2>
          
          {/* Full-time */}
          <div className="max-w-3xl border-l border-white/20 pl-8 relative pb-10">
            <div className="absolute w-3 h-3 bg-[#34d399] rounded-full -left-[6.5px] top-2 shadow-[0_0_10px_#34d399]" />
            <p className="text-sm text-white/50 mb-2 tracking-widest uppercase">2024 — 2026</p>
            <h3 className="text-xl md:text-2xl font-bold mb-3">Frontend Developer <span className="block md:inline text-white/50 font-light text-base md:text-2xl mt-1 md:mt-0">· Full-Time</span></h3>
            <p className="text-white/70 leading-relaxed font-light text-sm md:text-base">
              Taking full ownership of frontend architecture. I build production-grade, highly responsive web applications using React and Next.js. My focus is on writing clean, scalable code, optimizing performance for faster load times, and delivering seamless user experiences that drive real business value.
            </p>
          </div>

          {/* Internship */}
          <div className="max-w-3xl border-l border-white/20 pl-8 relative pb-10">
            <div className="absolute w-3 h-3 bg-white/40 rounded-full -left-[6.5px] top-2" />
            <p className="text-sm text-white/50 mb-2 tracking-widest uppercase">Early 2024</p>
            <h3 className="text-xl md:text-2xl font-bold mb-3">Frontend Developer <span className="block md:inline text-white/50 font-light text-base md:text-2xl mt-1 md:mt-0">· Internship</span></h3>
            <p className="text-white/70 leading-relaxed font-light text-sm md:text-base">
              Where my professional journey began. I started by translating complex Figma designs into pixel-perfect, mobile-first interfaces. It was here that I mastered the core mechanics of the web, component-driven development, and the art of bringing static designs to life with fluid animations.
            </p>
          </div>

          {/* Education */}
          <div className="max-w-3xl border-l border-white/20 pl-8 relative">
            <div className="absolute w-3 h-3 bg-white/20 rounded-full -left-[6.5px] top-2" />
            <p className="text-sm text-white/50 mb-2 tracking-widest uppercase">2021 — 2024</p>
            <h3 className="text-xl md:text-2xl font-bold mb-1">Bachelor of Computer Applications</h3>
            <p className="text-white/50 mb-3 text-sm md:text-base font-medium">
              Seth Jai Parkash Mukand Lal Institute of Engineering and Technology <br className="hidden md:block" />(Affiliated to Kurukshetra University)
            </p>
            <p className="text-white/70 leading-relaxed font-light text-sm md:text-base">
              The theoretical foundation of my career. Here, I developed a strong understanding of programming logic, data structures, and software engineering principles that now underpin my everyday work as a developer.
            </p>
          </div>
        </section>

        {/* SECTION 04 — TOOLKIT */}
        <section 
          ref={el => { sectionsRef.current[4] = el; }} 
          className="min-h-[85vh] lg:h-screen py-12 lg:py-0 w-full flex flex-col justify-center items-center px-[30px] md:px-[70px] text-center pointer-events-auto"
        >
          <p className="text-[#34d399] tracking-widest uppercase text-xs font-bold mb-12">I work with</p>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-6 max-w-4xl">
            {technologies.map((tech) => (
              <span 
                key={tech}
                onMouseEnter={() => !isMobile && !isTablet && setActiveTech(tech)}
                onMouseLeave={() => !isMobile && !isTablet && setActiveTech(null)}
                className={`text-2xl md:text-4xl font-heading transition-all duration-500 ${
                  activeTech === tech ? 'text-[#34d399] scale-110 drop-shadow-[0_0_15px_rgba(52,211,153,0.8)]' : (activeTech ? 'text-white/20 blur-[1px]' : 'text-white hover:text-[#34d399]')
                } ${isMobile || isTablet ? 'cursor-default' : 'cursor-pointer'}`}
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* SECTION 05 — CTA */}
        <section 
          ref={el => { sectionsRef.current[5] = el; }} 
          className="min-h-[70vh] lg:h-screen py-12 lg:py-0 w-full flex flex-col justify-center items-center px-[30px] md:px-[70px] text-center"
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
 