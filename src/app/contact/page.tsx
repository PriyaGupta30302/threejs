import React from 'react';

export default function ContactPage() {
  return (
    <main className="bg-black min-h-screen w-full text-white pt-40 px-8 md:px-16 pb-20 flex flex-col justify-center items-center">
      <div className="max-w-2xl w-full text-center relative z-10">
        <h1 className="text-6xl md:text-8xl font-serif tracking-tighter mb-6">
          Let&apos;s Connect
        </h1>
        <p className="text-xl md:text-2xl font-light opacity-80 mb-16">
          I&apos;m currently open to new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 text-xl font-medium">
          <a href="mailto:priyagupta30302@gmail.com" className="hover:text-[#3AA89B] transition-colors underline decoration-white/30 underline-offset-8">
            priyagupta30302@gmail.com
          </a>
          <a href="tel:+917056600842" className="hover:text-[#3AA89B] transition-colors underline decoration-white/30 underline-offset-8">
            +91 70566 00842
          </a>
        </div>

        <div className="flex justify-center gap-8 mt-16">
          <a href="#" className="px-8 py-4 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-sm font-bold">
            LinkedIn
          </a>
          <a href="#" className="px-8 py-4 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-sm font-bold">
            GitHub
          </a>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3AA89B]/20 rounded-full blur-[120px] pointer-events-none"></div>
    </main>
  );
}
