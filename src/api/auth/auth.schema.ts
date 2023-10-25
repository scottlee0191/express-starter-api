import z from 'zod'

import prisma from '../../prisma'

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
  }),
})

export const registerSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email()
      .refine(async (email: string) => {
        return !(await prisma.user.findFirst({ where: { email } }))
      }),
    password: z.string().min(8),
  }),
})
