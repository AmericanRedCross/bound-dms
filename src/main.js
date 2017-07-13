// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'
import router from './router'
import store from './vuex'
import Locales from './assets/locales'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

import VeeValidate from 'vee-validate'
import Vuelidate from 'vuelidate'
import VueI18n from 'vue-i18n'
import VueCharts from 'vue-chartjs'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'
import VueSweetAlert from 'vue-sweetalert'
import axios from 'axios'
import Gravatar from 'vue-gravatar'

Vue.config.productionTip = false

axios.defaults.baseURL = '/api'

Vue.use(BootstrapVue)
Vue.use(VeeValidate, {fieldsBagName: 'fieldBag'})
Vue.use(Vuelidate)
Vue.use(VueI18n)
Vue.use(VueCharts)
Vue.use(VueSweetAlert)
Vue.use(VueAxios, axios)
Vue.component('v-gravatar', Gravatar)
Vue.component('fa-icon', Icon)

Vue.router = router

Vue.use(VueAuth, {
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  loginData: {
    url: 'auth',
    method: 'POST',
    redirect: '/',
    fetchUser: true
  },
  refresh: {
    url: 'auth/refresh',
    method: 'GET'
  },
  fetchData: {
    url: 'users/me',
    method: 'GET'
  },
  tokenName: 'auth_token'
})

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: Locales
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  template: '<App/>',
  components: { App },
  store
})
