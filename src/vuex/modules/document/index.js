// This module handles the global store and requests for the Documents endpoint
import axios from 'axios'
import { Document } from './Document'
import querystring from 'querystring'

const documents = {
  state: {
    documents: [],
    total: 0
  },
  mutations: {
    SET_ALL_DOCUMENTS: (state, { response }) => {
      if (response.data instanceof Array) {
        state.documents = []
        response.data.forEach((item) => {
          state.documents.push(new Document(item))
        })
      }
      state.total = response.data.total
    }
  },
  actions: {
    GET_ALL_DOCUMENTS: function ({commit}, {page, limit, projectId}) {
      return axios.get('/projects/' + projectId + '/documents/?' + querystring.stringify({page, limit}))
        .then((response) => {
          commit('SET_ALL_DOCUMENTS', { response: response.data })
        }).catch(err => {
          commit('SET_MESSAGE', { message: err })
          throw err
        })
    },
    CREATE_DOCUMENT: function ({commit}, {projectId, data}) {
      return axios.post('/projects/' + projectId + '/documents', data)
      .catch(err => {
        commit('SET_MESSAGE', { message: err })
        throw err
      })
    }
  },
  getters: {
    getAllDocuments: (state, getters) => () => {
      return {
        documents: state.documents,
        total: state.total
      }
    }
  }
}

export default documents
