import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/auth/Login'
import Reset from '@/components/auth/PasswordReset'

// User components
import ListUsers from '@/components/users/List'
import UserContainer from '@/components/users/user'
import EditUser from '@/components/users/Edit'
import NewUser from '@/components/users/New'
import UserProfile from '@/components/users/Profile'

// Project Components
import ProjectsContainer from '@/components/project/Projects'
import ListProjects from '@/components/project/List'
import NewProject from '@/components/project/New'
import ProjectContainer from '@/components/project/Project'
import ProjectDetail from '@/components/project/detail/Detail'
import AccountContainer from '@/components/account/Account'
import AccountProfile from '@/components/account/Profile'
import ChangePassword from '@/components/account/PasswordForm'
import PageNotFound from '@/components/pageNotFound/PageNotFound'
import NotAuthorised from '@/components/pageNotFound/NotAuthorised'
import Publish from '@/components/project/publish/Publish'
import FilesContainer from '@/components/project/documents/Files'
import FileList from '@/components/project/documents/FileList'
import DocumentsContainer from '@/components/project/documents/Documents'
import DocumentList from '@/components/project/documents/DocumentList'
import FileEditor from '@/components/project/documents/editor/Editor'

// Translation components
import TranslationContainer from '@/components/translations/Translations'
import TranslationWorkflow from '@/components/translations/TranslationWorkflow'
import ContentTranslation from '@/components/translations/ContentTranslation'

// Settings
import SettingsContainer from '@/components/project/settings/SettingsContainer'
import ProjectSettings from '@/components/project/settings/Project'
import ApiKeys from '@/components/project/settings/ApiKeys'
import Metatypes from '@/components/project/settings/Metatypes'

// Structure Components
import Structure from '@/components/structure/Structure'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/projects'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {auth: false}
    },
    {
      path: '/Reset',
      name: 'Reset',
      component: Reset,
      meta: {auth: false}
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
            breadcrumb: 'Profile',
            auth: ['admin']
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
              path: 'documents',
              component: DocumentsContainer,
              meta: {
                breadcrumb: 'Documents',
                showSidebar: true
              },
              children: [
                {
                  path: '',
                  name: 'project-documents',
                  component: DocumentList,
                  props: true,
                  meta: {
                    showSidebar: true
                  }
                },
                {
                  path: 'edit',
                  name: 'document-edit',
                  components: {default: FileEditor},
                  meta: {
                    breadcrumb: 'Edit',
                    showSidebar: true
                  }
                },
                {
                  path: 'edit/:docId/:lang',
                  name: 'document-edit-id',
                  props: true,
                  components: {default: FileEditor},
                  meta: {
                    breadcrumb: 'Edit',
                    showSidebar: true
                  }
                }
              ]
            },
            {
              path: 'files',
              component: FilesContainer,
              meta: {
                breadcrumb: 'Files',
                showSidebar: true
              },
              children: [
                {
                  path: '',
                  name: 'project-files',
                  component: FileList,
                  props: true,
                  meta: {
                    showSidebar: true
                  }
                }
              ]
            },
            {
              path: 'settings/',
              component: SettingsContainer,
              meta: {
                auth: ['admin'],
                breadcrumb: 'Settings',
                showSidebar: true
              },
              children: [
                {
                  path: 'settings',
                  name: 'settings',
                  component: ProjectSettings,
                  meta: {
                    showSidebar: true,
                    auth: ['admin']
                  }
                },
                {
                  path: 'apikeys',
                  name: 'project-apikeys',
                  component: ApiKeys,
                  meta: {
                    showSidebar: true
                  }
                },
                {
                  path: 'metatypes',
                  name: 'project-metatypes',
                  component: Metatypes,
                  meta: {
                    showSidebar: true
                  }
                }
              ]
            },
            {
              path: 'structure',
              name: 'project-structure',
              components: {default: Structure},
              meta: {
                breadcrumb: 'Structure',
                showSidebar: true
              }
            },
            {
              path: 'publish',
              name: 'project-publish',
              components: {default: Publish},
              meta: {
                breadcrumb: 'Publish',
                showSidebar: true,
                auth: ['admin']
              }
            },
            {
              path: 'translations',
              component: TranslationContainer,
              meta: {
                auth: true,
                breadcrumb: 'Translations',
                showSidebar: true
              },
              children: [
                {
                  path: '',
                  name: 'translation-workflow',
                  component: TranslationWorkflow,
                  props: true,
                  meta: {
                    breadcrumb: 'Translation workflow',
                    showSidebar: true
                  }
                },
                {
                  path: 'content',
                  name: 'content-translation',
                  component: ContentTranslation,
                  props: true,
                  meta: {
                    breadcrumb: 'Content translation',
                    showSidebar: true
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/account/',
      component: AccountContainer,
      meta: {
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
            breadcrumb: 'Change Password'
          }
        }
      ]
    },
    {
      path: '/403',
      name: 'Unauthorised',
      component: NotAuthorised
    },
    {
      path: '*', component: PageNotFound
    }
  ]

})
