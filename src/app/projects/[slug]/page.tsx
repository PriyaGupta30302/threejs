import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import ProjectClient from './ProjectClient';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: Props) {
  const resolvedParams = await params;
  const projectIndex = projects.findIndex((p) => p.slug === resolvedParams.slug);
  const project = projects[projectIndex];

  if (!project) {
    notFound();
  }

  const nextProject = projects[(projectIndex + 1) % projects.length];

  return <ProjectClient project={project} nextProject={nextProject} />;
}
