import express from 'express'

import MessageResponse from '../interfaces/MessageResponse'
import postRouter from './posts/post.route'

const router = express.Router()

router.get<object, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - V1',
  })
})

router.use('/posts', postRouter)

export default router
