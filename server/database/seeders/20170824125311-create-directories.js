module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Directories', [
      {
        projectId: 1,
        parentId: null,
        createdById: 1
      },
      {
        projectId: 1,
        parentId: null,
        createdById: 1
      },
      {
        projectId: 1,
        parentId: null,
        createdById: 1
      }
    ], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Directories', null, {})
  }
}
