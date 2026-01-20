import { prisma } from '../lib/prisma'
import type { PostCreateInput, PostUpdateInput } from '../types'

export async function createPost(data: PostCreateInput) {
  return prisma.post.create({ data })
}

export async function getUserPosts(userId: string, status?: string) {
  return prisma.post.findMany({
    where: { authorId: userId, status },
    orderBy: { scheduledAt: 'asc' }
  })
}

export async function updatePostStatus(id: string, status: string, publishedAt?: Date) {
  return prisma.post.update({
    where: { id },
    data: { status, publishedAt, retryCount: { increment: 1 } }
  })
}
