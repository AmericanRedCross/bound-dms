// This module handles the global store and requests for the Directory endpoint
import axios from 'axios'
import directoryUtils from './utils'
import { Directory } from './Directory'

const DIRECTORY_ROOT = 'directories/'
const directories = {
  state: {
    structure: [],
    flatDirectories: [],
    directoriesToDelete: []
  },
  mutations: {
    SET_STRUCTURE: (state, { response }) => {
      if (response instanceof Array) {
        state.structure = directoryUtils.getDirectories(response)
        state.structure.sort((a, b) => {
          if (a.order < b.order) {
            return -1
          } else if (a.order > b.order) {
            return 1
          }

          return 0
        })
        // Reset to delete as we have reset the structure
        state.directoriesToDelete = []
      }
    },

    SET_PARSED_STRUCTURE: (state, { response }) => {
      state.structure = response.data
    },

    SET_DIRECTORIES: (state, { response }) => {
      state.flatDirectories = response.data
    },

    SET_DIRECTORY: (state, { response }) => {
      // Does the project exist already?
      let directory = state.flatDirectories.find(directory => directory.id === response.data.id)

      if (directory) {
        directory = response.data
      } else {
        state.flatDirectories.push(response.data)
      }
    },

    FIND_REMOVE_DIRECTORY: (state, { options }) => {
      // Find the right lot of directories.. traverse through
      let directories = options.directoryNumbers.length ? directoryUtils.traverseWithOrder(state.structure, options.directoryNumbers) : state.structure
      if (directories) {
        let indexToRemove = directories.indexOf(options.directory)
        if (indexToRemove !== -1) {
          state.directoriesToDelete.push(directories.splice(indexToRemove, 1)[0])
          Directory.updateOrder(directories)
        }
      }
    },

    SET_ORDER: (state, { options }) => {
      // Find the right lot of directories.. traverse through
      let directories = directoryUtils.traverseWithOrder(state.structure, options.directoryNumbers)
      Directory.updateOrder(directories)
      // Set flat structure
      state.flatDirectories = directoryUtils.getFlatStructure(state.structure)
    },

    FLAT_STRUCTURE_PARSE: (state) => {
      // Set flat structure
      state.flatDirectories = directoryUtils.getFlatStructure(state.structure)
    }
  },
  actions: {
    // GET entire Structure
    GET_STRUCTURE: function ({ commit }, projectId) {
      // api/projects/:id/directories
      axios.get('projects/' + projectId + '/directories').then((response) => {
        commit('SET_DIRECTORIES', { response: response.data })
        commit('SET_STRUCTURE', { response: getStructure(response.data.data) })
      }, (err) => {
        commit('SET_MESSAGE', { message: err })
      })
    },

    UPDATE_STRUCTURE: function ({ commit }, data) {
      commit('SET_PARSED_STRUCTURE', { response: {data} })
    },

    SET_FLAT_STRUCTURE: function ({ commit }) {
      commit('FLAT_STRUCTURE_PARSE')
    },

    SAVE_STRUCTURE: function ({commit, state}, projectId) {
      let promises = []
      // Loop through each directory item and save
      state.flatDirectories.forEach((directory) => {
        if (directory.needsSaving) {
          if (directory.id !== null && directory.id !== undefined) {
            // Update
            promises.push(axios.put(DIRECTORY_ROOT + directory.id, directory))
          } else {
            // Create a new one
            promises.push(axios.post('projects/' + projectId + '/directories', directory))
          }
        }
      })
      state.directoriesToDelete.forEach((directory) => {
        if (directory.id !== null && directory.id !== undefined) {
          // Update
          promises.push(axios.delete(DIRECTORY_ROOT + directory.id))
        }
      })
      return Promise.all(promises)
    },

    UPDATE_DIRECTORY: function ({ commit, state }, directory) {
      // /api/directories/:id
      return axios.put(DIRECTORY_ROOT + directory.id, {
        attachments: directory.attachments,
        content: directory.content,
        order: directory.order,
        title: directory.title
      }).then((response) => {
        commit('SET_PROJECT', { response: response.data })
        // Re create the structure
        commit('SET_STRUCTURE', { response: getStructure(state.flatDirectories) })
      }).catch(err => {
        commit('SET_MESSAGE', { message: err })
      })
    },

    REMOVE_DIRECTORY: function ({ commit }, options) {
      commit('FIND_REMOVE_DIRECTORY', {
        options
      })
    },

    UPDATE_ORDER: function ({ commit }, options) {
      commit('SET_ORDER', {
        options
      })
    }
  },
  getters: {
    getDirectoryById: (state, getters) => (id) => {
      return state.directories.find(directory => directory.id === id)
    }
  }
}

const getStructure = (directories) => {
  // The structure we're going to return
  let structure = []
  // Make a copy
  Object.assign(structure, directories)
  // Directories we're going to remove from the top level after we've made a copy (if they need to be nested)
  let toRemove = []
  let movedDirectories = []
  // Loop through the directories, find any directories that have a parentId and store them as a child to that parent
  directories.forEach((directory, index) => {
    if (directory.parentId !== null) {
      // It's a child of a directory, move it to the correct place...
      let copiedDirectory = {}
      Object.assign(copiedDirectory, structure[index])
      // Find the parent
      if (copiedDirectory) {
        let parent
        // Have we already copied it? if so check the moved directory record
        parent = movedDirectories.find(directory => directory.id === copiedDirectory.parentId)
        // else check the structure for it
        if (!parent) {
          parent = structure.find(directory => directory.id === copiedDirectory.parentId)
        }
        if (parent) {
          // Does parent have a directories array?
          if (parent.directories === undefined) {
            parent.directories = []
          }
          parent.directories.push(copiedDirectory)
          movedDirectories.push(copiedDirectory)
          toRemove.push(structure[index])
        }
      }
    }
  })
  // Remove each top level directory we've nested already
  toRemove.forEach(directory => {
    let index = structure.indexOf(directory)
    if (index !== -1) {
      structure.splice(index, 1)
    }
  })
  return structure
}

export default directories
