import express from 'express'

import { isAuth, validate } from '../../middlewares'
import { login, me, refreshToken, register } from './auth.handler'
import { loginSchema, registerSchema } from './auth.schema'

const router = express.Router()

router.post('/login', validate(loginSchema), login)
router.post('/register', validate(registerSchema), register)
router.post('/refreshToken', refreshToken)
router.get('/me', isAuth, me)

export default router
