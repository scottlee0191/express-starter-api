import request from 'supertest'
import { describe, expect, test } from 'vitest'

import app from '../app'

describe('GET posts /', () => {
  test('get posts cursor base', async () => {
    const res = await request(app)
      .get('/api/v1/posts')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body.length).toBe(+(process.env.PAGINATION ?? 10))
  })

  test('create posts', async () => {
    const title = 'John Doe'

    const res = await request(app)
      .post('/api/v1/posts')
      .set('Accept', 'application/json')
      .send({
        title,
        authorId: 1,
      })
      .expect('Content-Type', /json/)
      .expect(201)

    expect(res.body.title).toBe(title)
  })

  test('should validate when create post', async () => {
    const res = await request(app)
      .post('/api/v1/posts')
      .set('Accept', 'application/json')
      .send()
      .expect('Content-Type', /json/)
      .expect(422)
    expect(res.body.title._errors.length).toBe(1)
    expect(res.body.authorId._errors.length).toBe(1)
  })
})
