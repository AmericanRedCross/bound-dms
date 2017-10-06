const crypto = require('crypto')

module.exports = (sequelize, DataTypes) => {
  const PasswordReset = sequelize.define('PasswordReset', {
    email: {type: DataTypes.STRING, allowNull: false},
    token: {type: DataTypes.STRING, allowNull: false}
  })

  PasswordReset.createToken = function () {
    return crypto.randomBytes(32).toString('hex')
  }

  return PasswordReset
}
