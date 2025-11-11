'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, MessageSquare, Send } from 'lucide-react'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      // TODO: Implement actual email sending
      // For now, just simulate submission
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Form data:', data)
      setSubmitted(true)
      reset()
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-muted-foreground">
            Have a project in mind? Let's talk about it!
          </p>
        </div>

        {submitted ? (
          <Card className="glass border-2 border-primary/20">
            <CardContent className="p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Send className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Message Sent!</h2>
              <p className="text-muted-foreground mb-6">
                Thank you for reaching out. I'll get back to you as soon as possible.
              </p>
              <Button onClick={() => setSubmitted(false)}>Send Another Message</Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="glass border-2">
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>
                Fill out the form below and I'll get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    {...register('name')}
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    {...register('email')}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell me about your project..."
                    rows={6}
                    {...register('message')}
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive">{errors.message.message}</p>
                  )}
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Alternative Contact */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Or reach out directly:</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="mailto:your@email.com"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-5 w-5" />
              your@email.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
