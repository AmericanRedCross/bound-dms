module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Users', 'activationCode', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'isActive'
    }).then(() => queryInterface.addIndex('Users', ['activationCode']))
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Users', 'activationCode')
  }
}
