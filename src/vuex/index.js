import Vue from 'vue'
import Vuex from 'vuex'
import message from './modules/message'
import auth from './modules/auth'
import users from './modules/user'

Vue.use(Vuex)
export const modules = {
  message: message,
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
