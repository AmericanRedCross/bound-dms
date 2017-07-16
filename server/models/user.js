module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    password: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  })
  return User
}
