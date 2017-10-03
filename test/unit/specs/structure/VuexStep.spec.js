import { modules } from '../../../../src/vuex'
import { Directory } from '../../../../src/vuex/modules/structure/Directory'
import { File } from '../../../../src/vuex/modules/file/File'
import directoryUtils from '../../../../src/vuex/modules/structure/utils'

// destructure assign users
const { structure } = modules
// destructure assign mutations
const { mutations } = structure

const mockState = {
  getEmptyState () {
    return {
      structure: [],
      directoriesToDelete: [],
      flatDirectories: []
    }
  },
  getState () {
    return {
      structure: [
        new Directory({
          id: 1,
          order: 0,
          files: [
            new File({id: 1, title: 'Attachment', filename: 'somedocument.pdf', size: 12000, mimeType: '', featured: true})
          ],
          directories: [
            new Directory({
              id: 3,
              order: 0,
              files: [
                new File({id: 2, title: 'Another Attachment', filename: 'somedocuments.docx', size: 12000, mimeType: '', featured: false})
              ],
              directories: []
            })
          ],
          translations: [{title: 'Here is a title in english', language: 'en'}]
        }),
        new Directory({
          id: 2,
          order: 1,
          files: [
            new File({id: 1, title: 'Attachment', filename: 'somedocument.pdf', size: 12000, mimeType: '', featured: false})
          ],
          directories: []
        }),
        new Directory({
          id: 3,
          order: 2,
          files: [
            new File({id: 1, title: 'Attachment', filename: 'somedocument.pdf', size: 12000, mimeType: '', featured: false})
          ],
          directories: []
        }),
        new Directory({
          id: 4,
          order: 3,
          files: [
            new File({id: 1, title: 'Attachment', filename: 'somedocument.pdf', size: 12000, mimeType: '', featured: false})
          ],
          directories: []
        })
      ],
      directoriesToDelete: [],
      flatDirectories: []
    }
  }
}

const expectDirectory = (mock, directoryObject) => {
  expect(directoryObject.id).to.equal(mock.id)
  expect(directoryObject.order).to.equal(mock.order)
  if (mock.translations) {
    // Check Translation objects
    mock.translations.forEach((translation, index) => {
      expectTranslations(translation, directoryObject.translations[index])
    })
  }
  // Check Attachment objects
  mock.files.forEach((file, index) => {
    expectFile(file, directoryObject.files[index])
  })
  if (mock.directories !== undefined) {
    // Recursively check directories
    mock.directories.forEach((directory, index) => {
      expectDirectory(directory, directoryObject.directories[index])
    })
  }
}

const expectTranslations = (mock, translationObject) => {
  expect(translationObject.title).to.equal(mock.title)
  expect(translationObject.language).to.equal(mock.language)
}

const expectFile = (mock, fileObject) => {
  expect(fileObject.id).to.equal(mock.id)
  expect(fileObject.title).to.equal(mock.title)
  expect(fileObject.filename).to.equal(mock.filename)
  expect(fileObject.mimeType).to.equal(mock.mimeType)
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
    let state = mockState.getEmptyState()

    // apply mutation with mock users
    mutations.SET_STRUCTURE(state, {response: mockDirectories})
    // assert result
    mockDirectories.forEach((directory, index) => {
      expectDirectory(directory, state.structure[index])
    })
  })

  // SET_ORDER
  it('SET_ORDER', () => {
    // mock state
    let state = mockState.getState()
    // Move 0 -> 1 (index based)
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
    let state = mockState.getState()

    state.directoriesToDelete = []
    mutations.FIND_REMOVE_DIRECTORY(state, { options: {directoryNumbers: [], directory: state.structure[0]} })
    // Length should now be one less...
    expect(state.structure.length).to.equal(mockState.getState().structure.length - 1)
    expect(state.directoriesToDelete.length).to.equal(1)
  })

  it('PUSH_DIRECTORY', () => {
    // mock state
    let state = mockState.getState()

    mutations.PUSH_DIRECTORY(state, { options: {} })
    // Length should now be one more...
    expect(state.structure.length).to.equal(mockState.getState().structure.length + 1)
  })
})
