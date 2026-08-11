const fs = require('fs');
const file = "/Users/priya/Projects/priya's/threejs/src/components/ServicesSectionMobile.tsx";
let code = fs.readFileSync(file, 'utf8');

// 1. Fix the GSAP ease for overlays
const oldOverlayGsap = `      // Overlay Animations for each phase
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
      }`;
const newOverlayGsap = `      // Overlay Animations for each phase
      // Added ease: "none" so the opacity scales linearly with scroll (e.g. 10% scroll = 10% opacity)
      if (overlay1Ref.current && card2Ref.current) {
        gsap.fromTo(overlay1Ref.current, { opacity: 0 }, { opacity: 0.7, ease: "none", scrollTrigger: { trigger: card2Ref.current, start: "top bottom", end: "top top", scrub: true } });
      }
      if (overlay2Ref.current && card3Ref.current) {
        gsap.fromTo(overlay2Ref.current, { opacity: 0 }, { opacity: 0.7, ease: "none", scrollTrigger: { trigger: card3Ref.current, start: "top bottom", end: "top top", scrub: true } });
      }
      if (overlay3Ref.current && card4Ref.current) {
        gsap.fromTo(overlay3Ref.current, { opacity: 0 }, { opacity: 0.7, ease: "none", scrollTrigger: { trigger: card4Ref.current, start: "top bottom", end: "top top", scrub: true } });
      }
      if (overlay4Ref.current && card5Ref.current) {
        gsap.fromTo(overlay4Ref.current, { opacity: 0 }, { opacity: 0.7, ease: "none", scrollTrigger: { trigger: card5Ref.current, start: "top bottom", end: "top top", scrub: true } });
      }`;
code = code.replace(oldOverlayGsap, newOverlayGsap);

// 2. Reduce image sizes in Phase 3
const oldImages = `        <div className="design-img-container absolute top-[14%] left-0 w-[200vw] h-[60%] pointer-events-none z-10 flex items-center will-change-transform">
          
          {/* Images entering from Left to Right, perfectly spaced to avoid touching */}
          
          {/* 1. yfood (Girl) - First to enter from left */}
          <div className="absolute top-[15%] left-[130vw] w-[170px] h-[170px] shadow-2xl rounded-[4px] overflow-hidden">
            <Image src="/sphereSection/imgi_4_sebastian_coelho-yfood.jpg" fill className="object-cover" alt="yfood" />
          </div>
          
          {/* 2. Enphase (House) */}
          <div className="absolute top-[55%] left-[100vw] w-[190px] h-[190px] shadow-2xl rounded-[4px] overflow-hidden">
            <Image src="/sphereSection/imgi_5_Danijel_Radulovic-Enphase.jpg" fill className="object-cover" alt="Enphase" />
          </div>
          
          {/* 3. Silky (Cream brick) */}
          <div className="absolute top-[10%] left-[70vw] w-[170px] h-[170px] shadow-2xl rounded-[4px] overflow-hidden">
            <Image src="/sphereSection/imgi_6_Jules_Toulmunde-Noise.jpg" fill className="object-cover" alt="Silky" />
          </div>

          {/* 4. Vinyasa (Purple phones) */}
          <div className="absolute top-[55%] left-[40vw] w-[180px] h-[180px] shadow-2xl rounded-[4px] overflow-hidden">
            <Image src="/sphereSection/imgi_7_sebastian_coelho-vinyasa_flow.jpg" fill className="object-cover" alt="Vinyasa" />
          </div>
          
          {/* 5. Clarity (Dark block) - Last to enter */}
          <div className="absolute top-[25%] left-[10vw] w-[180px] h-[180px] shadow-2xl rounded-[4px] overflow-hidden">
            <Image src="/sphereSection/imgi_8_Jules_Toulmunde-Clarity.jpg" fill className="object-cover" alt="Clarity" />
          </div>

        </div>`;
const newImages = `        <div className="design-img-container absolute top-[14%] left-0 w-[200vw] h-[60%] pointer-events-none z-10 flex items-center will-change-transform">
          
          {/* Images entering from Left to Right, perfectly spaced to avoid touching */}
          
          {/* 1. yfood (Girl) - First to enter from left */}
          <div className="absolute top-[25%] left-[130vw] w-[120px] h-[120px] shadow-2xl rounded-lg overflow-hidden">
            <Image src="/sphereSection/imgi_4_sebastian_coelho-yfood.jpg" fill className="object-cover" alt="yfood" />
          </div>
          
          {/* 2. Enphase (House) */}
          <div className="absolute top-[60%] left-[100vw] w-[130px] h-[130px] shadow-2xl rounded-lg overflow-hidden">
            <Image src="/sphereSection/imgi_5_Danijel_Radulovic-Enphase.jpg" fill className="object-cover" alt="Enphase" />
          </div>
          
          {/* 3. Silky (Cream brick) */}
          <div className="absolute top-[15%] left-[70vw] w-[120px] h-[120px] shadow-2xl rounded-lg overflow-hidden">
            <Image src="/sphereSection/imgi_6_Jules_Toulmunde-Noise.jpg" fill className="object-cover" alt="Silky" />
          </div>

          {/* 4. Vinyasa (Purple phones) */}
          <div className="absolute top-[60%] left-[40vw] w-[125px] h-[125px] shadow-2xl rounded-lg overflow-hidden">
            <Image src="/sphereSection/imgi_7_sebastian_coelho-vinyasa_flow.jpg" fill className="object-cover" alt="Vinyasa" />
          </div>
          
          {/* 5. Clarity (Dark block) - Last to enter */}
          <div className="absolute top-[30%] left-[10vw] w-[125px] h-[125px] shadow-2xl rounded-lg overflow-hidden">
            <Image src="/sphereSection/imgi_8_Jules_Toulmunde-Clarity.jpg" fill className="object-cover" alt="Clarity" />
          </div>

        </div>`;
code = code.replace(oldImages, newImages);

fs.writeFileSync(file, code);
console.log("Patched successfully");
