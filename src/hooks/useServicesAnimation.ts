import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function useServicesAnimation({
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
}: {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  sliderRef: React.RefObject<HTMLDivElement | null>;
  bgRef: React.RefObject<HTMLDivElement | null>;
  p1SphereRef: React.RefObject<HTMLImageElement | null>;
  imgYfoodRef: React.RefObject<HTMLImageElement | null>;
  imgEnphaseRef: React.RefObject<HTMLImageElement | null>;
  imgNoiseRef: React.RefObject<HTMLImageElement | null>;
  imgVinyasaRef: React.RefObject<HTMLImageElement | null>;
  imgClarityRef: React.RefObject<HTMLImageElement | null>;
  svgCirclesRef: React.RefObject<SVGSVGElement | null>;
  pathRef: React.RefObject<SVGPathElement | null>;
  orbRef: React.RefObject<SVGCircleElement | null>;
  setActiveTab: (tab: number) => void;
}) {
  useEffect(() => {
    if (!sectionRef.current || !sliderRef.current || !bgRef.current) return;

    let ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(sliderRef.current!.children);

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=500%", // 5 screens for 6 panels
          scrub: true,
          pin: true,
          onUpdate: (self) => {
            const progress = self.progress;
            if (progress < 0.1) setActiveTab(-1); // Intro
            else if (progress >= 0.1 && progress < 0.28) setActiveTab(0); // Web Dev
            else if (progress >= 0.28 && progress < 0.65) setActiveTab(1); // Design
            else if (progress >= 0.65 && progress < 0.85) setActiveTab(2); // Automation
            else if (progress >= 0.85) setActiveTab(3); // Consulting
          },
        },
      });

      // Move slider horizontally
      masterTl.to(sliderRef.current, {
        x: () => {
          if (!sliderRef.current) return 0;
          return -(sliderRef.current.scrollWidth - window.innerWidth);
        },
        ease: "none",
        duration: panels.length - 1, // duration 5
      }, 0);

      // Sphere rotation and movement
      // Time 0 to 1.6: Intro -> Web Dev 1 -> Our focus
      masterTl.to(p1SphereRef.current, {
        x: "-25vw",
        rotationZ: 180,
        duration: 1.6,
        ease: "none",
      }, 0);

      // Time 1.6 to 3.0: Our focus -> Design
      // Sphere moves further left and rotates left (back scroll)
      masterTl.to(p1SphereRef.current, {
        x: "-65vw",
        rotationZ: 0,
        duration: 1.4,
        ease: "none",
      }, 1.6);

      // Change background to Light Blue earlier (when Design phase images enter)
      masterTl.to(bgRef.current, {
        backgroundColor: "#E2E8F0",
        duration: 0.4,
        ease: "power2.inOut",
      }, 1.7);

      // Change Navigation text to black
      masterTl.to([".nav-layer", ".text-layer"], {
        color: "#000000",
        duration: 0.4,
        ease: "power2.inOut",
      }, 1.7);

      // Time 3 to 4: Design -> Automation
      // Hide the sphere completely
      masterTl.to(p1SphereRef.current, {
        x: "-100vw",
        opacity: 0,
        duration: 1,
        ease: "none",
      }, 3);

      // Time 4 to 5: Automation -> Consulting
      // Change background to Dark Green
      masterTl.to(bgRef.current, {
        backgroundColor: "#0E4A3C",
        duration: 0.4,
        ease: "power2.inOut",
      }, 4.2);

      // Change Navigation text and Phase 3 text back to white
      masterTl.to([".nav-layer", ".phase-3-text", ".text-layer"], {
        color: "#FFFFFF",
        duration: 0.4,
        ease: "power2.inOut",
      }, 4.2);

      // Phase 2 Images floating continuously
      const p2Images = [
        imgYfoodRef.current,
        imgEnphaseRef.current,
        imgNoiseRef.current,
        imgVinyasaRef.current,
        imgClarityRef.current
      ];
      
      p2Images.forEach((img, i) => {
        if (img) {
          gsap.to(img, {
            y: "random(-20, 20)",
            x: "random(-20, 20)",
            rotationZ: "random(-5, 5)",
            duration: "random(3, 6)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.5,
          });
        }
      });

      // Phase 4 SVG Orb Animation along the path
      if (orbRef.current && pathRef.current) {
        gsap.to(orbRef.current, {
          duration: 12,
          repeat: -1,
          ease: "none",
          motionPath: {
            path: pathRef.current,
            align: pathRef.current,
            alignOrigin: [0.5, 0.5],
          },
        });
      }

      // Phase 4 SVG Circles drawing triggered when we reach it
      if (svgCirclesRef.current) {
        const circles = svgCirclesRef.current.querySelectorAll(".draw-circle");
        if (circles.length > 0) {
            gsap.fromTo(
                circles,
                { strokeDashoffset: 1000, strokeDasharray: 1000 },
                { 
                    strokeDashoffset: 0, 
                    duration: 1.5, 
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top+400% top", // Trigger when reaching Consulting phase
                        toggleActions: "play none none reverse",
                    }
                }
            );
        }
      }

    }, sectionRef);

    return () => ctx.revert();
  }, [setActiveTab]);
}
