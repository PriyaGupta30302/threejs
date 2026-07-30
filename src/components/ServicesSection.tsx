"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useServicesAnimation } from "@/hooks/useServicesAnimation";

const TABS = ["Web Development", "Design", "Automation", "Consulting"];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(-1);

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

  useServicesAnimation({
    sectionRef,
    sliderRef,
    bgRef,
    p1SphereRef,
    imgYfoodRef,
    imgEnphaseRef,
    imgNoiseRef,
    imgVinyasaRef,
    imgClarityRef,
    svgCirclesRef,
    pathRef,
    orbRef,
    setActiveTab,
  });

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Background color layer */}
      <div ref={bgRef} className="absolute inset-0 z-0 bg-[#161616]" />

      {/* The rotating sphere fixed at the bottom left touching the edge */}
      <div className="absolute -bottom-[75vh] left-0 z-0 w-[150vh] h-[150vh] opacity-80 pointer-events-none mix-blend-screen">
        <Image
          ref={p1SphereRef}
          src="/sphereSection/imgi_3_sphere_offground_0.png"
          alt="Glowing Sphere"
          fill
          sizes="150vh"
          className="object-cover"
          priority
        />
      </div>

      {/* Fixed Header / Tabs */}
      <div className="absolute top-12 left-0 right-0 z-50 flex justify-between items-center w-full max-w-[90rem] mx-auto px-16 pointer-events-none">
        <div className="flex justify-between w-full nav-layer">
          {TABS.map((tab, index) => (
            <div key={tab} className="flex items-center gap-3">
              <div 
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  activeTab === index ? 'bg-[#3AA89B]' : 'bg-white'
                }`}
              />
              <span className={`text-[22px] font-medium tracking-wide ${activeTab === index ? 'text-[#3AA89B]' : ''}`}>{tab}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal Slider Container */}
      <div ref={sliderRef} className="absolute top-0 left-0 h-full flex will-change-transform z-10 text-layer">
        
        {/* Phase 0: Introduction */}
        <div className="w-[100vw] h-full flex flex-col justify-between pt-32 pb-24 px-16 shrink-0 relative pointer-events-auto">
            {/* Top Left Heading */}
            <div className="relative z-20 mt-20 max-w-[90rem] mx-auto w-full">
                <h1 className="text-[95px] leading-[0.95] tracking-tight font-serif font-bold">
                    We specialize in<br />customer happiness.
                </h1>
            </div>

            {/* Bottom Right Content */}
            <div className="relative z-20 flex justify-end w-full max-w-[90rem] mx-auto mb-16">
                <div className="w-auto max-w-[850px]">
                    <h2 className="text-[40px] font-normal tracking-tight mb-2 whitespace-nowrap font-sans">
                        Tailored strategies, Guaranteed results
                    </h2>
                    <p className="opacity-90 text-[28px] leading-[1.3] font-normal font-sans">
                        That's why we offer a full suite of services, each tailored to address your unique challenges and goals. Our team of experts combines creativity with data to build strategies that deliver results.
                    </p>
                </div>
            </div>
        </div>

        {/* Phase 1 - Part 1: Web Development (We love to code) */}
        <div className="w-[60vw] h-full flex items-center shrink-0 relative pointer-events-auto pl-16">
            <div className="w-full max-w-[850px] z-20">
                <h2 className="text-[40px] font-normal tracking-tight mb-2 font-sans whitespace-nowrap">
                    We love to code.
                </h2>
                <p className="text-[28px] opacity-90 leading-[1.3] font-normal font-sans">
                    Animated panels, lovely transitions and beautiful designs. But what is good design, without function?
                </p>
            </div>
        </div>

        {/* Phase 1 - Part 2: Web Development (Our focus) */}
        <div className="w-[50vw] h-full flex items-center shrink-0 relative pointer-events-auto pl-16">
            <div className="w-full max-w-[850px] z-20 mt-[25vh]">
                <div className="flex flex-row items-start gap-6">
                    {/* Solid Chunky Arrow Icon */}
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" className="mt-2 shrink-0">
                        <path d="M5 21H21V5H16V16H5V21Z" />
                        <path d="M19 19L3 3L6.5 0.5L22.5 16.5L19 19Z" />
                    </svg>
                    <div>
                        <h3 className="text-[40px] font-normal tracking-tight mb-2 font-sans whitespace-nowrap">Our focus</h3>
                        <ul className="text-[28px] opacity-90 leading-[1.3] font-normal font-sans list-none m-0 p-0">
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
        <div className="w-[100vw] h-full flex items-center shrink-0 relative pointer-events-auto">
            <div className="px-16 flex items-center z-10 w-full h-full">
                <div className="w-[40%] max-w-7xl mx-auto">
                <div className="text-[12rem] leading-none mb-8 font-serif opacity-5 absolute top-[20%] left-16 z-0 pointer-events-none">Design</div>
                <div className="relative z-10">
                    <div className="text-3xl font-medium leading-tight mb-8">
                    Years of experience working with top brands you've interacted with prove our expertise.
                    </div>
                    <p className="opacity-70 font-medium mb-6 text-lg">Tailored strategies, Guaranteed results</p>
                    <p className="opacity-60 text-lg leading-relaxed">
                        That's why we offer a full suite of services, each tailored to address your unique challenges and goals. Our team of experts combines creativity with data to build strategies that deliver results.
                    </p>
                </div>
                </div>
            </div>
            {/* Images */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                <div ref={imgYfoodRef} className="absolute top-[10%] left-[-10%] w-64 h-64 overflow-hidden rounded-sm shadow-2xl">
                    <Image src="/sphereSection/imgi_4_sebastian_coelho-yfood.jpg" alt="yfood" fill className="object-cover" />
                </div>
                <div ref={imgEnphaseRef} className="absolute bottom-[10%] left-[0%] w-72 h-80 overflow-hidden rounded-sm shadow-2xl">
                    <Image src="/sphereSection/imgi_5_Danijel_Radulovic-Enphase.jpg" alt="Enphase" fill className="object-cover" />
                </div>
                <div ref={imgNoiseRef} className="absolute top-[35%] left-[25%] w-80 h-56 overflow-hidden rounded-sm shadow-2xl">
                    <Image src="/sphereSection/imgi_6_Jules_Toulmunde-Noise.jpg" alt="Noise" fill className="object-cover" />
                </div>
                <div ref={imgVinyasaRef} className="absolute bottom-[5%] left-[45%] w-56 h-72 overflow-hidden rounded-sm shadow-2xl">
                    <Image src="/sphereSection/imgi_7_sebastian_coelho-vinyasa_flow.jpg" alt="Vinyasa" fill className="object-cover" />
                </div>
                <div ref={imgClarityRef} className="absolute bottom-[20%] left-[30%] w-64 h-56 overflow-hidden rounded-sm shadow-2xl">
                    <Image src="/sphereSection/imgi_8_Jules_Toulmunde-Clarity.jpg" alt="Clarity" fill className="object-cover" />
                </div>
            </div>
        </div>

        {/* Phase 3: Automation */}
        <div className="w-[100vw] h-full flex items-center justify-between px-16 shrink-0 phase-3-text relative pointer-events-auto">
            <div className="w-[40%] z-10 max-w-7xl mx-auto">
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
                <div className="absolute top-[20%] left-[20%] badge bg-white px-4 py-2 rounded-full shadow-lg text-sm font-medium flex items-center gap-2 text-black">
                    <span className="w-4 h-4 bg-blue-500 rounded-sm"></span> lemlist
                </div>
                <div className="absolute top-[30%] right-[20%] badge bg-white px-4 py-2 rounded-full shadow-lg text-sm font-medium flex items-center gap-2 text-black">
                    <span className="text-red-500 font-bold">n8n</span>
                </div>
                <div className="absolute top-[50%] right-[30%] badge bg-white px-4 py-2 rounded-full shadow-lg text-sm font-medium flex items-center gap-2 text-black">
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
                    <ul className="space-y-1 text-sm opacity-80">
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
        <div className="w-[100vw] h-full flex items-center px-16 shrink-0 relative pointer-events-auto">
            <div className="w-[50%] z-20 max-w-7xl mx-auto">
                <h2 className="text-[7rem] leading-[1.1] tracking-tight font-serif mb-8">
                    Your all in<br />one agency
                </h2>
                <p className="text-xl opacity-90 leading-relaxed max-w-lg font-medium">
                    We guide your complete digital transformation. From strategy and branding to complex automation, we are your single point of contact from concept to execution.
                </p>
            </div>
            
            {/* SVG Diagram */}
            <div className="absolute right-[2%] top-1/2 -translate-y-1/2 w-[850px] h-[850px] max-w-[55vw] max-h-[95vh] z-10">
                <svg width="100%" height="100%" viewBox="0 0 600 600" ref={svgCirclesRef}>
                    <defs>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="8" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>
                    <g stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none">
                        <circle cx="300" cy="250" r="150" className="draw-circle" />
                        <circle cx="300" cy="400" r="150" className="draw-circle" />
                    </g>
                    
                    {/* Invisible figure-8 path for the orb to trace BOTH circles (takkar path) */}
                    <path 
                        ref={pathRef}
                        id="figure8-path"
                        d="M 170.096, 325 A 150,150 0 1,1 429.904, 325 A 150,150 0 0,0 170.096, 325 A 150,150 0 0,0 429.904, 325 A 150,150 0 1,1 170.096, 325" 
                        fill="none" 
                        stroke="none" 
                    />
                    
                    {/* Glowing Orb */}
                    <circle 
                        ref={orbRef}
                        cx="0" cy="0" r="14" 
                        fill="white" 
                        filter="url(#glow)"
                        style={{ filter: "drop-shadow(0 0 15px rgba(255,255,255,1))" }}
                    />
                    
                    {/* Labels */}
                    <text x="300" y="220" textAnchor="middle" fill="currentColor" fontSize="32" className="font-medium tracking-wide">Business</text>
                    <text x="300" y="340" textAnchor="middle" fill="currentColor" fontSize="32" className="font-medium tracking-wide">Brand</text>
                    <text x="300" y="470" textAnchor="middle" fill="currentColor" fontSize="32" className="font-medium tracking-wide">Emotions</text>
                </svg>
            </div>
        </div>
      </div>
    </section>
  );
}
