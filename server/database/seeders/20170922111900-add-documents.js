module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Documents', [
      {
        projectId: 1,
        createdById: 1
      },
      {
        projectId: 1,
        createdById: 1
      }
    ], {}).then(() => {
      return queryInterface.bulkInsert('DocumentTranslations', [
        {documentId: 1, language: 'en', title: 'Test en title', content: '# test en content'},
        {documentId: 1, language: 'fr', title: 'Test fr title', content: '# test fr content'},
        {documentId: 2, language: 'en', title: 'Test 2 en title', content: '# test 2 en content'},
        {documentId: 2, language: 'fr', title: 'Test 2 fr title', content: '# test 2 fr content'}
      ])
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('DocumentTranslations', null, {}).then(() => {
      return queryInterface.bulkDelete('Documents', null, {})
    })
  }
}
