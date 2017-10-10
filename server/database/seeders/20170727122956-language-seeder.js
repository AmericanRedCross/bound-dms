module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ProjectLanguages', [
      {
        projectId: 1,
        code: 'en'
      },
      {
        projectId: 1,
        code: 'fr'
      },
      {
        projectId: 1,
        code: 'es'
      },
      {
        projectId: 2,
        code: 'en'
      }
    ], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ProjectLanguages', null, {})
  }
}
