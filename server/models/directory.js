module.exports = (sequelize, DataTypes) => {
  const Directory = sequelize.define('Directory', {
    projectId: {type: DataTypes.INTEGER, allowNull: false},
    parentId: {type: DataTypes.INTEGER, allowNull: true},
    order: {type: DataTypes.INTEGER, allowNull: false},
    createdById: {type: DataTypes.INTEGER, allowNull: false}
  })

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
      foreignKey: 'id',
      targetKey: 'parentId'
    })
  }

  return Directory
}
