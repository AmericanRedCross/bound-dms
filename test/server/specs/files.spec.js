const app = require('../../../index')
const request = require('supertest')
const chai = require('chai')
const expect = chai.expect
const jwt = require('jsonwebtoken')
const config = require('../../../server/config')
chai.use(require('chai-datetime'))

describe('API: Files', () => {
  beforeEach(() => {
    this.userId = 1
    this.token = jwt.sign({sub: 1, expiresIn: '1 day'}, config.jwtSecretKey)
  })

  describe('GET /api/projects/1/files', () => {
    it('returns files', (done) => {
      request(app)
        .get('/api/projects/1/files')
        .set('Authorization', 'Bearer ' + this.token)
        .expect(200)
        .end((err, res) => {
          if (err) throw err
          expect(res.body).to.be.an('object')
          expect(res.body.status).to.equal(200)
          expect(res.body.data).to.be.an('array')
          expect(res.body.data[0]).to.have.property('id')
          expect(res.body.data[0]).to.have.property('parentId')
          expect(res.body.data[0]).to.have.property('title')
          expect(res.body.data[0]).to.have.property('description')
          expect(res.body.data[0]).to.have.property('mimeType')
          expect(res.body.data[0]).to.have.property('filename')
          expect(res.body.data[0]).to.have.property('metadata')
          expect(res.body.data[0]).to.have.property('createdById')
          expect(res.body.data[0]).to.have.property('createdAt')
          expect(res.body.data[0]).to.have.property('updatedAt')
          expect(res.body.data[0]).to.have.property('code')
          done()
        })
    })
  })

  describe('GET /api/projects/1/files', () => {
    it('returns in descending order', (done) => {
      request(app)
        .get('/api/projects/1/files')
        .set('Authorization', 'Bearer ' + this.token)
        .expect(200)
        .end((err, res) => {
          if (err) throw err
          expect(new Date(res.body.data[0].createdAt)).to.afterTime(new Date(res.body.data[1].createdAt))
          done()
        })
    })
  })

  describe('GET /api/projects/1/files', () => {
    it('returns default paginated files', (done) => {
      request(app)
        .get('/api/projects/1/files')
        .set('Authorization', 'Bearer ' + this.token)
        .expect(200)
        .end((err, res) => {
          if (err) throw err
          expect(res.body.meta.total).to.equal(10)
          expect(res.body.data).to.have.lengthOf(10)
          done()
        })
    })
  })

  describe('GET /api/projects/1/files/?page=2&limit=2', () => {
    it('returns paginated files', (done) => {
      request(app)
        .get('/api/projects/1/files/?page=2&limit=2')
        .set('Authorization', 'Bearer ' + this.token)
        .expect(200)
        .end((err, res) => {
          if (err) throw err
          expect(res.body.meta.total).to.equal(10)
          expect(res.body.data).to.have.lengthOf(2)
          expect(res.body.data[0].id).to.equal(9)
          done()
        })
    })
  })

  describe('POST /api/files/', () => {
    it('uploads a file', (done) => {
      request(app)
        .post('/api/files')
        .attach('files', './test/files/arc.jpg')
        .field({
          projectId: 1
        })
        .set('Authorization', 'Bearer ' + this.token)
        .expect(201)
        .end((err, res) => {
          if (err) throw err
          expect(res.body.status).to.equal(201)
          expect(res.body.data).to.be.an('array')
          expect(res.body.data).to.have.lengthOf(1)
          done()
        })
    })
  })

  describe('POST /api/files/', () => {
    it('uploads multiple files', (done) => {
      request(app)
        .post('/api/files')
        .attach('files', './test/files/arc.jpg')
        .attach('files', './test/files/arc.jpg')
        .field({
          projectId: 1
        })
        .set('Authorization', 'Bearer ' + this.token)
        .expect(201)
        .end((err, res) => {
          if (err) throw err
          expect(res.body.status).to.equal(201)
          expect(res.body.data).to.be.an('array')
          expect(res.body.data).to.have.lengthOf(2)
          done()
        })
    })
  })

  describe('PATCH /api/files/{id}', () => {
    it('edits file titles', (done) => {
      request(app)
        .patch('/api/files/1')
        .send({
          title: 'new title',
          description: 'new description'
        })
        .set('Authorization', 'Bearer ' + this.token)
        .expect(200)
        .end((err, res) => {
          if (err) throw err
          expect(res.body.status).to.equal(200)
          expect(res.body.data.title).to.equal('new title')
          expect(res.body.data.description).to.equal('new description')
          done()
        })
    })
  })

  describe('PATCH /api/files/{id}', () => {
    it('changes the directory a file is associated with', (done) => {
      request(app)
        .patch('/api/files/1')
        .send({
          directoryId: 2
        })
        .set('Authorization', 'Bearer ' + this.token)
        .expect(200)
        .end((err, res) => {
          if (err) throw err
          expect(res.body.status).to.equal(200)
          expect(res.body.data.directoryId).to.equal(2)
          done()
        })
    })
  })

  describe('GET /api/projects/:id/files/export', () => {
    it('returns a zip file', (done) => {
      request(app)
        .get('/api/projects/1/files/export/?language=en')
        .expect(200)
        .expect('content-type', 'application/zip')
        .expect('content-disposition', 'attachment; filename=project_files.zip')
        .end((err, res) => {
          if (err) throw err
          done()
        })
    })
  })
})
