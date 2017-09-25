const app = require('../../../index')
const request = require('supertest')

describe('API: Index', () => {
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
