function createDirectoryTable (queryInterface, Sequelize) {
  return queryInterface.createTable('Directories', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    projectId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    parentId: {
      allowNull: true,
      type: Sequelize.INTEGER,
      defaultValue: null
    },
    order: {
      type: Sequelize.INTEGER,
      defaultValue: 0
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
    return queryInterface.addConstraint('Directories', ['projectId'], {
      type: 'FOREIGN KEY',
      references: {
        table: 'Projects',
        field: 'id'
      },
      onDelete: 'cascade'
    })
  }).then(() => {
    return queryInterface.addConstraint('Directories', ['parentId'], {
      type: 'FOREIGN KEY',
      references: {
        table: 'Directories',
        field: 'id'
      },
      onDelete: 'cascade'
    })
  })
}

function createDirectoryTranslationsTable (queryInterface, Sequelize) {
  return queryInterface.createTable('DirectoryTranslations', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    directoryId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    language: {
      allowNull: false,
      type: Sequelize.STRING(10)
    },
    title: {
      allowNull: false,
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
  },
    {
      charset: 'utf8mb4'
    }
  ).then(() => {
    return queryInterface.addConstraint('DirectoryTranslations', ['directoryId'], {
      type: 'FOREIGN KEY',
      references: {
        table: 'Directories',
        field: 'id'
      },
      onDelete: 'cascade'
    })
  }).then(() => {
    return queryInterface.addConstraint('DirectoryTranslations', ['directoryId', 'language'], {
      type: 'unique'
    })
  })
}

module.exports = {
  up: function (queryInterface, Sequelize) {
    return createDirectoryTable(queryInterface, Sequelize)
    .then(() => {
      return createDirectoryTranslationsTable(queryInterface, Sequelize)
    })
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('DirectoryTranslations').then(() => {
      return queryInterface.dropTable('Directories')
    })
  }
}
