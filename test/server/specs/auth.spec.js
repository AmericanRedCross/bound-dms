const app = require('../../../index')
const request = require('supertest')
const expect = require('chai').expect
const jwt = require('jsonwebtoken')
const config = require('../../../server/config')

describe('API: Authentication', () => {
  describe('POST /api/auth', () => {
    it('returns a JWT when given valid credentials', (done) => {
      const user = {email: 'user@domain.com', password: '12345678'}

      request(app)
        .post('/api/auth')
        .send(user)
        .expect(200)
        .end((err, res) => {
          if (err) throw err
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

    it('returns a JWT expiring in 24 hours', (done) => {
      const user = {email: 'user@domain.com', password: '12345678'}

      request(app)
        .post('/api/auth')
        .send(user)
        .end((err, res) => {
          if (err) throw err
          const token = jwt.verify(res.body.token, config.jwtSecretKey)
          const now = Math.floor(new Date() / 1000)
          const diff = token.exp - now
          expect(token.exp).to.be.above(now)
          expect(Math.floor(diff / 3600)).to.be.equal(24)

          done()
        })
    })
  })

  describe('GET /api/auth/refresh', () => {
    beforeEach(() => {
      this.token = jwt.sign({sub: 1}, config.jwtSecretKey, {expiresIn: '1 day'})
    })

    it('returns 401 unauthorized if no token is supplied', (done) => {
      request(app)
      .get('/api/auth/refresh')
      .expect(401, done)
    })

    it('returns 401 unauthorized if an invalid token is supplied', (done) => {
      request(app)
      .get('/api/auth/refresh')
      .set('Authorization', 'Bearer some_invalid_token')
      .expect(401, done)
    })

    it('returns 401 unauthorized if token has expired', (done) => {
      const token = jwt.sign({
        sub: 1,
        exp: Math.floor(Date.now() / 1000) - (60 * 60)
      }, config.jwtSecretKey)

      request(app)
      .get('/api/auth/refresh')
      .set('Authorization', 'Bearer ' + token)
      .expect(401, done)
    })

    it('returns a new token in response json if supplied a valid token', (done) => {
      request(app)
      .get('/api/auth/refresh')
      .set('Authorization', 'Bearer ' + this.token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) throw err
        expect(res.headers).to.have.property('authorization')
        expect(res.body).to.have.property('token')
        done()
      })
    })
  })
})
