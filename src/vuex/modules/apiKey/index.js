// This module handles the global store and requests for the Api Keys endpoint
import axios from 'axios'
import { ApiKey } from './ApiKey'

const PROJECT_ROOT = '/projects'

const apiKeys = {
  state: {
    keys: []
  },
  mutations: {
    SET_KEYS: (state, { response }) => {
      if (response.data instanceof Array) {
        state.keys = []
        response.data.forEach((item) => {
          state.keys.push(new ApiKey(item))
        })
      }
    },
    SET_KEY: (state, { response }) => {
      const apiKeyIdx = state.keys.findIndex(apiKey => apiKey.id === response.data.id)

      if (apiKeyIdx === -1) {
        state.keys.push(response.data)
      } else {
        state.keys[apiKeyIdx] = response.data
      }
    },
    REMOVE_KEY: (state, { id }) => {
      const apiKeyIdx = state.keys.findIndex(apiKey => apiKey.id === id)
      if (apiKeyIdx >= 0) {
        state.keys.splice(apiKeyIdx, 1)
      }
    }
  },
  actions: {
    GET_PROJECT_KEYS: function ({commit}, projectId) {
      return axios.get(PROJECT_ROOT + '/' + projectId + '/api-keys/')
        .then((response) => {
          commit('SET_KEYS', { response: response.data })
        }).catch(err => {
          commit('SET_MESSAGE', { message: err })
        })
    },
    // Adds an API key to a project
    ADD_KEY: function ({commit}, {name, projectId}) {
      return axios.put(PROJECT_ROOT + '/' + projectId + '/api-keys', {
        name: name
      })
      .then((response) => {
        commit('SET_KEY', { response: response.data })
      }).catch(err => {
        commit('SET_MESSAGE', { message: err })
      })
    },
    // // Removes an API key from a project
    DELETE_KEY: function ({commit}, keyId) {
      return axios.delete('/api-keys/' + keyId)
      .then((response) => {
        commit('REMOVE_KEY', { id: keyId })
      }).catch(err => {
        commit('SET_MESSAGE', { message: err })
      })
    }
  },
  getters: {
    getKeys: (state, getters) => () => {
      return state.keys
    }
  }
}

export default apiKeys
