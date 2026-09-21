'use client';

export default function WhatIEnjoy() {
  const enjoys = [
    { num: '01', title: 'INTERACTIVE UI', desc: 'Creating engaging and meaningful user experiences.' },
    { num: '02', title: 'CLEAN CODE', desc: 'Writing maintainable and scalable code.' },
    { num: '03', title: 'CONTINUOUS LEARNING', desc: 'Exploring new tools, techniques and better ways to build.' },
  ];

  return (
    <section className="py-24 px-8 md:px-16 border-t border-white/10 relative">
      <div className="flex flex-col md:flex-row gap-12 md:gap-24 mb-20">
        {/* Section Identifier */}
        <div className="w-full md:w-1/4">
          <h3 className="text-xs tracking-[0.2em] text-white/50 uppercase mb-2">05</h3>
          <h2 className="text-sm tracking-[0.2em] text-white/80 uppercase">What I Enjoy</h2>
        </div>

        {/* Content */}
        <div className="w-full md:w-2/4">
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight leading-tight">
            More than <span className="italic text-[#3AA89B]">just</span> code.
          </h2>
        </div>

        {/* Right text */}
        <div className="w-full md:w-1/4">
          <p className="text-sm font-light text-white/60 leading-relaxed">
            I enjoy working on interactive UI, smooth animations and digital experiences that feel different. Whether it's a pixel-perfect layout, a scroll animation or a complex interaction — I love the process of making it all work.
          </p>
        </div>
      </div>

      {/* 3 Columns */}
      <div className="flex flex-col md:flex-row justify-between gap-12 border-t border-white/10 pt-16 mt-8">
        {enjoys.map((item, idx) => (
          <div key={idx} className="w-full md:w-1/3">
            <h4 className="text-xs tracking-[0.2em] text-white/40 mb-4">{item.num}</h4>
            <h3 className="text-sm tracking-[0.1em] font-bold mb-4 uppercase">{item.title}</h3>
            <p className="text-sm font-light text-white/60">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
