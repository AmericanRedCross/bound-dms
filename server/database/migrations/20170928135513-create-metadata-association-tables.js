module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('MetaValues', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      metaTypeId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      entity: {
        allowNull: false,
        type: Sequelize.STRING
      },
      entityId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      value: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('MetaValues')
  }
}
