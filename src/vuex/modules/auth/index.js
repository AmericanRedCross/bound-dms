import axios from 'axios'

const AUTH_ROOT = 'api/'
const auth = {
  state: {
    auth: {isAuthenticated: false},
    error: ''
  },
  mutations: {
    SET_AUTH_STATE: (state, { response }) => {
      state.auth = response

      state.auth.isAuthenticated = true
    },
    SET_ERROR: (state, { error }) => {
      state.error = error.message
      state.auth = {isAuthenticated: false}
    }
  },
  actions: {
    AUTHENTICATE: function ({ commit }, data) {
      return axios.post(AUTH_ROOT + 'authentication', data).then((response) => {
        commit('SET_AUTH_STATE', { response: response.data })
      }, (err) => {
        console.log(err)
        commit('SET_ERROR', { error: err })
      })
    }
  },
  getters: { }
}

export default auth
