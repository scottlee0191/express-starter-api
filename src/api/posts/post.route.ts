import express from 'express'

import { validate } from '../../middlewares'
import { destroy, index, save, show, update } from './post.handler'
import { postSchema } from './post.schema'

const router = express.Router()

router.get('/', index)
router.post('/', validate(postSchema), save)
router.put('/:id', validate(postSchema), update)
router.get('/:id', show)
router.delete('/:id', destroy)

export default router
