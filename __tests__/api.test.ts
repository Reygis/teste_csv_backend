import app from '../src/app'
import request from 'supertest'
import appRoot from 'app-root-path'

describe('Api route tests', () => {
  test('POST route', async () => {
    await request(app)
      .post('/api/files')
      .attach('test',`${appRoot}/__tests__/test.txt`)
      .expect(200)
      .expect('Content-Type', /json/)
  })

  test('GET route, sending ?q=name', async () => {
    await request(app)
      .get(`/api/users?q=name`)
      .expect(200)
      .expect('Content-Type', /json/)
  })
})
