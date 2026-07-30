import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Hero />
      <ServicesSection />
      {/* Some extra content to scroll past the services section */}
      <div className="h-[50vh] w-full flex items-center justify-center bg-[#0E4A3C] text-white">
        <h2 className="text-4xl font-heading">Footer / Next Section</h2>
      </div>
    </main>
  );
}
