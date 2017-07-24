const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: {type: DataTypes.STRING, unique: true},
    role: {type: DataTypes.STRING, defaultValue: null},
    password: DataTypes.STRING,
    isActive: {type: DataTypes.BOOLEAN, defaultValue: false}
  })

  /**
   * Class Methods
   */
  User.hashPassword = function (password) {
    return bcrypt.hashSync(password, 12)
  }

  User.safeAttributes = function () {
    return [
      'id', 'firstname', 'lastname', 'isActive', 'role', 'createdAt', 'updatedAt'
    ]
  }

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
