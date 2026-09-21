'use client';

import Hero from "./Hero";
import ServicesSection from "./ServicesSection";
import BridgeSection from "./BridgeSection";
import NurturingSection from "./NurturingSection";
import KnowledgeSection from "./KnowledgeSection";
import Footer from "../Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <BridgeSection />
      <NurturingSection />
      <KnowledgeSection />
      <Footer />
    </>
  );
}
