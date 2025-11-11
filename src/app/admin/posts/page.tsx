import Link from 'next/link'
import { db } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Eye } from 'lucide-react'
import { formatDate } from '@/lib/utils'

async function getPosts() {
  return await db.post.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export default async function AdminPostsPage() {
  const posts = await getPosts()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold">Posts</h2>
          <p className="text-muted-foreground">Manage your blog posts</p>
        </div>
        <Button asChild>
          <Link href="/admin/posts/new">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>

      {posts.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No posts yet</p>
            <Button asChild>
              <Link href="/admin/posts/new">Create Your First Post</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={post.status === 'PUBLISHED' ? 'default' : 'secondary'}>
                        {post.status}
                      </Badge>
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {post.status === 'PUBLISHED' && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/blog/${post.slug}`} target="_blank">
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/posts/${post.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Created: {formatDate(post.createdAt)}</span>
                  {post.publishedAt && <span>Published: {formatDate(post.publishedAt)}</span>}
                  <span>{post.views} views</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
