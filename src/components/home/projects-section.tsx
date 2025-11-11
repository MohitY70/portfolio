'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, ExternalLink, Github } from 'lucide-react'
import { gsap } from '@/lib/gsap'

// Placeholder projects - will be replaced with actual data
const featuredProjects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with payment integration and admin dashboard.',
    tech: ['Next.js', 'TypeScript', 'Stripe', 'Prisma'],
    slug: 'ecommerce-platform',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Real-time collaborative task management application with team features.',
    tech: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    slug: 'task-management',
  },
  {
    id: 3,
    title: 'AI Content Generator',
    description: 'AI-powered content generation tool using OpenAI API with custom templates.',
    tech: ['Next.js', 'OpenAI', 'TailwindCSS', 'Vercel'],
    slug: 'ai-content-generator',
  },
]

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current?.children || [], {
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24" data-scroll-section>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold">Featured Projects</h2>
          <Button variant="outline" asChild>
            <Link href="/projects">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <Card
              key={project.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader>
                <CardTitle className="group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/projects/${project.slug}`}>
                      View Details
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
