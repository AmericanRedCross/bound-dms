export class User {
  constructor (id, firstName = '', lastName = '', email = '') {
    this._id = id
    this._firstName = firstName
    this._lastName = lastName
    this._email = email
  }

  // Getters and Setters
  // ID
  set id (id = '') { this._id = id }
  get id () { return this._id }

  // First Name
  set firstName (firstName = '') { this._firstName = firstName }
  get firstName () { return this._firstName }

  // Last name
  set lastName (lastName = '') { this._lastName = lastName }
  get lastName () { return this._lastName }

  // Full name
  get fullName () { return this._firstName + ' ' + this._lastName }

  // Email
  set email (email) { this._email = email }
  get email () { return this._email }
}
