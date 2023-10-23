import { Request } from 'express'

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
