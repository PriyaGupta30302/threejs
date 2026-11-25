import { Fraunces, Caveat } from "next/font/google";

// Warm, slightly quirky serif for headings
export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});

// Handwriting for margin notes
export const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});
