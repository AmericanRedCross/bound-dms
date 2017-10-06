'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Files', 'code', {
      type: Sequelize.STRING(10),
      allowNull: true
    })
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Files', 'code')
  }
}
