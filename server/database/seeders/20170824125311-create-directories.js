module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Directories', [
      {
        projectId: 1,
        parentId: null,
        createdById: 1,
        order: 0
      },
      {
        projectId: 1,
        parentId: 1,
        createdById: 1,
        order: 0
      },
      {
        projectId: 1,
        parentId: null,
        createdById: 1,
        order: 1
      }
    ], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Directories', null, {})
  }
}
