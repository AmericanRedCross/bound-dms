const app = require('../../../index')
const request = require('supertest')
const expect = require('chai').expect
const jwt = require('jsonwebtoken')
const config = require('../../../server/config')

describe('API: Documents', () => {
  beforeEach(() => {
    this.userId = 1
    this.token = jwt.sign({sub: 1, expiresIn: '1 day'}, config.jwtSecretKey)
  })

  describe('GET /api/projects/:id/documents', () => {
    it('returns a collection of documents belonging to a project', (done) => {
      request(app)
        .get('/api/projects/1/documents')
        .set('Authorization', 'Bearer ' + this.token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) throw err
          expect(res.body).to.be.an('object')
          expect(res.body.status).to.equal(200)
          expect(res.body.data).to.be.an('object')
          expect(res.body.data.documents).to.be.an('array')
          expect(res.body.data.documents[0]).to.be.an('object')
          expect(res.body.data.documents[0]).to.have.property('directory')
          expect(res.body.data.documents[0].createdBy).to.be.an('object')
          expect(res.body.data.documents[0].translations).to.be.an('array')

          done()
        })
    })
  })

  describe('POST /api/projects/:id/documents', () => {
    it('creates a new document', (done) => {
      request(app)
        .post('/api/projects/1/documents')
        .send({language: 'en', title: 'test title', 'content': '## h2 Heading'})
        .set('Authorization', 'Bearer ' + this.token)
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          if (err) throw err
          expect(res.body).to.be.an('object')
          expect(res.body.status).to.equal(201)
          expect(res.body.data).to.be.an('object')
          expect(res.body.data).to.have.property('id')
          expect(res.body.data).to.have.property('projectId')
          expect(res.body.data).to.have.property('createdById')
          expect(res.body.data).to.have.property('translations')
          expect(res.body.data).to.have.property('createdById')
          expect(res.body.data).to.have.property('createdAt')
          expect(res.body.data).to.have.property('updatedAt')
          expect(res.body.data.translations).to.be.an('array')
          expect(res.body.data.translations[0].language).to.equal('en')
          expect(res.body.data.translations[0].title).to.equal('test title')
          expect(res.body.data.translations[0].content).to.equal('## h2 Heading')

          done()
        })
    })
  })

  describe('GET /api/documents/:id/translations', () => {
    it('returns a collection of document translations', (done) => {
      request(app)
        .get('/api/documents/1/translations')
        .set('Authorization', 'Bearer ' + this.token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) throw err
          expect(res.body).to.be.an('object')
          expect(res.body.status).to.equal(200)
          expect(res.body.data).to.be.an('array')
          expect(res.body.data[0]).to.be.an('object')
          expect(res.body.data[0]).to.have.property('language')
          expect(res.body.data[0]).to.have.property('title')
          expect(res.body.data[0]).to.have.property('createdAt')
          expect(res.body.data[0]).to.have.property('updatedAt')
          expect(res.body.data[0]).to.not.have.property('content')
          done()
        })
    })
  })

  describe('GET /api/documents/:id/translations/:language', () => {
    it('returns the content of a document translation', (done) => {
      request(app)
        .get('/api/documents/1/translations/en')
        .set('Authorization', 'Bearer ' + this.token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) throw err
          expect(res.body).to.be.an('object')
          expect(res.body.status).to.equal(200)
          expect(res.body.data).to.be.an('object')
          expect(res.body.data).to.have.property('language')
          expect(res.body.data).to.have.property('title')
          expect(res.body.data).to.have.property('content')
          expect(res.body.data).to.have.property('createdAt')
          expect(res.body.data).to.have.property('updatedAt')

          done()
        })
    })

    it('returns 404 if translation does not exist', (done) => {
      request(app)
        .get('/api/documents/1/translations/jp')
        .set('Authorization', 'Bearer ' + this.token)
        .expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          if (err) throw err
          expect(res.body).to.be.an('object')
          expect(res.body.status).to.equal(404)

          done()
        })
    })
  })

  describe('PUT /api/documents/:id/translations/:language', () => {
    it('creates a new document translation of the specified language', (done) => {
      request(app)
        .put('/api/documents/1/translations/es')
        .set('Authorization', 'Bearer ' + this.token)
        .send({title: 'test es title', content: '# test es content'})
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          if (err) throw err
          expect(res.body).to.be.an('object')
          expect(res.body.status).to.equal(201)
          expect(res.body.data).to.be.an('object')
          expect(res.body.data.language).to.equal('es')
          expect(res.body.data.title).to.equal('test es title')
          expect(res.body.data.content).to.equal('# test es content')
          expect(res.body.data).to.have.property('createdAt')
          expect(res.body.data).to.have.property('updatedAt')

          done()
        })
    })

    it('updates an existing translation of the specified language', (done) => {
      request(app)
        .put('/api/documents/1/translations/es')
        .set('Authorization', 'Bearer ' + this.token)
        .send({title: 'updated es title', content: '# updated es content'})
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) throw err
          expect(res.body).to.be.an('object')
          expect(res.body.status).to.equal(200)
          expect(res.body.data).to.be.an('object')
          expect(res.body.data.language).to.equal('es')
          expect(res.body.data.title).to.equal('updated es title')
          expect(res.body.data.content).to.equal('# updated es content')
          expect(res.body.data).to.have.property('createdAt')
          expect(res.body.data).to.have.property('updatedAt')

          done()
        })
    })
  })

  describe('DELETE /api/documents/:id/translations/:language', () => {
    it('deletes an existing translation of the specified language', (done) => {
      request(app)
        .delete('/api/documents/1/translations/es')
        .set('Authorization', 'Bearer ' + this.token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) throw err
          expect(res.body).to.be.an('object')
          expect(res.body.status).to.equal(200)

          done()
        })
    })
  })

  describe('DELETE /api/documents/:id', () => {
    it('deletes an existing document', (done) => {
      request(app)
        .delete('/api/documents/1')
        .set('Authorization', 'Bearer ' + this.token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) throw err
          expect(res.body).to.be.an('object')
          expect(res.body.status).to.equal(200)

          done()
        })
    })
  })

  describe('PATCH /api/documents/:id', () => {
    it('updates the directory containing the document', (done) => {
      request(app)
        .patch('/api/documents/2')
        .send({directory: {id: 2}})
        .set('Authorization', 'Bearer ' + this.token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) throw err
          expect(res.body).to.be.an('object')
          expect(res.body.data.directory).to.be.an('object')
          expect(res.body.data.directory.id).to.equal(2)
          done()
        })
    })
  })
})
