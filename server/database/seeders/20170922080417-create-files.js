'use strict';

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000)
}

module.exports = {
  up: function (queryInterface, Sequelize) {

    let now = new Date()

    return queryInterface.bulkInsert('Files', [
      {
        parentId: null,
        title: 'Test parent file',
        description: 'This is a test file',
        mimeType: 'application/text',
        filename: 'parent.txt',
        metadata: null,
        createdById: 1,
        createdAt: now
      },
      {
        parentId: 1,
        title: 'Test child file',
        description: 'This is another test file',
        mimeType: 'application/text',
        filename: 'child.txt',
        metadata: null,
        createdById: 1,
        createdAt: now
      },
      {
        parentId: null,
        title: 'Test file 2',
        description: 'This is a test file',
        mimeType: 'application/text',
        filename: 'test2.txt',
        metadata: null,
        createdById: 1,
        createdAt: addMinutes(now, 1)
      },
      {
        parentId: null,
        title: 'Test file 3',
        description: 'This is a test file',
        mimeType: 'application/text',
        filename: 'test3.txt',
        metadata: null,
        createdById: 1,
        createdAt: addMinutes(now, 2)
      },
      {
        parentId: null,
        title: 'Test file 4',
        description: 'This is a test file',
        mimeType: 'application/text',
        filename: 'test4.txt',
        metadata: null,
        createdById: 1,
        createdAt: addMinutes(now, 3)
      },
      {
        parentId: null,
        title: 'Test file 5',
        description: 'This is a test file',
        mimeType: 'application/text',
        filename: 'test5.txt',
        metadata: null,
        createdById: 1,
        createdAt: addMinutes(now, 4)
      },
      {
        parentId: null,
        title: 'Test file 6',
        description: 'This is a test file',
        mimeType: 'application/text',
        filename: 'test6.txt',
        metadata: null,
        createdById: 1,
        createdAt: addMinutes(now, 5)
      },
      {
        parentId: null,
        title: 'Test file 7',
        description: 'This is a test file',
        mimeType: 'application/text',
        filename: 'test7.txt',
        metadata: null,
        createdById: 1,
        createdAt: addMinutes(now, 6)
      },
      {
        parentId: null,
        title: 'Test file 8',
        description: 'This is a test file',
        mimeType: 'application/text',
        filename: 'test8.txt',
        metadata: null,
        createdById: 1,
        createdAt: addMinutes(now, 7)
      },
      {
        parentId: null,
        title: 'Test file 9',
        description: 'This is a test file',
        mimeType: 'application/text',
        filename: 'test9.txt',
        metadata: null,
        createdById: 1,
        createdAt: addMinutes(now, 8)
      },
      {
        parentId: null,
        title: 'Test file 10',
        description: 'This is a test file',
        mimeType: 'application/text',
        filename: 'test10.txt',
        metadata: null,
        createdById: 1,
        createdAt: addMinutes(now, 9)
      }
    ], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Files', null, {})
  }
}
