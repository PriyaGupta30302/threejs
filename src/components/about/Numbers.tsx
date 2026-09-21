'use client';

export default function Numbers() {
  const stats = [
    { value: '2+', label: 'YEARS EXPERIENCE' },
    { value: '20+', label: 'PROJECTS WORKED ON' },
    { value: '10+', label: 'HAPPY CLIENTS' },
    { value: '∞', label: 'IDEAS TO BUILD' },
  ];

  return (
    <section className="py-24 px-8 md:px-16 border-t border-white/10 relative">
      <div className="flex flex-col md:flex-row items-start gap-12 md:gap-24">
        {/* Section Identifier */}
        <div className="w-full md:w-1/4">
          <h3 className="text-xs tracking-[0.2em] text-white/50 uppercase mb-2">04</h3>
          <h2 className="text-sm tracking-[0.2em] text-white/80 uppercase">A Few<br />Numbers</h2>
        </div>

        {/* Stats Row */}
        <div className="w-full md:w-3/4 flex flex-wrap md:flex-nowrap justify-between gap-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col border-l border-white/10 pl-6 w-[45%] md:w-1/4">
              <h4 className="text-5xl md:text-6xl font-light mb-4">{stat.value}</h4>
              <p className="text-xs tracking-[0.1em] text-white/60 uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
