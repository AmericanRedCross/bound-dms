module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Publishes', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      projectId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      language: {
        allowNull: false,
        type: Sequelize.STRING(10)
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING()
      },
      filePath: {
        allowNull: false,
        type: Sequelize.STRING()
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
      return queryInterface.addConstraint('Publishes', ['projectId'], {
        type: 'FOREIGN KEY',
        references: {
          table: 'Projects',
          field: 'id'
        }
      })
    }).then(() => {
      return queryInterface.addConstraint('Publishes', ['createdById'], {
        type: 'FOREIGN KEY',
        references: {
          table: 'Users',
          field: 'id'
        }
      })
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Publishes')
  }
}
