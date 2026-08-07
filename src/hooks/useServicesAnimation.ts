import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import MotionPathPlugin from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

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
  topPathRef,
  bottomPathRef,
  topOrbRef,
  bottomOrbRef,
  setActiveTab,
}: {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  sliderRef: React.RefObject<HTMLDivElement | null>;
  bgRef: React.RefObject<HTMLDivElement | null>;
  p1SphereRef: React.RefObject<HTMLDivElement | null>;
  imgYfoodRef: React.RefObject<HTMLImageElement | null>;
  imgEnphaseRef: React.RefObject<HTMLImageElement | null>;
  imgNoiseRef: React.RefObject<HTMLImageElement | null>;
  imgVinyasaRef: React.RefObject<HTMLImageElement | null>;
  imgClarityRef: React.RefObject<HTMLImageElement | null>;
  svgCirclesRef: React.RefObject<SVGSVGElement | null>;
  topPathRef: React.RefObject<SVGPathElement | null>;
  bottomPathRef: React.RefObject<SVGPathElement | null>;
  topOrbRef: React.RefObject<SVGGElement | null>;
  bottomOrbRef: React.RefObject<SVGGElement | null>;
  setActiveTab: (tab: number) => void;
}) {
  useEffect(() => {
    if (!sectionRef.current || !sliderRef.current || !bgRef.current) return;

    const ctx = gsap.context(() => {
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
      // Time 0 to 1.34: Intro -> Web Dev 1 -> Our focus
      masterTl.to(p1SphereRef.current, {
        x: "30vw",
        rotationZ: 180,
        duration: 1.34,
        ease: "none",
      }, 0);

      // Time 1.34 to 2.2: Sphere rolls back to the left
      masterTl.to(p1SphereRef.current, {
        x: "-50vw",
        rotationZ: 0,
        duration: 0.86,
        ease: "none",
      }, 1.34);

      // Time 1.95: Sphere fades out quickly when Design phase starts entering
      masterTl.to(p1SphereRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.inOut",
      }, 1.95);

      // Time 1.95: Change background to Light Blue
      masterTl.to(bgRef.current, {
        backgroundColor: "#dbe6ec",
        duration: 0.2,
        ease: "power2.inOut",
      }, 1.95);

      // Time 1.95: Change Navigation text to black
      masterTl.to([".nav-layer", ".text-layer"], {
        color: "#000000",
        duration: 0.2,
        ease: "power2.inOut",
      }, 1.95);
      // Time 4 to 5: Automation -> Consulting
      // Change background to Dark Green
      masterTl.to(bgRef.current, {
        backgroundColor: "#0f4134",
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
            duration: "random(3, 6)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.5,
          });
        }
      });

      // Phase 4 SVG Orbs Animation along paths
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
