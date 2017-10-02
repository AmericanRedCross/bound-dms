// This module handles the global store and requests for the Metatype endpoint
import axios from 'axios'
import { Metatype } from './Metatype'

const PROJECT_ROOT = '/projects'

const metatypes = {
  state: {
    metatypes: []
  },
  mutations: {
    SET_METATYPES: (state, { response }) => {
      if (response.data instanceof Array) {
        state.metatypes = []
        response.data.forEach((item) => {
          state.metatypes.push(new Metatype(item))
        })
      }
    },
    SET_METATYPE: (state, { response }) => {
      const metaTypeIdx = state.metatypes.findIndex(metatype => metatype.id === response.data.id)

      if (metaTypeIdx === -1) {
        state.metatypes.push(response.data)
      } else {
        state.metatypes[metaTypeIdx] = response.data
      }
    }
  },
  actions: {
    GET_PROJECT_METATYPES: function ({commit}, projectId) {
      return axios.get(PROJECT_ROOT + '/' + projectId + '/metatypes/')
        .then((response) => {
          commit('SET_METATYPES', { response: response.data })
        }).catch(err => {
          commit('SET_MESSAGE', { message: err })
          throw err
        })
    },
    // Adds an Metatype to a project
    ADD_METATYPE: function ({commit}, {key, type, projectId}) {
      return axios.post(PROJECT_ROOT + '/' + projectId + '/metatypes', {
        key: key,
        type: type
      })
      .then((response) => {
        commit('SET_METATYPE', { response: response.data })
      }).catch(err => {
        commit('SET_MESSAGE', { message: err })
        throw err
      })
    }
  },
  getters: {
    getMetatypes: (state, getters) => () => {
      return state.metatypes
    }
  }
}

export default metatypes
