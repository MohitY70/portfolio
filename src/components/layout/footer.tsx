import Link from 'next/link'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

const socialLinks = [
  { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com/yourusername', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:your@email.com', label: 'Email' },
]

const footerLinks = {
  main: [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/projects', label: 'Projects' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold gradient-text">{'{YOUR_NAME}'}</h3>
            <p className="text-sm text-muted-foreground">
              Full-stack developer crafting elegant digital experiences.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.main.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to get notified about new posts and projects.
            </p>
            <Link
              href="/contact"
              className="text-sm text-primary hover:underline"
            >
              Get in touch →
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {'{YOUR_NAME}'}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
