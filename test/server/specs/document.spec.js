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
})
