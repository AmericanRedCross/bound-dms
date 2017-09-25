module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ApiKeys', [
      {
        projectId: 1,
        name: 'android',
        key: '49080F419DB2A6FF6B032FF31352B8EA77C02F2737B2A7DB7C506C5404AA8BBA',
        createdById: 1
      },
      {
        projectId: 1,
        name: 'iOS',
        key: '255C411A4FCB15957DB771A5C76519274814631A2BC85F5ADF397404B3D0D848',
        createdById: 1
      }
    ], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('ApiKeys', null, {})
  }
}
