import request from 'supertest'
import { describe, test } from 'vitest'

import app from '../app'

describe('app', () => {
  test('responds with a not found message', async () => {
    await request(app)
      .get('/what-is-this-even')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
  })
})
