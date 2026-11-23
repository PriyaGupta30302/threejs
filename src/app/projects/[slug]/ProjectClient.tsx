"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project, projects } from "@/data/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const pad = (n: number) => String(n).padStart(2, "0");
const OUTLINE = "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.4)]";

const CHAPTERS = [
  { id: "brief", label: "The Brief" },
  { id: "built", label: "What I Built" },
  { id: "impact", label: "The Impact" },
  { id: "stack", label: "Under the Hood" },
];

// How the device stage poses itself for each chapter (desktop only)
const BROWSER_POSE = [
  "translateX(0) rotateY(-10deg) rotateX(4deg) scale(1)",
  "translateX(-9%) rotateY(-6deg) rotateX(2deg) scale(0.88)",
  "translateX(0) rotateY(0deg) rotateX(0deg) scale(0.78)",
  "translateX(-4%) rotateY(9deg) rotateX(-3deg) scale(0.95)",
];
const BROWSER_OPACITY = [1, 1, 0.45, 1];
const PHONE_POSE = [
  "translateY(130%) rotate(0deg) scale(1)",
  "translateY(0) rotate(5deg) scale(1)",
  "translateY(-6%) rotate(0deg) scale(0.9)",
  "translateY(0) rotate(-4deg) scale(1.05)",
];
const PHONE_OPACITY = [0, 1, 0.5, 1];

/** Animates "4.8/5", "10,000+", "<1s", "40%"… when scrolled into view. Non-numeric values render as-is. */
function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const m = value.match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/);
    if (!el || !m) return;

    const [, prefix, num, suffix] = m;
    const target = parseFloat(num.replace(/,/g, ""));
    const decimals = (num.split(".")[1] || "").length;
    const comma = num.includes(",");
    const fmt = (v: number) =>
      comma
        ? v.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : v.toFixed(decimals);

    const state = { v: 0 };
    el.textContent = prefix + fmt(0) + suffix;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () =>
        gsap.to(state, {
          v: target,
          duration: 1.8,
          ease: "power3.out",
          onUpdate: () => {
            el.textContent = prefix + fmt(state.v) + suffix;
          },
        }),
    });
    return () => st.kill();
  }, [value]);

  return <span ref={ref}>{value}</span>;
}

const ChapterLabel = ({ n, children }: { n: string; children: React.ReactNode }) => (
  <div className="flex items-center gap-4 mb-8">
    <span className="font-serif text-[#33CC99] text-lg">{n}</span>
    <span className="h-px w-10 bg-[#33CC99]/50" />
    <span className="text-xs uppercase tracking-[0.3em] text-white/50">{children}</span>
  </div>
);

