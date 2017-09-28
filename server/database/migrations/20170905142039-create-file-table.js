'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Files', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      parentId: {
        allowNull: true,
        type: Sequelize.INTEGER()
      },
      projectId: {
        allowNull: true,
        type: Sequelize.INTEGER()
      },
      directoryId: {
        allowNull: true,
        type: Sequelize.INTEGER()
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING()
      },
      description: {
        allowNull: true,
        type: Sequelize.TEXT()
      },
      mimeType: {
        allowNull: false,
        type: Sequelize.STRING()
      },
      filename: {
        allowNull: false,
        type: Sequelize.STRING()
      },
      metadata: {
        allowNull: true,
        type: Sequelize.STRING()
      },
      createdById: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    },
      {
        charset: 'utf8mb4'
      }
    ).then(() => {
      return queryInterface.addConstraint('Files', ['parentId'], {
        type: 'FOREIGN KEY',
        references: {
          table: 'Files',
          field: 'id'
        }
      })
    }).then(() => {
      return queryInterface.addConstraint('Files', ['createdById'], {
        type: 'FOREIGN KEY',
        references: {
          table: 'Users',
          field: 'id'
        }
      })
    }).then(() => {
      return queryInterface.addConstraint('Files', ['projectId'], {
        type: 'FOREIGN KEY',
        references: {
          table: 'Projects',
          field: 'id'
        }
      })
    }).then(() => {
      return queryInterface.addConstraint('Files', ['directoryId'], {
        type: 'FOREIGN KEY',
        references: {
          table: 'Directories',
          field: 'id'
        }
      })
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Files')
  }
}
