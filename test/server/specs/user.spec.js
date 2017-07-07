const app = require('../../../index')
const request = require('supertest')
const expect = require('chai').expect

describe('API: User', () => {
  describe('GET /api/users', () => {
    it('returns a collection of users', (done) => {
      request(app)
        .get('/api/users')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.an('array')
          expect(res.body[0]).to.have.property('email')
          expect(res.body[0]).to.have.property('id')
          expect(res.body[0]).to.have.property('firstname')
          expect(res.body[0]).to.have.property('lastname')
          done()
        })
    })
  })

  describe('PUT /api/users', () => {
    it('creates a user', (done) => {
      const user = {
        'email': 'test@test.com',
        'password': 'some_password',
        'firstname': 'Test',
        'lastname': 'User'
      }

      request(app)
        .put('/api/users')
        .send(user)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('id')
          expect(res.body).to.have.property('email')
          expect(res.body).to.have.property('firstname')
          expect(res.body).to.have.property('lastname')
          done()
        })
    })
  })

  describe('GET /api/users/:id', () => {
    it('returns a user', (done) => {
      request(app)
        .get('/api/users/1')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('id')
          expect(res.body.id).to.equal(1)
          expect(res.body).to.have.property('email')
          expect(res.body).to.have.property('firstname')
          expect(res.body).to.have.property('lastname')
          done()
        })
    })
  })

  describe('POST /api/users/:id', () => {
    it('updates a user', (done) => {

      const user = {
        'firstname': 'new_firstname',
        'lastname': 'new_lastname'
      }
      request(app)
        .post('/api/users/1')
        .send(user)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.body).to.have.property('id')
          expect(res.body.id).to.equal(1)
          expect(res.body).to.have.property('email')
          expect(res.body).to.have.property('firstname')
          expect(res.body.firstname).to.equal('new_firstname')
          expect(res.body).to.have.property('lastname')
          expect(res.body.lastname).to.equal('new_lastname')
          done()
        })
    })
  })

  describe('DELETE /api/users/:id', () => {
    it('deletes a user', (done) => {
      request(app)
        .delete('/api/users/1')
        .expect('Content-Type', /json/)
        .expect(200, {
          success: true
        },
        done)
    })
  })
})
