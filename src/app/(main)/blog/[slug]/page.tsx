import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { db } from '@/lib/db'
import { renderMDX } from '@/lib/mdx'
import { formatDate, getReadingTime } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react'
import Link from 'next/link'

async function getPost(slug: string) {
  const post = await db.post.findUnique({
    where: { slug, status: 'PUBLISHED' },
  })

  if (!post) return null

  // Increment views
  await db.post.update({
    where: { id: post.id },
    data: { views: { increment: 1 } },
  })

  return post
}

async function getRelatedPosts(slug: string, tags: string[]) {
  return await db.post.findMany({
    where: {
      slug: { not: slug },
      status: 'PUBLISHED',
      tags: { hasSome: tags },
    },
    take: 3,
    orderBy: { publishedAt: 'desc' },
  })
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      images: post.coverUrl ? [post.coverUrl] : [],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const { content } = await renderMDX(post.contentMdx)
  const relatedPosts = await getRelatedPosts(post.slug, post.tags)

  return (
    <article className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/blog" className="inline-flex items-center gap-2 mb-8 text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>

          <div className="flex items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {post.publishedAt && formatDate(post.publishedAt)}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {getReadingTime(post.contentMdx)}
            </div>
            <div className="text-sm">{post.views} views</div>
          </div>
        </header>

        {/* Cover Image */}
        {post.coverUrl && (
          <div className="mb-8 rounded-2xl overflow-hidden">
            <img src={post.coverUrl} alt={post.title} className="w-full h-auto" />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg prose-custom max-w-none mb-12">{content}</div>

        {/* Share */}
        <div className="border-t border-b py-6 mb-12">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Share this post</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group"
                >
                  <div className="mb-3">
                    {relatedPost.coverUrl && (
                      <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                        <img
                          src={relatedPost.coverUrl}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  )
}
