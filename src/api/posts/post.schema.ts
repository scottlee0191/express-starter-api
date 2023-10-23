import z from 'zod'

export const postSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    authorId: z.number(),
  }),
})
