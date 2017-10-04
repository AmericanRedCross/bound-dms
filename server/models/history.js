module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define('History', {
    action: {
      type: DataTypes.STRING,
      allowNull: false
    },
    entity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    entityId: {
      type: DataTypes.INTEGER,
      references: null,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    changes: {
      allowNull: true,
      type: DataTypes.TEXT,
      get: function () {
        return JSON.parse(this.getDataValue('changes'))
      },
      set: function (value) {
        return this.setDataValue('changes', JSON.stringify(value));
      }
    }
  })

  History.massAssignable = function () {
    return []
  }

  History.associate = (models) => {
    History.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
      targetKey: 'id'
    })
  }

  return History
}
