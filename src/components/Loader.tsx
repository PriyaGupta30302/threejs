"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function Loader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [prevPath, setPrevPath] = useState(pathname);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Initial Load Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsLoading(false);
          gsap.set(overlayRef.current, { yPercent: -100 });
        }
      });
      
      tl.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      })
      .to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
        delay: 0.5,
        ease: "power3.in"
      })
      .to(overlayRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut"
      });
    });

    return () => ctx.revert();
  }, []);

  // Route Change Animation
  useEffect(() => {
    if (pathname !== prevPath) {
      setPrevPath(pathname);
      
      const ctx = gsap.context(() => {
        // Animate overlay down, then up
        gsap.set(overlayRef.current, { yPercent: 100 });
        const tl = gsap.timeline();
        tl.to(overlayRef.current, {
          yPercent: 0,
          duration: 0.6,
          ease: "power4.inOut"
        }).to(overlayRef.current, {
          yPercent: -100,
          duration: 0.6,
          ease: "power4.inOut",
          delay: 0.2
        });
      });
      return () => ctx.revert();
    }
  }, [pathname, prevPath]);

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex items-center justify-center text-white pointer-events-none"
    >
      {isLoading && (
        <div className="overflow-hidden">
          <h1 
            ref={textRef}
            className="text-4xl md:text-6xl font-lateef tracking-wider translate-y-[100%] opacity-0"
          >
            PRIYA GUPTA
          </h1>
        </div>
      )}
    </div>
  );
}
