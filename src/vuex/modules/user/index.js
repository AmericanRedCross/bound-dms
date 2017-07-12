import axios from 'axios'

const USER_ROOT = '/api/users'
const auth = {
  state: {
    users: [],
    error: ''
  },
  mutations: {
    SET_USERS: (state, { response }) => {
      state.users = response
    },
    SET_USER: (state, { response }) => {
      // Does the user exist already?
      let user = state.users.find(user => user.id === response.id)
      if (user) {
        user = response
      } else {
        state.users.push(response)
      }
    },
    REMOVE_USER: (state, { response }) => {
      // Find the user index
      let userIndex = state.users.findIndex(user => user.id === response.id)
      if (userIndex) {
        state.users.splice(userIndex, 1)
      }
    }
  },
  actions: {
    GET_USERS: function ({ commit }) {
      return axios.get(USER_ROOT).then((response) => {
        commit('SET_USERS', { response: response.data })
      }, (err) => {
        commit('SET_ERROR', { error: err })
      })
    },
    GET_USER: function ({ commit }, id) {
      return axios.get(USER_ROOT + '/' + id).then((response) => {
        commit('SET_USER', { response: response.data })
      }, (err) => {
        commit('SET_ERROR', { error: err })
      })
    },
    UPDATE_USER: function ({ commit }, data) {
      return axios.post(USER_ROOT + '/' + data.id, data).then((response) => {
        commit('SET_USER', { response: response.data })
      }, (err) => {
        commit('SET_ERROR', { error: err })
      })
    },
    DELETE_USER: function ({commit}, id) {
      return axios.delete(USER_ROOT + '/' + id).then((response) => {
        commit('REMOVE_USER', { id })
      }, (err) => {
        commit('SET_ERROR', { error: err })
      })
    }
  },
  getters: {
    getUserById: (state, getters) => (id) => {
      return state.users.find(user => user.id === id)
    }
  }
}

export default auth
