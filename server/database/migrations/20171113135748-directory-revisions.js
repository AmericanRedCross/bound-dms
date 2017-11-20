module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('DirectoryTranslations', 'revision', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      after: 'title'
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('DirectoryTranslations', 'revision')
  }
}
