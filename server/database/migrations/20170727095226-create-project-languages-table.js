module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('ProjectLanguages', {
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
      code: {
        type: Sequelize.STRING(10)
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
      return queryInterface.addConstraint('ProjectLanguages', ['projectId'], {
        type: 'FOREIGN KEY',
        references: {
          table: 'Projects',
          field: 'id'
        },
        onDelete: 'cascade'
      })
    })
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('ProjectLanguages')
  }
}
