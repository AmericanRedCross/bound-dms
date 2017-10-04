// This module handles the global store and requests for the History endpoint
import axios from 'axios'
import { History } from './History'
import querystring from 'querystring'

const USER_ROOT = '/users'

const apiKeys = {
  state: {
    history: [],
    total: 0
  },
  mutations: {
    SET_HISTORY: (state, { response }) => {
      if (response.data.history instanceof Array) {
        state.history = []
        response.data.history.forEach((item) => {
          state.history.push(new History(item))
        })
      }
      state.total = response.data.total
    }
  },
  actions: {
    GET_USER_HISTORY: function ({commit}, {page, limit, userId, filter}) {
      return axios.get(USER_ROOT + '/' + userId + '/history/?' + querystring.stringify({page, limit, filter}))
        .then((response) => {
          commit('SET_HISTORY', { response: response.data })
        }).catch(err => {
          commit('SET_MESSAGE', { message: err })
          throw err
        })
    }
  },
  getters: {
    getHistory: (state, getters) => () => {
      return {
        history: state.history,
        total: state.total
      }
    }
  }
}

export default apiKeys

