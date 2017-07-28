// This module handles the global store and requests for the Project endpoint
import axios from 'axios'
import { Project } from './Project'

const PROJECT_ROOT = '/projects'

const projects = {
  state: {
    projects: []
  },
  mutations: {
    SET_PROJECTS: (state, { response }) => {
      if (response.data instanceof Array) {
        state.projects = []
        response.data.forEach((item) => {
          state.projects.push(new Project(item.id, item.name, item.description))
        })
      }
    },
    SET_PROJECT: (state, { response }) => {
      // Does the project exist already?
      let project = state.projects.find(project => project.id === response.data.id)
      const newProject = new Project(
        response.data.id,
        response.data.name,
        response.data.description
      )

      if (project) {
        project = newProject
      } else {
        state.projects.push(newProject)
      }
    },
    REMOVE_PROJECT: (state, { id }) => {
      // Find the project index
      let projectIndex = state.projects.findIndex(project => project.id === id)
      if (projectIndex >= 0) {
        state.projects.splice(projectIndex, 1)
      }
    },
    SET_LANGUAGES: (state, { response, id }) => {
      let project = state.projects.find(project => project.id === id)
      if (project && response.data instanceof Array) {
        project.languages = []
        response.data.forEach((item) => {
          // TODO: When we know the model we should create a Language Class
          // then we should create on for each item here.
          project.languages.push(item)
        })
      }
    },
    SET_LANGUAGE: (state, { response, id }) => {
      // Does the project exist already?
      let project = state.projects.find(project => project.id === id)

      if (project) {
        if (project.languages) {
          let language = project.languages.find(language => language.id === response.data.id)

          if (language) {
            // Language already in array
          } else {
            project.languages.push(response.data)
          }
        } else {
          project.languages = []
          project.languages.push(response.data)
        }
        // If it doesn't exist, push it into the project's language Array
      }
    }
  },
  actions: {
    // GET all projects
    GET_PROJECTS: function ({ commit }) {
      return axios.get(PROJECT_ROOT).then((response) => {
        commit('SET_PROJECTS', { response: response.data })
      }, (err) => {
        commit('SET_MESSAGE', { message: err })
      })
    },
    // GET a project
    GET_PROJECT: function ({ commit }, id) {
      return axios.get(PROJECT_ROOT + '/' + id).then((response) => {
        commit('SET_PROJECT', { response: response.data })
      }, (err) => {
        commit('SET_MESSAGE', { message: err })
      })
    },
    // PUT a project (create)
    CREATE_PROJECT: function ({ commit }, data) {
      console.log(data)
      return axios.put(PROJECT_ROOT, {
        name: data.name,
        description: data.description
      }).then((response) => {
        commit('SET_PROJECT', { response: response.data })
      }).catch(err => {
        commit('SET_MESSAGE', { message: err })
      })
    },
    // POST a project (update)
    UPDATE_PROJECT: function ({ commit }, data) {
      return axios.post(PROJECT_ROOT + '/' + data.id, {
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email
      }).then((response) => {
        commit('SET_PROJECT', { response: response.data })
      }, (err) => {
        commit('SET_MESSAGE', { message: err })
      })
    },
    // Delete a project
    DELETE_PROJECT: function ({commit}, id) {
      return axios.delete(PROJECT_ROOT + '/' + id).then((response) => {
        commit('REMOVE_PROJECT', { id })
      }, (err) => {
        commit('SET_MESSAGE', { message: err })
      })
    },
    // GET all projects
    GET_LANGUAGES: function ({ commit }) {
      return axios.get(PROJECT_ROOT).then((response) => {
        commit('SET_LANGUAGES', { response: response.data })
      }, (err) => {
        commit('SET_MESSAGE', { message: err })
      })
    },
    // GET a project
    GET_LANGUAGE: function ({ commit }, id) {
      return axios.get(PROJECT_ROOT + '/' + id).then((response) => {
        commit('SET_LANGUAGE', { response: response.data })
      }, (err) => {
        commit('SET_MESSAGE', { message: err })
      })
    }
  },
  getters: {
    getProjectById: (state, getters) => (id) => {
      return state.projects.find(project => project.id === id)
    }
  }
}

export default projects
