// This module handles the global store and requests for the Project endpoint
import axios from 'axios'
import { Project } from './Project'
import { languages } from 'countries-list'

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
          state.projects.push(new Project(item))
        })
      }
    },
    SET_PROJECT: (state, { response }) => {
      // Does the project exist already?
      let project = state.projects.find(project => project.id === response.data.id)
      const newProject = new Project(response.data)

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
          project.languages.push(item)
        })
      }
    },
    SET_LANGUAGE: (state, { response, id }) => {
      const project = state.projects.find(project => project.id === id)
      const langIdx = project.languages.findIndex(language => language.id === response.data.id)

      if (langIdx === -1) {
        project.languages.push(response.data)
      } else {
        project.languages[langIdx] = response.data
      }
    },
    REMOVE_LANGUAGE: (state, { code, id }) => {
      const projectIdx = state.projects.findIndex(project => project.id === id)
      const langIdx = state.projects[projectIdx].languages.findIndex(language => language.code === code)
      if (langIdx >= 0) {
        state.projects[projectIdx].languages.splice(langIdx, 1)
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
        name: data.name,
        description: data.description
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
    // Adds a language to a project
    ADD_LANGUAGE: function ({commit}, {id, code}) {
      return axios.put(PROJECT_ROOT + '/' + id + '/languages/' + code)
      .then((response) => {
        commit('SET_LANGUAGE', { response: response.data, id: id })
      }).catch(err => {
        commit('SET_MESSAGE', { message: err })
      })
    },
    // Removes a language from a project
    DELETE_LANGUAGE: function ({commit}, {id, code}) {
      return axios.delete(PROJECT_ROOT + '/' + id + '/languages/' + code)
      .then((response) => {
        commit('REMOVE_LANGUAGE', { code: code, id: id })
      }, (err) => {
        commit('SET_MESSAGE', { message: err })
      })
    }
  },
  getters: {
    getProjectById: (state, getters) => (id) => {
      return state.projects.find(project => project.id === id)
    },
    getProjectLangOptions: (state, getters) => (id) => {
      if (!id) {
        return []
      }
      return state.projects.find(project => project.id === id).languages.map((language) => {
        return { label: `${languages[language.code].name} (${language.code})`, value: language.code }
      })
    }
  }
}

export default projects
