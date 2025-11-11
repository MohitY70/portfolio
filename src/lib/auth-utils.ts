import { auth } from './auth'
import { redirect } from 'next/navigation'

export async function getSession() {
  return await auth()
}

export async function getCurrentUser() {
  const session = await auth()
  return session?.user
}

export async function requireAuth() {
  const session = await auth()
  if (!session) {
    redirect('/auth/signin')
  }
  return session
}

export async function requireAdmin() {
  const session = await auth()
  if (!session) {
    redirect('/auth/signin')
  }
  if (session.user?.role !== 'ADMIN') {
    redirect('/')
  }
  return session
}

export async function requireEditor() {
  const session = await auth()
  if (!session) {
    redirect('/auth/signin')
  }
  if (session.user?.role !== 'ADMIN' && session.user?.role !== 'EDITOR') {
    redirect('/')
  }
  return session
}