export default function ProjectClient({ project }: { project: Project }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [chapter, setChapter] = useState(0);

  const index = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const desktopShot = project.gallery?.[0] ?? project.heroImage;
  const mobileShot = project.gallery?.[1];

  // Scroll-spy: which chapter is centred in the viewport
  useEffect(() => {
    const els = CHAPTERS.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setChapter(CHAPTERS.findIndex((c) => c.id === e.target.id));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".title-word", {
        yPercent: 115,
        duration: 1.3,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.1,
      });
      gsap.from(".hero-in", { y: 40, opacity: 0, stagger: 0.12, duration: 1, ease: "power3.out", delay: 0.6 });

      (gsap.utils.toArray(".reveal") as HTMLElement[]).forEach((el) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  if (!project) return null;

  const jumpTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
  const words = project.title.split(" ");

  return (
    <div
      ref={containerRef}
      className="relative bg-[#050505] text-white overflow-x-clip selection:bg-[#33CC99] selection:text-black"
    >
      {/* ───────── Hero ───────── */}
      <section className="relative min-h-svh flex flex-col justify-between px-6 md:px-12 pt-32 pb-10 max-w-[1700px] mx-auto">
        <div className="absolute inset-0 -z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-25%] left-1/2 -translate-x-1/2 w-[85vw] h-[55vw] rounded-full bg-[#33CC99] opacity-[0.13] blur-[160px]" />
        </div>

        <div className="hero-in relative flex items-center justify-between text-xs uppercase tracking-[0.25em]">
          <Link href="/projects" className="group inline-flex items-center gap-3 text-white/50 hover:text-[#33CC99] transition-colors">
            <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span> All projects
          </Link>
          <span className="text-white/40">
            Case file {pad(index + 1)} / {pad(projects.length)}
          </span>
        </div>

        <div className="relative flex flex-col gap-8 md:gap-10 py-16">
          <span className="hero-in text-xs md:text-sm uppercase tracking-[0.35em] text-[#33CC99] font-semibold">
            {project.category}
          </span>

          <h1 className="font-serif uppercase tracking-tighter leading-[0.86] text-[15vw] md:text-[10.5vw] flex flex-wrap gap-x-[2.5vw]">
            {words.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                <span className={`title-word inline-block ${i % 2 === 1 ? OUTLINE : ""}`}>{w}</span>
              </span>
            ))}
          </h1>

          <p className="hero-in font-serif italic text-2xl md:text-4xl leading-tight text-white/85 max-w-4xl">
            {project.tagline}
          </p>
          <p className="hero-in text-white/55 text-base md:text-lg leading-relaxed max-w-2xl">{project.pitch}</p>
        </div>

        <div className="hero-in relative grid grid-cols-3 gap-4 md:gap-10 border-t border-white/15 pt-6">
          {project.metrics.map((m) => (
            <div key={m.label} className="flex flex-col gap-2">
              <span className="font-serif text-[#33CC99] text-3xl md:text-6xl leading-none">
                <Counter value={m.value} />
              </span>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.18em] text-white/45 leading-snug">{m.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ───────── Story: sticky device stage + chapters ───────── */}
      <section className="relative max-w-[1700px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-x-12">
        {/* Stage */}
        <div className="lg:col-span-7 lg:sticky lg:top-0 lg:h-svh flex items-center justify-center py-16 lg:py-0 order-first">
          <div className="relative w-full max-w-[820px]">
            {/* Giant outlined headline metric behind the devices */}
            <div
              aria-hidden
              className="absolute inset-0 -z-0 grid place-items-center pointer-events-none select-none transition-opacity duration-700"
              style={{ opacity: chapter === 2 ? 1 : 0.55 }}
            >
              <span className="font-serif leading-none text-[20vw] lg:text-[13vw] text-transparent [-webkit-text-stroke:1px_rgba(51,204,153,0.3)] whitespace-nowrap">
                {project.metrics[0].value}
              </span>
            </div>

            <div className="relative [perspective:1800px]">
              {desktopShot && (
                <div
                  className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/15 bg-[#0b0b0b] shadow-[0_50px_120px_-30px_rgba(51,204,153,0.35)] transition-all duration-[1100ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] lg:[transform:var(--bt)] lg:[opacity:var(--bo)]"
                  style={
                    {
                      "--bt": BROWSER_POSE[chapter],
                      "--bo": BROWSER_OPACITY[chapter],
                    } as React.CSSProperties
                  }
                >
                  <div className="absolute top-0 inset-x-0 h-8 flex items-center gap-2 px-4 bg-[#141414] border-b border-white/10 z-10">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                  </div>
                  <Image
                    src={desktopShot}
                    alt={`${project.title} desktop screenshot`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover object-top pt-8"
                  />
                </div>
              )}

              {mobileShot && (
                <div
                  className="absolute -bottom-6 right-2 md:-bottom-10 md:-right-4 w-[24%] aspect-[9/19] rounded-[1.6rem] border-[7px] border-[#1c1c1c] overflow-hidden shadow-2xl transition-all duration-[1100ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] lg:[transform:var(--pt)] lg:[opacity:var(--po)]"
                  style={
                    {
                      "--pt": PHONE_POSE[chapter],
                      "--po": PHONE_OPACITY[chapter],
                    } as React.CSSProperties
                  }
                >
                  <Image src={mobileShot} alt={`${project.title} mobile screenshot`} fill sizes="200px" className="object-cover object-top" />
                </div>
              )}
            </div>

            {/* Chapter rail */}
            <ol className="hidden lg:flex absolute -left-4 xl:-left-10 top-1/2 -translate-y-1/2 -translate-x-full flex-col gap-5">
              {CHAPTERS.map((c, i) => (
                <li key={c.id}>
                  <button
                    onClick={() => jumpTo(c.id)}
                    className={`group flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] transition-colors duration-500 ${
                      chapter === i ? "text-white" : "text-white/30 hover:text-white/60"
                    }`}
                  >
                    <span className="tabular-nums">{pad(i + 1)}</span>
                    <span
                      className={`h-px transition-all duration-500 ${
                        chapter === i ? "w-10 bg-[#33CC99]" : "w-4 bg-white/30 group-hover:w-6"
                      }`}
                    />
                    <span className="whitespace-nowrap">{c.label}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Chapters */}
        <div className="lg:col-span-5">
          {/* 01 — Brief */}
          <article id="brief" className="min-h-[70svh] lg:min-h-svh flex flex-col justify-center py-16">
            <div className="reveal">
              <ChapterLabel n="01">The Brief</ChapterLabel>
              <p className="font-serif text-2xl md:text-[2rem] leading-[1.3] text-white/90">{project.brief}</p>
              <dl className="grid grid-cols-3 gap-4 mt-12 pt-6 border-t border-white/15">
                {[
                  ["Client", project.client],
                  ["Role", project.role],
                  ["Year", project.date],
                ].map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-2">
                    <dt className="text-[10px] uppercase tracking-[0.25em] text-white/35">{k}</dt>
                    <dd className="text-sm font-medium leading-snug">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>

          {/* 02 — What I built */}
          <article id="built" className="min-h-[70svh] lg:min-h-svh flex flex-col justify-center py-16">
            <div className="reveal">
              <ChapterLabel n="02">What I Built</ChapterLabel>
              <ul className="flex flex-col">
                {project.built.map((f, i) => (
                  <li
                    key={f.title}
                    className="group flex gap-6 py-7 border-t border-white/15 last:border-b hover:border-[#33CC99]/60 transition-colors duration-500"
                  >
                    <span className={`font-serif text-4xl leading-none transition-colors duration-500 ${OUTLINE} group-hover:text-[#33CC99] group-hover:[-webkit-text-stroke:0]`}>
                      {pad(i + 1)}
                    </span>
                    <div className="flex flex-col gap-3">
                      <h3 className="font-serif text-2xl md:text-3xl leading-tight">{f.title}</h3>
                      <p className="text-white/55 leading-relaxed">{f.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* 03 — Impact */}
          <article id="impact" className="min-h-[70svh] lg:min-h-svh flex flex-col justify-center py-16">
            <div className="reveal">
              <ChapterLabel n="03">The Impact</ChapterLabel>
              <p className="font-serif text-2xl md:text-[2rem] leading-[1.3] text-white/90 mb-12">{project.impact}</p>
              <div className="flex flex-col">
                {project.metrics.map((m) => (
                  <div key={m.label} className="flex items-baseline justify-between gap-6 py-5 border-t border-white/15 last:border-b">
                    <span className="font-serif text-5xl md:text-7xl leading-none text-[#33CC99]">
                      <Counter value={m.value} />
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-white/50 text-right max-w-[11rem] leading-snug">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* 04 — Stack */}
          <article id="stack" className="min-h-[70svh] lg:min-h-svh flex flex-col justify-center py-16">
            <div className="reveal">
              <ChapterLabel n="04">Under the Hood</ChapterLabel>
              <p className="font-serif text-2xl md:text-[2rem] leading-[1.3] text-white/90 mb-10">
                The tools that made it possible.
              </p>
              <div className="flex flex-wrap gap-3">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="px-5 py-3 rounded-full border border-white/20 text-sm hover:border-[#33CC99] hover:text-[#33CC99] transition-colors duration-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <Link
                href="/contact"
                className="group mt-14 inline-flex items-center gap-3 pl-7 pr-2 py-2 rounded-full bg-[#33CC99] text-black font-semibold hover:bg-white transition-colors duration-300"
              >
                Want something like this?
                <span className="grid place-items-center w-10 h-10 rounded-full bg-black text-[#33CC99] transition-transform duration-300 group-hover:rotate-45">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </span>
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* ───────── Previous / Next ───────── */}
      <section className="relative border-t border-white/10 grid grid-cols-1 md:grid-cols-2">
        {[
          { p: prev, label: "Previous case file", align: "items-start text-left", arrow: "←" },
          { p: next, label: "Next case file", align: "items-start md:items-end text-left md:text-right", arrow: "→" },
        ].map(({ p, label, align, arrow }) => (
          <Link
            key={label}
            href={`/projects/${p.slug}`}
            className="group relative overflow-hidden border-b md:border-b-0 md:first:border-r border-white/10"
          >
            {p.heroImage && (
              <Image
                src={p.heroImage}
                alt=""
                fill
                sizes="50vw"
                className="object-cover object-top opacity-0 scale-110 group-hover:opacity-30 group-hover:scale-100 transition-all duration-1000"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
            <div className={`relative flex flex-col gap-5 px-6 md:px-12 py-20 md:py-32 ${align}`}>
              <span className="text-xs uppercase tracking-[0.3em] text-white/40">
                {arrow === "←" ? "← " : ""}
                {label}
                {arrow === "→" ? " →" : ""}
              </span>
              <h2 className="font-serif uppercase tracking-tighter leading-[0.9] text-[11vw] md:text-[5vw] transition-colors duration-500 group-hover:text-[#33CC99]">
                {p.title}
              </h2>
              <span className="font-serif italic text-white/55 text-lg max-w-sm">{p.tagline}</span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
