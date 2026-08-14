import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import BridgeSection from "@/components/BridgeSection";
import NurturingSection from "@/components/NurturingSection";
import KnowledgeSection from "@/components/KnowledgeSection";

export default function Home() {
  return (
    <main className="bg-black min-h-screen w-full" style={{ clipPath: 'inset(0)' }}>
      <Hero />
      <ServicesSection />
      <BridgeSection />
      <NurturingSection />
      <KnowledgeSection />
    </main>
  );
}
