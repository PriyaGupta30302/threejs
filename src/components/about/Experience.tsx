'use client';

export default function Experience() {
  return (
    <section className="py-24 px-8 md:px-16 border-t border-white/10 relative">
      <div className="flex flex-col md:flex-row gap-12 md:gap-24">
        {/* Section Identifier */}
        <div className="w-full md:w-1/4">
          <h3 className="text-xs tracking-[0.2em] text-white/50 uppercase mb-2">02</h3>
          <h2 className="text-sm tracking-[0.2em] text-white/80 uppercase">Experience</h2>
        </div>

        {/* Content */}
        <div className="w-full md:w-2/4">
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight mb-16 leading-tight">
            2+ years of<br />
            building for the web.
          </h2>
          
          <div className="relative pl-8 border-l border-white/20">
            {/* Timeline Dot */}
            <div className="absolute w-2 h-2 bg-[#3AA89B] rounded-full left-[-4.5px] top-2 shadow-[0_0_10px_#3AA89B]"></div>
            
            <div className="mb-2">
              <span className="text-xs tracking-[0.1em] text-white/50 uppercase">2024 — Present</span>
            </div>
            <h3 className="text-xl font-bold mb-1">
              Indiefluence <span className="text-white/40 font-normal ml-2 text-sm">• Kurukshetra</span>
            </h3>
            <h4 className="text-lg text-white/80 font-medium mb-6">Frontend Developer</h4>
            
            <p className="text-base font-light text-white/60 leading-relaxed mb-4">
              Worked on multiple client projects including business websites, educational platforms and eCommerce stores. Responsible for building responsive and interactive user interfaces using React.js, Next.js, Tailwind CSS and modern web technologies. Also involved in website maintenance, performance improvements and feature updates.
            </p>
          </div>
        </div>

        {/* Right side floating text */}
        <div className="hidden md:flex flex-col justify-between w-full md:w-1/4 text-xs tracking-[0.2em] uppercase text-white/40 pl-8">
          <div className="leading-relaxed">
            My journey so far — from learning and exploring to working on real-world projects, collaborating with amazing people and growing as a developer.
          </div>
          <div className="mt-16">
            Real Projects<br/>
            Real Learning<br/>
            Real Growth<br/><br/>
            <span className="block mb-4 w-[1px] h-12 bg-white/20"></span>
            Still<br/>
            Exploring<br/>
            Still Learning<br/>
            Still Building <span className="inline-block w-2 h-2 rounded-full bg-[#3AA89B] ml-2"></span>
          </div>
        </div>
      </div>
    </section>
  );
}
