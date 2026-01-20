import { Router } from 'express'
import { createPostController, getPostsController } from '../controllers/post.controller'

const router = Router()

router.post('/', createPostController)
router.get('/', getPostsController)

export default router
