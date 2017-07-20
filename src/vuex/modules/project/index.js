// This module handles the global store and requests for the Project endpoint
import axios from 'axios'
import { Project } from './Project'

const PROJECT_ROOT = '/projects'

const projects = {
  state: {
    projects: [
      new Project(1, 'Cash in Emergencies', ['en', 'fr']),
      new Project(2, 'Another project', ['en', 'es'])
    ]
  },
  mutations: {
    SET_PROJECTS: (state, { response }) => {
      if (response.data instanceof Array) {
        state.projects = []
        // Are we getting an array back from the server?
        response.data.forEach((item) => {
          state.projects.push(new Project(item.id, item.name, item.languages))
        })
      }
    },
    SET_PROJECT: (state, { response }) => {
      // Does the project exist already?
      let project = state.projects.find(project => project.id === response.data.id)
      let newProject = new Project(response.data.id, response.data.name, response.data.languages)
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
      return axios.put(PROJECT_ROOT, {
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email,
        password: '12345678' // Remove when password creation is done
      }).then((response) => {
        commit('SET_PROJECT', { response: response.data })
      }, (err) => {
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
    }
  },
  getters: {
    getProjectById: (state, getters) => (id) => {
      return state.projects.find(project => project.id === id)
    }
  }
}

export default projects
