import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import users from './modules/user'

Vue.use(Vuex)

/*
 * Example Vuex Implementation.
 */
const store = new Vuex.Store({
  modules: {
    auth: auth,
    users: users
  }
})
export default store
