module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    projectId: {type: DataTypes.INTEGER, allowNull: false},
    createdById: {type: DataTypes.INTEGER, allowNull: true}
  })

  Document.massAssignable = function () {
    return ['projectId', 'createdById']
  }

  Document.associate = (models) => {
    Document.belongsTo(models.Project, {
      as: 'project',
      foreignKey: 'projectId',
      targetKey: 'id'
    })

    Document.belongsTo(models.User, {
      as: 'createdBy',
      foreignKey: 'createdById',
      targetKey: 'id'
    })

    Document.hasMany(models.DocumentContent, {
      as: 'content',
      foreignKey: 'documentId',
      sourceKey: 'id'
    })
  }

  return Document
}
