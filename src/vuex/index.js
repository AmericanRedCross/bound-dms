import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import users from './modules/user'

Vue.use(Vuex)
export const modules = {
  auth: auth,
  users: users
}

/*
 * Example Vuex Implementation.
 */
const store = new Vuex.Store({
  modules
})

export default store
