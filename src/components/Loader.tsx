"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

const STRIPS = 14;

// Survives Loader remounts, so the intro (name text) plays only once per page load
let introPlayed = false;

// Shutter transition: strips drop in from the top to cover the page,
// then retreat bottom -> top to reveal it. Used for first load and route changes.
export default function Loader() {
  const pathname = usePathname();
  const router = useRouter();
  const wrapRef = useRef<HTMLDivElement>(null);
  const stripsRef = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const prevPath = useRef(pathname);
  const pending = useRef(false); // a click-triggered navigation is in flight
  const busy = useRef(false);
  const introStarted = useRef(false); // persists across StrictMode's dev double-effect

  const strips = () => stripsRef.current.filter(Boolean) as HTMLDivElement[];
  const block = (on: boolean) => {
    if (wrapRef.current) wrapRef.current.style.pointerEvents = on ? "auto" : "none";
  };

  const cover = () =>
    new Promise<void>((resolve) => {
      block(true);
      gsap.set(strips(), { transformOrigin: "top center", scaleY: 0 });
      gsap.to(strips(), {
        scaleY: 1,
        duration: 0.7,
        ease: "power3.inOut",
        stagger: 0.07,
        onComplete: resolve,
      });
    });

  const reveal = (delay = 0) =>
    gsap.to(strips(), {
      scaleY: 0,
      duration: 0.8,
      ease: "power3.inOut",
      stagger: 0.07,
      delay,
      onComplete: () => {
        block(false);
        busy.current = false;
        pending.current = false;
      },
    });

  // First load: strips are already covering the page (no flash), show name, then reveal
  useEffect(() => {
    if (introStarted.current) return;
    introStarted.current = true;
    if (introPlayed) {
      // Remounted (not a real first load): never show the intro text again
      gsap.set(introRef.current, { display: "none" });
      gsap.set(strips(), { transformOrigin: "top center", scaleY: 0 });
      block(false);
      return;
    }
    introPlayed = true;
    gsap.set(strips(), { transformOrigin: "top center", scaleY: 1 });
    gsap.set(introRef.current, { visibility: "visible" });
    const tl = gsap.timeline();
    tl.fromTo(textRef.current, { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: "power3.out" })
      .to(textRef.current, { yPercent: -110, duration: 0.6, ease: "power3.in", delay: 0.4 })
      .add(() => {
        // Intro text is only for the first load; remove it so it never shows again
        gsap.set(introRef.current, { display: "none" });
        reveal();
      });
    block(true);
    // Not killed on cleanup: StrictMode's dev double-mount must not leave the page covered
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Intercept internal link clicks: cover first, then navigate
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest?.("a");
      if (!a || !a.href) return;
      if ((a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;

      e.preventDefault();
      if (busy.current) return;
      busy.current = true;
      pending.current = true;
      cover().then(() => {
        router.push(url.pathname + url.search + url.hash);
        // Fallback in case navigation never commits
        setTimeout(() => {
          if (pending.current && busy.current) reveal();
        }, 4000);
      });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  // New page committed: reveal bottom -> top
  useEffect(() => {
    if (pathname === prevPath.current) return;
    prevPath.current = pathname;
    if (!pending.current) {
      // back/forward navigation: cover instantly, then reveal
      busy.current = true;
      block(true);
      gsap.set(strips(), { transformOrigin: "top center", scaleY: 1 });
    }
    reveal(0.15);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[9999] flex pointer-events-auto"
    >
      {Array.from({ length: STRIPS }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            stripsRef.current[i] = el;
          }}
          className="flex-1 will-change-transform"
          style={{
            transform: "scaleY(1)",
            transformOrigin: "top center",
            marginRight: i === STRIPS - 1 ? 0 : -1,
            background: i % 2 ? "linear-gradient(to top, #06140e, #0f3326)" : "linear-gradient(to top, #0a2219, #164536)",
            borderBottom: "3px solid #34d399",
            borderRight: "1px solid #1d5a45",
            boxSizing: "border-box",
          }}
        />
      ))}
      <div ref={introRef} className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" style={{ visibility: "hidden" }}>
        <div className="overflow-hidden">
          <h1
            ref={textRef}
            className="text-4xl md:text-6xl tracking-wider text-[#34d399]"
            style={{ fontFamily: "var(--font-lateef)", transform: "translateY(110%)" }}
          >
            PRIYA GUPTA
          </h1>
        </div>
      </div>
    </div>
  );
}
