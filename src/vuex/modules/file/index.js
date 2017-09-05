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
    }
  },
  actions: {
    GET_ALL_FILES: function ({commit}, {page, limit}) {
      return axios.get('/files/?' + querystring.stringify({page, limit}))
        .then((response) => {
          commit('SET_ALL_FILES', { response: response.data })
        }).catch(err => {
          commit('SET_MESSAGE', { message: err })
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
