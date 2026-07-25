import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Hero />
      {/* Some extra content to scroll past the hero */}
      <div className="h-screen w-full flex items-center justify-center bg-black text-white">
        <h2 className="text-4xl font-heading">More Content Below</h2>
      </div>
    </main>
  );
}
