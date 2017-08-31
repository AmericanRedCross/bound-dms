const app = require('../../../index')
const request = require('supertest')
const expect = require('chai').expect
const jwt = require('jsonwebtoken')
const config = require('../../../server/config')

describe('API: Languages', () => {
  beforeEach(() => {
    this.userId = 1
    this.token = jwt.sign({sub: 1, expiresIn: '1 day'}, config.jwtSecretKey)
  })

  describe('GET /api/projects/1/languages', () => {
    it('returns a collection of languages', (done) => {
      request(app)
        .get('/api/projects/1/languages')
        .set('Authorization', 'Bearer ' + this.token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) throw err
          expect(res.body).to.be.an('object')
          expect(res.body.status).to.equal(200)
          expect(res.body.data).to.be.an('array')
          expect(res.body.data[0]).to.be.an('object')
          expect(res.body.data[0]).to.have.property('id')
          expect(res.body.data[0]).to.have.property('code')
          expect(res.body.data[0]).to.have.property('createdAt')
          expect(res.body.data[0]).to.have.property('updatedAt')
          done()
        })
    })
  })

  describe('PUT /api/projects/:id/languages/:code', () => {
    it('assigns a language to a project', (done) => {
      request(app)
        .put('/api/projects/1/languages/fr-CA')
        .set('Authorization', 'Bearer ' + this.token)
        .expect(201)
        .end((err, res) => {
          if (err) throw err
          expect(res.body.status).to.equal(201)
          expect(res.body.data).to.have.property('code')
          expect(res.body.data).to.have.property('createdAt')
          expect(res.body.data).to.have.property('updatedAt')
          done()
        })
    })

    it('returns 404 not found if project does not exist', (done) => {
      request(app)
        .put('/api/projects/100/languages/fr-CA')
        .set('Authorization', 'Bearer ' + this.token)
        .expect(404)
        .end((err, res) => {
          expect(res.body.status).to.equal(404)
          done()
        })
    })
  })

  describe('DELETE /api/projects/:id/languages/:code', () => {
    it('deletes an existing project language', (done) => {
      request(app)
        .delete('/api/projects/1/languages/fr-CA')
        .set('Authorization', 'Bearer ' + this.token)
        .expect(200)
        .end((err, res) => {
          if (err) throw err
          expect(res.body.status).to.equal(200)
          done()
        })
    })
  })
})
