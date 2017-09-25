const app = require('../../../index')
const request = require('supertest')
const expect = require('chai').expect
const jwt = require('jsonwebtoken')
const config = require('../../../server/config')

describe('API: Api Keys', () => {
  beforeEach(() => {
    this.userId = 1
    this.token = jwt.sign({sub: 1, expiresIn: '1 day'}, config.jwtSecretKey)
  })

  describe('GET /api/projects/:id/api-keys/', () => {
    it('returns api keys', (done) => {
      request(app)
        .get('/api/projects/1/api-keys/')
        .set('Authorization', 'Bearer ' + this.token)
        .expect(200)
        .end((err, res) => {
          if (err) throw err
          expect(res.body).to.be.an('object')
          expect(res.body.status).to.equal(200)
          expect(res.body.data).to.be.an('array')
          expect(res.body.data).to.have.lengthOf(2)
          expect(res.body.data[0]).to.have.property('id')
          expect(res.body.data[0]).to.have.property('name')
          expect(res.body.data[0]).to.have.property('key')
          expect(res.body.data[0]).to.have.property('createdById')
          expect(res.body.data[0]).to.have.property('createdAt')
          expect(res.body.data[0]).to.have.property('updatedAt')
          done()
        })
    })
  })

  describe('PUT /api/projects/:id/api-keys/', () => {
    it('puts api key', (done) => {
      request(app)
        .put('/api/projects/1/api-keys/')
        .send({
          name: 'test'
        })
        .set('Authorization', 'Bearer ' + this.token)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) throw err
          expect(res.body).to.be.an('object')
          expect(res.body.status).to.equal(201)
          expect(res.body.data).to.be.an('object')
          expect(res.body.data).to.have.property('id')
          expect(res.body.data).to.have.property('name')
          expect(res.body.data.name).to.be.a('string', 'test')
          expect(res.body.data).to.have.property('key')
          expect(res.body.data).to.have.property('createdById')
          expect(res.body.data).to.have.property('createdAt')
          expect(res.body.data).to.have.property('updatedAt')
          done()
        })
    })
  })

  describe('DELETE /api/api-keys/:id', () => {
    it('deletes api key', (done) => {
      request(app)
        .delete('/api/api-keys/1')
        .set('Authorization', 'Bearer ' + this.token)
        .expect(202)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) throw err
          expect(res.body).to.be.an('object')
          expect(res.body.status).to.equal(202)
          done()
        })
    })
  })
})
