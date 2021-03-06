// This is not currently used, Vue-auth handles the authentication, remove if no longer needed
import axios from 'axios'

const AUTH_ROOT = 'api/'
const auth = {
  state: {
    auth: {isAuthenticated: false}
  },
  mutations: {
    SET_AUTH_STATE: (state, { response }) => {
      state.auth = response
      state.auth.isAuthenticated = true
    }
  },
  actions: {
    AUTHENTICATE: function ({ commit }, data) {
      return axios.post(AUTH_ROOT + 'authentication', data).then((response) => {
        commit('SET_AUTH_STATE', { response: response.data })
      }, (err) => {
        commit('SET_MESSAGE', { message: err })
      })
    }
  },
  getters: { }
}

export default auth
