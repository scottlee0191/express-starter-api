import request from 'supertest'
import { describe, expect, test } from 'vitest'

import app from '../app'

let postId: number
const titleUpdate = 'update title'

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
    postId = res.body.id
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

  test('should validate not found when update', async () => {
    await request(app)
      .put(`/api/v1/posts/99999`)
      .set('Accept', 'application/json')
      .send({ title: titleUpdate, authorId: 1 })
      .expect('Content-Type', /json/)
      .expect(400)
  })

  test('should validate when update', async () => {
    const res = await request(app)
      .put(`/api/v1/posts/${postId}`)
      .set('Accept', 'application/json')
      .send()
      .expect('Content-Type', /json/)
      .expect(422)
    expect(res.body.title._errors.length).toBe(1)
    expect(res.body.authorId._errors.length).toBe(1)
  })

  test('should update success', async () => {
    const res = await request(app)
      .put(`/api/v1/posts/${postId}`)
      .set('Accept', 'application/json')
      .send({ title: titleUpdate, authorId: 1 })
      .expect('Content-Type', /json/)
      .expect(200)
    expect(res.body.title).toBe(titleUpdate)
  })

  test('should get individual posts', async () => {
    const res = await request(app)
      .get(`/api/v1/posts/${postId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
    expect(res.body.title).toBe(titleUpdate)
  })

  test('should get individual posts', async () => {
    await request(app)
      .get(`/api/v1/posts/233333`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
  })

  test('should not delete not found post', async () => {
    await request(app)
      .delete(`/api/v1/posts/222222`)
      .set('Accept', 'application/json')
      // .expect('Content-Type', /json/)
      .expect(400)
  })

  test('should delete post', async () => {
    await request(app)
      .delete(`/api/v1/posts/${postId}`)
      .set('Accept', 'application/json')
      // .expect('Content-Type', /json/)
      .expect(204)
  })
})
