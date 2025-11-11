import { Post, Project, User } from '@prisma/client'

export type { Post, Project, User }

export interface PostWithMetadata extends Post {
  readingTime: string
}

export interface ProjectWithMetadata extends Project {
  readingTime?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface BlogSearchParams {
  query?: string
  tag?: string
  page?: number
  limit?: number
}

export interface ProjectFilterParams {
  featured?: boolean
  tech?: string
  page?: number
  limit?: number
}
