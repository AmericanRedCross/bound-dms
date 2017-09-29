module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('File', {
    parentId: {type: DataTypes.INTEGER, allowNull: true},
    projectId: {type: DataTypes.INTEGER, allowNull: true},
    directoryId: {type: DataTypes.INTEGER, allowNull: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: true},
    mimeType: {type: DataTypes.STRING, allowNull: false},
    filename: {type: DataTypes.STRING, allowNull: false},
    metadata: {type: DataTypes.STRING, allowNull: true},
    createdById: {type: DataTypes.INTEGER, allowNull: false}
  })

  File.massAssignable = function () {
    return ['title', 'description', 'parentId', 'projectId', 'directoryId', 'metadata']
  }

  File.associate = (models) => {
    File.belongsTo(models.User, {
      as: 'createdBy',
      foreignKey: 'createdById',
      targetKey: 'id'
    })

    File.hasMany(models.File, {
      as: 'Children',
      foreignKey: 'parentId',
      useJunctionTable: false
    })

    File.belongsTo(models.Project, {
      as: 'Project',
      foreignKey: 'parentId',
      targetKey: 'id'
    })

    File.belongsTo(models.Directory, {
      as: 'Directory',
      foreignKey: 'directoryId',
      targetKey: 'id'
    })
  }

  return File
}
