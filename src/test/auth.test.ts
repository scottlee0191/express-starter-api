import { faker } from '@faker-js/faker'
import request from 'supertest'
import { describe, expect, test } from 'vitest'

import app from '../app'

const password = 'password'
const email = faker.internet.email()
const user = { password, email }
let token = ''
let refreshToken = ''

describe('GET posts /', () => {
  test('register user should validate', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send()
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    expect(res.body.email._errors.length).toBe(1)
    expect(res.body.password._errors.length).toBe(1)
  })

  test('register user success', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body.refreshToken).toBeDefined()
    expect(res.body.token).toBeDefined()
  })

  test('login user should validate', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send()
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    expect(res.body.email._errors.length).toBe(1)
    expect(res.body.password._errors.length).toBe(1)
  })

  test('login user success', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body.refreshToken).toBeDefined()
    expect(res.body.token).toBeDefined()
    token = res.body.token
    refreshToken = res.body.refreshToken
  })

  test('get user not authentication', async () => {
    await request(app)
      .get('/api/v1/auth/me')
      .set({ authorization: `Bearer fake` })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
  })

  test('get user authentication', async () => {
    const res = await request(app)
      .get('/api/v1/auth/me')
      .set({ authorization: `Bearer ${token}` })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body.user.id).toBeDefined()
    expect(res.body.user.email).toBe(user.email)
  })

  test('should validate refresh token', async () => {
    await request(app)
      .post('/api/v1/auth/refreshToken')
      .set({ authorization: `Bearer ssss` })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
  })

  test('refresh token success', async () => {
    const res = await request(app)
      .post('/api/v1/auth/refreshToken')
      .send({ refreshToken })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(res.body.refreshToken).toBeDefined()
    expect(res.body.token).toBeDefined()
  })
})
