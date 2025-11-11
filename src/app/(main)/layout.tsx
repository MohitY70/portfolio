import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { GSAPInit } from '@/components/gsap-init'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GSAPInit />
      <Navbar />
      <main className="min-h-screen pt-16">{children}</main>
      <Footer />
    </>
  )
}
