import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth-utils'
import { z } from 'zod'

const projectSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  shortDescription: z.string().min(1).optional(),
  longDescriptionMdx: z.string().min(1).optional(),
  bannerUrl: z.string().optional(),
  gallery: z.array(z.string()).optional(),
  techStack: z.array(z.string()).optional(),
  repoUrl: z.string().optional().nullable(),
  liveUrl: z.string().optional().nullable(),
  featured: z.boolean().optional(),
  order: z.number().optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const project = await db.project.findUnique({
      where: { id },
    })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    // Increment view count
    await db.project.update({
      where: { id },
      data: { views: { increment: 1 } },
    })

    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await getCurrentUser()
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validated = projectSchema.parse(body)

    const project = await db.project.update({
      where: { id },
      data: validated,
    })

    return NextResponse.json(project)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await getCurrentUser()
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await db.project.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}
