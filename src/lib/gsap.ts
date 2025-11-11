import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export { gsap, ScrollTrigger }

// Animation presets
export const fadeIn = (element: any, delay = 0) => {
  return gsap.from(element, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay,
    ease: 'power3.out',
  })
}

export const fadeInUp = (element: any, delay = 0) => {
  return gsap.from(element, {
    opacity: 0,
    y: 60,
    duration: 1,
    delay,
    ease: 'power4.out',
  })
}

export const scaleIn = (element: any, delay = 0) => {
  return gsap.from(element, {
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    delay,
    ease: 'back.out(1.4)',
  })
}

export const slideInLeft = (element: any, delay = 0) => {
  return gsap.from(element, {
    x: -100,
    opacity: 0,
    duration: 1,
    delay,
    ease: 'power3.out',
  })
}

export const slideInRight = (element: any, delay = 0) => {
  return gsap.from(element, {
    x: 100,
    opacity: 0,
    duration: 1,
    delay,
    ease: 'power3.out',
  })
}

export const staggerFadeIn = (elements: any, stagger = 0.1) => {
  return gsap.from(elements, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger,
    ease: 'power3.out',
  })
}

// Hero text reveal animation
export const textReveal = (element: any) => {
  return gsap.from(element, {
    opacity: 0,
    y: 100,
    duration: 1.2,
    ease: 'power4.out',
  })
}

// Scroll-triggered animations
export const setupScrollAnimations = () => {
  if (typeof window === 'undefined') return

  const sections = document.querySelectorAll('[data-scroll-section]')

  sections.forEach((section) => {
    gsap.from(section, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    })
  })
}

// Magnetic hover effect
export const magneticHover = (element: HTMLElement) => {
  const handleMouseMove = (e: MouseEvent) => {
    const { left, top, width, height } = element.getBoundingClientRect()
    const x = (e.clientX - left - width / 2) / width
    const y = (e.clientY - top - height / 2) / height

    gsap.to(element, {
      x: x * 20,
      y: y * 20,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    })
  }

  element.addEventListener('mousemove', handleMouseMove)
  element.addEventListener('mouseleave', handleMouseLeave)

  return () => {
    element.removeEventListener('mousemove', handleMouseMove)
    element.removeEventListener('mouseleave', handleMouseLeave)
  }
}

// Page transition
export const pageTransition = () => {
  const tl = gsap.timeline()
  tl.to('body', {
    opacity: 0,
    duration: 0.3,
  })
  return tl
}
