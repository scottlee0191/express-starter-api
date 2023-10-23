import { Request, Response } from 'express'

import { getPosts, savePost } from './post.service'

export async function index(req: Request, res: Response) {
  res.json(await getPosts(req))
}

export async function save(req: Request, res: Response) {
  res.status(201).json(await savePost(req))
}
