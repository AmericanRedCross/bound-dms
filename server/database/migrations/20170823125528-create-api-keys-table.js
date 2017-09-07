module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('ApiKeys', {
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
      name: {
        allowNull: false,
        type: Sequelize.STRING()
      },
      key: {
        allowNull: false,
        type: Sequelize.STRING(64)
      },
      createdById: {
        allowNull: false,
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
      return queryInterface.addConstraint('ApiKeys', ['projectId'], {
        type: 'FOREIGN KEY',
        references: {
          table: 'Projects',
          field: 'id'
        },
        onDelete: 'cascade'
      })
    }).then(() => {
      return queryInterface.addConstraint('ApiKeys', ['createdById'], {
        type: 'FOREIGN KEY',
        references: {
          table: 'Users',
          field: 'id'
        }
      })
    })
  },

  down: function (queryInterface) {
    return queryInterface.dropTable('ApiKeys')
  }
}
