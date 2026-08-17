import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import LenisProvider from "@/components/LenisProvider";
import Loader from "@/components/Loader";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const lateef = localFont({
  src: "../../public/LateefRegOT.ttf",
  variable: "--font-lateef",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Priya Gupta | Frontend Developer",
  description: "Portfolio of Priya Gupta, a Frontend Developer specialized in React, Next.js, and 3D animations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${lateef.variable} font-sans antialiased bg-black`}
      >
        <LenisProvider>
          <Loader />
          <Navbar />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
