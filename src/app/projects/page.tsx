import React from 'react';
import Link from 'next/link';
import { projects } from '@/data/projects';

export default function ProjectsPage() {
  return (
    <main className="bg-black min-h-screen w-full text-white pt-40 px-8 md:px-16 pb-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-serif tracking-tighter mb-12">
          Featured Projects
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {projects.map((project) => (
            <Link href={`/projects/${project.slug}`} key={project.id} className="block group">
              <div className="bg-[#111] p-8 rounded-2xl border border-white/5 group-hover:border-[#3AA89B]/50 transition-colors duration-500 h-full">
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
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
