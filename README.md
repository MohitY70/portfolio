# Portfolio Website

A production-ready portfolio website with blog and admin functionality built with Next.js 14, featuring elegant animations, MDX blog posts, and a complete admin dashboard.

## ✨ Features

- 🎨 **Modern Design**: Glassmorphism, smooth animations with GSAP, dark/light mode
- 📝 **Blog System**: MDX-powered blog with syntax highlighting, tags, and search
- 💼 **Portfolio Showcase**: Project gallery with detailed case studies
- 🔐 **Admin Dashboard**: Full CRUD for posts and projects with rich MDX editor
- 🎭 **Role-Based Auth**: NextAuth with email/password and OAuth (GitHub, Google)
- 📱 **Responsive**: Mobile-first design that works on all devices
- ⚡ **Performance**: Optimized for Core Web Vitals, server components
- 🔍 **SEO Optimized**: Meta tags, Open Graph, sitemap, structured data

## 🚀 Tech Stack

### Core
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: GSAP with ScrollTrigger
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: NextAuth v5

### Features
- **Content**: MDX with rehype-pretty-code
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Date**: date-fns
- **Theme**: next-themes

### Development
- **Testing**: Playwright (E2E) + Vitest (Unit)
- **Linting**: ESLint + Prettier
- **CI/CD**: GitHub Actions

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Git

### Setup

1. **Clone the repository**

\`\`\`bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
\`\`\`

2. **Install dependencies**

\`\`\`bash
npm install
\`\`\`

3. **Set up environment variables**

Copy the example env file:

\`\`\`bash
cp .env.example .env
\`\`\`

Update `.env` with your values:

\`\`\`env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key" # Generate: openssl rand -base64 32

# OAuth (Optional)
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
\`\`\`

4. **Set up the database**

\`\`\`bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed the database with sample data
npm run prisma:seed
\`\`\`

The seed script creates:
- Admin user: `admin@example.com` / `admin123`
- 3 sample blog posts
- 3 sample projects

5. **Start the development server**

\`\`\`bash
npm run dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000)

## 📝 Development

### Available Scripts

\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
npm run format       # Format code with Prettier
npm test             # Run Vitest unit tests
npm run test:e2e     # Run Playwright E2E tests
npm run prisma:studio # Open Prisma Studio
\`\`\`

### Project Structure

\`\`\`
portfolio/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed script
├── public/
│   ├── images/            # Static images
│   └── uploads/           # Uploaded files
├── src/
│   ├── app/               # Next.js app directory
│   │   ├── (main)/        # Main site pages
│   │   ├── admin/         # Admin dashboard
│   │   ├── api/           # API routes
│   │   └── auth/          # Auth pages
│   ├── components/        # React components
│   │   ├── home/          # Homepage sections
│   │   ├── layout/        # Layout components
│   │   ├── mdx/           # MDX components
│   │   └── ui/            # shadcn/ui components
│   ├── lib/               # Utilities
│   │   ├── auth.ts        # NextAuth config
│   │   ├── db.ts          # Prisma client
│   │   ├── gsap.ts        # GSAP utilities
│   │   └── mdx.ts         # MDX utilities
│   └── types/             # TypeScript types
├── .env.example           # Environment variables template
└── README.md              # This file
\`\`\`

## 🎨 Customization

### Branding

Replace placeholders throughout the codebase:
- `{YOUR_NAME}` - Your name
- `{YOUR_EMAIL}` - Your email
- `{YOUR_TWITTER}` - Your Twitter handle
- Update social links in `src/components/layout/footer.tsx`
- Update meta tags in `src/app/layout.tsx`

### Content

1. **Blog Posts**: Use the admin dashboard at `/admin` or edit via API
2. **Projects**: Manage via admin dashboard
3. **Homepage**: Edit sections in `src/components/home/`
4. **About Page**: Update content in about page component

### Styling

- **Colors**: Edit Tailwind config in `tailwind.config.ts`
- **Fonts**: Update in `src/app/layout.tsx`
- **Animations**: Customize in `src/lib/gsap.ts`

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

Vercel will automatically:
- Build the project
- Set up PostgreSQL (add Vercel Postgres)
- Deploy with zero config

### Docker

\`\`\`bash
# Build image
docker build -t portfolio .

# Run container
docker run -p 3000:3000 portfolio
\`\`\`

## 🔐 Admin Access

After seeding, access the admin dashboard:

- URL: `http://localhost:3000/admin`
- Email: `admin@example.com`
- Password: `admin123`

**⚠️ Important**: Change the default password in production!

## 📊 Database Schema

### Main Models

- **User**: Authentication and authorization
- **Post**: Blog posts with MDX content
- **Project**: Portfolio projects
- **Account/Session**: NextAuth tables

See `prisma/schema.prisma` for full schema.

## 🧪 Testing

### Unit Tests

\`\`\`bash
npm test
\`\`\`

### E2E Tests

\`\`\`bash
npm run test:e2e
\`\`\`

## 🎯 Performance

This site is optimized for:
- ✅ Lighthouse Score 95+
- ✅ Core Web Vitals
- ✅ SEO Best Practices
- ✅ Accessibility Standards

## 📄 License

MIT License - feel free to use this for your own portfolio!

## 🤝 Contributing

Contributions are welcome! Please open an issue or PR.

## 📬 Contact

- Website: [yoursite.com](https://yoursite.com)
- Email: your@email.com
- Twitter: [@yourhandle](https://twitter.com/yourhandle)
- LinkedIn: [yourprofile](https://linkedin.com/in/yourprofile)

---

Built with ❤️ using Next.js 14
