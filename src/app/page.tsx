import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import BridgeSection from "@/components/BridgeSection";

export default function Home() {
  return (
    <main className="bg-black min-h-screen w-full" style={{ clipPath: 'inset(0)' }}>
      <Hero />
      <ServicesSection />
      <BridgeSection />
    </main>
  );
}
