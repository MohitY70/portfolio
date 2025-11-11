import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Create admin user
  const adminPassword = await hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  })
  console.log('✅ Admin user created:', admin.email)

  // Create sample blog posts
  const posts = [
    {
      title: 'Getting Started with Next.js 14',
      slug: 'getting-started-nextjs-14',
      excerpt:
        'Learn how to build modern web applications with Next.js 14 and the App Router.',
      contentMdx: `# Getting Started with Next.js 14

Next.js 14 introduces powerful new features that make building web applications easier and faster.

## Key Features

- **App Router**: A new way to structure your applications
- **Server Components**: Improved performance with React Server Components
- **Partial Prerendering**: Combine static and dynamic rendering
- **Improved Performance**: Faster builds and better optimizations

## Installation

\`\`\`bash
npx create-next-app@latest my-app
\`\`\`

## Conclusion

Next.js 14 is a game-changer for modern web development.`,
      coverUrl: '/images/blog/nextjs.jpg',
      tags: ['Next.js', 'React', 'Web Development'],
      status: 'PUBLISHED',
      publishedAt: new Date('2024-01-15'),
    },
    {
      title: 'Building Beautiful UIs with Tailwind CSS',
      slug: 'building-beautiful-uis-tailwind',
      excerpt:
        'Discover how to create stunning user interfaces quickly using Tailwind CSS.',
      contentMdx: `# Building Beautiful UIs with Tailwind CSS

Tailwind CSS is a utility-first CSS framework that makes styling easy and maintainable.

## Why Tailwind?

- Fast development
- Consistent design system
- Easy customization
- Great developer experience

## Example

\`\`\`jsx
<div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg">
  <h2 className="text-xl font-bold">Hello Tailwind!</h2>
</div>
\`\`\``,
      coverUrl: '/images/blog/tailwind.jpg',
      tags: ['Tailwind CSS', 'CSS', 'Design'],
      status: 'PUBLISHED',
      publishedAt: new Date('2024-01-20'),
    },
    {
      title: 'TypeScript Best Practices',
      slug: 'typescript-best-practices',
      excerpt:
        'Learn essential TypeScript patterns and practices for better code quality.',
      contentMdx: `# TypeScript Best Practices

TypeScript helps catch errors early and improves code quality.

## Key Practices

1. Use strict mode
2. Avoid \`any\` type
3. Leverage type inference
4. Use interfaces and types appropriately

## Example

\`\`\`typescript
interface User {
  id: string
  name: string
  email: string
}

function getUser(id: string): Promise<User> {
  // implementation
}
\`\`\``,
      coverUrl: '/images/blog/typescript.jpg',
      tags: ['TypeScript', 'Programming', 'Best Practices'],
      status: 'PUBLISHED',
      publishedAt: new Date('2024-02-01'),
    },
  ]

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    })
  }
  console.log('✅ Sample posts created')

  // Create sample projects
  const projects = [
    {
      title: 'E-Commerce Platform',
      slug: 'ecommerce-platform',
      shortDescription:
        'A full-stack e-commerce platform with payment integration and admin dashboard.',
      longDescriptionMdx: `# E-Commerce Platform

A complete e-commerce solution built with modern technologies.

## Features

- Product catalog with search and filters
- Shopping cart and checkout
- Stripe payment integration
- Admin dashboard for managing products
- Order tracking and management
- User authentication

## Tech Stack

- Next.js 14
- TypeScript
- Prisma + PostgreSQL
- Stripe
- Tailwind CSS`,
      bannerUrl: '/images/projects/ecommerce.jpg',
      gallery: [
        '/images/projects/ecommerce-1.jpg',
        '/images/projects/ecommerce-2.jpg',
        '/images/projects/ecommerce-3.jpg',
      ],
      techStack: ['Next.js', 'TypeScript', 'Stripe', 'Prisma', 'PostgreSQL'],
      repoUrl: 'https://github.com/yourusername/ecommerce',
      liveUrl: 'https://ecommerce-demo.vercel.app',
      featured: true,
      order: 1,
    },
    {
      title: 'Task Management App',
      slug: 'task-management-app',
      shortDescription:
        'Real-time collaborative task management application with team features.',
      longDescriptionMdx: `# Task Management App

A powerful task management tool for teams.

## Features

- Real-time collaboration
- Task boards with drag & drop
- Team management
- Comments and attachments
- Activity tracking

## Tech Stack

- React
- Node.js
- Socket.io
- MongoDB
- Express`,
      bannerUrl: '/images/projects/taskmanager.jpg',
      gallery: [
        '/images/projects/taskmanager-1.jpg',
        '/images/projects/taskmanager-2.jpg',
      ],
      techStack: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express'],
      repoUrl: 'https://github.com/yourusername/taskmanager',
      liveUrl: 'https://taskmanager-demo.vercel.app',
      featured: true,
      order: 2,
    },
    {
      title: 'AI Content Generator',
      slug: 'ai-content-generator',
      shortDescription:
        'AI-powered content generation tool using OpenAI API with custom templates.',
      longDescriptionMdx: `# AI Content Generator

Generate high-quality content using AI.

## Features

- Multiple content templates
- OpenAI GPT-4 integration
- Custom prompts
- Export options
- History tracking

## Tech Stack

- Next.js
- OpenAI API
- TailwindCSS
- Vercel`,
      bannerUrl: '/images/projects/ai-content.jpg',
      gallery: ['/images/projects/ai-content-1.jpg'],
      techStack: ['Next.js', 'OpenAI', 'TypeScript', 'TailwindCSS'],
      repoUrl: 'https://github.com/yourusername/ai-content',
      liveUrl: 'https://ai-content-demo.vercel.app',
      featured: true,
      order: 3,
    },
  ]

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    })
  }
  console.log('✅ Sample projects created')

  console.log('🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
