module.exports = (sequelize, DataTypes) => {
  const Publish = sequelize.define('Publish', {
    projectId: {type: DataTypes.INTEGER, allowNull: false},
    language: {type: DataTypes.STRING, allowNull: false},
    type: {type: DataTypes.STRING, allowNull: false},
    filePath: {type: DataTypes.STRING, allowNull: false},
    createdById: {type: DataTypes.INTEGER, allowNull: true}
  })

  Publish.massAssignable = function () {
    return ['projectId', 'type', 'filePath', 'createdById']
  }

  Publish.associate = (models) => {
    Publish.belongsTo(models.Project, {
      as: 'project',
      foreignKey: 'projectId',
      targetKey: 'id'
    })

    Publish.belongsTo(models.User, {
      as: 'createdBy',
      foreignKey: 'createdById',
      targetKey: 'id'
    })
  }

  return Publish
}
