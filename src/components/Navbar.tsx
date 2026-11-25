'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

import { usePathname } from 'next/navigation';

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

const navItems = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" }
];

const EASE = [0.76, 0, 0.24, 1] as const;

function Hamburger({ open, onClick, className = '' }: { open: boolean; onClick: () => void; className?: string }) {
  return (
    <button
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      onClick={onClick}
      className={`flex flex-col justify-center gap-1.5 items-center focus:outline-none ${className}`}
    >
      <span className={`block w-5 h-0.5 bg-white transition-transform duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`}></span>
      <span className={`block w-5 h-0.5 bg-white transition-opacity duration-300 ${open ? 'opacity-0' : ''}`}></span>
      <span className={`block w-5 h-0.5 bg-white transition-transform duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`}></span>
    </button>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Show the bottom capsule once the user scrolls past the top navbar
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 120);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Lock page scroll + Escape to close while the drawer is open
  useEffect(() => {
    if (!isMenuOpen) return;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [isMenuOpen]);

  const toggle = () => setIsMenuOpen((v) => !v);

  return (
    <>
      {/* Top navbar (scrolls away with the page) */}
      <nav className={`absolute top-8 left-0 right-0 z-[100] flex justify-between items-center w-full pointer-events-none ${
        pathname === '/about2' ? 'px-[70px]' : 'max-w-7xl mx-auto px-8'
      }`}>
        <div className="pointer-events-auto">
          <Magnetic>
            <Link href="/" className="text-xl font-bold tracking-widest text-white uppercase flex items-center gap-3 group">
              <span className="w-3 h-3 bg-[#34d399] rounded-full shadow-[0_0_15px_#34d399] group-hover:scale-150 transition-transform"></span>
              <ScrambleText text="PRIYA" />
            </Link>
          </Magnetic>
        </div>

        <div className="hidden lg:flex items-center gap-12 pointer-events-auto">
          {navItems.map((item) => (
            <div key={item.name}>
              <Magnetic>
                <Link href={item.href} className="text-sm font-medium tracking-widest uppercase text-white/90 hover:text-white transition-colors relative group py-2">
                  <ScrambleText text={item.name} />
                  <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-[#34d399] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out shadow-[0_0_10px_#34d399]"></span>
                </Link>
              </Magnetic>
            </div>
          ))}
          <Magnetic>
            <button className="px-7 py-3 text-xs tracking-widest font-bold uppercase text-black bg-white rounded-full hover:bg-[#34d399] hover:shadow-[0_0_20px_rgba(52,211,153,0.5)] transition-all duration-300">
              Hire Me
            </button>
          </Magnetic>
        </div>

        {/* Mobile toggle (top) */}
        <div className="lg:hidden pointer-events-auto">
          <Hamburger
            open={false}
            onClick={toggle}
            className="w-12 h-12 bg-[#1a2420] rounded-full border border-[#2c3a34]"
          />
        </div>
      </nav>

      {/* Bottom capsule (appears after scrolling) */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            exit={{ y: 120 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed bottom-6 inset-x-0 z-[100] flex justify-center px-4 pointer-events-none"
          >
            <div className="pointer-events-auto flex items-center justify-between w-full max-w-md pl-6 pr-2 py-2 rounded-full bg-[#0a0f0d] border border-[#26352e]">
              <Link href="/" className="text-base font-bold tracking-widest text-white uppercase flex items-center gap-3 group">
                <span className="w-2.5 h-2.5 bg-[#34d399] rounded-full shadow-[0_0_12px_#34d399] group-hover:scale-150 transition-transform"></span>
                PRIYA
              </Link>
              <Hamburger
                open={isMenuOpen}
                onClick={toggle}
                className="w-11 h-11 rounded-full bg-[#1a2420] hover:bg-[#25332d] transition-colors"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Invisible click-catcher: website stays fully visible behind the drawer */}
            <motion.div
              key="backdrop"
              initial={{ x: 0 }}
              animate={{ x: 0 }}
              exit={{ x: 0, transition: { duration: 0.7 } }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[120]"
            />
            <motion.aside
              key="drawer"
              data-lenis-prevent
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.7, ease: EASE }}
              className="fixed top-0 right-0 bottom-0 z-[130] w-full max-w-md flex flex-col overflow-hidden overflow-y-auto px-8 sm:px-12 py-8 text-[#f4efe6] border-l border-[#1d4a3a]"
              style={{ background: 'linear-gradient(160deg, #0b1511 0%, #07100c 55%, #050a08 100%)' }}
            >
              <div className="relative flex items-center justify-between">
                <span className="text-xs tracking-[0.3em] uppercase text-[#34d399]">Navigation</span>
                <button
                  aria-label="Close menu"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-11 h-11 rounded-full border border-[#2c3a34] hover:border-[#34d399] hover:rotate-90 hover:text-[#34d399] transition-all duration-500 text-lg"
                >
                  ✕
                </button>
              </div>

              <nav className="relative flex flex-col mt-14">
                {navItems.map((item, i) => {
                  const active = pathname === item.href;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ y: 40 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.6, ease: EASE, delay: 0.3 + i * 0.08 }}
                      className="border-b border-[#1a2a23]"
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="group flex items-baseline gap-5 py-5"
                      >
                        <span className="text-xs tracking-widest text-[#2fb88a] tabular-nums">0{i + 1}</span>
                        <span
                          className={`font-heading text-6xl leading-none transition-all duration-500 group-hover:translate-x-3 group-hover:italic ${
                            active ? 'text-[#34d399]' : 'group-hover:text-[#34d399]'
                          }`}
                          style={{ fontFamily: 'var(--font-lateef)' }}
                        >
                          {item.name}
                        </span>
                        <span className="ml-auto text-xl text-[#34d399] scale-0 -translate-x-3 group-hover:scale-100 group-hover:translate-x-0 transition-all duration-500">
                          ↗
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.div
                initial={{ y: 30 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.75 }}
                className="relative mt-auto pt-12 flex flex-col gap-6"
              >
                <button className="w-full px-8 py-4 text-sm font-bold tracking-widest uppercase text-black bg-[#34d399] rounded-full hover:bg-[#6ee7b7] transition-colors duration-300">
                  Hire Me
                </button>
                <div className="flex items-center justify-between text-xs tracking-widest uppercase text-[#6b7d75]">
                  <span>Frontend Developer</span>
                  <span>© {new Date().getFullYear()}</span>
                </div>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
