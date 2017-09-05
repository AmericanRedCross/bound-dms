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
const DIRECTORY_ROOT = 'directories/'
const directories = {
  state: {
    structure: [],
    flatDirectories: []
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
      }
    },
    SET_PARSED_STRUCTURE: (state, { response }) => {
      state.structure = response.data
    },
    SET_DIRECTORIES: (state, { response }) => {
      state.flatDirectories = response.data
    },
    SET_DIRECTORY: (state, {response}) => {
      // Does the project exist already?
      let directory = state.flatDirectories.find(directory => directory.id === response.data.id)

      if (directory) {
        directory = response.data
      } else {
        state.flatDirectories.push(response.data)
      }
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
      // Set flat structure
      state.flatDirectories = directoryUtils.getFlatStructure(state.structure)
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
    },

    UPDATE_STRUCTURE: function ({ commit }, data) {
      commit('SET_PARSED_STRUCTURE', { response: {data} })
    },

    SAVE_STRUCTURE: function ({commit, state}, projectId) {
      let promises = []
      // Loop through each directory item and save
      state.flatDirectories.forEach((directory) => {
        if (directory.id !== null && directory.id !== undefined) {
          // Update
          promises.push(axios.put(DIRECTORY_ROOT + directory.id, directory))
        } else {
          // Create a new one
          promises.push(axios.post('projects/' + projectId + '/directories', directory))
        }
      })
      return Promise.all(promises)
    },

    // POST a new directory to projects
    NEW_DIRECTORY: function ({ commit }, projectId, directory) {

    },

    // PUT a directory
    UPDATE_DIRECTORY: function ({ commit, state }, directory) {
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

    // DELETE a directory
    REMOVE_DIRECTORY: function ({ commit }, data) {

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
  let toRemove = []
  directories.forEach((directory, index) => {
    if (directory.parentId !== null) {
      console.log(directory.parentId)
      // It's a child of a directory, move it to the correct place...
      // let removed = structure.splice(index, 1)[0]
      let copiedDirectory = {}

      Object.assign(copiedDirectory, structure[index])
      console.log(copiedDirectory)
      // Find the parent
      if (copiedDirectory) {
        let parent = structure.find(directory => directory.id === copiedDirectory.parentId)
        if (parent) {
          // Does parent have a directories array?
          if (parent.directories === undefined) {
            parent.directories = []
          }
          parent.directories.push(copiedDirectory)
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
