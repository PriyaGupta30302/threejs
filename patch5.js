const fs = require('fs');
const file = "/Users/priya/Projects/priya's/threejs/src/components/ServicesSectionMobile.tsx";
let code = fs.readFileSync(file, 'utf8');

// 1. Fix the GSAP trigger for Phase 3
const oldGsap = `// Phase 3 Horizontal Image Scroll
      if (card3Ref.current) {
        gsap.fromTo(
          ".design-img-container",
          { x: "-160vw" }, // Start with Girl image at 30vw
          {
            x: "30vw", // End with Clarity image at 40vw, making it visible before Phase 4 covers it
            ease: "none",
            scrollTrigger: {
              trigger: card3Ref.current,
              start: "top bottom", // Starts when Design phase enters
              end: "bottom top", // Ends when Automation phase fully covers it
              scrub: 1.5,
            },
          }
        );
      }`;
const newGsap = `// Phase 3 Horizontal Image Scroll
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
code = code.replace(oldGsap, newGsap);

// 2. Update the images layout for equal gaps and alternating UP/DOWN
const oldImages = `        <div className="design-img-container absolute top-[14%] left-0 w-[250vw] h-[60%] pointer-events-none z-10 flex items-center will-change-transform">
          
          {/* Images placed in a continuous stream with small gaps */}
          
          {/* 1. yfood (Girl) - First to appear */}
          <div className="absolute top-[30%] left-[190vw] w-[170px] h-[170px] shadow-2xl rounded-[4px] overflow-hidden">
            <Image src="/sphereSection/imgi_4_sebastian_coelho-yfood.jpg" fill className="object-cover" alt="yfood" />
          </div>
          
          {/* 2. Enphase (House) */}
          <div className="absolute top-[50%] left-[145vw] w-[190px] h-[190px] shadow-2xl rounded-[4px] overflow-hidden">
            <Image src="/sphereSection/imgi_5_Danijel_Radulovic-Enphase.jpg" fill className="object-cover" alt="Enphase" />
          </div>
          
          {/* 3. Silky (Cream brick) */}
          <div className="absolute top-[10%] left-[100vw] w-[170px] h-[170px] shadow-2xl rounded-[4px] overflow-hidden">
            <Image src="/sphereSection/imgi_6_Jules_Toulmunde-Noise.jpg" fill className="object-cover" alt="Silky" />
          </div>

          {/* 4. Vinyasa (Purple phones) */}
          <div className="absolute top-[50%] left-[55vw] w-[180px] h-[180px] shadow-2xl rounded-[4px] overflow-hidden">
            <Image src="/sphereSection/imgi_7_sebastian_coelho-vinyasa_flow.jpg" fill className="object-cover" alt="Vinyasa" />
          </div>
          
          {/* 5. Clarity (Dark block) - Last to appear, stops here */}
          <div className="absolute top-[20%] left-[10vw] w-[180px] h-[180px] shadow-2xl rounded-[4px] overflow-hidden">
            <Image src="/sphereSection/imgi_8_Jules_Toulmunde-Clarity.jpg" fill className="object-cover" alt="Clarity" />
          </div>

        </div>`;
const newImages = `        <div className="design-img-container absolute top-[14%] left-0 w-[200vw] h-[60%] pointer-events-none z-10 flex items-center will-change-transform">
          
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
code = code.replace(oldImages, newImages);

fs.writeFileSync(file, code);
console.log("Patched successfully");
