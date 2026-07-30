'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

// Magnetic Button Wrapper
function Magnetic({ children }: { children: React.ReactNode }) {
  const magneticRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = magneticRef.current;
    if (!el) return;
    
    const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.4);
      yTo(y * 0.4);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={magneticRef} className="inline-block relative">
      {children}
    </div>
  );
}

// Scramble Text Effect
function ScrambleText({ text }: { text: string }) {
  const textRef = useRef<HTMLSpanElement>(null);
  
  const handleMouseEnter = () => {
    if (!textRef.current) return;
    const chars = "!<>-_\\\\/[]{}—=+*^?#_";
    let iterations = 0;
    const originalText = text;
    
    const interval = setInterval(() => {
      if (textRef.current) {
        textRef.current.innerText = originalText
          .split("")
          .map((char, index) => {
            if (index < iterations) return originalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
      }
      
      if (iterations >= originalText.length) {
        clearInterval(interval);
      }
      
      iterations += 1 / 3;
    }, 30);
  };

  return (
    <span ref={textRef} onMouseEnter={handleMouseEnter} className="inline-block">
      {text}
    </span>
  );
}

export default function Navbar() {
  const containerRef = useRef<HTMLElement>(null);
  const linksRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let isHidden = false;

    // 3D Stagger Hide/Show on Scroll
    const st = ScrollTrigger.create({
      start: "top top",
      end: 99999,
      onUpdate: (self) => {
        if (self.direction === 1 && !isHidden && self.scrollY > 5) {
          isHidden = true;
          gsap.to(linksRef.current, {
            y: -50,
            rotateX: 90,
            opacity: 0,
            stagger: 0.05,
            duration: 0.6,
            ease: "power3.in",
            transformOrigin: "top center",
          });
        } else if (self.direction === -1 && isHidden) {
          isHidden = false;
          gsap.to(linksRef.current, {
            y: 0,
            rotateX: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.8,
            ease: "power3.out",
            transformOrigin: "top center",
          });
        }
      }
    });

    return () => {
      st.kill();
    }
  }, []);

  // Mobile Menu Animation
  useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.to(menuRef.current, {
        clipPath: "circle(150% at 90% 10%)",
        duration: 0.8,
        ease: "power3.inOut"
      });
      gsap.fromTo(menuLinksRef.current, 
        { y: 50, opacity: 0, skewY: 10 },
        { y: 0, opacity: 1, skewY: 0, stagger: 0.1, duration: 0.6, ease: "power3.out", delay: 0.3 }
      );
    } else {
      gsap.to(menuRef.current, {
        clipPath: "circle(0% at 90% 10%)",
        duration: 0.8,
        ease: "power3.inOut"
      });
    }
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: "Work", href: "#work" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <>
      <nav ref={containerRef} className="absolute top-8 left-0 right-0 z-[100] flex justify-between items-center w-full max-w-7xl mx-auto px-8 pointer-events-none [perspective:1000px]">
        {/* Logo */}
        <div 
          ref={el => { linksRef.current[0] = el }}
          className="pointer-events-auto"
        >
          <Magnetic>
            <Link href="/" className="text-xl font-bold tracking-widest text-white uppercase flex items-center gap-3 group">
              <span className="w-3 h-3 bg-[#34d399] rounded-full shadow-[0_0_15px_#34d399] group-hover:scale-150 transition-transform"></span>
              <ScrambleText text="OFFGROUND" />
            </Link>
          </Magnetic>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-12 pointer-events-auto">
          {navItems.map((item, index) => (
            <div key={item.name} ref={el => { linksRef.current[index + 1] = el }}>
              <Magnetic>
                <Link href={item.href} className="text-sm font-medium tracking-widest uppercase text-white/90 hover:text-white transition-colors relative group py-2">
                  <ScrambleText text={item.name} />
                  <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-[#34d399] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out shadow-[0_0_10px_#34d399]"></span>
                </Link>
              </Magnetic>
            </div>
          ))}
          
          <div ref={el => { linksRef.current[navItems.length + 1] = el }}>
            <Magnetic>
              <button className="px-7 py-3 text-xs tracking-widest font-bold uppercase text-black bg-white rounded-full hover:bg-[#34d399] hover:shadow-[0_0_20px_rgba(52,211,153,0.5)] transition-all duration-300">
                Start Project
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div 
          ref={el => { linksRef.current[6] = el }}
          className="md:hidden pointer-events-auto z-[110]"
        >
          <Magnetic>
            <button 
              className="flex flex-col justify-center gap-1.5 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full items-center focus:outline-none border border-white/20 shadow-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className={`block w-5 h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-white transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </Magnetic>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        ref={menuRef}
        className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-black/95 backdrop-blur-2xl md:hidden overflow-hidden"
        style={{ clipPath: 'circle(0% at 90% 10%)' }}
      >
        <div className="flex flex-col items-center gap-12 text-3xl font-light tracking-widest text-white uppercase">
          {navItems.map((item, index) => (
            <Link 
              key={item.name}
              href={item.href} 
              ref={el => { menuLinksRef.current[index] = el }}
              onClick={() => setIsMobileMenuOpen(false)} 
              className="hover:text-[#34d399] hover:scale-110 transition-all duration-300"
            >
              <ScrambleText text={item.name} />
            </Link>
          ))}
          <button className="mt-8 px-10 py-4 text-sm font-bold tracking-widest text-black bg-[#34d399] rounded-full shadow-[0_0_30px_rgba(52,211,153,0.4)]">
            Start Project
          </button>
        </div>
      </div>
    </>
  );
}
