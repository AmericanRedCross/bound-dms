module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      action: {
        allowNull: false,
        type: Sequelize.STRING
      },
      entity: {
        allowNull: true,
        type: Sequelize.STRING
      },
      entityId: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      changes: {
        allowNull: true,
        type: Sequelize.TEXT,
        defaultValue: null
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
      return queryInterface.addConstraint('Histories', ['userId'], {
        type: 'FOREIGN KEY',
        references: {
          table: 'Users',
          field: 'id'
        }
      })
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Histories')
  }
};
