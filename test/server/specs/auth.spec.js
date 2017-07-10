const app = require('../../../index')
const request = require('supertest')
const expect = require('chai').expect

describe('API: Authentication', () => {
  describe('POST /api/auth', () => {
    it('returns a JWT when given valid credentials', (done) => {
      const user = {email: 'user@domain.com', password: '12345678'}

      request(app)
        .post('/api/auth')
        .send(user)
        .expect(200)
        .end((err, res) => {
          expect(res.headers).to.have.property('authorization')
          expect(res.body.token).to.be.a('string')
          expect(res.body).to.have.property('token')
          expect(res.body.token).to.be.a('string')
          done()
        })
    })

    it('validates email address and password', (done) => {
      const user = {email: 'not_an_email'}

      request(app)
        .post('/api/auth')
        .send(user)
        .expect(400, done)
    })

    it('returns an unauthorized response when email does not exist', (done) => {
      const user = {email: 'invalid@domain.com', password: '12345878'}

      request(app)
        .post('/api/auth')
        .send(user)
        .expect(401, done)
    })

    it('returns an unauthorized response when given incorrect password', (done) => {
      const user = {email: 'user@domain.com', password: 'incorrect_password'}

      request(app)
        .post('/api/auth')
        .send(user)
        .expect(401, done)
    })
  })
})
