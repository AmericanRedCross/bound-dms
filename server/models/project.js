module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: {type: DataTypes.STRING, allowNull: false},
    description: DataTypes.STRING,
    createdById: {type: DataTypes.INTEGER, allowNull: false}
  })

  Project.massAssignable = function () {
    return ['name', 'description']
  }

  Project.associate = (models) => {
    Project.belongsTo(models.User, {
      as: 'createdBy',
      foreignKey: 'createdById',
      targetKey: 'id'
    })

    Project.hasMany(models.ProjectLanguage, {
      as: 'languages',
      foreignKey: 'projectId',
      sourceKey: 'id'
    })
  }

  return Project
}
