import React from 'react';

export default function AboutPage() {
  return (
    <main className="bg-black min-h-screen w-full text-white pt-40 px-8 md:px-16 pb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-serif tracking-tighter mb-12">
          About Me
        </h1>
        
        <section className="mb-16">
          <h2 className="text-3xl font-sans mb-6 text-[#3AA89B]">Professional Summary</h2>
          <p className="text-xl md:text-2xl font-light leading-relaxed opacity-90">
            Frontend Developer with 2+ years building production-grade, responsive interfaces across e-commerce, education, and Shopify platforms. Specialized in React.js, Next.js, and JavaScript (ES6+) with TypeScript — translating Figma into pixel perfect, cross-browser UIs, building reusable component architecture, and optimizing animation-heavy pages (GSAP, Framer Motion) to load noticeably faster and run smoothly across devices.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-sans mb-6 text-[#3AA89B]">Experience</h2>
          <div className="border-l-2 border-[#3AA89B] pl-6 py-2">
            <h3 className="text-2xl font-bold">Frontend Developer — Indiefluence</h3>
            <p className="text-lg opacity-70 mb-4">Aug 2024 – Present | Kurukshetra, Haryana</p>
            <ul className="list-disc pl-5 space-y-2 text-lg opacity-90">
              <li>Grew into owning complete frontend builds — from reusable component systems to full production storefronts.</li>
              <li>Redesigned outdated, cluttered interfaces into modern, user-friendly experiences driving higher sales.</li>
              <li>Improved site speed and overall user experience while mentoring junior developers.</li>
              <li>Translated complex client requirements into simple, intuitive user flows.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-sans mb-6 text-[#3AA89B]">Education</h2>
          <div className="border-l-2 border-white/20 pl-6 py-2">
            <h3 className="text-2xl font-bold">Bachelor of Computer Applications (BCA)</h3>
            <p className="text-lg opacity-70">2021 – 2024</p>
            <p className="text-lg opacity-90 mt-2">Kurukshetra University — JMIT (Seth Jai Parkash Mukand Lal Institute of Engineering and Technology)</p>
          </div>
        </section>
      </div>
    </main>
  );
}
