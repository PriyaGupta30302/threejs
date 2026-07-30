"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import MotionPathPlugin from "gsap/MotionPathPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

const TABS = ["Introduction", "Web Development", "Design", "Automation", "Consulting"];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  const p1SphereRef = useRef<HTMLImageElement>(null);

  // Phase 2
  const imgYfoodRef = useRef<HTMLImageElement>(null);
  const imgEnphaseRef = useRef<HTMLImageElement>(null);
  const imgNoiseRef = useRef<HTMLImageElement>(null);
  const imgVinyasaRef = useRef<HTMLImageElement>(null);
  const imgClarityRef = useRef<HTMLImageElement>(null);

  // Phase 3
  const p3NetworkRef = useRef<HTMLDivElement>(null);

  // Phase 4
  const svgCirclesRef = useRef<SVGSVGElement>(null);
  const orbRef = useRef<SVGCircleElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !sliderRef.current) return;

    const ctx = gsap.context(() => {
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=400%", // 4 screens of scrolling for 5 panels
          scrub: 1, // Smooth scrub
          pin: true,
          onUpdate: (self) => {
            const progress = self.progress;
            // Map progress to tabs (5 tabs, 5 panels)
            if (progress < 0.125) setActiveTab(0); // Intro
            else if (progress < 0.375) setActiveTab(1); // Web Dev
            else if (progress < 0.625) setActiveTab(2); // Design
            else if (progress < 0.875) setActiveTab(3); // Auto
            else setActiveTab(4); // Consulting
          },
        },
      });

      // Sphere rotation across Intro and Web Dev (Time 0 to 2)
      masterTl.to(p1SphereRef.current, {
        rotationZ: 120,
        duration: 2, 
        ease: "none",
      }, 0);

      // Sphere moves left during Intro -> Web Dev (Time 0 to 1)
      masterTl.to(p1SphereRef.current, {
        x: "-25vw",
        duration: 1,
        ease: "none",
      }, 0);

      // Horizontal sliding animation across 5 panels (each 100vw, so total translate is -400vw)
      masterTl.to(sliderRef.current, {
        x: "-400vw",
        ease: "none",
        duration: 4, 
      }, 0);

      // Transition 2 (Time 1 to 2): Phase 1 (Web Dev) to Phase 2 (Design)
      // Change background to Light Blue
      masterTl.to(bgRef.current, {
        backgroundColor: "#E2E8F0",
        duration: 1,
        ease: "none",
      }, 1);

      // Change Navigation text to black
      masterTl.to(".nav-layer", {
        color: "#000000",
        duration: 1,
        ease: "none",
      }, 1);

      // Sphere moves further left during Web Dev -> Design ("back scroll")
      masterTl.to(p1SphereRef.current, {
        x: "-65vw", // Leaves just a sliver on the left
        duration: 1,
        ease: "none",
      }, 1);

      // Transition 3 (Time 2 to 3): Phase 2 (Design) to Phase 3 (Automation)
      // Hide the sphere completely
      masterTl.to(p1SphereRef.current, {
        x: "-100vw",
        opacity: 0,
        duration: 1,
        ease: "none",
      }, 2);

      // Transition 4 (Time 3 to 4): Phase 3 (Automation) to Phase 4 (Consulting)
      // Change background to Dark Green
      masterTl.to(bgRef.current, {
        backgroundColor: "#0E4A3C",
        duration: 1,
        ease: "none",
      }, 3);

      // Change Navigation text back to white
      masterTl.to(".nav-layer", {
        color: "#FFFFFF",
        duration: 1,
        ease: "none",
      }, 3);

      // Phase 2 Images floating continuously
      const p2Images = [
        imgYfoodRef.current,
        imgEnphaseRef.current,
        imgNoiseRef.current,
        imgVinyasaRef.current,
        imgClarityRef.current,
      ];
      p2Images.forEach((img, i) => {
        if (img) {
          gsap.to(img, {
            y: "+=15",
            duration: 2 + i * 0.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      });

      // Phase 3 Badges floating continuously
      if (p3NetworkRef.current) {
        const badges = p3NetworkRef.current.querySelectorAll(".badge");
        if (badges.length > 0) {
            gsap.to(badges, {
                y: "+=10",
                duration: 3,
                stagger: 0.2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        }
      }

      // Phase 4 SVG Circles drawing triggered when we reach it
      if (svgCirclesRef.current) {
        const circles = svgCirclesRef.current.querySelectorAll("circle.draw-circle");
        if (circles.length > 0) {
            gsap.fromTo(
                circles,
                { strokeDashoffset: 1000, strokeDasharray: 1000 },
                { 
                    strokeDashoffset: 0, 
                    duration: 1.5, 
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top+300% top",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        }
      }

      // MotionPath animation for the orb
      if (orbRef.current && pathRef.current) {
        gsap.to(orbRef.current, {
          duration: 6,
          repeat: -1,
          ease: "none",
          motionPath: {
            path: pathRef.current,
            align: pathRef.current,
            alignOrigin: [0.5, 0.5],
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[500vh] text-white font-sans overflow-hidden bg-[#161616]">
      {/* The pinned sticky container */}
      <div ref={bgRef} className="sticky top-0 w-full h-screen overflow-hidden bg-[#161616]">
        
        {/* Navigation Layer */}
        <div className="nav-layer absolute top-8 left-0 right-0 z-50 px-8 flex justify-between items-center text-sm font-medium text-white pointer-events-none">
          {TABS.map((tab, idx) => (
            <div key={tab} className="flex items-center gap-2">
              <div
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${
                  activeTab === idx ? "bg-[#34d399]" : "bg-current opacity-30"
                }`}
              />
              <span className={activeTab === idx ? "opacity-100 font-bold" : "opacity-50 transition-opacity"}>
                {tab}
              </span>
            </div>
          ))}
        </div>

        {/* The rotating sphere fixed at the bottom left touching the edge */}
        <div className="absolute -bottom-[75vh] left-0 z-0 w-[150vh] h-[150vh] opacity-80 pointer-events-none mix-blend-screen">
          <Image
            ref={p1SphereRef}
            src="/sphereSection/imgi_3_sphere_offground_0.png"
            alt="Sphere"
            fill
            sizes="150vh"
            className="object-cover"
            priority
          />
        </div>

        {/* Horizontal Slider Container (5 panels wide = 500vw) */}
        <div ref={sliderRef} className="absolute inset-0 flex w-[500vw] h-full z-10 will-change-transform">
            
            {/* Phase 0: Introduction */}
            <div className="w-[100vw] h-full flex items-center shrink-0 relative pointer-events-auto px-16">
                <div className="w-full relative z-20 mix-blend-difference text-white pl-16">
                    <p className="text-xl font-medium mb-6">Introduction</p>
                    <h2 className="text-[7rem] leading-[1.1] tracking-tight font-serif text-white mb-16">
                    We specialize in<br />customer happiness.
                    </h2>
                    <div className="mt-8 flex gap-8">
                        <div className="max-w-2xl">
                            <h3 className="text-3xl font-serif mb-6 text-white">Our approach</h3>
                            <p className="text-white/80 text-lg leading-relaxed">
                              Tailored strategies, Guaranteed results. That's why we offer a full suite of services, each tailored to address your unique challenges and goals. Our team of experts combines creativity with data to build strategies that deliver results.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Phase 1: Web Development */}
            <div className="w-[100vw] h-full flex items-center justify-between shrink-0 relative pointer-events-auto px-16">
                <div className="w-[50%] relative z-20 mix-blend-difference text-white pl-16">
                    <h2 className="text-[4rem] leading-[1.1] tracking-tight font-serif text-white mb-6">
                    We love to code.
                    </h2>
                    <p className="text-xl text-white/90 leading-relaxed font-medium">
                        Animated panels, lovely transitions and beautiful designs. But what is good design, without function?
                    </p>
                </div>
                <div className="w-[40%] relative z-20 mix-blend-difference text-white">
                    <div className="flex items-start gap-8">
                        {/* Solid Arrow Icon */}
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" className="mt-2 text-white transform -rotate-45">
                            <path d="M21 21H3M21 21V3M21 21L3 3" stroke="currentColor" strokeWidth="3" fill="none" />
                        </svg>
                        <div>
                            <h3 className="text-4xl font-medium mb-6 text-white">Our focus</h3>
                            <ul className="space-y-3 text-lg text-white/80">
                                <li>Unique corporate websites</li>
                                <li>Smart open source CMS.</li>
                                <li>E-commerce solutions</li>
                                <li>Web app development</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Phase 2: Design */}
            <div className="w-[100vw] h-full flex items-center shrink-0 relative text-black pointer-events-auto">
                <div className="px-16 flex items-center z-10 w-full h-full">
                    <div className="w-[40%]">
                    <div className="text-[12rem] leading-none mb-8 font-serif text-black/5 absolute top-[20%] left-16 z-0 pointer-events-none">Design</div>
                    <div className="relative z-10">
                        <div className="text-3xl font-medium leading-tight mb-8">
                        Years of experience working with top brands you've interacted with prove our expertise.
                        </div>
                        <p className="text-black/70 font-medium mb-6 text-lg">Tailored strategies, Guaranteed results</p>
                        <p className="text-black/60 text-lg leading-relaxed">
                            That's why we offer a full suite of services, each tailored to address your unique challenges and goals. Our team of experts combines creativity with data to build strategies that deliver results.
                        </p>
                    </div>
                    </div>
                </div>
                {/* Images */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                    <div ref={imgYfoodRef} className="absolute top-[10%] left-[45%] w-64 h-64 overflow-hidden rounded-sm shadow-2xl">
                        <Image src="/sphereSection/imgi_4_sebastian_coelho-yfood.jpg" alt="yfood" fill className="object-cover" />
                    </div>
                    <div ref={imgEnphaseRef} className="absolute bottom-[10%] left-[55%] w-72 h-80 overflow-hidden rounded-sm shadow-2xl">
                        <Image src="/sphereSection/imgi_5_Danijel_Radulovic-Enphase.jpg" alt="Enphase" fill className="object-cover" />
                    </div>
                    <div ref={imgNoiseRef} className="absolute top-[35%] right-[5%] w-80 h-56 overflow-hidden rounded-sm shadow-2xl">
                        <Image src="/sphereSection/imgi_6_Jules_Toulmunde-Noise.jpg" alt="Noise" fill className="object-cover" />
                    </div>
                    <div ref={imgVinyasaRef} className="absolute bottom-[5%] right-[15%] w-56 h-72 overflow-hidden rounded-sm shadow-2xl">
                        <Image src="/sphereSection/imgi_7_sebastian_coelho-vinyasa_flow.jpg" alt="Vinyasa" fill className="object-cover" />
                    </div>
                    <div ref={imgClarityRef} className="absolute bottom-[20%] left-[10%] w-64 h-56 overflow-hidden rounded-sm shadow-2xl">
                        <Image src="/sphereSection/imgi_8_Jules_Toulmunde-Clarity.jpg" alt="Clarity" fill className="object-cover" />
                    </div>
                </div>
            </div>

            {/* Phase 3: Automation */}
            <div className="w-[100vw] h-full flex items-center justify-between px-16 shrink-0 text-black relative pointer-events-auto">
                <div className="w-[40%] z-10">
                    <h2 className="text-5xl leading-tight font-medium tracking-tight mb-8">
                        We automate the heavy lifting with intelligent background systems. From data flows to AI support, we ensure your business scales without friction.
                    </h2>
                </div>
                
                {/* Network SVG */}
                <div ref={p3NetworkRef} className="relative w-[50%] h-[70vh] z-10">
                    <svg width="100%" height="100%" viewBox="0 0 500 500" className="absolute inset-0">
                        <defs>
                            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#4A90E2" stopOpacity="0.2"/>
                                <stop offset="100%" stopColor="#50E3C2" stopOpacity="0.8"/>
                            </linearGradient>
                        </defs>
                        <g stroke="url(#lineGrad)" strokeWidth="1" opacity="0.6">
                            <line x1="100" y1="200" x2="250" y2="150" />
                            <line x1="250" y1="150" x2="400" y2="250" />
                            <line x1="400" y1="250" x2="300" y2="400" />
                            <line x1="300" y1="400" x2="150" y2="350" />
                            <line x1="150" y1="350" x2="100" y2="200" />
                            <line x1="250" y1="150" x2="300" y2="400" />
                        </g>
                        <g fill="#50E3C2">
                            <circle cx="100" cy="200" r="4" />
                            <circle cx="250" cy="150" r="6" />
                            <circle cx="400" cy="250" r="5" />
                            <circle cx="300" cy="400" r="4" />
                            <circle cx="150" cy="350" r="5" />
                        </g>
                    </svg>
                    {/* Badges */}
                    <div className="absolute top-[20%] left-[20%] badge bg-white px-4 py-2 rounded-full shadow-lg text-sm font-medium flex items-center gap-2">
                        <span className="w-4 h-4 bg-blue-500 rounded-sm"></span> lemlist
                    </div>
                    <div className="absolute top-[30%] right-[20%] badge bg-white px-4 py-2 rounded-full shadow-lg text-sm font-medium flex items-center gap-2">
                        <span className="text-red-500 font-bold">n8n</span>
                    </div>
                    <div className="absolute top-[50%] right-[30%] badge bg-white px-4 py-2 rounded-full shadow-lg text-sm font-medium flex items-center gap-2">
                        OpenAI
                    </div>
                    <div className="absolute bottom-[20%] right-[40%] badge bg-white px-4 py-2 rounded-full shadow-lg text-sm font-medium flex items-center gap-2 text-green-600">
                        pipedrive
                    </div>
                    <div className="absolute bottom-[30%] left-[25%] badge bg-white px-4 py-2 rounded-full shadow-lg text-sm font-medium flex items-center gap-2 text-purple-500">
                        make
                    </div>
                    
                    {/* Expertise List aligned near the network */}
                    <div className="absolute -right-16 bottom-0 w-[60%]">
                        <h3 className="text-4xl font-medium mb-4">Our expertise</h3>
                        <ul className="space-y-1 text-sm text-black/80">
                            <li>Process automation with make/n8n</li>
                            <li>AI assistants and chatbots</li>
                            <li>AI phone systems</li>
                            <li>Social media automation</li>
                            <li>Lead research and cold outreach</li>
                            <li>CRM and synchronization of multiple systems</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Phase 4: Consulting */}
            <div className="w-[100vw] h-full flex items-center px-16 shrink-0 text-white relative pointer-events-auto">
                <div className="w-[50%] z-20">
                    <h2 className="text-[7rem] leading-[1.1] tracking-tight font-serif mb-8">
                        Your all in<br />one agency
                    </h2>
                    <p className="text-xl text-white/90 leading-relaxed max-w-lg font-medium">
                        We guide your complete digital transformation. From strategy and branding to complex automation, we are your single point of contact from concept to execution.
                    </p>
                </div>
                
                {/* SVG Diagram */}
                <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] z-10">
                    <svg width="100%" height="100%" viewBox="0 0 600 600" ref={svgCirclesRef}>
                        <defs>
                            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="8" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>
                        <g stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none">
                            <path 
                                ref={pathRef}
                                id="circle-path-1"
                                className="draw-circle"
                                d="M300,100 A150,150 0 1,1 299.9,100" 
                            />
                            <circle cx="300" cy="400" r="150" className="draw-circle" />
                        </g>
                        
                        {/* Glowing Orb */}
                        <circle 
                            ref={orbRef}
                            cx="0" cy="0" r="12" 
                            fill="white" 
                            filter="url(#glow)"
                            style={{ filter: "drop-shadow(0 0 10px rgba(255,255,255,0.8))" }}
                        />
                        
                        {/* Labels */}
                        <text x="300" y="220" textAnchor="middle" fill="white" fontSize="24" className="font-medium">Business</text>
                        <text x="300" y="350" textAnchor="middle" fill="white" fontSize="24" className="font-medium">Brand</text>
                        <text x="300" y="470" textAnchor="middle" fill="white" fontSize="24" className="font-medium">Emotions</text>
                    </svg>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
}
