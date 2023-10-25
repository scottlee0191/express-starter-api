import { NextFunction, Request, Response } from 'express'

import { loginUser, refreshTokenUser, registerUser } from './auth.service'

export async function login(req: Request, res: Response, next: NextFunction) {
  return res.json(await loginUser(req, res, next))
}

export async function register(req: Request, res: Response) {
  return res.json(await registerUser(req))
}

export async function refreshToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  return res.json(await refreshTokenUser(req, res, next))
}

export async function me(req: Request, res: Response) {
  return res.json(req.user)
}
