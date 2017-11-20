module.exports = (sequelize, DataTypes) => {
  const DirectoryTranslation = sequelize.define('DirectoryTranslation', {
    directoryId: {type: DataTypes.INTEGER, allowNull: false},
    language: {type: DataTypes.STRING, allowNull: false},
    title: {type: DataTypes.STRING, allowNull: false},
    revision: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0}
  })

  DirectoryTranslation.massAssignable = function () {
    return ['directoryId', 'language', 'title', 'revision']
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
