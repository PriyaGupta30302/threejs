import React from 'react';
import AboutHero from '@/components/about/AboutHero';
import AboutMe from '@/components/about/AboutMe';
import Experience from '@/components/about/Experience';
import Toolkit from '@/components/about/Toolkit';
import Numbers from '@/components/about/Numbers';
import WhatIEnjoy from '@/components/about/WhatIEnjoy';
import ContactCTA from '@/components/about/ContactCTA';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <main className="bg-black min-h-screen w-full text-white" style={{ clipPath: 'inset(0)' }}>
      <div className="max-w-7xl mx-auto">
        <AboutHero />
        <AboutMe />
        <Experience />
        <Toolkit />
        <Numbers />
        <WhatIEnjoy />
        <ContactCTA />
      </div>
      <Footer />
    </main>
  );
}
