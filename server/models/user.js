module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    password: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN
  },
    {
      classMethods: {
        associate: (models) => {
          // associations can be defined here
        }
      },
      instanceMethods: {
        toJSON: () => {
          let values = Object.assign({}, this.get())
          // remove password when instance is cast to json
          delete values.password
          return values
        }
      }
    }
)
  return User
}
