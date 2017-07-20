import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/auth/Login'
import Dashboard from '@/components/dashboard/Dashboard'
import Users from '@/components/users/List'
import EditUser from '@/components/users/Edit'
import NewUser from '@/components/users/New'
import Editor from '@/components/documents/editor/Editor'
import ListProjects from '@/components/project/List'
import EditProject from '@/components/project/Edit'
import NewProject from '@/components/project/New'

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
      components: {default: EditUser},
      props: {default: true},
      meta: {auth: true}
    },
    {
      path: '/users/new',
      name: 'New User',
      components: {default: NewUser},
      props: {default: true},
      meta: {auth: true}
    },
    {
      path: '/projects',
      name: 'Projects',
      component: ListProjects,
      meta: {auth: true},
      children: [
        {
          path: 'new',
          name: 'New Project',
          components: {default: NewProject}
        },
        {
          path: ':id/edit',
          name: 'Projects Edit',
          component: EditProject,
          props: true
        }
      ]
    },
    {
      path: '/documents/edit/',
      name: 'Document Editor',
      components: {default: Editor},
      meta: {auth: true}
    }
  ]
})
