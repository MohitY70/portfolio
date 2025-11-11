'use client'

import { useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { gsap } from '@/lib/gsap'
import { Code2, Database, Globe, Palette, Server, Smartphone } from 'lucide-react'

const skillCategories = [
  {
    icon: Globe,
    title: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP'],
  },
  {
    icon: Server,
    title: 'Backend',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'Prisma', 'REST APIs'],
  },
  {
    icon: Database,
    title: 'Database',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma ORM', 'SQL'],
  },
  {
    icon: Code2,
    title: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'Python', 'SQL', 'HTML/CSS'],
  },
  {
    icon: Palette,
    title: 'Design',
    skills: ['Figma', 'UI/UX', 'Responsive Design', 'Animations', 'Accessibility'],
  },
  {
    icon: Smartphone,
    title: 'Tools',
    skills: ['Git', 'Docker', 'VS Code', 'GitHub Actions', 'Vercel'],
  },
]

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current?.children || [], {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-muted/30" data-scroll-section>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">Skills & Expertise</h2>
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => {
            const Icon = category.icon
            return (
              <Card key={category.title} className="glass border-2 hover:border-primary transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{category.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {category.skills.map((skill) => (
                      <li key={skill} className="text-sm text-muted-foreground">
                        • {skill}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
