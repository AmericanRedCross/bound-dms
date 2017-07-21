module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: {type: DataTypes.STRING, allowNull: false},
    description: DataTypes.STRING,
    createdBy: {type: DataTypes.INTEGER, allowNull: false}
  })

  Project.associate = (models) => {
    Project.belongsTo(models.User, {
      as: 'CreatedBy',
      foreignKey: 'createdBy',
      targetKey: 'id'
    })
  }

  return Project
}
