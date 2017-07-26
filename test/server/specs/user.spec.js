const app = require('../../../index')
const request = require('supertest')
const expect = require('chai').expect
const jwt = require('jsonwebtoken')
const config = require('../../../server/config')

describe('API: User', () => {
  beforeEach(() => {
    this.token = jwt.sign({sub: 1, expiresIn: '1 day'}, config.jwtSecretKey)
  })

  describe('GET /api/users', () => {
    it('returns a collection of users', (done) => {
      request(app)
        .get('/api/users')
        .set('Authorization', 'Bearer ' + this.token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.an('object')
          expect(res.body.status).to.equal(200)
          expect(res.body.data).to.be.an('array')
          expect(res.body.data[0]).to.have.property('email')
          expect(res.body.data[0]).to.have.property('id')
          expect(res.body.data[0]).to.have.property('firstname')
          expect(res.body.data[0]).to.have.property('lastname')
          expect(res.body.data[0]).to.have.property('isActive')
          expect(res.body.data[0]).to.have.property('role')
          expect(res.body.data[0]).to.have.property('createdAt')
          expect(res.body.data[0]).to.have.property('updatedAt')
          done()
        })
    })
  })

  describe('GET /api/users/me', () => {
    it('returns authenticated user data', (done) => {
      request(app)
        .get('/api/users/me')
        .set('Authorization', 'Bearer ' + this.token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.an('object')
          expect(res.body.status).to.equal(200)
          expect(res.body.data).to.have.property('id')
          expect(res.body.data).to.have.property('email')
          expect(res.body.data).to.have.property('firstname')
          expect(res.body.data).to.have.property('lastname')
          expect(res.body.data).to.have.property('isActive')
          expect(res.body.data).to.have.property('role')
          expect(res.body.data).to.have.property('createdAt')
          expect(res.body.data).to.have.property('updatedAt')
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
        .set('Authorization', 'Bearer ' + this.token)
        .send(user)
        .expect(201)
        .end((err, res) => {
          expect(res.body.status).to.equal(201)
          expect(res.body.data).to.have.property('id')
          expect(res.body.data).to.have.property('email')
          expect(res.body.data).to.have.property('firstname')
          expect(res.body.data).to.have.property('lastname')
          expect(res.body.data).to.have.property('isActive')
          expect(res.body.data).to.have.property('role')
          expect(res.body.data).to.have.property('createdAt')
          expect(res.body.data).to.have.property('updatedAt')
          done()
        })
    })

    it('defaults new users to inactive', (done) => {
      const user = {
        'email': 'test@2test.com',
        'password': 'some_password',
        'firstname': 'Test2',
        'lastname': 'User'
      }

      request(app)
        .put('/api/users')
        .set('Authorization', 'Bearer ' + this.token)
        .send(user)
        .expect(201)
        .end((err, res) => {
          expect(res.body.status).to.equal(201)
          expect(res.body.data).to.have.property('isActive')
          expect(res.body.data.isActive).to.be.false
          done()
        })
    })
  })

  describe('GET /api/users/:id', () => {
    it('returns a user', (done) => {
      request(app)
        .get('/api/users/1')
        .set('Authorization', 'Bearer ' + this.token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body.status).to.equal(200)
          expect(res.body.data).to.have.property('id')
          expect(res.body.data.id).to.equal(1)
          expect(res.body.data).to.have.property('email')
          expect(res.body.data).to.have.property('firstname')
          expect(res.body.data).to.have.property('lastname')
          expect(res.body.data).to.have.property('isActive')
          expect(res.body.data).to.have.property('createdAt')
          expect(res.body.data).to.have.property('updatedAt')
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
        .set('Authorization', 'Bearer ' + this.token)
        .send(user)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.body.data).to.have.property('id')
          expect(res.body.data.id).to.equal(1)
          expect(res.body.data).to.have.property('email')
          expect(res.body.data).to.have.property('firstname')
          expect(res.body.data.firstname).to.equal('new_firstname')
          expect(res.body.data).to.have.property('lastname')
          expect(res.body.data.lastname).to.equal('new_lastname')
          done()
        })
    })
  })

  describe('PUT /api/users/me/password', () => {
    it('updates a user password and returns 200', (done) => {
      request(app)
        .put('/api/users/me/password')
        .set('Authorization', 'Bearer ' + this.token)
        .send({'password': '12345678', 'newPassword': '87654321'})
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('status')
          expect(res.body.status).to.equal(200)
          done()
        })
    })

    it('validates current password is present', (done) => {
      request(app)
        .put('/api/users/me/password')
        .set('Authorization', 'Bearer ' + this.token)
        .send({'password': '', 'newPassword': '87654321'})
        .expect(400, done)
    })

    it('validates new password is present', (done) => {
      request(app)
        .put('/api/users/me/password')
        .set('Authorization', 'Bearer ' + this.token)
        .send({'password': '12345678', 'newPassword': ''})
        .expect(400, done)
    })

    it('returns error if current password does not match', (done) => {
      request(app)
        .put('/api/users/me/password')
        .set('Authorization', 'Bearer ' + this.token)
        .send({'password': '123456789', 'newPassword': '87654321'})
        .expect(400, done)
    })
  })

  describe('DELETE /api/users/:id', () => {
    it('deletes a user', (done) => {
      request(app)
        .delete('/api/users/2')
        .set('Authorization', 'Bearer ' + this.token)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.have.property('message')
          expect(res.body.message).to.equal('User deleted')
          done()
        })
    })
  })
})
