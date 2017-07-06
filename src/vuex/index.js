import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'

Vue.use(Vuex)

/*
 * Example Vuex Implementation.
 */
const store = new Vuex.Store({
  modules: {
    auth: auth
  }
})
export default store
