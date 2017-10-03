// This module handles the global store and requests for the Files endpoint
import axios from 'axios'
import { File } from './File'
import querystring from 'querystring'

const files = {
  state: {
    files: [],
    total: 0
  },
  mutations: {
    SET_ALL_FILES: (state, { response }) => {
      if (response.data.files instanceof Array) {
        state.files = []
        response.data.files.forEach((item) => {
          state.files.push(new File(item))
        })
      }
      state.total = response.data.total
    },
    UPDATE_FILE: (state, { response }) => {
      const fileIdx = state.files.findIndex(file => file.id === response.data.id)
      state.files[fileIdx].title = response.data.title
      state.files[fileIdx].description = response.data.description
    }
  },
  actions: {
    GET_ALL_FILES: function ({commit}, {page, limit, projectId, filter}) {
      return axios.get('/projects/' + projectId + '/files/?' + querystring.stringify({page, limit, filter}))
        .then((response) => {
          commit('SET_ALL_FILES', { response: response.data })
        }).catch(err => {
          commit('SET_MESSAGE', { message: err })
          throw err
        })
    },
    LINK_FILE_DIRECTORY: function ({commit}, {directoryId, fileId}) {
      return axios.patch('/files/' + fileId, {directoryId})
        .catch(err => {
          commit('SET_MESSAGE', { message: err })
          throw err
        })
    },
    UPDATE_FILE_DETAILS: function ({commit}, {fileId, title, description}) {
      return axios.patch('/files/' + fileId, {title, description})
        .then((response) => {
          commit('UPDATE_FILE', { response: response.data })
        })
        .catch(err => {
          commit('SET_MESSAGE', { message: err })
          throw err
        })
    },
    UNLINK_FILE_DIRECTORY: function ({commit}, {fileId}) {
      return axios.patch('/files/' + fileId, {directoryId: null})
        .catch(err => {
          commit('SET_MESSAGE', { message: err })
          throw err
        })
    }
  },
  getters: {
    getAllFiles: (state, getters) => () => {
      return {
        files: state.files,
        total: state.total
      }
    }
  }
}

export default files
