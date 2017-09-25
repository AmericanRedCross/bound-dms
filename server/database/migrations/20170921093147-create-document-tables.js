function createDocumentsTable (queryInterface, Sequelize) {
  return queryInterface.createTable('Documents', {
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
    createdById: {
      allowNull: true,
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
    return queryInterface.addConstraint('Documents', ['projectId'], {
      type: 'FOREIGN KEY',
      references: {
        table: 'Projects',
        field: 'id'
      },
      onDelete: 'cascade'
    })
  }).then(() => {
    return queryInterface.addConstraint('Documents', ['createdById'], {
      type: 'FOREIGN KEY',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'set null'
    })
  })
}

function createDocumentTranslationsTable (queryInterface, Sequelize) {
  return queryInterface.createTable('DocumentTranslations', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    documentId: {
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
    content: {
      type: Sequelize.TEXT,
      defaultValue: null
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
    return queryInterface.addConstraint('DocumentTranslations', ['documentId'], {
      type: 'FOREIGN KEY',
      references: {
        table: 'Documents',
        field: 'id'
      },
      onDelete: 'cascade'
    })
  }).then(() => {
    return queryInterface.addIndex('DocumentTranslations', ['language'])
  })
}

module.exports = {
  up: function (queryInterface, Sequelize) {
    return createDocumentsTable(queryInterface, Sequelize)
    .then(() => {
      return createDocumentTranslationsTable(queryInterface, Sequelize)
    })
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('DocumentTranslations').then(() => {
      return queryInterface.dropTable('Documents')
    })
  }
}
