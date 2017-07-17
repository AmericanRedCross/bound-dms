import axios from 'axios'
import { User } from './User'

const USER_ROOT = '/users'
const users = {
  state: {
    users: [],
    error: ''
  },
  mutations: {
    SET_USERS: (state, { response }) => {
      if (response instanceof Array) {
        state.users = []
        // Are we getting an array back from the server?
        response.forEach((item) => {
          state.users.push(new User(item.id, item.firstname, item.lastname, item.email))
        })
      }
    },
    SET_USER: (state, { response }) => {
      // Does the user exist already?
      let user = state.users.find(user => user.id === response.id)
      let newUser = new User(response.id, response.firstname, response.lastname, response.email)
      if (user) {
        user = newUser
      } else {
        state.users.push(newUser)
      }
    },
    REMOVE_USER: (state, { id }) => {
      // Find the user index
      let userIndex = state.users.findIndex(user => user.id === id)
      if (userIndex >= 0) {
        state.users.splice(userIndex, 1)
      }
    }
  },
  actions: {
    // GET all users
    GET_USERS: function ({ commit }) {
      return axios.get(USER_ROOT).then((response) => {
        commit('SET_USERS', { response: response.data })
      }, (err) => {
        commit('SET_ERROR', { error: err })
      })
    },
    // GET a user
    GET_USER: function ({ commit }, id) {
      return axios.get(USER_ROOT + '/' + id).then((response) => {
        commit('SET_USER', { response: response.data })
      }, (err) => {
        commit('SET_ERROR', { error: err })
      })
    },
    // PUT a user (create)
    CREATE_USER: function ({ commit }, data) {
      return axios.post(USER_ROOT, {
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email
      }).then((response) => {
        commit('SET_USER', { response: response.data })
      }, (err) => {
        commit('SET_ERROR', { error: err })
      })
    },
    // POST a user (update)
    UPDATE_USER: function ({ commit }, data) {
      return axios.post(USER_ROOT + '/' + data.id, {
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email
      }).then((response) => {
        commit('SET_USER', { response: response.data })
      }, (err) => {
        commit('SET_ERROR', { error: err })
      })
    },
    // Delete a user
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

export default users
