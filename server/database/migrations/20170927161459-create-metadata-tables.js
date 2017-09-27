function createMetatypesTable (queryInterface, Sequelize) {
  return queryInterface.createTable('Metatypes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    projectId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    key: {
      allowNull: false,
      type: Sequelize.STRING(32)
    },
    type: {
      allowNull: false,
      type: Sequelize.STRING(10)
    },
    createdById: {
      allowNull: true,
      type: Sequelize.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('NOW()')
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('NOW()')
    }
  },
    {
      charset: 'utf8mb4'
    }
  ).then(() => {
    return queryInterface.addConstraint('Metatypes', ['projectId'], {
      type: 'FOREIGN KEY',
      references: {
        table: 'Projects',
        field: 'id'
      },
      onDelete: 'cascade'
    })
  }).then(() => {
    return queryInterface.addConstraint('Metatypes', ['createdById'], {
      type: 'FOREIGN KEY',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'set null'
    })
  }).then(() => {
    return queryInterface.addConstraint('Metatypes', ['projectId', 'key'], {
      type: 'UNIQUE'
    })
  })
}

module.exports = {
  up: function (queryInterface, Sequelize) {
    return createMetatypesTable(queryInterface, Sequelize)
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Metatypes')
  }
}
