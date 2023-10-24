import { NextFunction, Request, Response } from 'express'

import {
  destroyPost,
  getPosts,
  savePost,
  showPost,
  updatePost,
} from './post.service'

export async function index(req: Request, res: Response) {
  res.json(await getPosts(req))
}

export async function save(req: Request, res: Response) {
  res.status(201).json(await savePost(req))
}

export async function update(req: Request, res: Response, next: NextFunction) {
  res.json(await updatePost(req, res, next))
}

export async function show(req: Request, res: Response, next: NextFunction) {
  res.json(await showPost(req, res, next))
}

export async function destroy(req: Request, res: Response, next: NextFunction) {
  await destroyPost(req, res, next)
  res.json()
}
