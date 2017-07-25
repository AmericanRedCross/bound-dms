// This module handles the global store and requests for the Content endpoint
import axios from 'axios'
import { Content } from './Content'

const CONTENT_ROOT = '/contents'

const contents = {
  state: {
    contents: []
  },
  mutations: {
    SET_CONTENTS: (state, { response }) => {
      if (response.data instanceof Array) {
        state.contents = []
        response.data.forEach((item) => {
          state.contents.push(new Content(item.id, item.name, item.description))
        })
      }
    },
    SET_CONTENT: (state, { response }) => {
      // Does the content exist already?
      let content = state.contents.find(content => content.id === response.data.id)
      const newContent = new Content(
        response.data.id,
        response.data.name,
        response.data.description
      )

      if (content) {
        content = newContent
      } else {
        state.contents.push(newContent)
      }
    },
    REMOVE_CONTENT: (state, { id }) => {
      // Find the content index
      let contentIndex = state.contents.findIndex(content => content.id === id)
      if (contentIndex >= 0) {
        state.contents.splice(contentIndex, 1)
      }
    }
  },
  actions: {
    // GET all contents
    GET_CONTENTS: function ({ commit }) {
      return axios.get(CONTENT_ROOT).then((response) => {
        commit('SET_CONTENTS', { response: response.data })
      }, (err) => {
        commit('SET_MESSAGE', { message: err })
      })
    },
    // GET a content
    GET_CONTENT: function ({ commit }, id) {
      return axios.get(CONTENT_ROOT + '/' + id).then((response) => {
        commit('SET_CONTENT', { response: response.data })
      }, (err) => {
        commit('SET_MESSAGE', { message: err })
      })
    },
    // PUT a content (create)
    CREATE_CONTENT: function ({ commit }, data) {
      console.log(data)
      return axios.put(CONTENT_ROOT, {
        name: data.name,
        description: data.description
      }).then((response) => {
        commit('SET_CONTENT', { response: response.data })
      }).catch(err => {
        commit('SET_MESSAGE', { message: err })
      })
    },
    // POST a content (update)
    UPDATE_CONTENT: function ({ commit }, data) {
      return axios.post(CONTENT_ROOT + '/' + data.id, {
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email
      }).then((response) => {
        commit('SET_CONTENT', { response: response.data })
      }, (err) => {
        commit('SET_MESSAGE', { message: err })
      })
    },
    // Delete a content
    DELETE_CONTENT: function ({commit}, id) {
      return axios.delete(CONTENT_ROOT + '/' + id).then((response) => {
        commit('REMOVE_CONTENT', { id })
      }, (err) => {
        commit('SET_MESSAGE', { message: err })
      })
    }
  },
  getters: {
    getContentById: (state, getters) => (id) => {
      return state.contents.find(content => content.id === id)
    }
  }
}

export default contents
