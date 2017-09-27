module.exports = (sequelize, DataTypes) => {
  const Directory = sequelize.define('Directory', {
    projectId: {type: DataTypes.INTEGER, allowNull: false},
    parentId: {type: DataTypes.INTEGER, allowNull: true, defaultValue: null},
    order: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
    createdById: {type: DataTypes.INTEGER, allowNull: true}
  })

  Directory.massAssignable = function () {
    return ['parentId', 'order']
  }

  Directory.associate = (models) => {
    Directory.belongsTo(models.User, {
      as: 'createdBy',
      foreignKey: 'createdById',
      targetKey: 'id'
    })

    Directory.belongsTo(Directory, {
      as: 'parent',
      foreignKey: 'parentId',
      targetKey: 'id'
    })

    Directory.hasMany(Directory, {
      as: 'directories',
      foreignKey: 'parentId',
      targetKey: 'id'
    })

    Directory.hasMany(models.DirectoryTranslation, {
      as: 'translations',
      foreignKey: 'id',
      targetKey: 'directoryId'
    })

    Directory.hasMany(models.Document, {
      as: 'documents',
      foreignKey: 'directoryId',
      targetKey: 'id'
    })
  }

  return Directory
}
