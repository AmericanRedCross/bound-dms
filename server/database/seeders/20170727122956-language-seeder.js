module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ProjectLanguages', [
      {
        projectId: 1,
        code: 'en_GB'
      },
      {
        projectId: 1,
        code: 'fr'
      },
      {
        projectId: 1,
        code: 'es'
      }
    ], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ProjectLanguages', null, {})
  }
}
