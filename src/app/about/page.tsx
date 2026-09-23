import React from 'react';
import AboutHero from '@/components/about/AboutHero';
import AboutMe from '@/components/about/AboutMe';
import Experience from '@/components/about/Experience';
import Toolkit from '@/components/about/Toolkit';
import Numbers from '@/components/about/Numbers';
import WhatIEnjoy from '@/components/about/WhatIEnjoy';
import ContactCTA from '@/components/about/ContactCTA';
import Footer from '@/components/Footer';
import AboutBackground3D from '@/components/about/AboutBackground3D';

export default function AboutPage() {
  return (
    <main className="bg-black min-h-screen w-full text-white relative" style={{ clipPath: 'inset(0)' }}>
      {/* Global 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <AboutBackground3D />
      </div>

      <div className="relative z-10 w-full">
        <AboutHero />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <AboutMe />
        <Experience />
        <Toolkit />
        <Numbers />
        <WhatIEnjoy />
        <ContactCTA />
      </div>
      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}
