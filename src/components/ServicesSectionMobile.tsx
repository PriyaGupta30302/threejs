"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Network3D from "./Network3D";
import textData from "../data/servicesText.json";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSectionMobile() {
  const sectionRef = useRef<HTMLElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const phase3SpacerRef = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  const sphere1Ref = useRef<HTMLDivElement>(null);
  const sphere2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!card2Ref.current || !sphere2Ref.current) return;

    const ctx = gsap.context(() => {
      // Sphere 1: Rolls to the right and hides as Card 2 slides up
      if (sphere1Ref.current) {
        gsap.to(sphere1Ref.current, {
          x: "100vw", // roll completely off-screen to the right
          rotationZ: 90, // natural rolling rotation for this distance
          scrollTrigger: {
            trigger: card2Ref.current,
            start: "top bottom", // starts when card 2 enters from bottom
            end: "top 10%", // ends near the top, giving it a longer scroll distance to roll slower
            scrub: 1.5, // changed from true to 1.5 to add smooth momentum
          },
        });
      }

      // Sphere 2: Rolls to the left and hides as we scroll past Card 2
      if (sphere2Ref.current) {
        gsap.to(sphere2Ref.current, {
          x: "-100vw", // roll completely off-screen to the left
          rotationZ: -90, // natural rolling counter-clockwise
          scrollTrigger: {
            trigger: card2Ref.current,
            start: "top top", // starts when card 2 reaches the top and becomes sticky
            end: "+=100%", // roll away over 100vh of scroll for a smoother, longer roll
            scrub: 1.5, // add smooth momentum
          },
        });
      }

      // Phase 3 Horizontal Image Scroll
      if (card3Ref.current && phase3SpacerRef.current) {
        gsap.fromTo(
          ".design-img-container",
          { x: "-300vw" }, // Start with the Girl image (at 300vw) at the left edge of the screen
          {
            x: "0vw", // End with the Clarity image (at 10vw) on the screen
            ease: "none",
            scrollTrigger: {
              trigger: card3Ref.current,
              start: "top 50%", // Start early when Design phase is 50% visible
              end: () => `+=${window.innerHeight * 0.5 + phase3SpacerRef.current!.offsetHeight}`,
              scrub: 1.5,
            },
          }
        );
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
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-[#161616] text-white pb-[100dvh]">
      {/* ================= PHASE 1: INTRODUCTION ================= */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between p-6 bg-[#161616] z-10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        {/* Sphere 1 - Positioned on right, ~40% visible. 85dvh width * 0.5 = 42.5dvh to offset center to right edge */}
        <div ref={sphere1Ref} className="absolute bottom-0 -right-[42.5dvh] w-[85dvh] h-[85dvh] opacity-80 pointer-events-none mix-blend-screen">
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
        {/* Sphere 2 - Positioned on left, ~30% visible. 85dvh width * 0.7 = 59.5dvh to offset */}
        <div
          ref={sphere2Ref}
          className="absolute bottom-0 -left-[59.5dvh] w-[85dvh] h-[85dvh] opacity-80 pointer-events-none mix-blend-screen"
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
        <div className="design-img-container absolute top-[14%] left-0 w-[350vw] h-[60%] pointer-events-none z-10 flex items-center">
          
          {/* Images placed in a continuous stream with visible gaps to match the order: Girl -> House -> Cream -> Purple -> Clarity */}
          
          {/* 1. yfood (Girl) - First to appear */}
          <div className="absolute top-[30%] left-[300vw] w-[170px] h-[170px] shadow-2xl rounded-[4px] overflow-hidden">
            <Image src="/sphereSection/imgi_4_sebastian_coelho-yfood.jpg" fill className="object-cover" alt="yfood" />
          </div>
          
          {/* 2. Enphase (House) */}
          <div className="absolute top-[50%] left-[220vw] w-[190px] h-[190px] shadow-2xl rounded-[4px] overflow-hidden">
            <Image src="/sphereSection/imgi_5_Danijel_Radulovic-Enphase.jpg" fill className="object-cover" alt="Enphase" />
          </div>
          
          {/* 3. Silky (Cream brick) */}
          <div className="absolute top-[10%] left-[150vw] w-[170px] h-[170px] shadow-2xl rounded-[4px] overflow-hidden">
            <Image src="/sphereSection/imgi_6_Jules_Toulmunde-Noise.jpg" fill className="object-cover" alt="Silky" />
          </div>

          {/* 4. Vinyasa (Purple phones) */}
          <div className="absolute top-[50%] left-[80vw] w-[180px] h-[180px] shadow-2xl rounded-[4px] overflow-hidden">
            <Image src="/sphereSection/imgi_7_sebastian_coelho-vinyasa_flow.jpg" fill className="object-cover" alt="Vinyasa" />
          </div>
          
          {/* 5. Clarity (Dark block) - Last to appear, stops here */}
          <div className="absolute top-[20%] left-[10vw] w-[180px] h-[180px] shadow-2xl rounded-[4px] overflow-hidden">
            <Image src="/sphereSection/imgi_8_Jules_Toulmunde-Clarity.jpg" fill className="object-cover" alt="Clarity" />
          </div>

        </div>
      </div>

      {/* Spacer to provide scroll duration for Phase 3 horizontal scroll */}
      <div ref={phase3SpacerRef} className="h-[150dvh] w-full pointer-events-none" />

      {/* ================= PHASE 4: AUTOMATION ================= */}
      <div
        ref={card4Ref}
        className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between p-6 bg-[#E8EDEC] text-[#111] z-40 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] rounded-t-[40px]"
      >
        <div className="relative z-20 mt-12 w-[95%] automation-slide-item">
          <h3 className="text-3xl font-medium tracking-tight mb-4 font-sans leading-tight">
            {textData.automation.heading}
          </h3>
        </div>

        {/* 3D Network Background */}
        <div className="absolute bottom-0 left-0 w-full h-[50vh] opacity-60 pointer-events-none z-10 flex items-end justify-center automation-slide-item">
            <div className="w-[150%] h-[150%] scale-75 origin-bottom">
              <Network3D />
            </div>
        </div>

        <div className="relative z-20 mb-12 automation-slide-item">
          <h3 className="text-3xl font-medium tracking-tight mb-4 font-sans">
            {textData.automation.expertiseHeading}
          </h3>
          <ul className="opacity-90 text-base leading-relaxed font-medium font-sans space-y-1">
            {textData.automation.expertiseList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
