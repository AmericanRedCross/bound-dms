import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/auth/Login'
import Dashboard from '@/components/dashboard/Dashboard'
import Editor from '@/components/documents/editor/Editor'

// User components
import ListUsers from '@/components/users/List'
import UserContainer from '@/components/users/user'
import EditUser from '@/components/users/Edit'
import NewUser from '@/components/users/New'
import UserProfile from '@/components/users/Profile'

// Project Components
import ProjectsContainer from '@/components/project/Projects'
import ListProjects from '@/components/project/List'
import EditProject from '@/components/project/Edit'
import NewProject from '@/components/project/New'
import ProjectContainer from '@/components/project/Project'
import ProjectDetail from '@/components/project/detail/Detail'
import AccountContainer from '@/components/account/Account'
import AccountProfile from '@/components/account/Profile'
import ChangePassword from '@/components/account/PasswordForm'
import PageNotFound from '@/components/pageNotFound/PageNotFound'
import TranslationWorkflow from '@/components/translations/TranslationWorkflow'

// Structure Components
import Structure from '@/components/structure/Structure'

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
        auth: ['admin'],
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
          path: ':id',
          name: 'user-profile',
          component: UserProfile,
          meta: {
            breadcrumb: 'Profile'
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
      component: ProjectsContainer,
      meta: {
        auth: true,
        breadcrumb: 'Projects'
      },
      children: [
        {
          path: '',
          name: 'projects',
          component: ListProjects
        },
        {
          path: 'new',
          name: 'project-new',
          components: {default: NewProject},
          meta: {
            breadcrumb: 'New',
            auth: ['admin']
          }
        },
        {
          path: ':id/',
          component: ProjectContainer,
          props: true,
          meta: {
            breadcrumb: 'Project Name'
          },
          children: [
            {
              path: '',
              name: 'project-detail',
              component: ProjectDetail,
              props: true,
              meta: {
                showSidebar: true
              }
            },
            {
              path: 'structure',
              name: 'project-structure',
              components: {default: Structure},
              meta: {
                breadcrumb: 'Structure',
                showSidebar: true
              }
            }
          ]
        },
        {
          path: ':id/edit',
          name: 'project-edit',
          component: EditProject,
          props: true,
          meta: {
            breadcrumb: 'Edit'
          }
        },
        {
          path: ':id/translations',
          name: 'translation-workflow',
          component: TranslationWorkflow,
          props: true,
          meta: {
            breadcrumb: 'Translation Workflow'
          }
        }
      ]
    },
    {
      path: '/documents/edit/',
      name: 'Document Editor',
      components: {default: Editor},
      meta: {auth: true}
    },
    {
      path: '/account/',
      component: AccountContainer,
      meta: {
        auth: ['admin'],
        breadcrumb: 'Account'
      },
      children: [
        {
          path: 'profile',
          name: 'profile',
          component: AccountProfile,
          props: true
        },
        {
          path: 'change-password',
          name: 'change-password',
          component: ChangePassword,
          props: true,
          meta: {
            auth: ['admin'],
            breadcrumb: 'Change Password'
          }
        }
      ]
    },
    {
      path: '*', component: PageNotFound }
  ]

})
