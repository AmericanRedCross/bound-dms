module.exports = (sequelize, DataTypes) => {
  const ApiKey = sequelize.define('ApiKey', {
    name: {type: DataTypes.STRING, allowNull: false},
    key: {type: DataTypes.STRING, allowNull: false},
    createdById: {type: DataTypes.INTEGER, allowNull: false}
  })

  ApiKey.massAssignable = function () {
    return ['name', 'key']
  }

  ApiKey.associate = (models) => {
    ApiKey.belongsTo(models.Project, {
      as: 'project',
      foreignKey: 'projectId',
      sourceKey: 'id'
    })

    ApiKey.belongsTo(models.User, {
      as: 'createdBy',
      foreignKey: 'createdById',
      targetKey: 'id'
    })
  }

  return ApiKey
}
