import { compileMDX } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'
import { MDXComponents } from '@/components/mdx/mdx-components'

const rehypePrettyCodeOptions = {
  theme: 'github-dark',
  keepBackground: false,
}

export async function renderMDX(content: string) {
  return await compileMDX({
    source: content,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypePrettyCode, rehypePrettyCodeOptions],
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'wrap',
              properties: {
                className: ['anchor'],
              },
            },
          ],
        ],
      },
    },
    components: MDXComponents,
  })
}

export function extractHeadings(content: string) {
  const headingRegex = /^#{1,6}\s+(.+)$/gm
  const headings: Array<{ level: number; text: string; id: string }> = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[0].indexOf(' ')
    const text = match[1]
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')

    headings.push({ level, text, id })
  }

  return headings
}
