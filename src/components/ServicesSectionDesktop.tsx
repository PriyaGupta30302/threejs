"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useServicesAnimation } from "@/hooks/useServicesAnimation";
import Network3D from "./Network3D";

import textData from "../data/servicesText.json";

const TABS = textData.tabs;

export default function ServicesSectionDesktop() {
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
  const topOrbRef = useRef<SVGGElement>(null);
  const bottomOrbRef = useRef<SVGGElement>(null);
  const topPathRef = useRef<SVGPathElement>(null);
  const bottomPathRef = useRef<SVGPathElement>(null);

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
    topPathRef,
    bottomPathRef,
    topOrbRef,
    bottomOrbRef,
    setActiveTab,
  });

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black text-white"
    >
      {/* Background color layer */}
      <div ref={bgRef} className="absolute inset-0 z-0 bg-[#161616]" />

      {/* The rotating sphere fixed at the bottom left touching the edge */}
      <div
        ref={p1SphereRef}
        className="absolute -bottom-[75vh] left-0 z-0 w-[150vh] h-[150vh] opacity-80 pointer-events-none mix-blend-screen"
      >
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
      <div className="absolute top-12 left-0 right-0 z-50 flex justify-between items-center w-full px-8 xl:px-16 pointer-events-none">
        <div className="flex justify-between w-full nav-layer">
          {TABS.map((tab, index) => (
            <div key={tab} className="flex items-center gap-2 xl:gap-3">
              <div
                className={`rounded-full transition-colors duration-300 w-[clamp(8px,0.8vw,14px)] h-[clamp(8px,0.8vw,14px)] ${
                  activeTab === index ? "bg-[#3AA89B]" : "bg-current"
                }`}
              />
              <span
                className={`font-medium tracking-wide text-[clamp(14px,1.5vw,26px)] ${activeTab === index ? "text-[#3AA89B]" : ""}`}
              >
                {tab}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal Slider Container */}
      <div
        ref={sliderRef}
        className="absolute top-0 left-0 h-full flex will-change-transform z-10 text-layer"
      >
        {/* Phase 0: Introduction */}
        <div className="w-[100vw] h-full flex flex-col justify-between pt-32 pb-24 px-8 md:px-16 shrink-0 relative pointer-events-auto">
          {/* Top Left Heading */}
          <div className="relative z-20 mt-10 md:mt-20 max-w-[90rem] mx-auto w-full">
            <h1 className="text-[60px] md:text-[95px] leading-[0.95] tracking-tight font-serif font-bold">
              {textData.introduction.heading.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </h1>
          </div>

          {/* Bottom Right Content */}
          <div className="relative z-20 flex justify-end w-full max-w-[90rem] mx-auto mb-8 md:mb-16">
            <div className="w-auto max-w-[600px] md:max-w-[850px]">
              <h2 className="text-[30px] md:text-[40px] font-normal tracking-tight mb-2 whitespace-nowrap font-sans">
                {textData.introduction.subheading}
              </h2>
              <p className="opacity-90 text-[22px] md:text-[28px] leading-[1.3] font-normal font-sans">
                {textData.introduction.paragraph}
              </p>
            </div>
          </div>
        </div>

        {/* Phase 1 - Part 1: Web Development (We love to code) */}
        <div className="w-[60vw] h-full flex items-center shrink-0 relative pointer-events-auto pl-8 md:pl-16">
          <div className="w-full max-w-[600px] md:max-w-[850px] z-20">
            <h2 className="text-[30px] md:text-[40px] font-normal tracking-tight mb-2 font-sans whitespace-nowrap">
              {textData.webDevelopment.part1.heading}
            </h2>
            <p className="text-[22px] md:text-[28px] opacity-90 leading-[1.3] font-normal font-sans">
              {textData.webDevelopment.part1.paragraph}
            </p>
          </div>
        </div>

        {/* Phase 1 - Part 2: Web Development (Our focus) */}
        <div className="w-auto h-full flex items-end pb-24 shrink-0 relative pointer-events-auto pl-8 md:pl-16 pr-8">
          <div className="w-full max-w-[280px] md:max-w-[350px] ml-12 md:ml-28 z-20">
            <div className="flex flex-col items-start">
              {/* Solid Chunky Arrow Icon */}
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-12 h-12 md:w-[72px] md:h-[72px] shrink-0 -ml-3 md:-ml-5"
              >
                <path d="M 6 22 H 22 V 6 H 16 V 11.76 L 7.24 3 L 3 7.24 L 11.76 16 H 6 V 22 Z" />
              </svg>
              <div className="ml-[30px] md:ml-[50px] -mt-[6px]">
                <h3 className="text-[30px] md:text-[40px] font-medium tracking-tight mb-2 md:mb-4 font-sans whitespace-nowrap leading-none">
                  {textData.webDevelopment.part2.heading}
                </h3>
                <ul className="text-[16px] md:text-[18px] opacity-90 leading-[1.2] font-medium font-sans list-none m-0 p-0 space-y-1">
                  {textData.webDevelopment.part2.list.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Phase 2: Design */}
        <div className="w-[100vw] h-full shrink-0 relative pointer-events-auto phase-2-container">
          {/* Text Content */}
          <div className="absolute top-[18%] left-[28%] z-30 w-[50%] max-w-[350px] md:max-w-[450px] lg:max-w-[600px] xl:max-w-[700px]">
            <h3 className="text-[16px] md:text-[20px] lg:text-[24px] xl:text-[28px] font-regular leading-[1.1] tracking-tight text-black">
              {textData.design.heading.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </h3>
          </div>

          {/* Images */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <div
              ref={imgYfoodRef}
              className="absolute top-[13%] left-[0%] w-[120px] h-[120px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] xl:w-[260px] xl:h-[260px] overflow-hidden rounded-sm shadow-xl"
            >
              <Image
                src="/sphereSection/imgi_4_sebastian_coelho-yfood.jpg"
                alt="yfood"
                fill
                className="object-cover"
              />
            </div>

            <div
              ref={imgNoiseRef}
              className="absolute top-[38%] left-[43%] w-[100px] h-[100px] md:w-[130px] md:h-[130px] lg:w-[160px] lg:h-[160px] xl:w-[200px] xl:h-[200px] overflow-hidden rounded-sm shadow-xl"
            >
              <Image
                src="/sphereSection/imgi_6_Jules_Toulmunde-Noise.jpg"
                alt="Noise"
                fill
                className="object-cover"
              />
            </div>

            <div
              ref={imgEnphaseRef}
              className="absolute top-[62%] left-[13%] w-[130px] h-[130px] md:w-[180px] md:h-[180px] lg:w-[220px] lg:h-[220px] xl:w-[300px] xl:h-[300px] overflow-hidden rounded-sm shadow-xl"
            >
              <Image
                src="/sphereSection/imgi_5_Danijel_Radulovic-Enphase.jpg"
                alt="Enphase"
                fill
                className="object-cover"
              />
            </div>

            <div
              ref={imgVinyasaRef}
              className="absolute top-[86%] lg:top-[83%] left-[42%] w-[160px] h-[100px] md:w-[200px] md:h-[130px] lg:w-[240px] lg:h-[160px] xl:w-[340px] xl:h-[220px] overflow-hidden rounded-sm shadow-xl"
            >
              <Image
                src="/sphereSection/imgi_7_sebastian_coelho-vinyasa_flow.jpg"
                alt="Vinyasa"
                fill
                className="object-cover"
              />
            </div>

            <div
              ref={imgClarityRef}
              className="absolute top-[24%] right-[14%] w-[80px] h-[90px] md:w-[100px] md:h-[110px] lg:w-[120px] lg:h-[130px] xl:w-[172px] xl:h-[185px] overflow-hidden rounded-sm shadow-xl"
            >
              <Image
                src="/sphereSection/imgi_8_Jules_Toulmunde-Clarity.jpg"
                alt="Clarity"
                fill
                className="object-cover"
              />
            </div>

            <div className="absolute top-[64%] right-[1%] lg:right-[4%] w-[180px] md:w-[220px] lg:w-[250px] xl:w-[320px] text-black">
              <h3 className="text-[18px] md:text-[22px] lg:text-[26px] xl:text-[32px] font-regular tracking-tight mb-2 xl:mb-4 font-sans leading-none">
                {textData.design.servicesHeading}
              </h3>
              <ul className="text-[12px] md:text-[14px] lg:text-[15px] xl:text-[18px] opacity-90 leading-[1.2] font-medium font-sans list-none m-0 p-0 space-y-1">
                {textData.design.servicesList.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Phase 3: Automation */}
        <div className="md:w-[100vw] xl:w-[90vw] h-full flex items-center justify-between px-0 shrink-0 phase-3-text relative pointer-events-auto">
          <div className="w-[45%] z-10 max-w-[350px] md:max-w-[450px] lg:max-w-[550px] xl:max-w-[600px] ml-8 md:ml-16">
            <h3 className="text-[18px] md:text-[22px] lg:text-[28px] xl:text-[35px] leading-tight font-medium tracking-tight mb-4 xl:mb-8 -mt-52 xl:-mt-40">
              {textData.automation.heading}
            </h3>
          </div>

          {/* 3D Network */}
          <div
            ref={p3NetworkRef}
            className="relative w-[58%] lg:w-[50%] h-[95vh] z-10 flex flex-col justify-end"
          >
            <div className="w-[120%] lg:w-[110%] h-[85%] relative -mb-20 mr-16 -ml-20 md:-ml-12 lg:-ml-16 xl:-ml-40 scale-[0.5] md:scale-[0.95] lg:scale-[1] xl:scale-100 origin-bottom-right">
              <Network3D isActive={activeTab === 2} />
            </div>

            {/* Expertise List aligned near the network */}
            <div className="w-[75%] ml-auto z-20">
              <h3 className="text-[20px] md:text-[26px] lg:text-[32px] xl:text-[40px] font-medium tracking-tight mb-2 md:mb-4 font-sans leading-none">
                {textData.automation.expertiseHeading}
              </h3>
              <ul className="text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] opacity-90 leading-[1.4] font-medium font-sans list-none m-0 p-0 space-y-1">
                {textData.automation.expertiseList.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Phase 4: Consulting */}
        <div className="w-[100vw] lg:w-[95vw] xl:w-[85vw] h-full flex items-center justify-center lg:justify-start pl-8 md:pl-20 lg:pl-24 pr-8 xl:pl-16 shrink-0 relative pointer-events-auto">
          <div className="w-[50%] md:w-[40%] lg:w-[45%] z-20 pl-2 lg:pl-0 mr-auto lg:mr-0">
            <h2 className="text-[3rem] md:text-[4.5rem] lg:text-[5.5rem] xl:text-[7rem] leading-[0.9] tracking-tight font-serif mb-4 md:mb-8 ">
              {textData.consulting.heading.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </h2>
            <p className="text-[16px] md:text-[18px] xl:text-[20px] opacity-90 leading-relaxed max-w-[300px] md:max-w-[400px] xl:max-w-[512px] font-medium ">
              {textData.consulting.paragraph}
            </p>
          </div>

          {/* SVG Diagram */}
          <div className="absolute right-[-5%] md:right-[0%] lg:right-[2%] top-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] lg:w-[650px] lg:h-[650px] xl:w-[850px] xl:h-[850px] max-w-[80vw] md:max-w-[65vw] lg:max-w-[55vw] max-h-[95vh] z-10">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 600 600"
              ref={svgCirclesRef}
            >
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

              {/* Invisible paths for the comets */}
              <path
                ref={topPathRef}
                id="top-path"
                d="M 170.096, 325 A 150,150 0 1,1 429.904, 325 A 150,150 0 0,1 170.096, 325"
                fill="none"
                stroke="none"
              />
              <path
                ref={bottomPathRef}
                id="bottom-path"
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
                  r="13"
                  fill="white"
                  filter="url(#glow)"
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
                  r="13"
                  fill="white"
                  filter="url(#glow)"
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
                className="text-[16px] md:text-[20px] lg:text-[24px] xl:text-[28px] font-medium tracking-wide"
              >
                Speed
              </text>
              <text
                x="300"
                y="340"
                textAnchor="middle"
                fill="currentColor"
                className="text-[16px] md:text-[20px] lg:text-[24px] xl:text-[28px] font-medium tracking-wide"
              >
                Conversion
              </text>
              <text
                x="300"
                y="470"
                textAnchor="middle"
                fill="currentColor"
                className="text-[16px] md:text-[20px] lg:text-[24px] xl:text-[28px] font-medium tracking-wide"
              >
                Design
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

// test test
