module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Metatypes', [
      {projectId: 1, key: 'hierarchy', type: 'string', createdById: 1},
      {projectId: 1, key: 'featured', type: 'boolean', createdById: 1}
    ])
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Metatypes', null, {})
  }
}
