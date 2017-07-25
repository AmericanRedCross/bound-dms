const User = require('../models').User
const bcrypt = require('bcrypt')
const saltRounds = 12

module.exports = {
  /**
    * Creates a new user.
    * @return Promise
    */
  create (data) {
    return User.create(data)
  },
  /**
    * Updates an existing user.
    * @return Promise
    */
  update (id, data) {
    return User.update(data, {
      where: {
        id: id
      }
    })
  },
  /**
    * Updates an existing user.
    * @return Promise
    */
  updatePassword (id, password) {
    return this.update(id, {password: User.hashPassword(password)})
  },
  /**
    * Returns a collection of all users.
    * @return Promise
    */
  all () {
    return User.findAll()
  },
  /**
    * Returns a single user by id.
    * @return Promise
    */
  find (id) {
    return User.findById(id, {attributes: User.safeAttributes()})
  },
  /**
    * Returns a single by email address.
    * @return Promise
    */
  findByEmail (email) {
    return User.find({
      where: {
        email: email
      }
    })
  },
  /**
    * Deletes a single by id.
    * @return Promise
    */
  delete (id) {
    return User.destroy({
      where: {
        id: id
      }
    })
  }
}
