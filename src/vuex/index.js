import Vue from 'vue'
import Vuex from 'vuex'
import message from './modules/message'
import auth from './modules/auth'
import users from './modules/user'
import projects from './modules/project'
import structure from './modules/structure'
import roles from './modules/roles'

Vue.use(Vuex)
export const modules = {
  message,
  auth,
  users,
  projects,
  roles,
  structure
}

/*
 * Example Vuex Implementation.
 */
const store = new Vuex.Store({
  modules
})

export default store
