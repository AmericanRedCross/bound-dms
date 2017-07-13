import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/auth/Login'
import Dashboard from '@/components/dashboard/Dashboard'
import Users from '@/components/users/List'
import Edit from '@/components/users/Edit'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      meta: {auth: true}
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {auth: false}
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {auth: true}
    },
    {
      path: '/users/',
      name: 'Users',
      component: Users,
      meta: {auth: true}
    },
    {
      path: '/users/edit/:id',
      name: 'User Edit',
      components: {default: Edit},
      props: {default: true},
      meta: {auth: true}
    }
  ]
})
