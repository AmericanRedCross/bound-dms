module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('Projects', [
      {
        name: 'Cash In Emergencies',
        description: 'An example project description',
        baseLanguage: 'en',
        createdById: 1
      },
      {
        name: 'Another Example Project',
        description: 'Another example project description',
        baseLanguage: 'es',
        createdById: 1
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Projects', null, {})
  }
}
