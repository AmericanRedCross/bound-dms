// This module handles the global store and requests for the Step endpoint
import axios from 'axios'
import stepUtils from './utils'

const STEP_ROOT = '/steps'

const steps = {
  state: {
    steps: []
  },
  mutations: {
    SET_STRUCTURE: (state, { response }) => {
      if (response.data instanceof Array) {
        state.steps = stepUtils.getSteps(response.data)
      }
    },
    SET_PARSED_STRUCTURE: (state, { response }) => {
      state.steps = response.data
    },
    SET_STEP: (state, { response }) => {
      // Does the step exist already?
      let step = state.steps.find(step => step.id === response.data.id)
      const newStep = stepUtils.getStepObject(response.data)

      if (step) {
        step = newStep
      } else {
        state.steps.push(newStep)
      }
    },
    REMOVE_STEP: (state, { id }) => {
      // Find the step index
      let stepIndex = state.steps.findIndex(step => step.id === id)
      if (stepIndex >= 0) {
        state.steps.splice(stepIndex, 1)
      }
    }
  },
  actions: {
    // GET entire Structure
    GET_STRUCTURE: function ({ commit }, projectId) {
      console.log({stepUtils})
      // return axios.get(STEP_ROOT).then((response) => {
      //   commit('SET_STEPS', { response: response.data })
      // }, (err) => {
      //   commit('SET_MESSAGE', { message: err })
      // })

      // Mock structure until we know what the endpoints are.
      commit('SET_STRUCTURE', {
        response: {
          data: stepUtils.getMockStructure()
        }
      })
    },
    // GET a step
    GET_STEP: function ({ commit }, id) {
      return axios.get(STEP_ROOT + '/' + id).then((response) => {
        commit('SET_STEP', { response: response.data })
      }, (err) => {
        commit('SET_MESSAGE', { message: err })
      })
    },
    // PUT a step (create)
    CREATE_STEP: function ({ commit }, data) {
      return axios.put(STEP_ROOT, {
        name: data.name,
        description: data.description
      }).then((response) => {
        commit('SET_STEP', { response: response.data })
      }).catch(err => {
        commit('SET_MESSAGE', { message: err })
      })
    },
    // POST a step (update)
    UPDATE_STEP: function ({ commit }, data) {
      return axios.post(STEP_ROOT + '/' + data.id, {
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email
      }).then((response) => {
        commit('SET_STEP', { response: response.data })
      }, (err) => {
        commit('SET_MESSAGE', { message: err })
      })
    },
    // POST a step (update)
    UPDATE_STRUCTURE: function ({ commit }, data) {
      // return axios.post(STEP_ROOT + '/' + data.id, {
      //   firstname: data.firstName,
      //   lastname: data.lastName,
      //   email: data.email
      // }).then((response) => {
      //   commit('SET_STEP', { response: response.data })
      // }, (err) => {
      //   commit('SET_MESSAGE', { message: err })
      // })
      console.log({data})
      commit('SET_PARSED_STRUCTURE', { response: {data} })
    },
    // Delete a step
    DELETE_STEP: function ({commit}, id) {
      return axios.delete(STEP_ROOT + '/' + id).then((response) => {
        commit('REMOVE_STEP', { id })
      }, (err) => {
        commit('SET_MESSAGE', { message: err })
      })
    }
  },
  getters: {
    getStepById: (state, getters) => (id) => {
      return state.steps.find(step => step.id === id)
    }
  }
}

export default steps
