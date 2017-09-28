module.exports = (sequelize, DataTypes) => {
  const Metatype = sequelize.define('Metatype', {
    projectId: {type: DataTypes.INTEGER, allowNull: false},
    key: {type: DataTypes.STRING, allowNull: false},
    type: {type: DataTypes.STRING, allowNull: false},
    createdById: {type: DataTypes.INTEGER, allowNull: true}
  })

  Metatype.associate = (models) => {
    Metatype.belongsTo(models.Project, {
      as: 'project',
      foreignKey: 'projectId',
      targetKey: 'id'
    })

    Metatype.belongsTo(models.User, {
      as: 'createdBy',
      foreignKey: 'createdById',
      targetKey: 'id'
    })
  }

  return Metatype
}
