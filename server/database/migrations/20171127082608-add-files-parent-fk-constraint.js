module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeConstraint('Files', 'Files_parentId_Files_fk').then(() => {
      return queryInterface.addConstraint('Files', ['parentId'], {
        type: 'FOREIGN KEY',
        references: {
          table: 'Files',
          field: 'id'
        },
        onDelete: 'cascade'
      })
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeConstraint('Files', 'Files_parentId_Files_fk').then(() => {
      return queryInterface.addConstraint('Files', ['parentId'], {
        type: 'FOREIGN KEY',
        references: {
          table: 'Files',
          field: 'id'
        }
      })
    })
  }
}
