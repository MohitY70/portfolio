import { Suspense } from 'react'
import Link from 'next/link'
import { db } from '@/lib/db'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { formatDate, getReadingTime } from '@/lib/utils'
import { Calendar, Clock } from 'lucide-react'

async function getPosts(searchParams: { query?: string; tag?: string }) {
  const where: any = { status: 'PUBLISHED' }

  if (searchParams.query) {
    where.OR = [
      { title: { contains: searchParams.query, mode: 'insensitive' } },
      { excerpt: { contains: searchParams.query, mode: 'insensitive' } },
    ]
  }

  if (searchParams.tag) {
    where.tags = { has: searchParams.tag }
  }

  const posts = await db.post.findMany({
    where,
    orderBy: { publishedAt: 'desc' },
  })

  return posts
}

async function getAllTags() {
  const posts = await db.post.findMany({
    where: { status: 'PUBLISHED' },
    select: { tags: true },
  })

  const tagsSet = new Set<string>()
  posts.forEach((post) => post.tags.forEach((tag) => tagsSet.add(tag)))
  return Array.from(tagsSet).sort()
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { query?: string; tag?: string }
}) {
  const [posts, allTags] = await Promise.all([getPosts(searchParams), getAllTags()])

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-muted-foreground">
            Thoughts, tutorials, and insights about web development
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4">
            <form className="flex-1" action="/blog" method="get">
              <Input
                type="search"
                name="query"
                placeholder="Search posts..."
                defaultValue={searchParams.query}
                className="w-full"
              />
            </form>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <Link href="/blog">
              <Badge variant={!searchParams.tag ? 'default' : 'outline'}>All</Badge>
            </Link>
            {allTags.map((tag) => (
              <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                <Badge variant={searchParams.tag === tag ? 'default' : 'outline'}>{tag}</Badge>
              </Link>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No posts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1">
                  {post.coverUrl && (
                    <div className="aspect-video bg-muted overflow-hidden">
                      <img
                        src={post.coverUrl}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex gap-2 mb-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.publishedAt && formatDate(post.publishedAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {getReadingTime(post.contentMdx)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
