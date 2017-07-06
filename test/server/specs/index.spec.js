const app = require('../../../index')
const request = require('supertest')

describe('Index API Routes', () => {
  describe('GET /api', () => {
    it('returns a json response', (done) => {
      request(app)
        .get('/api')
        .expect('Content-Type', /json/)
        .expect(200, {
          success: true
        },
        done)
    })
  })
})
