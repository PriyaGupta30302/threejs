"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project, projects } from "@/data/projects";
import { caveat, fraunces } from "../fonts";
import { HAND, HandArrow, Marker, Print, Squiggle, headingStyle } from "../ui";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CHAPTERS = [
  { id: "brief", label: "the problem" },
  { id: "built", label: "what I built" },
  { id: "impact", label: "how it went" },
  { id: "stack", label: "tools I used" },
];

// How the prints on the sticky desk re-arrange themselves for each chapter (desktop only)
const SCREEN_POSE = [
  "translateX(0) rotate(-2deg) scale(1)",
  "translateX(-8%) rotate(-3.5deg) scale(0.9)",
  "translateX(0) rotate(1deg) scale(0.84)",
  "translateX(-3%) rotate(2.5deg) scale(0.95)",
];
const PHONE_POSE = [
  "translateY(140%) rotate(4deg)",
  "translateY(0) rotate(6deg)",
  "translateY(-4%) rotate(2deg) scale(0.92)",
  "translateY(0) rotate(-5deg) scale(1.04)",
];

/** Counts up "4.8/5", "10,000+", "<1s", "40%"… when scrolled into view. Non-numeric values stay as-is. */
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
          duration: 1.6,
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

const ChapterTitle = ({ hand, children }: { hand: string; children: React.ReactNode }) => (
  <div className="mb-8 flex flex-col gap-1">
    <span className={`${HAND} text-2xl text-[#8ce6c4] -rotate-2 origin-left`}>{hand}</span>
    <h2 style={headingStyle} className="text-4xl md:text-5xl leading-[1.05] tracking-tight">
      {children}
    </h2>
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

  // Which chapter is in the middle of the screen
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
      gsap.from(".hero-in", { y: 40, opacity: 0, stagger: 0.12, duration: 1, ease: "power3.out", delay: 0.1 });
      (gsap.utils.toArray(".reveal") as HTMLElement[]).forEach((el) => {
        gsap.from(el, {
          y: 40,
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

  return (
    <div
      ref={containerRef}
      className={`${fraunces.variable} ${caveat.variable} relative bg-[#15130f] text-[#ece5d6] overflow-x-clip selection:bg-[#33CC99] selection:text-[#15130f]`}
    >
      {/* ───────── Hero ───────── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-20 md:pb-28">
        <Link
          href="/projects"
          className="hero-in group inline-flex items-center gap-2 text-[#ece5d6]/55 hover:text-[#8ce6c4] transition-colors"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span> back to all projects
        </Link>

        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-9 flex flex-col gap-6">
            <p className="hero-in text-[#ece5d6]/50 text-sm">
              <span className={`${HAND} text-2xl text-[#8ce6c4] mr-2`}>
                Story {index + 1} of {projects.length}
              </span>
              {project.category}
            </p>
            <h1
              style={headingStyle}
              className="hero-in text-[clamp(3rem,9vw,8.5rem)] leading-[0.98] tracking-tight"
            >
              {project.title}
            </h1>
            <p style={headingStyle} className="hero-in italic text-2xl md:text-4xl leading-snug text-[#ece5d6]/85 max-w-3xl">
              <Marker>{project.tagline}</Marker>
            </p>
          </div>

          <div className="hero-in lg:col-span-3 flex flex-col gap-3 text-[#8ce6c4] -rotate-1">
            <HandArrow className="w-16 h-8 rotate-[200deg] -scale-x-100" />
            <span className={`${HAND} text-2xl leading-tight`}>{project.note}</span>
          </div>
        </div>

        <p className="hero-in mt-12 max-w-2xl text-lg md:text-xl leading-relaxed text-[#ece5d6]/70">{project.pitch}</p>
      </section>

      {/* ───────── Story: sticky desk + chapters ───────── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-x-16">
        {/* Desk */}
        <div className="lg:col-span-7 lg:sticky lg:top-0 lg:h-svh flex items-center justify-center py-12 lg:py-0">
          <div className="relative w-full max-w-[780px] pb-12">
            {desktopShot && (
              <div
                className="transition-transform duration-[1100ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] lg:[transform:var(--sp)]"
                style={{ "--sp": SCREEN_POSE[chapter] } as React.CSSProperties}
              >
                <Print
                  src={desktopShot}
                  alt={`${project.title} homepage`}
                  priority
                  rotate={-1.5}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                />
              </div>
            )}

            {mobileShot && (
              <div
                className="absolute bottom-0 right-1 md:-right-4 w-[24%] transition-transform duration-[1100ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] lg:[transform:var(--pp)]"
                style={{ "--pp": PHONE_POSE[chapter] } as React.CSSProperties}
              >
                <Print
                  src={mobileShot}
                  alt={`${project.title} on mobile`}
                  ratio="9 / 19"
                  rotate={5}
                  sizes="200px"
                  tapeClass="-top-3 left-1/2 -translate-x-1/2 rotate-2"
                />
              </div>
            )}

            {/* Handwritten chapter list */}
            <ol className="hidden lg:flex absolute -top-16 left-0 flex-wrap gap-x-7 gap-y-1">
              {CHAPTERS.map((c, i) => (
                <li key={c.id}>
                  <button
                    onClick={() => jumpTo(c.id)}
                    className={`${HAND} text-2xl text-left transition-all duration-500 ${
                      chapter === i ? "text-[#8ce6c4]" : "text-[#ece5d6]/35 hover:text-[#ece5d6]/70"
                    }`}
                  >
                    {i + 1}. {c.label}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Chapters */}
        <div className="lg:col-span-5">
          {/* The problem */}
          <article id="brief" className="py-14 lg:py-24">
            <div className="reveal">
              <ChapterTitle hand="1.">The problem</ChapterTitle>
              <p className="text-xl md:text-2xl leading-relaxed text-[#ece5d6]/85">{project.brief}</p>
              <dl className="mt-10 pt-6 border-t border-dashed border-[#ece5d6]/25 grid grid-cols-3 gap-4 text-sm">
                {[
                  ["Client", project.client],
                  ["My role", project.role],
                  ["When", project.date],
                ].map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-1">
                    <dt className="text-[#ece5d6]/45">{k}</dt>
                    <dd className="font-medium leading-snug">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </article>

          {/* What I built */}
          <article id="built" className="py-14 lg:py-24">
            <div className="reveal">
              <ChapterTitle hand="2.">What I built</ChapterTitle>
              <ul className="flex flex-col">
                {project.built.map((f, i) => (
                  <li key={f.title} className="flex gap-5 py-6 border-t border-dashed border-[#ece5d6]/25 last:border-b">
                    <span className={`${HAND} text-3xl text-[#8ce6c4] leading-none pt-1`}>{i + 1}.</span>
                    <div className="flex flex-col gap-2">
                      <h3 style={headingStyle} className="text-2xl leading-tight">
                        {f.title}
                      </h3>
                      <p className="text-[#ece5d6]/65 leading-relaxed">{f.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* How it went */}
          <article id="impact" className="py-14 lg:py-24">
            <div className="reveal">
              <ChapterTitle hand="3.">How it went</ChapterTitle>
              <p className="text-xl md:text-2xl leading-relaxed text-[#ece5d6]/85 mb-10">{project.impact}</p>
              <ul className="flex flex-col gap-6">
                {project.metrics.map((m) => (
                  <li key={m.label} className="flex items-baseline gap-5">
                    <span style={headingStyle} className="text-5xl md:text-6xl leading-none min-w-[7.5rem]">
                      <Marker>
                        <Counter value={m.value} />
                      </Marker>
                    </span>
                    <span className="text-[#ece5d6]/65 leading-snug">{m.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* Tools */}
          <article id="stack" className="py-14 lg:py-24">
            <div className="reveal">
              <ChapterTitle hand="4.">Tools I used</ChapterTitle>
              <p className="text-xl md:text-2xl leading-relaxed text-[#ece5d6]/85">
                {project.tags.slice(0, -1).join(", ")}
                {project.tags.length > 1 ? " and " : ""}
                {project.tags[project.tags.length - 1]}.
              </p>

              <div className="mt-14 flex flex-col gap-3">
                <p className={`${HAND} text-3xl text-[#8ce6c4] -rotate-1`}>want something like this?</p>
                <Link href="/contact" className="group relative self-start inline-block text-xl font-medium pb-2">
                  Let&apos;s talk about your project →
                  <Squiggle className="absolute left-0 bottom-0 w-full h-2 text-[#33CC99] transition-transform duration-500 origin-left group-hover:scale-x-105" />
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ───────── Keep reading ───────── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 border-t border-dashed border-[#ece5d6]/25 mt-8 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12">
        {[
          { p: prev, hand: "← the one before", align: "" },
          { p: next, hand: "the next story →", align: "md:items-end md:text-right" },
        ].map(({ p, hand, align }) => (
          <Link key={hand} href={`/projects/${p.slug}`} className={`group flex flex-col gap-3 ${align}`}>
            <span className={`${HAND} text-2xl text-[#8ce6c4]`}>{hand}</span>
            <span
              style={headingStyle}
              className="text-4xl md:text-5xl leading-[1.05] tracking-tight transition-colors duration-300 group-hover:text-[#8ce6c4]"
            >
              {p.title}
            </span>
            <span className="text-[#ece5d6]/55 max-w-sm">{p.tagline}</span>
          </Link>
        ))}
      </section>
    </div>
  );
}
