'use client';

export default function AboutMe() {
  return (
    <section className="py-24 px-8 md:px-16 border-t border-white/10 relative">
      <div className="flex flex-col md:flex-row gap-12 md:gap-24">
        {/* Section Identifier */}
        <div className="w-full md:w-1/4">
          <h3 className="text-xs tracking-[0.2em] text-white/50 uppercase mb-2">01</h3>
          <h2 className="text-sm tracking-[0.2em] text-white/80 uppercase">A Little<br />About Me</h2>
        </div>

        {/* Content */}
        <div className="w-full md:w-2/4">
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-8 leading-tight">
            Curious mind.<br />
            <span className="italic text-[#3AA89B]">Creative</span> by nature.
          </h2>
          
          <div className="space-y-6 text-lg font-light text-white/70">
            <p>
              I'm a Frontend Developer who enjoys turning ideas into clean, functional and visually engaging websites. I love working at the intersection of design and technology, where creativity meets logic.
            </p>
            <p>
              Over the past 2+ years, I've worked on a variety of projects — from business websites and educational platforms to eCommerce stores — helping brands bring their ideas to life on the web.
            </p>
          </div>
        </div>

        {/* Right side floating text */}
        <div className="hidden md:flex flex-col justify-between w-full md:w-1/4 text-xs tracking-[0.2em] uppercase text-white/40 border-l border-white/10 pl-8">
          <div>
            Better<br/>Websites<br/>Brighter<br/>Ideas
          </div>
          <div>
            <span className="block mb-4 w-[1px] h-12 bg-white/20"></span>
            Based in India<br/>
            Open to<br/>
            Opportunities <span className="inline-block w-2 h-2 rounded-full bg-[#3AA89B] ml-2"></span>
          </div>
        </div>
      </div>
    </section>
  );
}
