import Link from 'next/link'
import { db } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Eye } from 'lucide-react'

async function getProjects() {
  return await db.project.findMany({
    orderBy: [{ featured: 'desc' }, { order: 'asc' }],
  })
}

export default async function AdminProjectsPage() {
  const projects = await getProjects()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold">Projects</h2>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Button asChild>
          <Link href="/admin/projects/new">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No projects yet</p>
            <Button asChild>
              <Link href="/admin/projects/new">Create Your First Project</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="flex-1">{project.title}</CardTitle>
                  <div className="flex gap-2">
                    {project.featured && <Badge>Featured</Badge>}
                  </div>
                </div>
                <CardDescription>{project.shortDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/projects/${project.slug}`} target="_blank">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/projects/${project.id}`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
