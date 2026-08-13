"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import MotionPathPlugin from "gsap/MotionPathPlugin";
import Network3D from "./Network3D";
import textData from "../data/servicesText.json";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function ServicesSectionMobile() {
  const sectionRef = useRef<HTMLElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  const card5Ref = useRef<HTMLDivElement>(null);
  
  const overlay1Ref = useRef<HTMLDivElement>(null);
  const overlay2Ref = useRef<HTMLDivElement>(null);
  const overlay3Ref = useRef<HTMLDivElement>(null);
  const overlay4Ref = useRef<HTMLDivElement>(null);
  const sphere1Ref = useRef<HTMLDivElement>(null);
  const sphere2Ref = useRef<HTMLDivElement>(null);
  
  // Phase 5 SVG Refs
  const svgCirclesRef = useRef<SVGSVGElement>(null);
  const topPathRef = useRef<SVGPathElement>(null);
  const bottomPathRef = useRef<SVGPathElement>(null);
  const topOrbRef = useRef<SVGGElement>(null);
  const bottomOrbRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!card2Ref.current || !sphere2Ref.current) return;

    const ctx = gsap.context(() => {
      // Sphere 1: Rolls to the right and hides as Card 2 slides up
      if (sphere1Ref.current) {
        gsap.to(sphere1Ref.current, {
          x: "100vw", // roll completely off-screen to the right
          rotationZ: 120, // natural rolling rotation for this distance
          scrollTrigger: {
            trigger: card2Ref.current,
            start: "top bottom", // starts when card 2 enters from bottom
            end: "top top", // ends when card 2 reaches the top
            scrub: 1.5,
          },
        });
      }

      // Sphere 2: Rolls IN from the left as Card 2 slides up
      if (sphere2Ref.current) {
        gsap.fromTo(
          sphere2Ref.current,
          {
            x: "-100vw", // start completely off-screen to the left
            rotationZ: -120, // start rotated back
          },
          {
            x: "0vw", // roll into its original CSS position
            rotationZ: 0,
            scrollTrigger: {
              trigger: card2Ref.current,
              start: "top bottom", // starts when card 2 enters from bottom
              end: "top top", // ends when card 2 reaches the top
              scrub: 1.5,
            },
          }
        );
      }

      // Phase 3 Horizontal Image Scroll
      if (card3Ref.current) {
        gsap.fromTo(
          ".design-img-container",
          { x: "-140vw" }, // Start with Girl image entering from the left edge
          {
            x: "0vw", // Stop when Clarity arrives
            ease: "none",
            scrollTrigger: {
              trigger: card3Ref.current,
              start: "top bottom", 
              end: "top top", // End exactly when Phase 3 is fully on screen
              scrub: 1.5,
            },
          }
        );
      }

      // Overlay Animations for each phase
      // Added ease: "none" so the opacity scales linearly with scroll (e.g. 10% scroll = 10% opacity)
      if (overlay1Ref.current && card2Ref.current) {
        gsap.fromTo(overlay1Ref.current, { opacity: 0 }, { opacity: 0.5, ease: "none", scrollTrigger: { trigger: card2Ref.current, start: "top 70%", end: "top top", scrub: true } });
      }
      if (overlay2Ref.current && card3Ref.current) {
        gsap.fromTo(overlay2Ref.current, { opacity: 0 }, { opacity: 0.5, ease: "none", scrollTrigger: { trigger: card3Ref.current, start: "top 70%", end: "top top", scrub: true } });
      }
      if (overlay3Ref.current && card4Ref.current) {
        gsap.fromTo(overlay3Ref.current, { opacity: 0 }, { opacity: 0.5, ease: "none", scrollTrigger: { trigger: card4Ref.current, start: "top 70%", end: "top top", scrub: true } });
      }
      if (overlay4Ref.current && card5Ref.current) {
        gsap.fromTo(overlay4Ref.current, { opacity: 0 }, { opacity: 0.5, ease: "none", scrollTrigger: { trigger: card5Ref.current, start: "top 70%", end: "top top", scrub: true } });
      }

      // Phase 4 Automation Slide Animation
      if (card4Ref.current) {
        gsap.fromTo(
          ".automation-slide-item",
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card4Ref.current,
              start: "top 50%", // Trigger when Automation phase is 50% up the screen
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // Phase 5 SVG Orbs Animation along paths
      if (topOrbRef.current && topPathRef.current) {
        gsap.to(topOrbRef.current, {
          duration: 6,
          repeat: -1,
          yoyo: true, // Bounce back at the ends of the path
          ease: "none",
          motionPath: {
            path: topPathRef.current,
            align: topPathRef.current,
            alignOrigin: [0.5, 0.5],
            autoRotate: true
          },
        });
      }

      if (bottomOrbRef.current && bottomPathRef.current) {
        gsap.to(bottomOrbRef.current, {
          duration: 6,
          repeat: -1,
          yoyo: true, // Bounce back at the ends of the path
          ease: "none",
          motionPath: {
            path: bottomPathRef.current,
            align: bottomPathRef.current,
            alignOrigin: [0.5, 0.5],
            autoRotate: true
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#161616] text-white pb-0">
      {/* ================= PHASE 1: INTRODUCTION ================= */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between p-6 bg-[#161616] z-10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div ref={overlay1Ref} className="absolute inset-0 bg-black pointer-events-none z-[100] opacity-0" />
        {/* Sphere 1 - Positioned on right, 40% visible. 85dvh width * 0.6 = 51dvh to offset center to right edge */}
        <div ref={sphere1Ref} className="absolute bottom-0 -right-[51dvh] w-[85dvh] h-[85dvh] opacity-80 pointer-events-none mix-blend-screen will-change-transform">
          <Image
            src="/sphereSection/imgi_3_sphere_offground_0.png"
            alt="Glowing Sphere"
            fill
            sizes="85dvh"
            className="object-contain"
            priority
          />
        </div>

        {/* Top Heading */}
        <div className="relative z-20 mt-12">
          <h1 className="text-5xl leading-tight font-serif font-bold tracking-tight">
            {textData.introduction.heading.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </h1>
        </div>

        {/* Bottom Subheading & Para */}
        <div className="relative z-20 mb-12">
          <h2 className="text-2xl font-medium tracking-tight mb-4 font-sans">
            {textData.introduction.subheading}
          </h2>
          <p className="opacity-90 text-base leading-relaxed font-normal font-sans">
            {textData.introduction.paragraph}
          </p>
        </div>
      </div>

      {/* ================= PHASE 2: WEB DEVELOPMENT ================= */}
      <div
        ref={card2Ref}
        className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between p-6 bg-[#161616] z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
      >
        <div ref={overlay2Ref} className="absolute inset-0 bg-black pointer-events-none z-[100] opacity-0" />
        {/* Sphere 2 - Positioned on left, 30% visible. 85dvh width * 0.7 = 59.5dvh to offset */}
        <div
          ref={sphere2Ref}
          className="absolute bottom-0 -left-[59.5dvh] w-[85dvh] h-[85dvh] opacity-80 pointer-events-none mix-blend-screen will-change-transform"
        >
          <Image
            src="/sphereSection/imgi_3_sphere_offground_0.png"
            alt="Glowing Sphere"
            fill
            sizes="85dvh"
            className="object-contain"
            priority
          />
        </div>

        {/* Top Content */}
        <div className="relative z-20 mt-12">
          <h2 className="text-3xl font-medium tracking-tight mb-4 font-sans">
            {textData.webDevelopment.part1.heading}
          </h2>
          <p className="opacity-90 text-base leading-relaxed font-normal font-sans">
            {textData.webDevelopment.part1.paragraph}
          </p>
        </div>

        {/* Bottom Content */}
        <div className="relative z-20 mb-12">
          <h3 className="text-3xl font-medium tracking-tight mb-4 font-sans">
            {textData.webDevelopment.part2.heading}
          </h3>
          <ul className="opacity-90 text-base leading-relaxed font-medium font-sans space-y-1">
            {textData.webDevelopment.part2.list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* ================= PHASE 3: DESIGN ================= */}
      <div
        ref={card3Ref}
        className="sticky top-0 h-[100dvh] w-full bg-[#DDE3E3] text-[#111] z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] rounded-t-[30px] overflow-hidden"
      >
        <div ref={overlay3Ref} className="absolute inset-0 bg-black pointer-events-none z-[100] opacity-0" />
        {/* Sticky Content */}
        <div className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none z-20">
          <div className="relative mt-8 w-full max-w-[350px]">
            <h3 className="text-[26px] font-medium tracking-tight mb-4 font-sans leading-[1.1]">
              {textData.design.heading.replace(/\n/g, ' ')}
            </h3>
          </div>

          <div className="relative mb-6">
            <h3 className="text-[20px] font-medium tracking-tight mb-2 font-sans">
              {textData.design.servicesHeading}
            </h3>
            <ul className="opacity-90 text-[14px] leading-[1.3] font-medium font-sans space-y-[2px]">
              {textData.design.servicesList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Horizontal Scrolling Images */}
        <div className="design-img-container absolute top-[14%] left-0 w-[200vw] h-[60%] pointer-events-none z-10 flex items-center will-change-transform">
          
          {/* Images entering from Left to Right, perfectly spaced to avoid touching */}
          
          {/* 1. yfood (Girl) - First to enter from left */}
          <div className="absolute top-[15%] left-[130vw] w-[130px] h-[130px] shadow-2xl rounded-[4px] overflow-hidden">
            <Image src="/sphereSection/imgi_4_sebastian_coelho-yfood.jpg" fill className="object-cover" alt="yfood" />
          </div>
          
          {/* 2. Enphase (House) */}
          <div className="absolute top-[55%] left-[100vw] w-[150px] h-[150px] shadow-2xl rounded-[4px] overflow-hidden">
            <Image src="/sphereSection/imgi_5_Danijel_Radulovic-Enphase.jpg" fill className="object-cover" alt="Enphase" />
          </div>
          
          {/* 3. Silky (Cream brick) */}
          <div className="absolute top-[10%] left-[70vw] w-[130px] h-[130px] shadow-2xl rounded-[4px] overflow-hidden">
            <Image src="/sphereSection/imgi_6_Jules_Toulmunde-Noise.jpg" fill className="object-cover" alt="Silky" />
          </div>

          {/* 4. Vinyasa (Purple phones) */}
          <div className="absolute top-[60%] left-[45vw] w-[140px] h-[140px] shadow-2xl rounded-[4px] overflow-hidden">
            <Image src="/sphereSection/imgi_7_sebastian_coelho-vinyasa_flow.jpg" fill className="object-cover" alt="Vinyasa" />
          </div>
          
          {/* 5. Clarity (Dark block) - Last to enter */}
          <div className="absolute top-[15%] left-[10vw] w-[140px] h-[140px] shadow-2xl rounded-[4px] overflow-hidden">
            <Image src="/sphereSection/imgi_8_Jules_Toulmunde-Clarity.jpg" fill className="object-cover" alt="Clarity" />
          </div>

        </div>
      </div>

      
      {/* ================= PHASE 4: AUTOMATION ================= */}
      <div
        ref={card4Ref}
        className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between p-6 bg-[#E8EDEC] text-[#111] z-40 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] rounded-t-[40px]"
      >
        <div ref={overlay4Ref} className="absolute inset-0 bg-black pointer-events-none z-[100] opacity-0" />
        <div className="relative z-20 mt-4 w-[95%] automation-slide-item">
          <h3 className="text-[22px] font-medium tracking-tight font-sans leading-[1.2]">
            {textData.automation.heading}
          </h3>
        </div>

        {/* 3D Network in the Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[60vh] pointer-events-auto z-10 flex items-center justify-center">
          <div className="automation-slide-item w-full h-full flex items-center justify-center will-change-transform">
            <div className="w-[120%] h-[120%] scale-90 ml-5 origin-center">
              <Network3D isMobile={true} />
            </div>
          </div>
        </div>

        <div className="relative z-20 mb-4 automation-slide-item">
          <h3 className="text-[22px] font-medium tracking-tight mb-3 font-sans">
            {textData.automation.expertiseHeading}
          </h3>
          <ul className="opacity-90 text-[14px] leading-[1.4] font-medium font-sans space-y-[4px]">
            {textData.automation.expertiseList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* ================= PHASE 5: CONSULTING ================= */}
      <div ref={card5Ref} className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-start p-6 bg-[#0f4134] text-[#FFFFFF] z-50 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] rounded-t-[40px]">
        {/* Top Text Content */}
        <div className="w-full mt-4 md:mt-8 z-20">
          <h2 className="text-[42px] leading-[1.05] tracking-tight font-serif mb-5">
            {textData.consulting.heading.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </h2>
          <p className="text-[17px] opacity-90 leading-[1.5] font-medium max-w-[95%]">
            {textData.consulting.paragraph}
          </p>
        </div>

        {/* Bottom SVG Diagram */}
        <div className="relative w-full aspect-square mt-16 md:mt-24 z-10 flex items-center justify-center">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 600 600"
            ref={svgCirclesRef}
            className="overflow-visible scale-[1.35]"
          >
            <defs>
              <filter id="glow-mobile" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <g stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none">
              <circle cx="300" cy="250" r="150" />
              <circle cx="300" cy="400" r="150" />
            </g>

            {/* Invisible paths for the comets */}
            <path
              ref={topPathRef}
              d="M 170.096, 325 A 150,150 0 1,1 429.904, 325 A 150,150 0 0,1 170.096, 325"
              fill="none"
              stroke="none"
            />
            <path
              ref={bottomPathRef}
              d="M 170.096, 325 A 150,150 0 1,0 429.904, 325 A 150,150 0 0,0 170.096, 325"
              fill="none"
              stroke="none"
            />

            {/* Top Comet */}
            <g ref={topOrbRef}>
              <circle cx="0" cy="0" r="45" fill="white" opacity="0.01" />
              <circle
                cx="0"
                cy="0"
                r="14"
                fill="white"
                filter="url(#glow-mobile)"
                style={{
                  filter: "drop-shadow(0 0 15px rgba(255,255,255,1))",
                }}
              />
            </g>

            {/* Bottom Comet */}
            <g ref={bottomOrbRef}>
              <circle cx="0" cy="0" r="45" fill="white" opacity="0.01" />
              <circle
                cx="0"
                cy="0"
                r="14"
                fill="white"
                filter="url(#glow-mobile)"
                style={{
                  filter: "drop-shadow(0 0 15px rgba(255,255,255,1))",
                }}
              />
            </g>

            {/* Labels */}
            <text
              x="300"
              y="220"
              textAnchor="middle"
              fill="currentColor"
              className="text-[26px] font-medium tracking-wide"
            >
              Business
            </text>
            <text
              x="300"
              y="340"
              textAnchor="middle"
              fill="currentColor"
              className="text-[26px] font-medium tracking-wide"
            >
              Brand
            </text>
            <text
              x="300"
              y="470"
              textAnchor="middle"
              fill="currentColor"
              className="text-[26px] font-medium tracking-wide"
            >
              Emotions
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
