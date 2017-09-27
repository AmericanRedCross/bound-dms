const app = require('../../../index')
const request = require('supertest')
const chai = require('chai')
const expect = chai.expect
const jwt = require('jsonwebtoken')
const config = require('../../../server/config')
chai.use(require('chai-datetime'))

describe('API: Metadata', () => {
  beforeEach(() => {
    this.userId = 1
    this.token = jwt.sign({sub: 1, expiresIn: '1 day'}, config.jwtSecretKey)
  })

  describe('GET /api/projects/:id/metatypes', () => {
    it('returns project meta type', (done) => {
      request(app)
        .get('/api/projects/1/metatypes')
        .set('Authorization', 'Bearer ' + this.token)
        .expect(200)
        .end((err, res) => {
          if (err) throw err
          expect(res.body).to.be.an('object')
          expect(res.body.status).to.equal(200)
          expect(res.body.data).to.be.an('array')
          expect(res.body.data[0]).to.have.property('id')
          expect(res.body.data[0]).to.have.property('key')
          expect(res.body.data[0]).to.have.property('type')
          expect(res.body.data[0]).to.have.property('createdAt')
          expect(res.body.data[0]).to.have.property('updatedAt')

          done()
        })
    })
  })

  describe('POST /api/projects/:id/metatypes', () => {
    it('creates a new meta type', (done) => {
      request(app)
        .post('/api/projects/1/metatypes')
        .send({key: 'testbool', type: 'boolean'})
        .set('Authorization', 'Bearer ' + this.token)
        .expect(201)
        .end((err, res) => {
          if (err) throw err
          expect(res.body).to.be.an('object')
          expect(res.body.status).to.equal(201)
          expect(res.body.data).to.be.an('object')
          expect(res.body.data).to.have.property('id')
          expect(res.body.data).to.have.property('key').and.to.equal('testbool')
          expect(res.body.data).to.have.property('type').and.to.equal('boolean')
          expect(res.body.data).to.have.property('createdAt')
          expect(res.body.data).to.have.property('updatedAt')

          done()
        })
    })
  })
})
