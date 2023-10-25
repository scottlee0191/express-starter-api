import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import prisma from '../../prisma'

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body

  const user = await prisma.user.findFirst({ where: { email } })
  if (user) {
    if (!(await bcrypt.compare(password, user.password))) {
      return next(new Error('Wrong password!'))
    }
    delete user.password

    return getTokens(user)
  }
  res.status(403)
  return next(new Error('User not found!'))
}

export async function registerUser(req: Request) {
  const { email, password, name } = req.body
  const hashPassword = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: { email, password: hashPassword, name },
  })
  delete user.password

  return getTokens(user)
}

export async function refreshTokenUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { refreshToken } = req.body
  console.log(refreshToken)
  if (!refreshToken) {
    res.status(401)
    return next(new Error('Missing refresh token.'))
  }
  const payload = jwt.verify(refreshToken, process.env.JWT_SECRET ?? '')

  return getTokens(payload.user)
}

function getTokens(
  user: {
    id: number
    email: string
    password: string
    name: string | null
  } | null
) {
  const token = jwt.sign({ user }, process.env.JWT_SECRET ?? '', {
    expiresIn: '5m',
  })
  const refreshToken = jwt.sign({ user }, process.env.JWT_SECRET ?? '', {
    expiresIn: '8h',
  })
  return { token, refreshToken }
}
