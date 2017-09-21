module.exports = (sequelize, DataTypes) => {
  const DocumentContent = sequelize.define('DocumentContent', {
    documentId: {type: DataTypes.INTEGER, allowNull: false},
    language: {type: DataTypes.STRING, allowNull: false},
    content: {type: DataTypes.TEXT, allowNull: true, defaultValue: null},
    createdById: {type: DataTypes.INTEGER, allowNull: true}
  })

  DocumentContent.massAssignable = function () {
    return ['documentId', 'language', 'content']
  }

  DocumentContent.associate = (models) => {
    DocumentContent.belongsTo(models.Document, {
      as: 'document',
      foreignKey: 'documentId',
      targetKey: 'id'
    })
  }

  return DocumentContent
}
