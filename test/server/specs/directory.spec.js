const app = require('../../../index')
const request = require('supertest')
const expect = require('chai').expect
const jwt = require('jsonwebtoken')
const config = require('../../../server/config')

describe('API: Directories', () => {
  beforeEach(() => {
    this.userId = 1
    this.token = jwt.sign({sub: 1, expiresIn: '1 day'}, config.jwtSecretKey)
  })

  describe('GET /api/projects/:id/directories', () => {
    it('returns a collection of directories', (done) => {
      request(app)
        .get('/api/projects/1/directories')
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
          expect(res.body.data[0]).to.have.property('parentId')
          expect(res.body.data[0]).to.have.property('order')
          expect(res.body.data[0]).to.have.property('createdBy')
          expect(res.body.data[0]).to.have.property('createdAt')
          expect(res.body.data[0]).to.have.property('updatedAt')
          done()
        })
    })
  })

  describe('GET /api/directories/:id', () => {
    it('returns a single directory object', (done) => {
      request(app)
        .get('/api/directories/1')
        .set('Authorization', 'Bearer ' + this.token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) throw err
          expect(res.body).to.be.an('object')
          expect(res.body.status).to.equal(200)
          expect(res.body.data).to.be.an('object')
          expect(res.body.data).to.have.property('id')
          expect(res.body.data).to.have.property('parentId')
          expect(res.body.data).to.have.property('order')
          expect(res.body.data).to.have.property('createdBy')
          expect(res.body.data).to.have.property('createdAt')
          expect(res.body.data).to.have.property('updatedAt')
          done()
        })
    })
  })

  describe('POST /api/projects/:id/directories', () => {
    const directory = {
      'parentId': null
    }
    it('creates a new directory', (done) => {
      request(app)
        .post('/api/projects/1/directories')
        .set('Authorization', 'Bearer ' + this.token)
        .send(directory)
        .expect(201)
        .end((err, res) => {
          if (err) throw err
          expect(res.body.status).to.equal(201)
          expect(res.body.data).to.have.property('id')
          expect(res.body.data).to.have.property('parentId')
          expect(res.body.data).to.have.property('order')
          expect(res.body.data).to.have.property('createdBy')
          expect(res.body.data).to.have.property('createdAt')
          expect(res.body.data).to.have.property('updatedAt')
          expect(res.body.data).to.have.property('projectId')
          expect(res.body.data.projectId).to.equal(1)
          done()
        })
    })
  })

  describe('PUT /api/directories/:id', () => {
    const directory = {
      'parentId': 1,
      'order': 0
    }
    it('updates an existing directory', (done) => {
      request(app)
        .put('/api/directories/2')
        .set('Authorization', 'Bearer ' + this.token)
        .send(directory)
        .expect(200)
        .end((err, res) => {
          if (err) throw err
          expect(res.body.status).to.equal(200)
          expect(res.body.data).to.have.property('id')
          expect(res.body.data).to.have.property('parentId')
          expect(res.body.data).to.have.property('order')
          expect(res.body.data).to.have.property('createdBy')
          expect(res.body.data).to.have.property('createdAt')
          expect(res.body.data).to.have.property('updatedAt')
          done()
        })
    })
  })

  describe('DELETE /api/directories/:id', () => {
    it('deletes an existing project language', (done) => {
      request(app)
        .delete('/api/directories/3')
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
