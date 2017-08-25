module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
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
      return queryInterface.addConstraint('Projects', ['createdById'], {
        type: 'FOREIGN KEY',
        references: {
          table: 'Users',
          field: 'id'
        },
        onDelete: 'set null'
      })
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Projects')
  }
}
