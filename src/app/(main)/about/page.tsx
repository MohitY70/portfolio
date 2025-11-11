import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'

const skills = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'MongoDB',
  'Prisma', 'TailwindCSS', 'GSAP', 'REST APIs', 'GraphQL', 'Docker',
  'Git', 'CI/CD', 'AWS', 'Vercel',
]

const experience = [
  {
    title: 'Senior Full Stack Developer',
    company: 'Tech Company',
    period: '2022 - Present',
    description: 'Leading development of modern web applications using Next.js and TypeScript.',
  },
  {
    title: 'Full Stack Developer',
    company: 'Startup XYZ',
    period: '2020 - 2022',
    description: 'Built and maintained multiple web applications and APIs.',
  },
  {
    title: 'Junior Developer',
    company: 'Web Agency',
    period: '2018 - 2020',
    description: 'Developed client websites and learned modern web development practices.',
  },
]

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
          <p className="text-xl text-muted-foreground">
            Learn more about my journey, skills, and experience
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-12">
          <div className="prose prose-lg max-w-none">
            <p>
              Hi! I'm <strong>{'{YOUR_NAME}'}</strong>, a passionate full-stack developer with
              {'{X}'} years of experience building modern web applications. I specialize in
              creating elegant, performant, and user-friendly digital experiences.
            </p>
            <p>
              My journey in tech started in {'{YEAR}'}, and since then, I've worked on various
              projects ranging from small startups to enterprise applications. I believe in
              writing clean, maintainable code and staying updated with the latest technologies.
            </p>
            <p>
              When I'm not coding, you can find me {'{HOBBY}'}, contributing to open-source
              projects, or sharing my knowledge through blog posts and technical articles.
            </p>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Skills & Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-sm px-3 py-1">
                {skill}
              </Badge>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                    <Badge variant="outline">{exp.period}</Badge>
                  </div>
                  <p className="text-primary font-medium mb-2">{exp.company}</p>
                  <p className="text-muted-foreground">{exp.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
          <p className="text-muted-foreground mb-6">
            Feel free to reach out if you'd like to collaborate on a project or just want to
            say hi!
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:your@email.com"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail className="h-5 w-5" />
              Email
            </a>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              LinkedIn
            </a>
            <a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <Twitter className="h-5 w-5" />
              Twitter
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
