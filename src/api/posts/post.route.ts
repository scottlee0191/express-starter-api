import express from 'express'

import { validate } from '../../middlewares'
import { index, save } from './post.handler'
import { postSchema } from './post.schema'

const router = express.Router()

router.get('/', index)
router.post('/', validate(postSchema), save)

export default router
