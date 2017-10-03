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
          // Set flat structure
          state.flatDirectories = directoryUtils.getFlatStructure(state.structure)
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
    },

    PUSH_DIRECTORY: (state, directory) => {
      state.structure.push(directory)
    },

    UPDATE_NEEDS_SAVING: (state, { options }) => {
      options.directory.needsSaving = true
      // Set flat structure
      state.flatDirectories = directoryUtils.getFlatStructure(state.structure)
    },

    UPDATE_DIRECTORY_METADATA: (state, {directoryId, metadata}) => {
      const directoryIdx = state.flatDirectories.findIndex(directory => directory.id === directoryId)
      state.flatDirectories[directoryIdx].metadata = metadata
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
        files: directory.files,
        content: directory.content,
        order: directory.order,
        title: directory.title
      }).then((response) => {
        // Re create the structure
        commit('SET_STRUCTURE', { response: getStructure(state.flatDirectories) })
      }).catch(err => {
        commit('SET_MESSAGE', { message: err })
        throw err
      })
    },

    UPDATE_DIRECTORY_METADATA: function ({ commit, state }, {directoryId, metadata}) {
      return axios.put(DIRECTORY_ROOT + directoryId + '/metadata', metadata).then((response) => {
        // Re create the structure
        commit('UPDATE_DIRECTORY_METADATA', {directoryId, metadata})
        commit('SET_STRUCTURE', { response: getStructure(state.flatDirectories) })
      }).catch(err => {
        commit('SET_MESSAGE', { message: err })
        throw err
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
    },

    ADD_TOP_LEVEL_DIRECTORY: function ({ commit }, options) {
      let directory = options.directory || new Directory({})
      commit('PUSH_DIRECTORY',
        directory
      )
      commit('SET_ORDER', {
        options
      })
    },

    DIRECTORY_UPDATE_SAVING: function ({ commit }, options) {
      commit('UPDATE_NEEDS_SAVING', {
        options
      })
    }
  },
  getters: {
    getDirectoryById: (state, getters) => (id) => {
      let flatDirectory = state.flatDirectories.find(directory => directory.id === id)
      return directoryUtils.getDirectoryObject(flatDirectory)
    }
  }
}

const getStructure = (flatStructure) => {
  // Build the structure we're going to return (starting with the root directories)
  let structure = flatStructure.filter(directory => directory.parentId === null)

  const buildStructure = (parent) => {
    parent.directories = flatStructure.filter(child => child.parentId === parent.id)
    // Loop through and build structure
    parent.directories.forEach(child => buildStructure(child))
  }

  structure.forEach(parent => buildStructure(parent))

  return structure
}

export default directories
