module.exports = (sequelize, DataTypes) => {
  const ProjectLanguage = sequelize.define('ProjectLanguage', {
    projectId: {type: DataTypes.INTEGER, allowNull: false, unique: 'projectId_code'},
    code: {type: DataTypes.STRING, allowNull: false, unique: 'projectId_code'}
  })

  ProjectLanguage.associate = (models) => {
    ProjectLanguage.belongsTo(models.Project, {
      as: 'languages',
      foreignKey: 'projectId',
      targetKey: 'id'
    })
  }

  return ProjectLanguage
}
