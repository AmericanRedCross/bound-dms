module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('MetaValues', [
      {metaTypeId: 1, entity: 'directory', entityId: 1, value: 1},
      {metaTypeId: 2, entity: 'directory', entityId: 1, value: true}
    ])
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('MetaValues', null, {})
  }
}
