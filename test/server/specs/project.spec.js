const app = require('../../../index')
const request = require('supertest')
const expect = require('chai').expect
const jwt = require('jsonwebtoken')
const config = require('../../../server/config')

describe('API: Projects', () => {
  beforeEach(() => {
    this.token = jwt.sign({sub: 1, expiresIn: '1 day'}, config.jwtSecretKey)
  })

  describe('GET /api/projects', () => {
    it('returns a collection of projects', (done) => {
      request(app)
        .get('/api/projects')
        .set('Authorization', 'Bearer ' + this.token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.an('object')
          expect(res.body.status).to.equal(200)
          expect(res.body.data).to.be.an('array')
          expect(res.body.data[0]).to.have.property('id')
          expect(res.body.data[0]).to.have.property('name')
          expect(res.body.data[0]).to.have.property('description')
          expect(res.body.data[0]).to.have.property('createdBy')
          expect(res.body.data[0]).to.have.property('createdAt')
          expect(res.body.data[0]).to.have.property('updatedAt')
          done()
        })
    })
  })
})
