const User = require('../models').User
const PasswordReset = require('../models').PasswordReset
const mail = require('./mail')
const config = require('../config')
const querystring = require('querystring')

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
    return User.findById(id)
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
  },
  /**
   * Attempts to find user by email and issue reset link
   */
  sendPasswordReset (email) {
    const userPromise = User.findOne({where: {email: email}})
    const resetPromise = userPromise.then((user) => {
      if (user === null) {
        return false
      }

      return PasswordReset.create({
        email: user.email,
        token: PasswordReset.createToken()
      }).then((reset) => { return reset })
    })

    // destructure resolved promises
    return Promise.all([userPromise, resetPromise]).then(([user, reset]) => {
      const message = [
        'Hi ' + user.firstname + ',',
        'A password reset has been requested for your account. Click the following link to reset your password:',
        this.buildResetLink(reset.token),
        'If you did not request this email, please contact a sytem administrator.',
        'Bound DMS'
      ].join('\n\n')

      const options = {
        from: '"' + config.mail.fromName + '" <' + config.mail.fromAddress + '>', // sender address
        to: user.email,
        subject: 'Password Reset', // Subject line
        text: message
      }

      mail.send(options).then((err, info) => {
        if (!err) {
          return true
        }

        console.error(err)
        return false
      })
      console.log('send the email!')
    }).catch(err => {
      console.error(err)
    })
  },

  buildResetLink (token) {
    return [
      config.enableHttps ? 'https://' : 'http://',
      config.systemHostname,
      '/reset?',
      querystring.stringify({token: token})
    ].join('')
  },

  validatePasswordResetToken (token) {
    const yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000))
    return PasswordReset.findOne({
      where: {
        token: token,
        createdAt: {
          $gt: new Date(yesterday)
        }
      }
    }).then((reset) => {
      if (reset === null) {
        return false
      }

      return reset
    })
  }
}
