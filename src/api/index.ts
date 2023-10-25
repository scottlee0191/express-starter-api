import express from 'express'

import MessageResponse from '../interfaces/MessageResponse'
import authRouter from './auth/auth.route'
import postRouter from './posts/post.route'

const router = express.Router()

router.get<object, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - V1',
  })
})

router.use('/posts', postRouter)
router.use('/auth', authRouter)

export default router
