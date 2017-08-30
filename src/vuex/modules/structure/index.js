/** TODO: All this needs unit testing. */

// This module handles the global store and requests for the Step endpoint
import stepUtils from './utils'
import { Step } from './Step'

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
    SET_HIERARCHY: (state, { options }) => {
      // Find the right lot of steps.. traverse through
      let steps = state.steps
      if (options.stepNumbers !== undefined) {
        options.stepNumbers.forEach((stepNumber, index) => {
          if (index === 0) {
            // an array so a bit different to find
            steps = steps.find(step => step.hierarchy === stepNumber)
          } else {
            steps = steps.steps.find(step => step.hierarchy === stepNumber)
          }
        })
        steps = steps.steps
      }
      Step.updateHierarchy(options.newIndex, options.oldIndex, steps)
    }
  },
  actions: {
    // GET entire Structure
    GET_STRUCTURE: function ({ commit }, projectId) {
      // Mock structure until we know what the endpoints are.
      commit('SET_STRUCTURE', {
        response: {
          data: stepUtils.getMockStructure()
        }
      })
    },
    // POST a step (update)
    UPDATE_STRUCTURE: function ({ commit }, data) {
      commit('SET_PARSED_STRUCTURE', { response: {data} })
    },

    UPDATE_HIERARCHY: function ({ commit }, options) {
      commit('SET_HIERARCHY', {
        options
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
