import React from 'react';

const projects = [
  {
    id: 1,
    title: "Meiosis Publication",
    date: "2026 - Present",
    tags: ["Shopify", "Liquid", "JavaScript", "HTML", "CSS"],
    bullets: [
      "Rebuilt the storefront UI/UX from scratch for an educational platform serving 2,000+ daily visitors.",
      "Built reusable, filterable product sections and a fully mobile-first, responsive interface.",
      "Developed frontend for a reviews system (4.8/5 across 10,000+ reviews), lead popups, carousels, and a cart drawer.",
      "Built a cart-page WhatsApp share button."
    ]
  },
  {
    id: 2,
    title: "Rabbit Autocare",
    date: "2025 - Present",
    tags: ["Next.js", "Tailwind CSS", "JavaScript", "GSAP"],
    bullets: [
      "Built the complete frontend for a premium car-care store, delivering a smooth, highly animated, Gen Z–oriented storefront.",
      "Engineered scroll-triggered animations and a scroll-aware navigation bar.",
      "Optimized images and asset loading, raising the site's Lighthouse performance score from 43 to 73.",
      "Fetched and rendered product, coupon, and discount data to keep the UI in sync."
    ]
  }
  // Add more projects here easily
];

export default function ProjectsPage() {
  return (
    <main className="bg-black min-h-screen w-full text-white pt-40 px-8 md:px-16 pb-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-serif tracking-tighter mb-12">
          Featured Projects
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {projects.map((project) => (
            <div key={project.id} className="bg-[#111] p-8 rounded-2xl border border-white/5 hover:border-[#3AA89B]/50 transition-colors duration-500 group">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h2 className="text-3xl font-bold font-serif group-hover:text-[#3AA89B] transition-colors">{project.title}</h2>
                <span className="text-sm opacity-60 mt-2 md:mt-0 whitespace-nowrap">{project.date}</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium border border-white/20 rounded-full opacity-80">
                    {tag}
                  </span>
                ))}
              </div>

              <ul className="list-disc pl-5 space-y-3 opacity-90 text-lg">
                {project.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
