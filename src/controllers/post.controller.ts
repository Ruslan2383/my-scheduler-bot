import { Request, Response } from 'express'
import { createPost, getUserPosts } from '../services/post.service'
import { postCreateSchema } from '../utils/validation'

export async function createPostController(req: Request, res: Response) {
  const userId = req.headers['x-user-id'] as string // Простая авторизация
  
  const validated = postCreateSchema.parse({
    ...req.body,
    authorId: userId
  })

  const post = await createPost(validated)
  res.json(post)
}

export async function getPostsController(req: Request, res: Response) {
  const userId = req.headers['x-user-id'] as string
  const { status } = req.query

  const posts = await getUserPosts(userId, status as string)
  res.json(posts)
}
