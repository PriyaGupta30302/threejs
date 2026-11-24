import React from "react";
import Image from "next/image";

// NOTE: the global `h1, h2 { font-family }` rule is unlayered and beats Tailwind utilities,
// so headings take their font through inline style.
export const headingStyle: React.CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontWeight: 500,
  fontVariationSettings: '"SOFT" 100, "WONK" 1',
};

export const HAND = "font-[family-name:var(--font-caveat)]";
export const PAPER = "#efe7d6";

/** A strip of masking tape */
export function Tape({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`absolute z-10 h-6 w-20 bg-[#e6dba6]/75 shadow-[0_1px_3px_rgba(0,0,0,0.35)] ${className}`}
      style={{ clipPath: "polygon(2% 0, 98% 6%, 100% 50%, 97% 100%, 3% 94%, 0 45%)" }}
    />
  );
}

/** A screenshot printed on paper, taped down and slightly crooked */
export function Print({
  src,
  alt,
  rotate = 0,
  ratio = "16 / 10",
  priority,
  sizes,
  className = "",
  tapeClass = "-top-3 left-1/2 -translate-x-1/2 -rotate-3",
}: {
  src: string;
  alt: string;
  rotate?: number;
  ratio?: string;
  priority?: boolean;
  sizes: string;
  className?: string;
  tapeClass?: string;
}) {
  return (
    <figure
      className={`relative bg-[#efe7d6] p-2 md:p-3 shadow-[0_22px_44px_-14px_rgba(0,0,0,0.75),0_2px_5px_rgba(0,0,0,0.45)] transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] [transform:rotate(var(--r))] ${className}`}
      style={{ "--r": `${rotate}deg` } as React.CSSProperties}
    >
      <Tape className={tapeClass} />
      <div className="relative w-full overflow-hidden bg-black/10" style={{ aspectRatio: ratio }}>
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover object-top" />
      </div>
    </figure>
  );
}

/** Loose hand-drawn arrow. Points left by default; flip with `mirror`. */
export function HandArrow({ className = "", mirror = false }: { className?: string; mirror?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 60"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={mirror ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M112 44C92 52 62 50 42 34C32 26 24 18 18 10" />
      <path d="M17 24C16 18 17 13 18 9C23 10 28 12 33 14" />
    </svg>
  );
}

/** Wobbly underline drawn under links */
export function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 100 8" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
      <path d="M1 5C9 1 14 8 22 4C30 0 35 8 43 4C51 0 56 8 64 4C72 0 77 8 85 4C91 2 95 4 99 3" />
    </svg>
  );
}

/** Highlighter-pen effect on the lower half of the text */
export function Marker({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-t from-[#33CC99]/55 from-[38%] to-transparent to-[38%] px-1 -mx-1 [box-decoration-break:clone]">
      {children}
    </span>
  );
}
