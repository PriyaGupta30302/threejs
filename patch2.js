const fs = require('fs');
const file = "/Users/priya/Projects/priya's/threejs/src/components/ServicesSectionMobile.tsx";
let code = fs.readFileSync(file, 'utf8');

// 1. Fix the GSAP trigger for Phase 3
const oldGsap = `// Phase 3 Horizontal Image Scroll
      if (card4Ref.current) {
        gsap.fromTo(
          ".design-img-container",
          { x: "-145vw" }, // Start with the Girl image (at 175vw) near the center
          {
            x: "0vw", // End with the Clarity image (at 10vw) on the screen
            ease: "none",
            scrollTrigger: {
              trigger: card4Ref.current,
              start: "top bottom", // Starts when Automation phase enters from bottom
              end: "top top", // Ends when Automation phase reaches the top
              scrub: 1.5,
            },
          }
        );
      }`;
const newGsap = `// Phase 3 Horizontal Image Scroll
      if (card3Ref.current) {
        gsap.fromTo(
          ".design-img-container",
          { x: "-260vw" }, // Start with Girl image at 30vw
          {
            x: "0vw", // End with Clarity image
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
code = code.replace(oldGsap, newGsap);

// 2. Update the images layout
const oldImages = `        <div className="design-img-container absolute top-[14%] left-0 w-[200vw] h-[60%] pointer-events-none z-10 flex items-center will-change-transform">
          
          {/* Images placed in a continuous stream with tighter gaps */}
          
          {/* 1. yfood (Girl) - First to appear */}
          <div className="absolute top-[30%] left-[175vw] w-[170px] h-[170px] shadow-2xl rounded-[4px] overflow-hidden">
            <Image src="/sphereSection/imgi_4_sebastian_coelho-yfood.jpg" fill className="object-cover" alt="yfood" />
          </div>
          
          {/* 2. Enphase (House) */}
          <div className="absolute top-[50%] left-[130vw] w-[190px] h-[190px] shadow-2xl rounded-[4px] overflow-hidden">
            <Image src="/sphereSection/imgi_5_Danijel_Radulovic-Enphase.jpg" fill className="object-cover" alt="Enphase" />
          </div>
          
          {/* 3. Silky (Cream brick) */}
          <div className="absolute top-[10%] left-[85vw] w-[170px] h-[170px] shadow-2xl rounded-[4px] overflow-hidden">
            <Image src="/sphereSection/imgi_6_Jules_Toulmunde-Noise.jpg" fill className="object-cover" alt="Silky" />
          </div>

          {/* 4. Vinyasa (Purple phones) */}
          <div className="absolute top-[50%] left-[45vw] w-[180px] h-[180px] shadow-2xl rounded-[4px] overflow-hidden">
            <Image src="/sphereSection/imgi_7_sebastian_coelho-vinyasa_flow.jpg" fill className="object-cover" alt="Vinyasa" />
          </div>
          
          {/* 5. Clarity (Dark block) - Last to appear, stops here */}
          <div className="absolute top-[20%] left-[10vw] w-[180px] h-[180px] shadow-2xl rounded-[4px] overflow-hidden">
            <Image src="/sphereSection/imgi_8_Jules_Toulmunde-Clarity.jpg" fill className="object-cover" alt="Clarity" />
          </div>

        </div>`;
const newImages = `        <div className="design-img-container absolute top-[14%] left-0 w-[320vw] h-[60%] pointer-events-none z-10 flex items-center will-change-transform">
          
          {/* Images placed in a continuous stream with visible gaps */}
          
          {/* 1. yfood (Girl) - First to appear */}
          <div className="absolute top-[30%] left-[290vw] w-[170px] h-[170px] shadow-2xl rounded-[4px] overflow-hidden">
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

        </div>`;
code = code.replace(oldImages, newImages);

fs.writeFileSync(file, code);
console.log("Patched successfully");
