const bcrypt = require('bcrypt')
const crypto = require('crypto')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: {type: DataTypes.STRING, unique: true},
    role: {type: DataTypes.STRING, defaultValue: null},
    password: DataTypes.STRING,
    isActive: {type: DataTypes.BOOLEAN, defaultValue: false},
    activationCode: {type: DataTypes.STRING, defaultValue: null}
  })

  /**
   * Class Methods
   */
  User.hashPassword = function (password) {
    return bcrypt.hashSync(password, 12)
  }

  User.safeAttributes = function () {
    return [
      'id', 'firstname', 'lastname', 'email', 'isActive', 'role', 'createdAt', 'updatedAt'
    ]
  }

  User.beforeCreate((user, options) => {
    user.activationCode = crypto.randomBytes(32).toString('hex')
  })

  /**
   * Instance Methods
   */
  User.prototype.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
  }

  User.prototype.toJSON = function () {
    let values = Object.assign({}, this.get())
    // remove password when instance is cast to json
    delete values.password
    return values
  }

  return User
}
