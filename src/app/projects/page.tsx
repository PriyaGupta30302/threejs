"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import { caveat, fraunces } from "./fonts";
import { HAND, HandArrow, Marker, Print, Squiggle, headingStyle } from "./ui";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AllProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".intro-in", { y: 40, opacity: 0, stagger: 0.12, duration: 1, ease: "power3.out", delay: 0.1 });

      (gsap.utils.toArray(".row-media") as HTMLElement[]).forEach((el) => {
        gsap.from(el, {
          y: 70,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      (gsap.utils.toArray(".row-text") as HTMLElement[]).forEach((el) => {
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

  return (
    <div
      ref={containerRef}
      className={`${fraunces.variable} ${caveat.variable} relative bg-[#15130f] text-[#ece5d6] w-full overflow-x-clip selection:bg-[#33CC99] selection:text-[#15130f]`}
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-6 md:px-10 lg:px-12">
        {/* ───────── Intro ───────── */}
        <header className="pt-28 sm:pt-32 md:pt-40 lg:pt-44 pb-10 md:pb-14 lg:pb-16 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-end">
          <div className="lg:col-span-8 flex flex-col gap-3 md:gap-5">
            <p className={`${HAND} intro-in text-2xl sm:text-3xl md:text-4xl text-[#8ce6c4] -rotate-2 origin-left`}>
              hey, here&apos;s what I&apos;ve been making lately
            </p>
            <h1
              style={headingStyle}
              className="intro-in text-[clamp(2.4rem,8vw,7rem)] leading-[1.02] tracking-tight"
            >
              Things I&apos;ve built, and <Marker>what went into them</Marker>.
            </h1>
          </div>

          <p className="intro-in lg:col-span-4 text-[#ece5d6]/65 text-base md:text-lg leading-relaxed lg:pb-3 max-w-xl">
            Six projects for shops, schools and growing brands. Open any of them for the full story: what the problem
            was, what I built, and how it went.
          </p>
        </header>

        {/* ───────── Projects ───────── */}
        <div className="flex flex-col gap-16 sm:gap-20 md:gap-24 lg:gap-32 pb-14 md:pb-24">
          {projects.map((p, i) => {
            const flip = i % 2 === 1;
            const tilt = [-1.6, 1.2, -0.9, 1.8, -1.3, 1][i % 6];
            const phoneTilt = flip ? -6 : 6;

            return (
              <article key={p.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-x-8 xl:gap-x-16 items-center">
                {/* Prints */}
                <Link
                  href={`/projects/${p.slug}`}
                  aria-label={`Read the story of ${p.title}`}
                  className={`row-media group relative block pb-6 md:pb-8 ${
                    flip
                      ? "lg:col-start-7 lg:col-span-6 lg:row-start-1"
                      : "lg:col-start-1 lg:col-span-6 xl:col-span-7 lg:row-start-1"
                  }`}
                >
                  {p.heroImage && (
                    <Print
                      src={p.heroImage}
                      alt={`${p.title} homepage`}
                      rotate={tilt}
                      priority={i === 0}
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      className="group-hover:[transform:rotate(0deg)_translateY(-6px)]"
                    />
                  )}
                  {p.gallery?.[1] && (
                    <Print
                      src={p.gallery[1]}
                      alt={`${p.title} on mobile`}
                      ratio="9 / 19"
                      rotate={phoneTilt}
                      sizes="200px"
                      tapeClass="-top-3 left-1/2 -translate-x-1/2 rotate-2"
                      className={`!absolute -bottom-2 w-[24%] md:w-[20%] ${
                        flip ? "-left-1 md:-left-6" : "-right-1 md:-right-6"
                      } group-hover:[transform:rotate(0deg)_translateY(-10px)]`}
                    />
                  )}
                </Link>

                {/* Words */}
                <div
                  className={`row-text flex flex-col gap-3 md:gap-5 ${
                    flip
                      ? "lg:col-start-1 lg:col-span-6 xl:col-span-5 lg:row-start-1"
                      : "lg:col-start-7 lg:col-span-6 xl:col-start-8 xl:col-span-5 lg:row-start-1"
                  }`}
                >
                  <p className="text-[#ece5d6]/50 text-sm">
                    <span className={`${HAND} text-xl md:text-2xl text-[#8ce6c4] mr-2`}>No. {i + 1}</span>
                    {p.category} · {p.date}
                  </p>

                  <h2 style={headingStyle} className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl leading-[1.05] tracking-tight">
                    {p.title}
                  </h2>

                  <p className="text-[#ece5d6]/70 text-base md:text-lg leading-relaxed">{p.pitch}</p>

                  {/* Margin note */}
                  <div className={`flex items-start gap-3 text-[#8ce6c4] ${flip ? "lg:flex-row-reverse lg:text-right" : ""} -rotate-1`}>
                    <HandArrow className={`w-12 md:w-16 h-6 md:h-8 shrink-0 mt-1 ${flip ? "lg:-scale-x-100" : ""}`} />
                    <span className={`${HAND} text-xl md:text-2xl leading-tight`}>{p.note}</span>
                  </div>

                  <p className="text-sm text-[#ece5d6]/45">Built with {p.tags.slice(0, 4).join(", ")}</p>

                  <Link
                    href={`/projects/${p.slug}`}
                    className="group/link self-start relative inline-block text-lg font-medium pb-2"
                  >
                    Read the full story →
                    <Squiggle className="absolute left-0 bottom-0 w-full h-2 text-[#33CC99] transition-transform duration-500 origin-left group-hover/link:scale-x-105" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* ───────── Closing ───────── */}
        <section className="border-t border-dashed border-[#ece5d6]/25 py-14 md:py-24 flex flex-col items-start gap-4 md:gap-6">
          <p className={`${HAND} text-2xl md:text-3xl text-[#8ce6c4] -rotate-2`}>got something in mind?</p>
          <Link href="/contact" className="group">
            <h2 style={headingStyle} className="text-[clamp(2.2rem,7vw,6.5rem)] leading-[1.02] tracking-tight">
              Tell me about <Marker>your project</Marker>
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-3"> →</span>
            </h2>
          </Link>
        </section>
      </div>
    </div>
  );
}
