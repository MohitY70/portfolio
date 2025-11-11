import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: '{YOUR_NAME} - Full Stack Developer & Designer',
    template: '%s | {YOUR_NAME}',
  },
  description:
    'Portfolio and blog of {YOUR_NAME}, a full-stack developer crafting elegant digital experiences.',
  keywords: ['portfolio', 'blog', 'developer', 'designer', 'full-stack', 'web development'],
  authors: [{ name: '{YOUR_NAME}' }],
  creator: '{YOUR_NAME}',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yoursite.com',
    title: '{YOUR_NAME} - Full Stack Developer & Designer',
    description:
      'Portfolio and blog of {YOUR_NAME}, a full-stack developer crafting elegant digital experiences.',
    siteName: '{YOUR_NAME}',
  },
  twitter: {
    card: 'summary_large_image',
    title: '{YOUR_NAME} - Full Stack Developer & Designer',
    description:
      'Portfolio and blog of {YOUR_NAME}, a full-stack developer crafting elegant digital experiences.',
    creator: '@{YOUR_TWITTER}',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
