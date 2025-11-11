import { getServerSession } from 'next-auth'
import { authOptions } from './auth'
import { redirect } from 'next/navigation'

export async function getSession() {
  return await getServerSession(authOptions)
}

export async function getCurrentUser() {
  const session = await getSession()
  return session?.user
}

export async function requireAuth() {
  const session = await getSession()
  if (!session) {
    redirect('/auth/signin')
  }
  return session
}

export async function requireAdmin() {
  const session = await getSession()
  if (!session) {
    redirect('/auth/signin')
  }
  if (session.user?.role !== 'ADMIN') {
    redirect('/')
  }
  return session
}

export async function requireEditor() {
  const session = await getSession()
  if (!session) {
    redirect('/auth/signin')
  }
  if (session.user?.role !== 'ADMIN' && session.user?.role !== 'EDITOR') {
    redirect('/')
  }
  return session
}
