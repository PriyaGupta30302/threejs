'use client';

const tools = [
  { name: 'React.js', icon: '⚛️' },
  { name: 'Next.js', icon: 'N' },
  { name: 'JavaScript (ES6+)', icon: 'JS' },
  { name: 'GSAP', icon: '🟢' },
  { name: 'Three.js', icon: '🔺' },
  { name: 'Tailwind CSS', icon: '🌊' },
  { name: 'Shopify (Liquid)', icon: '🛍️' },
  { name: 'Git / GitHub', icon: '🐙' },
  { name: 'Figma', icon: '🎨' },
  { name: 'VS Code', icon: '💻' }
];

export default function Toolkit() {
  return (
    <section className="py-24 px-8 md:px-16 border-t border-white/10 relative">
      <div className="flex flex-col md:flex-row gap-12 md:gap-24 mb-16">
        {/* Section Identifier */}
        <div className="w-full md:w-1/4">
          <h3 className="text-xs tracking-[0.2em] text-white/50 uppercase mb-2">03</h3>
          <h2 className="text-sm tracking-[0.2em] text-white/80 uppercase">My Toolkit</h2>
        </div>

        {/* Content */}
        <div className="w-full md:w-2/4 flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight leading-tight">
            Tools I work with.
          </h2>
        </div>

        <div className="hidden md:flex flex-col justify-center w-full md:w-1/4 text-xs tracking-[0.1em] text-white/50">
          A mix of modern tools and technologies that help me bring ideas to life.
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 max-w-6xl mx-auto">
        {tools.map((tool, idx) => (
          <div key={idx} className="flex items-center gap-4 py-4 px-6 border border-white/10 rounded hover:border-white/30 transition-colors bg-white/[0.02]">
            <span className="text-2xl opacity-80 grayscale">{tool.icon}</span>
            <span className="text-sm font-light text-white/80">{tool.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
