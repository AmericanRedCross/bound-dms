import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/auth/Login'
import Dashboard from '@/components/dashboard/Dashboard'
import ListUsers from '@/components/users/List'
import UserContainer from '@/components/users/user'
import EditUser from '@/components/users/Edit'
import NewUser from '@/components/users/New'
import Editor from '@/components/documents/editor/Editor'
import ProjectContainer from '@/components/project/Project'
import ListProjects from '@/components/project/List'
import EditProject from '@/components/project/Edit'
import NewProject from '@/components/project/New'
import ProjectDetail from '@/components/project/detail/Detail'

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
      component: UserContainer,
      meta: {
        auth: true,
        breadcrumb: 'Users'
      },
      children: [
        {
          path: '',
          name: 'users',
          component: ListUsers
        },
        {
          path: 'new',
          name: 'user-new',
          components: {default: NewUser},
          meta: {
            breadcrumb: 'New'
          }
        },
        {
          path: ':id/edit',
          name: 'user-edit',
          component: EditUser,
          props: true,
          meta: {
            breadcrumb: 'Edit'
          }
        }
      ]
    },
    {
      path: '/projects',
      component: ProjectContainer,
      meta: {auth: true},
      children: [
        {
          path: '',
          name: 'projects',
          component: ListProjects
        },
        {
          path: 'new',
          name: 'project-new',
          components: {default: NewProject}
        },
        {
          path: ':id',
          name: 'project-detail',
          component: ProjectDetail,
          props: true
        },
        {
          path: ':id/edit',
          name: 'project-edit',
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
