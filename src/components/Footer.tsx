import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#111] text-white py-16 md:py-24 border-t border-white/10">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col gap-16 md:gap-24">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div className="flex flex-col gap-6 w-full md:w-2/3">
            <p className="text-white/60 text-lg uppercase tracking-widest font-semibold">Ready to connect?</p>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold font-['DM_Sans',_sans-serif] tracking-tighter leading-tight">
              Let&apos;s build <br className="hidden md:block" />
              something <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-900">epic.</span>
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-6 w-full md:w-1/3">
             <a 
              href="mailto:priyagupta30302@gmail.com" 
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-transform hover:scale-105 w-full md:w-auto text-lg"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get in Touch
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </a>
            <p className="text-white/70 text-base md:text-lg font-['DM_Sans',_sans-serif] md:text-right">
              Frontend Developer specialized in crafting immersive, interactive, and polished web experiences.
            </p>
          </div>
        </div>

        {/* Divider with gradient accent */}
        <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
           <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-400 to-green-900 w-1/4"></div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 font-['DM_Sans',_sans-serif]">
          {/* Socials */}
          <div className="flex flex-wrap gap-8 text-white/80 text-lg font-medium">
            {[
              { name: 'GitHub', href: 'https://github.com/PriyaGupta30302' },
              { name: 'LinkedIn', href: 'https://www.linkedin.com/in/priyagupta30/' },
              { name: 'WhatsApp', href: 'https://wa.me/917056600842' },
            ].map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:-bottom-1 after:left-0 after:bg-white after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                {item.name}
              </a>
            ))}
            <a 
              href="/Priya_Gupta_Resume.pdf" 
              download
              className="hover:text-white transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:-bottom-1 after:left-0 after:bg-white after:origin-bottom-right after:transition-transform hover:after:scale-x-100 hover:after:origin-bottom-left"
            >
              Resume
            </a>
          </div>

          <div className="flex flex-col md:flex-row gap-6 text-white/60 text-base">
            <p>&copy; {new Date().getFullYear()} Priya Gupta. All rights reserved.</p>
            <p className="hidden md:block">•</p>
            <p>Designed with passion, Built with Next.js</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
