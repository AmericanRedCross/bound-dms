module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('PasswordResets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      token: {
        allowNull: false,
        type: Sequelize.STRING
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
    )
    .then(() => queryInterface.addIndex('PasswordResets', ['email']))
    .then(() => queryInterface.addIndex('PasswordResets', ['token']))
    .then(() => queryInterface.addIndex('Users', ['email']))
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('PasswordResets')
  }
}
