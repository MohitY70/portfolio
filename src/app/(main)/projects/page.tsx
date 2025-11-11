import Link from 'next/link'
import { db } from '@/lib/db'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github } from 'lucide-react'

async function getProjects() {
  return await db.project.findMany({
    orderBy: [{ featured: 'desc' }, { order: 'asc' }, { createdAt: 'desc' }],
  })
}

export default async function ProjectsPage() {
  const projects = await db.project.findMany({
    orderBy: [{ featured: 'desc' }, { order: 'asc' }],
  })

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Projects</h1>
          <p className="text-xl text-muted-foreground">
            A showcase of my work and side projects
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-all">
                {/* Banner */}
                <div className="aspect-video bg-muted overflow-hidden">
                  <img
                    src={project.bannerUrl}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="mb-2">{project.title}</CardTitle>
                      <CardDescription>{project.shortDescription}</CardDescription>
                    </div>
                    {project.featured && (
                      <Badge variant="default">Featured</Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <Button asChild size="sm">
                      <Link href={`/projects/${project.slug}`}>
                        View Details
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    {project.repoUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          Code
                        </a>
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
