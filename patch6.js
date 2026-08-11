const fs = require('fs');
const file = "/Users/priya/Projects/priya's/threejs/src/components/ServicesSectionMobile.tsx";
let code = fs.readFileSync(file, 'utf8');

// 1. Fix the GSAP trigger for Phase 3
const oldGsap = `// Phase 3 Horizontal Image Scroll
      if (card3Ref.current) {
        gsap.fromTo(
          ".design-img-container",
          { x: "-150vw" }, // Start with Girl image entering from the left edge
          {
            x: "65vw", // Slide all images across the screen from left to right
            ease: "none",
            scrollTrigger: {
              trigger: card3Ref.current,
              start: "top bottom", 
              end: "bottom top", 
              scrub: 1.5,
            },
          }
        );
      }`;
const newGsap = `// Phase 3 Horizontal Image Scroll
      if (card3Ref.current) {
        gsap.fromTo(
          ".design-img-container",
          { x: "-140vw" }, // Start with Girl image entering from the left edge
          {
            x: "80vw", // Slide all images across the screen from left to right
            ease: "none",
            scrollTrigger: {
              trigger: card3Ref.current,
              start: "top bottom", 
              end: "bottom top", 
              scrub: 1.5,
            },
          }
        );
      }`;
code = code.replace(oldGsap, newGsap);

// 2. Update the images layout for exact gaps and perfect vertical separation
const oldImages = `        <div className="design-img-container absolute top-[14%] left-0 w-[200vw] h-[60%] pointer-events-none z-10 flex items-center will-change-transform">
          
          {/* Images entering from Left to Right, equal gaps (25vw), alternating UP/DOWN */}
          
          {/* 1. yfood (Girl) - First to enter from left */}
          <div className="absolute top-[20%] left-[110vw] w-[170px] h-[170px] shadow-2xl rounded-lg overflow-hidden">
            <Image src="/sphereSection/imgi_4_sebastian_coelho-yfood.jpg" fill className="object-cover" alt="yfood" />
          </div>
          
          {/* 2. Enphase (House) */}
          <div className="absolute top-[55%] left-[85vw] w-[190px] h-[190px] shadow-2xl rounded-lg overflow-hidden">
            <Image src="/sphereSection/imgi_5_Danijel_Radulovic-Enphase.jpg" fill className="object-cover" alt="Enphase" />
          </div>
          
          {/* 3. Silky (Cream brick) */}
          <div className="absolute top-[15%] left-[60vw] w-[170px] h-[170px] shadow-2xl rounded-lg overflow-hidden">
            <Image src="/sphereSection/imgi_6_Jules_Toulmunde-Noise.jpg" fill className="object-cover" alt="Silky" />
          </div>

          {/* 4. Vinyasa (Purple phones) */}
          <div className="absolute top-[55%] left-[35vw] w-[180px] h-[180px] shadow-2xl rounded-lg overflow-hidden">
            <Image src="/sphereSection/imgi_7_sebastian_coelho-vinyasa_flow.jpg" fill className="object-cover" alt="Vinyasa" />
          </div>
          
          {/* 5. Clarity (Dark block) - Last to enter */}
          <div className="absolute top-[20%] left-[10vw] w-[180px] h-[180px] shadow-2xl rounded-lg overflow-hidden">
            <Image src="/sphereSection/imgi_8_Jules_Toulmunde-Clarity.jpg" fill className="object-cover" alt="Clarity" />
          </div>

        </div>`;
const newImages = `        <div className="design-img-container absolute top-[14%] left-0 w-[200vw] h-[60%] pointer-events-none z-10 flex items-center will-change-transform">
          
          {/* Images entering from Left to Right, perfectly spaced to avoid touching */}
          
          {/* 1. yfood (Girl) - First to enter from left */}
          <div className="absolute top-[25%] left-[130vw] w-[170px] h-[170px] shadow-2xl rounded-[4px] overflow-hidden">
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
code = code.replace(oldImages, newImages);

fs.writeFileSync(file, code);
console.log("Patched successfully");
