import { User } from '../../../../src/vuex/modules/user/User'

describe('User Object Creation', () => {
  it('Create a new user', () => {
    let newUser = new User({})
    expect(newUser).to.be.an('object')
  })

  it('Has the correct properties', () => {
    let newUser = new User({})
    expect(newUser).to.have.property('id')
    expect(newUser).to.have.property('firstName')
    expect(newUser).to.have.property('lastName')
    expect(newUser).to.have.property('email')
  })

  it('Has the correct propery values', () => {
    let id = 1
    let firstname = 'First Name'
    let lastname = 'Last Name'
    let email = 'Email'
    let newUser = new User({id, firstname, lastname, email})
    expect(newUser.id).to.equal(id)
    expect(newUser.firstName).to.equal(firstname)
    expect(newUser.lastName).to.equal(lastname)
    expect(newUser.email).to.equal(email)
  })
})

describe('User Setters and Getters', () => {
  it('Set and Get id', () => {
    let newUser = new User({})
    newUser.id = 1
    expect(newUser.id).to.equal(1)
  })
  it('Set and Get first name', () => {
    let newUser = new User({})
    newUser.firstName = 'First Name'
    expect(newUser.firstName).to.equal('First Name')
  })
  it('Set and Get last name', () => {
    let newUser = new User({})
    newUser.lastName = 'Last Name'
    expect(newUser.lastName).to.equal('Last Name')
  })
  it('Set and Get email', () => {
    let newUser = new User({})
    newUser.email = 'user@domain.com'
    expect(newUser.email).to.equal('user@domain.com')
  })
  it('Get full name ', () => {
    let newUser = new User({})
    newUser.firstName = 'First'
    newUser.lastName = 'Last Name'
    expect(newUser.fullName).to.equal('First Last Name')
  })
})
