module.exports = (sequelize, DataTypes) => {
  const DirectoryTranslation = sequelize.define('DirectoryTranslation', {
    directoryId: {type: DataTypes.INTEGER, allowNull: false},
    language: {type: DataTypes.STRING, allowNull: false},
    title: {type: DataTypes.STRING, allowNull: false},
    createdById: {type: DataTypes.INTEGER, allowNull: true}
  })

  DirectoryTranslation.massAssignable = function () {
    return ['directoryId', 'language', 'title']
  }

  DirectoryTranslation.associate = (models) => {
    DirectoryTranslation.belongsTo(models.Directory, {
      as: 'directory',
      foreignKey: 'directoryId',
      targetKey: 'id'
    })
  }

  return DirectoryTranslation
}
