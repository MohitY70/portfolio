import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { db } from '@/lib/db'
import { renderMDX } from '@/lib/mdx'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ExternalLink, Github } from 'lucide-react'

async function getProject(slug: string) {
  const project = await db.project.findUnique({
    where: { slug },
  })

  if (!project) return null

  // Increment views
  await db.project.update({
    where: { id: project.id },
    data: { views: { increment: 1 } },
  })

  return project
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const project = await getProject(params.slug)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: project.bannerUrl ? [project.bannerUrl] : [],
    },
  }
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug)

  if (!project) {
    notFound()
  }

  const { content } = await renderMDX(project.longDescriptionMdx)

  return (
    <article className="container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link href="/projects" className="inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold">{project.title}</h1>
            {project.featured && <Badge>Featured</Badge>}
          </div>

          <p className="text-xl text-muted-foreground mb-6">{project.shortDescription}</p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <Button asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
            {project.repoUrl && (
              <Button variant="outline" asChild>
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </a>
              </Button>
            )}
          </div>
        </header>

        {/* Banner */}
        <div className="mb-8 rounded-2xl overflow-hidden">
          <img src={project.bannerUrl} alt={project.title} className="w-full h-auto" />
        </div>

        {/* Content */}
        <div className="prose prose-lg prose-custom max-w-none mb-12">{content}</div>

        {/* Gallery */}
        {project.gallery.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery.map((image, index) => (
                <div key={index} className="rounded-xl overflow-hidden">
                  <img src={image} alt={`${project.title} screenshot ${index + 1}`} className="w-full h-auto" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Stats */}
        <div className="border-t pt-6">
          <div className="text-sm text-muted-foreground">
            {project.views} views
          </div>
        </div>
      </div>
    </article>
  )
}
