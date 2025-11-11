'use client'

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Quote } from 'lucide-react'
import { gsap } from '@/lib/gsap'

const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    role: 'CEO at TechCorp',
    content:
      'Exceptional work! The attention to detail and technical expertise delivered results beyond our expectations.',
    avatar: '/images/avatars/avatar-1.jpg',
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Product Manager',
    content:
      'A true professional who understands both technical and business requirements. Highly recommended!',
    avatar: '/images/avatars/avatar-2.jpg',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    role: 'CTO at StartupXYZ',
    content:
      'Outstanding developer with excellent communication skills. Made our project a great success.',
    avatar: '/images/avatars/avatar-3.jpg',
  },
]

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-muted/30" data-scroll-section>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">What People Say</h2>

        <div className="max-w-3xl mx-auto">
          <Card className="glass border-2">
            <CardContent className="p-8">
              <Quote className="h-8 w-8 text-primary mb-4" />
              <p className="text-lg mb-6 italic">{testimonials[activeIndex].content}</p>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg font-semibold text-primary">
                    {testimonials[activeIndex].name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold">{testimonials[activeIndex].name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonials[activeIndex].role}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === activeIndex ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
