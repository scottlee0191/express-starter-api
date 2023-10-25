/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { AnyZodObject, ZodError } from 'zod'

import type ErrorResponse from './interfaces/ErrorResponse'

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404)
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`)
  next(error)
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  if (err instanceof ZodError) {
    res.status(422)
    return res.json(err.format().body)
  }
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  })
}

export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      return next()
    } catch (error) {
      next(error)
    }
  }

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers
    const token = authorization?.split(' ')[1]
    if (token) {
      req.user = jwt.verify(token, process.env.JWT_SECRET ?? '')
      return next()
    }
    throw new Error('Unauthorized!')
  } catch (error) {
    res.status(401)
    next(error)
  }
}
