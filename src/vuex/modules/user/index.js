// This module handles the global store and requests for the User endpoint
import axios from 'axios'
import { User } from './User'

const USER_ROOT = '/users'
const users = {
  state: {
    users: []
  },
  mutations: {
    SET_USERS: (state, { response }) => {
      if (response.data instanceof Array) {
        state.users = []
        // Are we getting an array back from the server?
        response.data.forEach((item) => {
          state.users.push(new User(item))
        })
      }
    },
    SET_USER: (state, { response }) => {
      // Does the user exist already?
      let user = state.users.find(user => user.id === response.data.id)
      let newUser = new User(response.data)
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
        commit('SET_MESSAGE', { message: err })
      })
    },
    // GET a user
    GET_USER: function ({ commit }, id) {
      return axios.get(USER_ROOT + '/' + id).then((response) => {
        commit('SET_USER', { response: response.data })
      }, (err) => {
        commit('SET_MESSAGE', { message: err })
      })
    },
    // PUT a user (create)
    CREATE_USER: function ({ commit }, data) {
      return axios.post(USER_ROOT, {
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email,
        password: '12345678' // Remove when password creation is done
      }).then((response) => {
        commit('SET_USER', { response: response.data })
      }, (err) => {
        commit('SET_MESSAGE', { message: err })
      })
    },
    // POST a user (update)
    UPDATE_USER: function ({ commit }, data) {
      return axios.put(USER_ROOT + '/' + data.id, data)
      .then((response) => {
        commit('SET_USER', { response: response.data })
      }, (err) => {
        commit('SET_MESSAGE', { message: err })
      })
    },
    // Delete a user
    DELETE_USER: function ({commit}, id) {
      return axios.delete(USER_ROOT + '/' + id).then((response) => {
        commit('REMOVE_USER', { id })
      }, (err) => {
        commit('SET_MESSAGE', { message: err })
      })
    },
    // Updates user password
    UPDATE_USER_PASSWORD: function ({ commit }, data) {
      return axios.put(USER_ROOT + '/me/password', data)
    }
  },
  getters: {
    getUserById: (state, getters) => (id) => {
      return state.users.find(user => user.id === id)
    }
  }
}

export default users
