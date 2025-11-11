import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-24" data-scroll-section>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center glass rounded-3xl p-12 border-2 border-primary/20">
          <h2 className="text-4xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Have a project in mind? Let's discuss how I can help bring your ideas to life.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Learn More About Me</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
