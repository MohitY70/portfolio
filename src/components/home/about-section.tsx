'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24" data-scroll-section>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>
          <div className="space-y-6 text-lg text-muted-foreground">
            <p>
              I'm a passionate full-stack developer with expertise in building modern web
              applications. With {'{X}'} years of experience, I specialize in creating
              elegant, performant, and user-friendly digital experiences.
            </p>
            <p>
              My journey in tech started {'{YEAR}'}, and since then, I've worked on various
              projects ranging from small startups to enterprise applications. I believe in
              writing clean, maintainable code and staying updated with the latest
              technologies.
            </p>
            <p>
              When I'm not coding, you can find me {'{HOBBY}'}, contributing to open-source
              projects, or sharing my knowledge through blog posts and technical articles.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
