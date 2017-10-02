module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: {type: DataTypes.STRING, allowNull: false},
    description: DataTypes.STRING,
    baseLanguage: {type: DataTypes.STRING, allowNull: false},
    createdById: {type: DataTypes.INTEGER, allowNull: true}
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

    Project.hasMany(models.Document, {
      as: 'documents',
      foreignKey: 'projectId',
      sourceKey: 'id'
    })

    Project.hasMany(models.Metatype, {
      as: 'metatypes',
      foreignKey: 'projectId',
      sourceKey: 'id'
    })

    Project.hasMany(models.Publish, {
      as: 'publishes',
      foreignKey: 'projectId',
      sourceKey: 'id'
    })
  }

  return Project
}
