module.exports = (sequelize, DataTypes) => {
  const DocumentTranslations = sequelize.define('DocumentTranslations', {
    documentId: {type: DataTypes.INTEGER, allowNull: false},
    language: {type: DataTypes.STRING, allowNull: false},
    title: {type: DataTypes.STRING, allowNull: false},
    content: {type: DataTypes.TEXT, allowNull: true, defaultValue: null},
    revision: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0}
  })

  DocumentTranslations.massAssignable = function () {
    return ['documentId', 'language', 'title', 'content']
  }

  DocumentTranslations.associate = (models) => {
    DocumentTranslations.belongsTo(models.Document, {
      as: 'document',
      foreignKey: 'documentId',
      targetKey: 'id'
    })
  }

  return DocumentTranslations
}
