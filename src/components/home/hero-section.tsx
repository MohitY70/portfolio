'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Github, Linkedin } from 'lucide-react'
import { gsap } from '@/lib/gsap'

const skills = ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'GSAP']

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const badgesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      tl.from(titleRef.current, {
        opacity: 0,
        y: 100,
        duration: 1.2,
      })
        .from(
          subtitleRef.current,
          {
            opacity: 0,
            y: 50,
            duration: 0.8,
          },
          '-=0.6'
        )
        .from(
          buttonsRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.6,
          },
          '-=0.4'
        )
        .from(
          badgesRef.current?.children || [],
          {
            opacity: 0,
            scale: 0.8,
            duration: 0.5,
            stagger: 0.1,
          },
          '-=0.4'
        )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-pink-500/10" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1
            ref={titleRef}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight"
          >
            Hi, I'm{' '}
            <span className="gradient-text">{'{YOUR_NAME}'}</span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto"
          >
            A full-stack developer crafting{' '}
            <span className="text-primary font-semibold">elegant</span> and{' '}
            <span className="text-primary font-semibold">performant</span> digital
            experiences.
          </p>

          <div ref={buttonsRef} className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/projects">
                View Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/blog">Read Blog</Link>
            </Button>
            <Button size="lg" variant="ghost" asChild>
              <Link href="/contact">Contact Me</Link>
            </Button>
          </div>

          <div ref={badgesRef} className="flex flex-wrap gap-2 justify-center pt-8">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-sm px-3 py-1">
                {skill}
              </Badge>
            ))}
          </div>

          <div className="flex gap-4 justify-center pt-4">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2" />
        </div>
      </div>
    </section>
  )
}
