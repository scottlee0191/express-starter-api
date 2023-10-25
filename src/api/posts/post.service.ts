import { NextFunction, Request, Response } from 'express'

import prisma from '../../prisma'

export async function getPosts(req: Request) {
  const cursor = req.query.cursor
  const cursorObject = cursor
    ? {
        id: +cursor,
      }
    : undefined
  return await prisma.post.findMany({
    take: +(process.env.PAGINATION ?? 10),
    skip: cursorObject ? 1 : 0,
    cursor: cursorObject,
    orderBy: {
      id: 'desc',
    },
  })
}

export async function savePost(req: Request) {
  return await prisma.post.create({ data: req.body })
}

export async function updatePost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    return await prisma.post.update({
      where: { id: +req.params.id },
      data: req.body,
    })
  } catch (error) {
    res.status(400)
    next(error)
  }
}

export async function showPost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const post = await prisma.post.findFirst({
    where: { id: +req.params.id },
  })
  if (!post) {
    res.status(400)
    return next(new Error('Not Found!'))
  }
  return post
}

export async function destroyPost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const post = await prisma.post.deleteMany({
    where: { id: +req.params.id },
  })
  if (post.count) {
    return res.status(204)
  }
  res.status(400)
  next(new Error('Not Found!'))
}
