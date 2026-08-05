"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useServicesAnimation } from "@/hooks/useServicesAnimation";
import Network3D from "./Network3D";

const TABS = ["Web Development", "Design", "Automation", "Consulting"];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(-1);

  const p1SphereRef = useRef<HTMLDivElement>(null);

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
  const orbRef = useRef<SVGGElement>(null);
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
      <div ref={p1SphereRef} className="absolute -bottom-[75vh] left-0 z-0 w-[150vh] h-[150vh] opacity-80 pointer-events-none mix-blend-screen">
        <Image
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
                  activeTab === index ? 'bg-[#3AA89B]' : 'bg-current'
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
                        That&apos;s why we offer a full suite of services, each tailored to address your unique challenges and goals. Our team of experts combines creativity with data to build strategies that deliver results.
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
        <div className="w-auto h-full flex items-end pb-24 shrink-0 relative pointer-events-auto pl-16 pr-8">
            <div className="w-full max-w-[350px] ml-28 z-20">
                <div className="flex flex-col items-start">
                    {/* Solid Chunky Arrow Icon */}
                    <svg width="72" height="72" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 -ml-5">
                        <path d="M 6 22 H 22 V 6 H 16 V 11.76 L 7.24 3 L 3 7.24 L 11.76 16 H 6 V 22 Z" />
                    </svg>
                    <div className="ml-[50px] -mt-[6px]">
                        <h3 className="text-[40px] font-medium tracking-tight mb-4 font-sans whitespace-nowrap leading-none">Our focus</h3>
                        <ul className="text-[18px] opacity-90 leading-[1.2] font-medium font-sans list-none m-0 p-0 space-y-1">
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
        <div className="w-[100vw] h-full shrink-0 relative pointer-events-auto phase-2-container">
            {/* Text Content */}
            <div className="absolute top-[18%] left-[28%] z-30 w-[50%] max-w-[700px]">
                <h3 className="text-[35px] font-regular leading-[1] tracking-tight text-black">
                    Years of experience working with<br/>
                    brands you&apos;ve interacted with backs up<br/>
                    our expertise.
                </h3>
            </div>

            {/* Images */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                <div ref={imgYfoodRef} className="absolute top-[13%] left-[0%] w-[260px] h-[260px] overflow-hidden rounded-sm shadow-xl">
                    <Image src="/sphereSection/imgi_4_sebastian_coelho-yfood.jpg" alt="yfood" fill className="object-cover" />
                </div>
                
                <div ref={imgNoiseRef} className="absolute top-[38%] left-[43%] w-[200px] h-[200px] overflow-hidden rounded-sm shadow-xl">
                    <Image src="/sphereSection/imgi_6_Jules_Toulmunde-Noise.jpg" alt="Noise" fill className="object-cover" />
                </div>

                <div ref={imgEnphaseRef} className="absolute top-[62%] left-[13%] w-[300px] h-[300px] overflow-hidden rounded-sm shadow-xl">
                    <Image src="/sphereSection/imgi_5_Danijel_Radulovic-Enphase.jpg" alt="Enphase" fill className="object-cover" />
                </div>
                
                <div ref={imgVinyasaRef} className="absolute top-[80%] left-[42%] w-[340px] h-[220px] overflow-hidden rounded-sm shadow-xl">
                    <Image src="/sphereSection/imgi_7_sebastian_coelho-vinyasa_flow.jpg" alt="Vinyasa" fill className="object-cover" />
                </div>

                <div ref={imgClarityRef} className="absolute top-[24%] right-[14%] w-[172px] h-[185px] overflow-hidden rounded-sm shadow-xl">
                    <Image src="/sphereSection/imgi_8_Jules_Toulmunde-Clarity.jpg" alt="Clarity" fill className="object-cover" />
                </div>

                <div className="absolute top-[64%] right-[4%] w-[320px] text-black">
                    <h3 className="text-[40px] font-regular tracking-tight mb-4 font-sans leading-none">Our services</h3>
                    <ul className="text-[18px] opacity-90 leading-[1.2] font-medium font-sans list-none m-0 p-0 space-y-1">
                        <li>UX/UI design</li>
                        <li>Brand identity and strategy</li>
                        <li>Photography and video production</li>
                        <li>CGI and motion design</li>
                        <li>Trade fair design and construction</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Phase 3: Automation */}
        <div className="w-[90vw] h-full flex items-center justify-between px-0 shrink-0 phase-3-text relative pointer-events-auto">
            <div className="w-[45%] z-10 max-w-[600px] ml-16">
                <h3 className="text-[35px] leading-tight font-medium tracking-tight mb-8">
                    We automate the heavy lifting with intelligent background systems. From data flows to AI support, we ensure your business scales without friction.
                </h3>
            </div>
            
            {/* 3D Network */}
            <div ref={p3NetworkRef} className="relative w-[50%] h-[95vh] z-10 flex flex-col justify-end">
                <div className="w-[110%] h-[85%] relative -mb-20 mr-16  -ml-40">
                    <Network3D />
                </div>
                
                {/* Expertise List aligned near the network */}
                <div className="w-[75%] ml-auto z-20">
                    <h3 className="text-[40px] font-medium tracking-tight mb-4 font-sans leading-none">Our expertise</h3>
                    <ul className="text-[18px] opacity-90 leading-[1.4] font-medium font-sans list-none m-0 p-0 space-y-1">
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
        <div className="w-[85vw] h-full flex items-center pl-16 pr-8 shrink-0 relative pointer-events-auto">
            <div className="w-[45%] z-20">
                <h2 className="text-[7rem] leading-[0.9] tracking-tight font-serif mb-8">
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
                        <linearGradient id="comet-tail" x1="1" y1="0" x2="0" y2="0">
                            <stop offset="0%" stopColor="white" stopOpacity="1" />
                            <stop offset="100%" stopColor="white" stopOpacity="0" />
                        </linearGradient>
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
                    
                    {/* Glowing Comet Orb (Multiple Circles) */}
                    <g ref={orbRef}>
                        {/* Invisible bounding box to keep the group perfectly centered at (0,0) for GSAP motionPath */}
                        <circle cx="0" cy="0" r="45" fill="white" opacity="0.01" />
                        
                        {/* Tail circles (all solid white except the very last ones) */}
                        <circle cx="-40" cy="0" r="1.5" fill="white" opacity="0.1" />
                        <circle cx="-35" cy="0" r="2.5" fill="white" opacity="0.3" />
                        <circle cx="-30" cy="0" r="4" fill="white" opacity="1" />
                        <circle cx="-25" cy="0" r="5.5" fill="white" opacity="1" />
                        <circle cx="-20" cy="0" r="7" fill="white" opacity="1" />
                        <circle cx="-15" cy="0" r="8.5" fill="white" opacity="1" />
                        <circle cx="-10" cy="0" r="10" fill="white" opacity="1" />
                        <circle cx="-5" cy="0" r="11.5" fill="white" opacity="1" />
                        
                        {/* Glowing Head (centered at 0,0) */}
                        <circle 
                            cx="0" cy="0" r="13" 
                            fill="white" 
                            filter="url(#glow)"
                            style={{ filter: "drop-shadow(0 0 15px rgba(255,255,255,1))" }}
                        />
                    </g>
                    
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

// test