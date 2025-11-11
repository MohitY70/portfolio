import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth-utils'
import { z } from 'zod'

const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  shortDescription: z.string().min(1),
  longDescriptionMdx: z.string().min(1),
  bannerUrl: z.string(),
  gallery: z.array(z.string()),
  techStack: z.array(z.string()),
  repoUrl: z.string().optional(),
  liveUrl: z.string().optional(),
  featured: z.boolean().optional(),
  order: z.number().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const tech = searchParams.get('tech')

    const where: any = {}

    if (featured === 'true') {
      where.featured = true
    }

    if (tech) {
      where.techStack = { has: tech }
    }

    const projects = await db.project.findMany({
      where,
      orderBy: [{ featured: 'desc' }, { order: 'asc' }, { createdAt: 'desc' }],
    })

    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validated = projectSchema.parse(body)

    const project = await db.project.create({
      data: validated,
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
