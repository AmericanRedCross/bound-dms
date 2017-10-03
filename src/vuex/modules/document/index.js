// This module handles the global store and requests for the Documents endpoint
import axios from 'axios'
import { Document } from './Document'
import { Translation } from './Translation'
import querystring from 'querystring'

const documents = {
  state: {
    documents: [],
    total: 0,
    currentBaseDocument: null,
    currentTranslatingDocument: null
  },
  mutations: {
    SET_ALL_DOCUMENTS: (state, { response }) => {
      if (response.data.documents instanceof Array) {
        state.documents = []
        response.data.documents.forEach((item) => {
          state.documents.push(new Document(item))
        })
      }
      state.total = response.data.total
    },
    SET_BASE_TRANSLATE_DOCUMENT: (state, { response, isBase }) => {
      if (isBase) {
        state.currentBaseDocument = new Translation(response.data)
      } else {
        state.currentTranslatingDocument = new Translation(response.data)
      }
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
    GET_DOCUMENT_BY_ID_LANG: function ({commit}, {language, documentId, isBase}) {
      return axios.get('documents/' + documentId + '/translations/' + language)
        .then((response) => {
          commit('SET_BASE_TRANSLATE_DOCUMENT', { response: response.data, isBase })
        }).catch(err => {
          commit('SET_MESSAGE', { message: err })
          throw err
        })
    },
    UPDATE_DOCUMENT_TRANSLATION: function ({commit}, {language, documentId, data}) {
      return axios.put('documents/' + documentId + '/translations/' + language, data).catch(err => {
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
    },
    LINK_DOCUMENT_DIRECTORY: function ({commit}, {directoryId, documentId}) {
      return axios.patch('/documents/' + documentId, {directory: {id: directoryId}})
        .catch(err => {
          commit('SET_MESSAGE', { message: err })
          throw err
        })
    },
    UNLINK_DOCUMENT_DIRECTORY: function ({commit}, {fileId}) {
      return axios.patch('/documents/' + fileId, {directory: {id: null}})
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
