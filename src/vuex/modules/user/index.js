import axios from 'axios'

const USER_ROOT = 'api/users'
const auth = {
  state: {
    users: [],
    error: ''
  },
  mutations: {
    SET_USERS: (state, { response }) => {
      state.users = response
    }
  },
  actions: {
    GET_USERS: function ({ commit }, data) {
      return axios.get(USER_ROOT).then((response) => {
        commit('SET_USERS', { response: response.data })
      }, (err) => {
        console.log(err)
        commit('SET_ERROR', { error: err })
      })
    }
  },
  getters: { }
}

export default auth
