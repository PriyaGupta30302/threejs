"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import textData from "../data/servicesText.json";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSectionMobile() {
  const sectionRef = useRef<HTMLElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
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
    </section>
  );
}
