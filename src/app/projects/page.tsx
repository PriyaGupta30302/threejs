"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const pad = (n: number) => String(n).padStart(2, "0");
const OUTLINE = "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.4)]";

function BrowserFrame({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/15 bg-[#0b0b0b] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]">
      <div className="absolute top-0 inset-x-0 h-8 flex items-center gap-2 px-4 bg-[#141414] border-b border-white/10 z-10">
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
        <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
      </div>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 58vw, 100vw"
        className="object-cover object-top pt-8 transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.04]"
      />
    </div>
  );
}

export default function AllProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".intro-in", { y: 60, opacity: 0, stagger: 0.12, duration: 1.1, ease: "power4.out", delay: 0.1 });

      (gsap.utils.toArray(".row-media") as HTMLElement[]).forEach((el) => {
        gsap.from(el, {
          y: 90,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      (gsap.utils.toArray(".row-text > *") as HTMLElement[]).forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      // Gentle parallax on the big outlined numbers
      (gsap.utils.toArray(".row-number") as HTMLElement[]).forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -12 },
          {
            yPercent: 12,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative bg-[#050505] text-white w-full overflow-x-clip selection:bg-[#33CC99] selection:text-black"
    >
      {/* Atmosphere */}
      <div className="absolute inset-x-0 top-0 h-[110vh] pointer-events-none overflow-hidden">
        <div className="absolute top-[-30%] left-1/2 -translate-x-1/2 w-[85vw] h-[55vw] rounded-full bg-[#33CC99] opacity-[0.12] blur-[160px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse at top, #000 15%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse at top, #000 15%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative max-w-[1500px] mx-auto px-6 md:px-12">
        {/* ───────── Intro ───────── */}
        <header className="pt-36 md:pt-44 pb-14 md:pb-20 flex flex-col gap-8">
          <div className="intro-in flex items-center gap-4">
            <span className="h-px w-10 bg-[#33CC99]" />
            <span className="text-xs md:text-sm uppercase tracking-[0.35em] text-[#33CC99] font-semibold">
              Selected Work
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-12">
            <h1 className="intro-in font-serif uppercase tracking-tighter leading-[0.82] text-[min(22vw,19rem)]">
              Projects<span className="text-[#33CC99]">.</span>
            </h1>

            <div className="intro-in flex flex-col gap-5 lg:max-w-sm lg:pb-3">
              <p className="text-white/60 text-base md:text-lg leading-relaxed">
                Storefronts, platforms and brand sites, each built to look sharp and load fast.
              </p>
              <span className="text-xs uppercase tracking-[0.3em] text-white/40">
                {pad(projects.length)} case files ↓
              </span>
            </div>
          </div>
        </header>

        {/* ───────── Projects ───────── */}
        <div>
          {projects.map((p, i) => {
            const flip = i % 2 === 1;
            return (
              <article
                key={p.id}
                className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center py-16 md:py-24 border-t border-white/10"
              >
                {/* Big outlined number */}
                <span
                  aria-hidden
                  className={`row-number pointer-events-none select-none absolute top-10 ${
                    flip ? "right-0" : "left-0"
                  } font-serif leading-none text-[26vw] lg:text-[16vw] text-transparent [-webkit-text-stroke:1px_rgba(51,204,153,0.16)]`}
                >
                  {pad(i + 1)}
                </span>

                {/* Media */}
                <Link
                  href={`/projects/${p.slug}`}
                  aria-label={`Open ${p.title} case study`}
                  className={`row-media group relative block lg:col-span-7 ${flip ? "lg:order-2" : ""}`}
                >
                  <div className="absolute -inset-6 -z-0 rounded-full bg-[#33CC99] opacity-0 blur-[100px] group-hover:opacity-[0.12] transition-opacity duration-700" />
                  <div className="relative aspect-[16/10]">
                    {p.heroImage && <BrowserFrame src={p.heroImage} alt={`${p.title} desktop preview`} priority={i === 0} />}
                    {p.gallery?.[1] && (
                      <div
                        className={`absolute -bottom-8 ${
                          flip ? "-left-3 md:-left-8 -rotate-[5deg]" : "-right-3 md:-right-8 rotate-[5deg]"
                        } w-[20%] aspect-[9/19] rounded-[1.4rem] border-[6px] border-[#1c1c1c] overflow-hidden shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:-translate-y-3`}
                      >
                        <Image src={p.gallery[1]} alt={`${p.title} mobile preview`} fill sizes="200px" className="object-cover object-top" />
                      </div>
                    )}
                  </div>
                </Link>

                {/* Text */}
                <div className={`row-text relative lg:col-span-5 flex flex-col gap-6 ${flip ? "lg:order-1" : ""}`}>
                  <span className="text-xs uppercase tracking-[0.3em] text-white/40">
                    {p.category} · {p.date}
                  </span>

                  <h2 className="font-serif uppercase tracking-tight leading-[0.92] text-5xl md:text-6xl xl:text-7xl">
                    {p.title}
                  </h2>

                  <p className="font-serif italic text-2xl md:text-3xl leading-snug text-white/85">{p.tagline}</p>
                  <p className="text-white/55 leading-relaxed">{p.pitch}</p>

                  <div className="grid grid-cols-3 gap-4 border-t border-white/15 pt-6">
                    {p.metrics.map((m) => (
                      <div key={m.label} className="flex flex-col gap-2">
                        <span className="font-serif text-2xl md:text-3xl text-[#33CC99] leading-none">{m.value}</span>
                        <span className="text-[10px] uppercase tracking-[0.15em] text-white/40 leading-snug">{m.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-5 pt-2">
                    <div className="flex flex-wrap gap-2">
                      {p.tags.slice(0, 3).map((t) => (
                        <span key={t} className="text-xs px-3 py-1.5 rounded-full border border-white/15 text-white/60">
                          {t}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/projects/${p.slug}`}
                      className="group/btn flex items-center gap-3 pl-6 pr-2 py-2 rounded-full bg-[#33CC99] text-black text-sm font-semibold hover:bg-white transition-colors duration-300"
                    >
                      View case study
                      <span className="grid place-items-center w-9 h-9 rounded-full bg-black text-[#33CC99] transition-transform duration-300 group-hover/btn:rotate-45">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M7 17 17 7M8 7h9v9" />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ───────── Closing CTA ───────── */}
        <section className="border-t border-white/10 py-28 md:py-44 flex flex-col items-start gap-10">
          <span className="text-xs uppercase tracking-[0.35em] text-white/40">Have an idea?</span>
          <Link href="/contact" className="group">
            <h2 className="font-serif uppercase tracking-tighter leading-[0.88] text-[14vw] md:text-[9vw]">
              Let&apos;s build <span className={`${OUTLINE} transition-colors duration-500 group-hover:text-[#33CC99] group-hover:[-webkit-text-stroke:0]`}>together</span>
              <span className="text-[#33CC99]">.</span>
            </h2>
          </Link>
        </section>
      </div>
    </div>
  );
}
