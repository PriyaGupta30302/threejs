const fs = require('fs');
const file = "/Users/priya/Projects/priya's/threejs/src/components/ServicesSectionMobile.tsx";
let code = fs.readFileSync(file, 'utf8');

// 1. Add refs
const refsCode = `  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);`;
const newRefsCode = `  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  const card5Ref = useRef<HTMLDivElement>(null);
  
  const overlay1Ref = useRef<HTMLDivElement>(null);
  const overlay2Ref = useRef<HTMLDivElement>(null);
  const overlay3Ref = useRef<HTMLDivElement>(null);
  const overlay4Ref = useRef<HTMLDivElement>(null);`;
code = code.replace(refsCode, newRefsCode);

// 2. Add GSAP animations for overlays
const gsapTarget = `      // Phase 4 Automation Slide Animation`;
const gsapNew = `      // Overlay Animations for each phase
      if (overlay1Ref.current && card2Ref.current) {
        gsap.fromTo(overlay1Ref.current, { opacity: 0 }, { opacity: 0.6, scrollTrigger: { trigger: card2Ref.current, start: "top bottom", end: "top top", scrub: true } });
      }
      if (overlay2Ref.current && card3Ref.current) {
        gsap.fromTo(overlay2Ref.current, { opacity: 0 }, { opacity: 0.6, scrollTrigger: { trigger: card3Ref.current, start: "top bottom", end: "top top", scrub: true } });
      }
      if (overlay3Ref.current && card4Ref.current) {
        gsap.fromTo(overlay3Ref.current, { opacity: 0 }, { opacity: 0.6, scrollTrigger: { trigger: card4Ref.current, start: "top bottom", end: "top top", scrub: true } });
      }
      if (overlay4Ref.current && card5Ref.current) {
        gsap.fromTo(overlay4Ref.current, { opacity: 0 }, { opacity: 0.6, scrollTrigger: { trigger: card5Ref.current, start: "top bottom", end: "top top", scrub: true } });
      }

      // Phase 4 Automation Slide Animation`;
code = code.replace(gsapTarget, gsapNew);

// 3. Add overlays and card5Ref to JSX
code = code.replace(
  /<div className="sticky top-0 h-\[100dvh\] w-full overflow-hidden flex flex-col justify-between p-6 bg-\[\#161616\] z-10 shadow-\[0_-20px_50px_rgba\(0,0,0,0\.5\)\]">/,
  `<div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between p-6 bg-[#161616] z-10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <div ref={overlay1Ref} className="absolute inset-0 bg-black pointer-events-none z-[100] opacity-0" />`
);

code = code.replace(
  /<div\n\s*ref=\{card2Ref\}\n\s*className="sticky top-0 h-\[100dvh\] w-full overflow-hidden flex flex-col justify-between p-6 bg-\[\#161616\] z-20 shadow-\[0_-20px_50px_rgba\(0,0,0,0\.5\)\]"\n\s*>/,
  `<div
        ref={card2Ref}
        className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between p-6 bg-[#161616] z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
      >
        <div ref={overlay2Ref} className="absolute inset-0 bg-black pointer-events-none z-[100] opacity-0" />`
);

code = code.replace(
  /<div\n\s*ref=\{card3Ref\}\n\s*className="sticky top-0 h-\[100dvh\] w-full bg-\[\#DDE3E3\] text-\[\#111\] z-30 shadow-\[0_-20px_50px_rgba\(0,0,0,0\.5\)\] rounded-t-\[30px\] overflow-hidden"\n\s*>/,
  `<div
        ref={card3Ref}
        className="sticky top-0 h-[100dvh] w-full bg-[#DDE3E3] text-[#111] z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] rounded-t-[30px] overflow-hidden"
      >
        <div ref={overlay3Ref} className="absolute inset-0 bg-black pointer-events-none z-[100] opacity-0" />`
);

code = code.replace(
  /<div\n\s*ref=\{card4Ref\}\n\s*className="sticky top-0 h-\[100dvh\] w-full overflow-hidden flex flex-col justify-between p-6 bg-\[\#E8EDEC\] text-\[\#111\] z-40 shadow-\[0_-20px_50px_rgba\(0,0,0,0\.5\)\] rounded-t-\[40px\]"\n\s*>/,
  `<div
        ref={card4Ref}
        className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between p-6 bg-[#E8EDEC] text-[#111] z-40 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] rounded-t-[40px]"
      >
        <div ref={overlay4Ref} className="absolute inset-0 bg-black pointer-events-none z-[100] opacity-0" />`
);

code = code.replace(
  /<div className="sticky top-0 h-\[100dvh\] w-full overflow-hidden flex flex-col justify-start p-6 bg-\[\#0f4134\] text-\[\#FFFFFF\] z-50 shadow-\[0_-20px_50px_rgba\(0,0,0,0\.5\)\] rounded-t-\[40px\]">/,
  `<div ref={card5Ref} className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-start p-6 bg-[#0f4134] text-[#FFFFFF] z-50 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] rounded-t-[40px]">`
);

fs.writeFileSync(file, code);
console.log("Patched successfully");
