const app = require('../../../index')
const request = require('supertest')
const expect = require('chai').expect
const jwt = require('jsonwebtoken')
const config = require('../../../server/config')

describe('API: Projects', () => {
  beforeEach(() => {
    this.userId = 1
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
          if (err) throw err
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

  describe('GET /api/projects/:id', () => {
    it('returns a project', (done) => {
      request(app)
        .get('/api/projects/1')
        .set('Authorization', 'Bearer ' + this.token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) throw err
          expect(res.body.data).to.be.an('object')
          expect(res.body.status).to.equal(200)
          expect(res.body.data).to.have.property('id')
          expect(res.body.data).to.have.property('name')
          expect(res.body.data).to.have.property('description')
          expect(res.body.data).to.have.property('createdBy')
          expect(res.body.data).to.have.property('createdAt')
          expect(res.body.data).to.have.property('updatedAt')
          done()
        })
    })

    it('returns 404 not found if project does not exist', (done) => {
      request(app)
        .get('/api/projects/100')
        .set('Authorization', 'Bearer ' + this.token)
        .expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          if (err) throw err
          expect(res.body.status).to.equal(404)
          done()
        })
    })
  })

  describe('PUT /api/projects', () => {
    it('creates a new project', (done) => {
      const project = {
        'name': 'Test Project',
        'description': 'Some new project description'
      }
      request(app)
        .put('/api/projects')
        .set('Authorization', 'Bearer ' + this.token)
        .send(project)
        .expect(201)
        .end((err, res) => {
          if (err) throw err
          expect(res.body.status).to.equal(201)
          expect(res.body.data).to.have.property('id')
          expect(res.body.data).to.have.property('name')
          expect(res.body.data).to.have.property('description')
          expect(res.body.data).to.have.property('createdBy')
          expect(res.body.data).to.have.property('createdAt')
          expect(res.body.data).to.have.property('updatedAt')
          done()
        })
    })

    it('is created by the authenticated user', (done) => {
      const project = {
        'name': 'Test Prpject',
        'description': 'Some new project description'
      }
      request(app)
        .put('/api/projects')
        .set('Authorization', 'Bearer ' + this.token)
        .send(project)
        .expect(201)
        .end((err, res) => {
          if (err) throw err
          expect(res.body.status).to.equal(201)
          expect(res.body.data.createdBy.id).to.equal(this.userId)
          done()
        })
    })
  })

  describe('POST /api/projects', () => {
    it('updates an existing project', (done) => {
      const project = {
        'name': 'An updated project',
        'description': 'Some new project description'
      }
      request(app)
        .post('/api/projects/1')
        .set('Authorization', 'Bearer ' + this.token)
        .send(project)
        .expect(200)
        .end((err, res) => {
          if (err) throw err
          expect(res.body.status).to.equal(200)
          expect(res.body.data).to.have.property('id')
          expect(res.body.data).to.have.property('name')
          expect(res.body.data).to.have.property('description')
          expect(res.body.data).to.have.property('createdBy')
          expect(res.body.data).to.have.property('createdAt')
          expect(res.body.data).to.have.property('updatedAt')
          expect(res.body.data.createdBy.id).to.equal(this.userId)
          expect(res.body.data.name).to.equal('An updated project')
          done()
        })
    })

    describe('DELETE /api/projects', () => {
      it('deletes an existing project', (done) => {
        request(app)
          .delete('/api/projects/2')
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
})
