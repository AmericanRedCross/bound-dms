// This module handles the global store and requests for the Directory endpoint
import axios from 'axios'
import directoryUtils from './utils'
import { Directory } from './Directory'

/**
 *  GET /api/projects/:id/directories
      ✓ returns a collection of directories
    GET /api/directories/:id
      ✓ returns a single directory object
    POST /api/projects/:id/directories
      ✓ creates a new directory
    PUT /api/directories/:id
      ✓ updates an existing directory
    DELETE /api/directories/:id
      ✓ deletes an existing project language
 *
 */
const directories = {
  state: {
    structure: [],
    flatDirectories: []
  },
  mutations: {
    SET_STRUCTURE: (state, { response }) => {
      if (response instanceof Array) {
        state.structure = directoryUtils.getDirectories(response)
      }
    },
    SET_PARSED_STRUCTURE: (state, { response }) => {
      state.structure = response.data
    },
    SET_DIRECTORIES: (state, { response }) => {
      state.flatDirectories = response.data
    },
    SET_ORDER: (state, { options }) => {
      // Find the right lot of directories.. traverse through
      let directories = state.structure
      if (options.directoryNumbers !== undefined) {
        options.directoryNumbers.forEach((directoryNumber, index) => {
          if (index === 0) {
            // an array so a bit different to find
            directories = directories.find(directory => directory.order === directoryNumber)
          } else {
            directories = directories.directories.find(directory => directory.order === directoryNumber)
          }
        })
        directories = directories.directories
      }
      Directory.updateOrder(options.newIndex, options.oldIndex, directories)
    }
  },
  actions: {
    // GET entire Structure
    GET_STRUCTURE: function ({ commit }, projectId) {
      // GET DIRECTORIES
      // api/projects/:id/directories
      axios.get('projects/' + projectId + '/directories').then((response) => {
        commit('SET_DIRECTORIES', { response: response.data })
        commit('SET_STRUCTURE', { response: getStructure(response.data.data) })
        // Build the structure...
      }, (err) => {
        commit('SET_MESSAGE', { message: err })
      })
      // BUILD STRUCTURE
      // Mock structure until we know what the endpoints are.
      // commit('SET_STRUCTURE', {
      //   response: {
      //     data: directoryUtils.getMockStructure()
      //   }
      // })
    },
    // POST a directory (update)
    UPDATE_STRUCTURE: function ({ commit }, data) {
      commit('SET_PARSED_STRUCTURE', { response: {data} })
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
  let structure = []
  Object.assign(structure, directories)
  directories.forEach((directory, index) => {
    if (directory.parentId !== null) {
      // It's a child of a directory, move it to the correct place...
      let removed = structure.splice(index, 1)[0]
      // Find the parent
      let parent = structure.find(directory => directory.id === removed.parentId)
      if (parent) {
        // Does parent have a directories array?
        if (parent.directories === undefined) {
          parent.directories = []
        }
        parent.directories.push(removed)
      }
    }
  })
  return structure
}

export default directories
