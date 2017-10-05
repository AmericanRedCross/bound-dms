const app = require('../../../index')
const request = require('supertest')
const expect = require('chai').expect
const jwt = require('jsonwebtoken')
const config = require('../../../server/config')
const path = require('path')
const fs = require('fs')

describe('API: Publishes', () => {
  beforeEach(() => {
    this.userId = 1
    this.token = jwt.sign({sub: 1, expiresIn: '1 day'}, config.jwtSecretKey)
  })

  describe('GET /api/projects/:id/publishes/', () => {
    it('returns a collection of publish objects for a project', (done) => {
      request(app)
        .get('/api/projects/1/publishes/')
        .set('Authorization', 'Bearer ' + this.token)
        .expect(200)
        .end((err, res) => {
          if (err) throw err
          expect(res.body).to.be.an('object')
          expect(res.body.status).to.equal(200)
          expect(res.body.data).to.be.an('array')
          expect(res.body.data[0]).to.have.property('id')
          expect(res.body.data[0]).to.have.property('language')
          expect(res.body.data[0]).to.have.property('type')
          expect(res.body.data[0]).to.have.property('filePath')
          expect(res.body.data[0]).to.have.property('createdBy')
          expect(res.body.data[0]).to.have.property('createdAt')
          expect(res.body.data[0]).to.have.property('updatedAt')
          done()
        })
    })

    it('returns 404 if project is not found', (done) => {
      request(app)
        .get('/api/projects/10/publishes/')
        .set('Authorization', 'Bearer ' + this.token)
        .expect(404)
        .end((err, res) => {
          if (err) throw err
          expect(res.body).to.be.an('object')
          expect(res.body.status).to.equal(404)
          done()
        })
    })
  })

  describe('POST /api/projects/:id/publishes/', () => {
    it('publishes a new bundle file for the specified language', (done) => {
      request(app)
        .post('/api/projects/1/publishes')
        .set('Authorization', 'Bearer ' + this.token)
        .send({type: 'bundleArchive', language: 'en'})
        .expect(201)
        .end((err, res) => {
          if (err) throw err
          expect(res.body).to.be.an('object')
          expect(res.body.status).to.equal(201)
          expect(res.body.data).to.be.an('object')
          expect(res.body.data).to.have.property('id')
          expect(res.body.data).to.have.property('language')
          expect(res.body.data).to.have.property('type')
          expect(res.body.data).to.have.property('filePath')
          expect(res.body.data).to.have.property('createdAt')
          expect(res.body.data).to.have.property('updatedAt')

          const bundlePath = path.join(config.publish.directory, res.body.data.filePath)
          expect(fs.existsSync(bundlePath)).to.be.true
          done()
        })
    })
  })
})
