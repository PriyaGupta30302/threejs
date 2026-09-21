'use client';

export default function ContactCTA() {
  return (
    <section className="py-24 px-8 md:px-16 border-t border-white/10 relative mb-12">
      <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-center md:items-end">
        {/* Left Side */}
        <div className="w-full md:w-1/2">
          <h3 className="text-xs tracking-[0.2em] text-white/50 uppercase mb-6">Let's Connect</h3>
          <h2 className="text-5xl md:text-7xl font-serif tracking-tight leading-tight">
            Have a <span className="italic text-[#3AA89B]">project</span><br />
            in mind?
          </h2>
        </div>

        {/* Right side */}
        <div className="w-full md:w-1/2 md:pl-24">
          <p className="text-sm font-light text-white/80 leading-relaxed mb-8 max-w-sm">
            I'm always open to exciting opportunities, collaborations or just a friendly chat about technology, design or new ideas.
          </p>
          <a href="mailto:hello@example.com" className="inline-flex items-center gap-4 border border-white/30 rounded-full px-8 py-3 text-sm hover:bg-white hover:text-black transition-colors">
            Get in Touch
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
