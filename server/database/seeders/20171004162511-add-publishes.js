module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Publishes', [
      {projectId: 1, language: 'en', type: 'bundleArchive', filePath: '1506975576_bundle.tar.gz', createdById: 1},
      {projectId: 1, language: 'es', type: 'bundleArchive', filePath: '1506975432_bundle.tar.gz', createdById: 1}
    ])
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Publishes', null, {})
  }
}
