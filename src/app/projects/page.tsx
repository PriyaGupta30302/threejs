"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { projects } from "@/data/projects";

const pad = (n: number) => String(n).padStart(2, "0");
const OUTLINE = "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.35)]";

// Position of a card in the 3D fan relative to the active one
function fanStyle(offset: number): React.CSSProperties {
  const abs = Math.abs(offset);
  if (abs > 3) {
    return { opacity: 0, pointerEvents: "none", transform: `translate3d(${offset * 30}%,0,-700px)`, zIndex: 0 };
  }
  const rotateY = offset === 0 ? -9 : offset > 0 ? -32 : 32;
  return {
    transform: `translate3d(${offset * 17}%, ${abs * 3}%, ${-abs * 170}px) rotateY(${rotateY}deg) rotateZ(${offset * 1.5}deg)`,
    opacity: abs === 0 ? 1 : Math.max(0, 0.6 - (abs - 1) * 0.22),
    filter: abs === 0 ? "none" : `brightness(${0.55 - abs * 0.08}) saturate(0.8)`,
    zIndex: 10 - abs,
  };
}

function BrowserFrame({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/15 bg-[#0b0b0b] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
      <div className="absolute top-0 inset-x-0 h-7 flex items-center gap-1.5 px-3 bg-[#141414] border-b border-white/10 z-10">
        <span className="w-2 h-2 rounded-full bg-white/20" />
        <span className="w-2 h-2 rounded-full bg-white/20" />
        <span className="w-2 h-2 rounded-full bg-white/20" />
      </div>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover object-top pt-7"
      />
    </div>
  );
}

export default function AllProjectsPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const current = projects[active];

  const go = useCallback((dir: 1 | -1) => {
    setActive((a) => (a + dir + projects.length) % projects.length);
  }, []);

  // Keyboard browsing: ↑ ↓ to move, Enter to open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "Enter" && document.activeElement === document.body) {
        router.push(`/projects/${projects[active].slug}`);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, active, router]);

  // Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".intro-in", { y: 50, opacity: 0, stagger: 0.08, duration: 1, ease: "power4.out", delay: 0.1 });
      gsap.from(".deck-stage", { x: 120, opacity: 0, duration: 1.4, ease: "power4.out", delay: 0.2 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Pointer tilt on the 3D stage
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !window.matchMedia("(pointer: fine)").matches) return;
    const rx = gsap.quickTo(stage, "rotationX", { duration: 0.8, ease: "power3.out" });
    const ry = gsap.quickTo(stage, "rotationY", { duration: 0.8, ease: "power3.out" });
    const move = (e: MouseEvent) => {
      ry(((e.clientX / window.innerWidth) - 0.5) * 8);
      rx(-((e.clientY / window.innerHeight) - 0.5) * 6);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative bg-[#050505] text-white w-full overflow-x-clip lg:h-svh selection:bg-[#33CC99] selection:text-black"
    >
      {/* Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-[#33CC99] opacity-[0.10] blur-[150px]" />
        <div className="absolute bottom-[-30%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-[#33CC99] opacity-[0.06] blur-[150px]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>

      {/* ───────── Desktop: The Deck ───────── */}
      <div className="relative hidden lg:grid grid-cols-12 gap-8 h-full max-w-[1700px] mx-auto px-12 pt-28 pb-10">
        {/* Left: index */}
        <div className="col-span-5 flex flex-col justify-between min-h-0">
          <div className="intro-in flex items-center gap-4">
            <span className="h-px w-10 bg-[#33CC99]" />
            <span className="text-xs uppercase tracking-[0.35em] text-[#33CC99] font-semibold">
              Selected Work · {pad(projects.length)}
            </span>
          </div>

          <nav aria-label="Projects" className="flex flex-col gap-[1.2vh] my-auto">
            {projects.map((p, i) => {
              const on = i === active;
              return (
                <Link
                  key={p.id}
                  href={`/projects/${p.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="intro-in group relative flex items-baseline gap-5 outline-none"
                >
                  <span
                    className={`text-xs tabular-nums w-6 transition-colors duration-500 ${
                      on ? "text-[#33CC99]" : "text-white/30"
                    }`}
                  >
                    {pad(i + 1)}
                  </span>
                  <span
                    className={`font-serif uppercase tracking-tight leading-[0.95] text-[clamp(2rem,6.4vh,4.6rem)] transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                      on ? "text-white translate-x-4" : OUTLINE
                    }`}
                  >
                    {p.title}
                  </span>
                  <span
                    className={`ml-auto text-2xl text-[#33CC99] transition-all duration-500 ${
                      on ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                    }`}
                    aria-hidden
                  >
                    →
                  </span>
                </Link>
              );
            })}
          </nav>

          <p className="intro-in text-xs uppercase tracking-[0.25em] text-white/30 flex items-center gap-3">
            <kbd className="px-2 py-1 rounded border border-white/20 text-white/50">↑</kbd>
            <kbd className="px-2 py-1 rounded border border-white/20 text-white/50">↓</kbd>
            browse
            <kbd className="px-2 py-1 rounded border border-white/20 text-white/50">Enter</kbd>
            open
          </p>
        </div>

        {/* Right: stage + story */}
        <div className="deck-stage col-span-7 flex flex-col justify-center gap-[3vh] min-h-0 relative">
          {/* Giant outlined index number */}
          <span
            key={`n-${active}`}
            aria-hidden
            className="fade-up absolute -top-4 right-0 font-serif leading-none text-[18vw] text-transparent [-webkit-text-stroke:1px_rgba(51,204,153,0.28)] select-none pointer-events-none"
          >
            {pad(active + 1)}
          </span>

          {/* 3D fan */}
          <div className="relative h-[clamp(280px,46vh,520px)] [perspective:1600px]">
            <div ref={stageRef} className="absolute inset-0 [transform-style:preserve-3d]">
              {projects.map((p, i) => {
                const offset = i - active;
                const isActive = offset === 0;
                return (
                  <div
                    key={p.id}
                    className="absolute inset-0 grid place-items-center pointer-events-none [transform-style:preserve-3d]"
                  >
                    <div
                      onClick={() => (isActive ? router.push(`/projects/${p.slug}`) : setActive(i))}
                      style={fanStyle(offset)}
                      className="relative h-full aspect-[16/10] max-w-[90%] pointer-events-auto cursor-pointer transition-all duration-[900ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-transform"
                    >
                      {p.heroImage && <BrowserFrame src={p.heroImage} alt={`${p.title} desktop preview`} priority={i === 0} />}

                      {/* Phone */}
                      {p.gallery?.[1] && (
                        <div
                          className={`absolute -bottom-5 -right-5 w-[19%] aspect-[9/19] rounded-[1.1rem] border-[5px] border-[#1c1c1c] overflow-hidden shadow-2xl transition-all duration-700 delay-100 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                            isActive ? "opacity-100 translate-y-0 rotate-[5deg]" : "opacity-0 translate-y-10"
                          }`}
                        >
                          <Image src={p.gallery[1]} alt="" fill sizes="160px" className="object-cover object-top" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Story for active project */}
          <div key={`s-${active}`} className="fade-up relative z-20 flex flex-col gap-5 max-w-[760px]">
            <span className="text-[11px] uppercase tracking-[0.3em] text-white/40">
              {current.category} · {current.date}
            </span>
            <h2 className="font-serif italic text-[clamp(1.7rem,3.4vw,3rem)] leading-[1.05] text-white">
              {current.tagline}
            </h2>
            <p className="text-white/55 leading-relaxed max-w-xl text-[15px]">{current.pitch}</p>

            <div className="flex items-end justify-between gap-8 pt-1">
              <div className="flex gap-8">
                {current.metrics.map((m) => (
                  <div key={m.label} className="flex flex-col gap-1">
                    <span className="font-serif text-3xl xl:text-4xl text-[#33CC99] leading-none">{m.value}</span>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-white/40 max-w-[9rem] leading-snug">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href={`/projects/${current.slug}`}
                className="group shrink-0 flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-[#33CC99] text-black text-sm font-semibold hover:bg-white transition-colors duration-300"
              >
                Open case file
                <span className="grid place-items-center w-9 h-9 rounded-full bg-black text-[#33CC99] transition-transform duration-300 group-hover:rotate-45">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ───────── Mobile / tablet: poster list ───────── */}
      <div className="lg:hidden relative px-5 pt-32 pb-20 flex flex-col gap-14">
        <header className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#33CC99]" />
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#33CC99] font-semibold">
              Selected Work · {pad(projects.length)}
            </span>
          </div>
          <h1 className="font-serif uppercase text-[17vw] leading-[0.85] tracking-tighter">
            Projects<span className="text-[#33CC99]">.</span>
          </h1>
        </header>

        {projects.map((p, i) => (
          <Link key={p.id} href={`/projects/${p.slug}`} className="group flex flex-col gap-5">
            <div className="relative aspect-[16/10]">
              {p.heroImage && <BrowserFrame src={p.heroImage} alt={`${p.title} preview`} priority={i === 0} />}
              {p.gallery?.[1] && (
                <div className="absolute -bottom-4 -right-1 w-[20%] aspect-[9/19] rounded-2xl border-4 border-[#1c1c1c] overflow-hidden shadow-2xl rotate-[5deg]">
                  <Image src={p.gallery[1]} alt="" fill sizes="100px" className="object-cover object-top" />
                </div>
              )}
            </div>
            <div className="flex items-start gap-4 pt-2">
              <span className={`font-serif text-6xl leading-[0.85] ${OUTLINE}`}>{pad(i + 1)}</span>
              <div className="flex flex-col gap-2">
                <h2 className="font-serif uppercase text-3xl leading-none">{p.title}</h2>
                <p className="font-serif italic text-white/70 text-lg leading-snug">{p.tagline}</p>
                <span className="text-[#33CC99] text-sm font-semibold mt-1">
                  {p.metrics[0].value} <span className="text-white/40 font-normal">{p.metrics[0].label}</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
