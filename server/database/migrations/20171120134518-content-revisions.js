module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('DocumentTranslations', 'revision', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      after: 'content'
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('DocumentTranslations', 'revision')
  }
}
