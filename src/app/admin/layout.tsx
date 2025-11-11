import { requireAdmin } from '@/lib/auth-utils'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, FileText, FolderOpen, Upload } from 'lucide-react'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin()

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <Button variant="outline" asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                View Site
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <nav className="space-y-2">
              <Link
                href="/admin"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-accent transition-colors"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/admin/posts"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-accent transition-colors"
              >
                <FileText className="h-4 w-4" />
                Posts
              </Link>
              <Link
                href="/admin/projects"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-accent transition-colors"
              >
                <FolderOpen className="h-4 w-4" />
                Projects
              </Link>
              <Link
                href="/admin/media"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-accent transition-colors"
              >
                <Upload className="h-4 w-4" />
                Media
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  )
}
