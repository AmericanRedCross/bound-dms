const bcrypt = require('bcrypt')

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
    return queryInterface.bulkInsert('Users', [
      {
        firstname: 'Test',
        lastname: 'User',
        email: 'user@domain.com',
        password: bcrypt.hashSync('12345678', 12),
        isActive: true,
        role: 'admin'
      },
      {
        firstname: 'Another',
        lastname: 'User',
        email: 'another@domain.com',
        password: bcrypt.hashSync('12345678', 12),
        isActive: true,
        role: 'editor'
      },
      {
        firstname: 'Third',
        lastname: 'User',
        email: 'third@domain.com',
        password: bcrypt.hashSync('12345678', 12),
        isActive: true,
        role: 'translator'
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
    return queryInterface.bulkDelete('Users', null, {})
  }
}
