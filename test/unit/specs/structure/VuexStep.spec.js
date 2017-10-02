import { modules } from '../../../../src/vuex'
import { Directory } from '../../../../src/vuex/modules/structure/Directory'
import { File } from '../../../../src/vuex/modules/file/File'
import directoryUtils from '../../../../src/vuex/modules/structure/utils'

// destructure assign users
const { structure } = modules
// destructure assign mutations
const { mutations } = structure

const mockEmptyState = {
  structure: []
}

const mockState = {
  structure: [
    new Directory({
      id: 1,
      title: 'Module 1',
      order: 0,
      content: '# Markdown Content',
      attachments: [
        new File({id: 1, title: 'Attachment', filename: 'http://somedocument.pdf', size: 12000, mimeType: '', featured: true})
      ],
      directories: [
        new Directory({
          id: 3,
          title: 'Some subdirectory name',
          order: 0,
          content: '# Markdown Content',
          attachments: [
            new File({id: 2, title: 'Another Attachment', filename: 'http://somedocuments.docx', size: 12000, mimeType: '', featured: false})
          ],
          directories: []
        })
      ]
    }),
    new Directory({
      id: 2,
      title: 'Module 2',
      order: 1,
      content: '# Markdown Content',
      attachments: [
        new File({id: 1, title: 'Attachment', filename: 'http://somedocument.pdf', size: 12000, mimeType: '', featured: false})
      ],
      directories: []
    }),
    new Directory({
      id: 3,
      title: 'Module 3',
      order: 2,
      content: '# Markdown Content',
      attachments: [
        new File({id: 1, title: 'Attachment', filename: 'http://somedocument.pdf', size: 12000, mimeType: '', featured: false})
      ],
      directories: []
    }),
    new Directory({
      id: 4,
      title: 'Module 4',
      order: 3,
      content: '# Markdown Content',
      attachments: [
        new File({id: 1, title: 'Attachment', filename: 'http://somedocument.pdf', size: 12000, mimeType: '', featured: false})
      ],
      directories: []
    })
  ],
  directoriesToDelete: [],
  flatDirectories: []
}

const expectDirectory = (mock, directoryObject) => {
  expect(directoryObject.id).to.equal(mock.id)
  expect(directoryObject.title).to.equal(mock.title)
  expect(directoryObject.order).to.equal(mock.order)
  expect(directoryObject.content).to.equal(mock.content)
  // Check Attachment objects
  mock.attachments.forEach((attachment, index) => {
    expectAttachment(attachment, directoryObject.attachments[index])
  })
  if (mock.directories !== undefined) {
    // Recursively check directories
    mock.directories.forEach((directory, index) => {
      expectDirectory(directory, directoryObject.directories[index])
    })
  }
}

const expectAttachment = (mock, attachmentObject) => {
  expect(attachmentObject.id).to.equal(mock.id)
  expect(attachmentObject.title).to.equal(mock.title)
  expect(attachmentObject.filename).to.equal(mock.filename)
  expect(attachmentObject.mimeType).to.equal(mock.mimeType)
}

const moveDirectoryAndExpect = (state, newIndex, oldIndex) => {
  // Move Directories to the right place... (emulating what sortable.js does on the frontend)
  let element = state.structure[oldIndex]
  state.structure.splice(oldIndex, 1)
  state.structure.splice(newIndex, 0, element)
  // Call set order mutation
  mutations.SET_ORDER(state, { options: {newIndex, oldIndex} })
  // Expect that the hierarchies are now in sequential order
  state.structure.forEach((directory, index) => {
    expect(directory.order).to.equal(index)
  })
}

const mockDirectories = directoryUtils.getMockStructure()

describe('Vuex Structure Mutations', () => {
  // SET_STRUCTURE
  it('SET_STRUCTURE', () => {
    // mock state
    let state = {}
    // Copy constant mockState to our state variable
    Object.assign(state, mockEmptyState)
    // apply mutation with mock users
    mutations.SET_STRUCTURE(state, {response: mockDirectories})
    // assert result
    // expect().to.equal(mockUsers)
    mockDirectories.forEach((directory, index) => {
      expectDirectory(directory, state.structure[index])
    })
  })

  // SET_ORDER
  it('SET_ORDER', () => {
    // mock state
    let state = {}
    // Move 0 -> 1 (index based)
    Object.assign(state, mockState)
    moveDirectoryAndExpect(state, 1, 0)
    // Move 0 -> 2 (index based)
    moveDirectoryAndExpect(state, 2, 0)
    // Move 0 -> 3 (index based)
    moveDirectoryAndExpect(state, 3, 0)
    // Move 3 -> 0 (index based)
    moveDirectoryAndExpect(state, 0, 3)
    // Move 3 -> 1 (index based)
    moveDirectoryAndExpect(state, 0, 2)
    // Move 3 -> 2 (index based)
    moveDirectoryAndExpect(state, 0, 1)
  })

  it('FIND_REMOVE_DIRECTORY', () => {
    // mock state
    let state = {}

    state = JSON.parse(JSON.stringify(mockState)) // Object.assign(...) does not do deep cloning
    mutations.FIND_REMOVE_DIRECTORY(state, { options: {directoryNumbers: [], directory: state.structure[0]} })
    // Length should now be one less...
    expect(state.structure.length).to.equal(mockState.structure.length - 1)
    expect(state.directoriesToDelete.length).to.equal(1)
  })

  it('PUSH_DIRECTORY', () => {
    // mock state
    let state = {}

    state = JSON.parse(JSON.stringify(mockState)) // Object.assign(...) does not do deep cloning
    mutations.PUSH_DIRECTORY(state, { options: {} })
    // Length should now be one more...
    expect(state.structure.length).to.equal(mockState.structure.length + 1)
  })
})
