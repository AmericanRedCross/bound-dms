// This module handles the global store and requests for the Step endpoint
import axios from 'axios'
import { Step } from './Step'

const STEP_ROOT = '/steps'

const steps = {
  state: {
    steps: []
  },
  mutations: {
    SET_STEPS: (state, { response }) => {
      if (response.data instanceof Array) {
        state.steps = []
        response.data.forEach((item) => {
          state.steps.push(new Step(item.id, item.name, item.description))
        })
      }
    },
    SET_STEP: (state, { response }) => {
      // Does the step exist already?
      let step = state.steps.find(step => step.id === response.data.id)
      const newStep = new Step(
        response.data.id,
        response.data.name,
        response.data.description
      )

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
    // GET all steps
    GET_STEPS: function ({ commit }) {
      return axios.get(STEP_ROOT).then((response) => {
        commit('SET_STEPS', { response: response.data })
      }, (err) => {
        commit('SET_MESSAGE', { message: err })
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
      console.log(data)
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
