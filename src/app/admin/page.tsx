import { db } from '@/lib/db'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, FolderOpen, Eye } from 'lucide-react'

async function getStats() {
  const [totalPosts, publishedPosts, draftPosts, totalProjects] = await Promise.all([
    db.post.count(),
    db.post.count({ where: { status: 'PUBLISHED' } }),
    db.post.count({ where: { status: 'DRAFT' } }),
    db.project.count(),
  ])

  return {
    totalPosts,
    publishedPosts,
    draftPosts,
    totalProjects,
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalPosts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Published Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{stats.publishedPosts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Draft Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">{stats.draftPosts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalProjects}</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Start</CardTitle>
          <CardDescription>
            Here's what you can do in the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold">Manage Posts</h3>
                <p className="text-sm text-muted-foreground">
                  Create, edit, and publish blog posts with MDX support
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FolderOpen className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold">Manage Projects</h3>
                <p className="text-sm text-muted-foreground">
                  Add and update your portfolio projects
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Eye className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold">Upload Media</h3>
                <p className="text-sm text-muted-foreground">
                  Manage images and other media files
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
