import Vue from 'vue'
import Vuex from 'vuex'
import message from './modules/message'
import auth from './modules/auth'
import users from './modules/user'
import projects from './modules/project'
import structure from './modules/structure'
import roles from './modules/roles'
import apiKey from './modules/apiKey'
import translations from './modules/translations'
import file from './modules/file'
import documents from './modules/document'
import metatype from './modules/metatype'
import publish from './modules/publish'

Vue.use(Vuex)
export const modules = {
  message,
  auth,
  users,
  projects,
  roles,
  structure,
  apiKey,
  file,
  translations,
  documents,
  metatype,
  publish
}

/*
 * Example Vuex Implementation.
 */
const store = new Vuex.Store({
  modules
})

export default store
