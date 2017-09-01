import { modules } from '../../../../src/vuex'
import { Directory } from '../../../../src/vuex/modules/structure/Directory'
import { Attachment } from '../../../../src/vuex/modules/structure/Attachment'
import directoryUtils from '../../../../src/vuex/modules/structure/utils'

// destructure assign users
const { structure } = modules
// destructure assign mutations
const { mutations } = structure

const mockEmptyState = {
  directories: []
}

const mockState = {
  directories: [
    new Directory({
      id: 1,
      title: 'Module 1',
      hierarchy: 1,
      content: '# Markdown Content',
      attachments: [
        new Attachment({id: 1, title: 'Attachment', url: 'http://somedocument.pdf', size: 12000, mime: '', featured: true})
      ],
      directories: [
        new Directory({
          id: 3,
          title: 'Some subdirectory name',
          hierarchy: 1,
          content: '# Markdown Content',
          attachments: [
            new Attachment({id: 2, title: 'Another Attachment', url: 'http://somedocuments.docx', size: 12000, mime: '', featured: false})
          ],
          directories: [],
          critical: true
        })
      ],
      critical: true
    }),
    new Directory({
      id: 2,
      title: 'Module 2',
      hierarchy: 2,
      content: '# Markdown Content',
      attachments: [
        new Attachment({id: 1, title: 'Attachment', url: 'http://somedocument.pdf', size: 12000, mime: '', featured: false})
      ],
      directories: [],
      critical: false
    }),
    new Directory({
      id: 3,
      title: 'Module 3',
      hierarchy: 3,
      content: '# Markdown Content',
      attachments: [
        new Attachment({id: 1, title: 'Attachment', url: 'http://somedocument.pdf', size: 12000, mime: '', featured: false})
      ],
      directories: [],
      critical: false
    }),
    new Directory({
      id: 4,
      title: 'Module 4',
      hierarchy: 4,
      content: '# Markdown Content',
      attachments: [
        new Attachment({id: 1, title: 'Attachment', url: 'http://somedocument.pdf', size: 12000, mime: '', featured: false})
      ],
      directories: [],
      critical: false
    })
  ]
}

const expectDirectory = (mock, directoryObject) => {
  expect(directoryObject.id).to.equal(mock.id)
  expect(directoryObject.title).to.equal(mock.title)
  expect(directoryObject.hierarchy).to.equal(mock.hierarchy)
  expect(directoryObject.content).to.equal(mock.content)
  expect(directoryObject.critical).to.equal(mock.critical)
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
  expect(attachmentObject.url).to.equal(mock.url)
  expect(attachmentObject.size).to.equal(mock.size)
  expect(attachmentObject.mime).to.equal(mock.mime)
  expect(attachmentObject.featured).to.equal(mock.featured)
}

const moveDirectoryAndExpect = (state, newIndex, oldIndex) => {
  // Move Directories to the right place... (emulating what sortable.js does on the frontend)
  let element = state.directories[oldIndex]
  state.directories.splice(oldIndex, 1)
  state.directories.splice(newIndex, 0, element)
  // Call set hierarchy mutation
  mutations.SET_HIERARCHY(state, { options: {newIndex, oldIndex} })
  // Expect that the hierarchies are now in sequential order
  state.directories.forEach((directory, index) => {
    expect(directory.hierarchy).to.equal(index + 1)
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
    mutations.SET_STRUCTURE(state, {response: {data: mockDirectories}})
    // assert result
    // expect().to.equal(mockUsers)
    mockDirectories.forEach((directory, index) => {
      expectDirectory(directory, state.directories[index])
    })
  })

  // SET_HIERARCHY
  it('SET_HIERARCHY', () => {
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
})
