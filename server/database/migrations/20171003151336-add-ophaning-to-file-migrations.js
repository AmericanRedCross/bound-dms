'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeConstraint('Files', 'Files_directoryId_Directories_fk').then(() => {
      return queryInterface.addConstraint('Files', ['directoryId'], {
        type: 'FOREIGN KEY',
        references: {
          table: 'Directories',
          field: 'id'
        },
        onDelete: 'set null'
      })
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeConstraint('Files', 'Files_directoryId_Directories_fk').then(() => {
      return queryInterface.addConstraint('Files', ['directoryId'], {
        type: 'FOREIGN KEY',
        references: {
          table: 'Directories',
          field: 'id'
        }
      })
    })
  }
}
